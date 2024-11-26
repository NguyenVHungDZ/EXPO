<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>

    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :label-width="windowWidth > 765 ? '200px' : '100px'"
        class="demo-ruleForm py-10 w-full md:w-[60%] flex-col sm:flex-row"
        :size="formSize"
        status-icon
        :label-position="windowWidth > 550 ? 'right' : 'top'"
      >
        <!--input name -->
        <el-form-item :label="t('name')" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>

        <!-- textarea -->
        <!-- <el-form-item label="Description" prop="description" class="flex-1">
          <el-input
            v-model="ruleForm.description"
            type="textarea"
            class="h-fulls"
            placeholder="Description"
          />
        </el-form-item> -->
        <el-form-item
          :label="t('featured_image')"
          prop="featured_image"
          class="flex-1"
        >
          <CommonUploadImage
            :before-image-upload="beforeImageUpload"
            :file-url="file.url"
            :show-image="ruleForm['featured_image'] || file.url"
          />
        </el-form-item>
        <el-form-item
          :label="t('title-admin-page.detail')"
          prop="description"
          class="flex-1"
        >
          <div>
            <TiptapEditor v-model="ruleForm['description']" />
          </div>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <div class="space-x-2">
            <button
              class="rounded px-2 bg-white border text-black hover:bg-gray-100"
              @click.prevent="resetForm(ruleFormRef)"
            >
              {{ t('button.reset') }}
            </button>
            <button
              class="px-2 bg-primary hover:bg-secondary rounded text-white"
              @click.prevent="submitForm(ruleFormRef)"
            >
              {{
                $route.params.id === 'new'
                  ? t('button.create')
                  : t('button.edit')
              }}
            </button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IEventType } from '~/interfaces/event_type'
import useApi from '~/composables/request/useApi'
import { validateEmail } from '~/composables/validator'

const { get, update, create } = useApi('EventType')
const { getAll } = useApi('ExpoType')
const { uploadFile, getFile } = useApi('File')
// get id url
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const id = computed(() => route.params?.id)
const windowWidth = ref(0)
const currentImage = ref('')
// form
const formSize: any = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IEventType>({
  name: '',
  description: '',
  featured_image: '',
})
const file = reactive({
  rawFile: {} as any,
  url: '',
})
const emit = defineEmits(['disableAction', 'onChangeData'])

// before upload image check type and size
const beforeImageUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (!rawFile.raw.type.includes('image')) {
    ElMessage.error('File must be image format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Image size can not exceed 2MB!')
    return false
  }
  file.rawFile = rawFile
  file.url = URL.createObjectURL(rawFile.raw)
}

const options = ref([])

// validate form
const rules = reactive<FormRules<IEventType>>({
  name: [
    {
      required: true,
      message: t('input_rule.input_event_type_name'),
      trigger: 'blur',
    },
  ],
})

// call api
const fetchDataItem = async () => {
  try {
    const res = (await get(id.value)) as IEventType
    Object.assign(ruleForm, res)
    currentImage.value = ruleForm.featured_image
    if (ruleForm.featured_image) {
      const imageRes = await getFile(ruleForm.featured_image)
      const reader = new FileReader()
      reader.readAsDataURL(imageRes as any)
      reader.onloadend = function () {
        const base64data = reader.result
        file.url = String(base64data)
      }
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// watch state
watch(
  id,
  async (value: any) => {
    if (value && value !== 'new') await fetchDataItem()
  },
  { immediate: true },
)

// handle rest form
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  file.url = ''
}

// handle update item
const updateItem = async () => {
  try {
    await update(id.value, ruleForm)
    router.push('/admin/event-type')
    ElMessage.success('Cập nhật thành công!')
  } catch (error) {
    ElMessage.error('Cập nhật thất bại')
  }
}

// handle create item
const createItem = async () => {
  try {
    await create(ruleForm)
    router.push('/admin/event-type')
    ElMessage.success('Thêm thành công!')
  } catch (error) {
    ElMessage.error('Thêm thất bại')
  }
}

// handle submit
// validate form -> upload file -> update or create item -> reset form
// push to list page
// emit to parent
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      if (file.rawFile.raw) {
        const formData = new FormData()
        formData.append('file', file.rawFile.raw, file.rawFile.name)
        const res = (await uploadFile(formData)) as any
        ruleForm.featured_image = res.url
      }
      id.value !== 'new' ? updateItem() : createItem()
    }
  })
}

// handle change width window
const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  // fetchDataExpo()
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})

// remove event listener
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style scoped>
:deep(.el-input) {
  width: 100% !important;
}
:deep(.el-select) {
  width: 100% !important;
}
:deep(.el-input-number) {
  width: 100% !important;
}
</style>
