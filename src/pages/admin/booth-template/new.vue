<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ t('admin_page.booth_template_style.create') }}
    </h3>
    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <div class="pb-10">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          :label-width="windowWidth > 765 ? '200px' : '100px'"
          class="demo-ruleForm pt-2 lg:pt-10 pb-10 w-full md:w-[80%] flex-col sm:flex-row"
          :size="formSize"
          status-icon
          :label-position="windowWidth > 550 ? 'right' : 'top'"
        >
          <el-form-item :label="t('events.booth')" prop="booth_id">
            <CommonSelect
              route="Booth"
              :default-value="ruleForm.booth_id"
              @on-change-data="updateField"
            />
          </el-form-item>
          <el-form-item
            :label="t('admin_page.booth_template_style.template')"
            prop="template"
          >
            <AdminUploadCustom
              accept=".zip,.rar,.7z,.gz"
              type-file="compressed"
              :tips="''"
              :on-change="onChange"
              :on-remove="onRemove"
            />
          </el-form-item>
          <el-form-item>
            <button
              class="px-2 py-1 bg-primary text-white rounded"
              :class="
                disableButton
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-secondary'
              "
              :disabled="disableButton"
              @click.prevent="submitForm(ruleFormRef)"
            >
              Submit
            </button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IBlock } from '~/interfaces/block'
import useApi from '~/composables/request/useApi'
import { block } from '~/assets/infoData'

const { uploadFile } = useApi('BoothTemplate')

const { t } = useI18n()

// get id url
const router = useRouter()
const formSize = ref()
// form

const ruleFormRef = ref()
const disableButton = ref(true)
const ruleForm = reactive({
  booth_id: '',
  template: {} as File,
})

const windowWidth = ref(0)
const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

const updateField = (value: any) => {
  ruleForm.booth_id = value
}

// validate form
const rules = reactive({
  booth_id: [
    { required: true, message: 'Please input title', trigger: 'blur' },
  ],
  template: [
    { required: true, message: 'Please input title', trigger: 'blur' },
  ],
})

const onChange = (rawFile: any) => {
  ruleForm.template = rawFile.raw
}

const onRemove = (rawFile: any) => {
  ruleForm.template = {} as File
}

watch(
  ruleForm,
  () => {
    if (ruleFormRef.value)
      ruleFormRef.value.validate((valid: any) => {
        if (valid && !!ruleForm.template.name) disableButton.value = false
        else disableButton.value = true
      })
  },
  { immediate: true },
)

// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  try {
    if (!formEl) return
    formEl.validate((valid, fields) => {
      if (valid) {
        const formData: any = new FormData()
        formData.append('template', ruleForm.template, ruleForm.template.name)
        formData.append('booth_id', ruleForm.booth_id)
        uploadFile(formData)
          .then(() => {
            ElMessage.success('Successfully!')
            router.push('/admin/booth-template')
          })
          .catch(() => {
            ElMessage.error(t('message.errors.form.format'))
          })
      }
    })
  } catch (error) {
    ElMessage.error(t('message.errors.form.format'))
  }
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
