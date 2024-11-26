<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ t('admin_page.booth_template_style.title') }}
    </h3>
    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <div class="pb-10">
        <admin-form
          :items="boothTemplate"
          :data="{
            ruleForm,
          }"
          :submit-form="submitForm"
          @disable-action="disableAction"
          @on-change-data="onChangeData"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'
import { boothTemplate } from '~/assets/infoData'

const { get, update } = useApi('BoothTemplate')

const { t } = useI18n()

// get id url
const route = useRoute()
const router = useRouter()
const id = ref()
// form

const disableButton = ref(true)
const ruleForm = reactive({
  descriptions: '',
})

const disableAction = (value: boolean) => {
  disableButton.value = value
}

const onChangeData = (value: any) => {
  ruleForm.descriptions = value.data.descriptions
}

// call api
const fetchData = async () => {
  try {
    const res: any = await get(id.value)
    ruleForm.descriptions = res.descriptions
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// watch state
watch(
  route,
  async () => {
    id.value = route.params?.id
    if (route.params?.id) await fetchData()
  },
  { immediate: true },
)

// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  try {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
      if (valid) {
        await update(id.value, ruleForm)
        ElMessage.success('Successfully')
        router.push('/admin/booth-template')
      }
    })
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
