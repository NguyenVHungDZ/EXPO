<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>
    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <div class="pb-10">
        <admin-form
          :items="block"
          :data="{
            ruleForm,
            file,
          }"
          :rules="rules"
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
import type { IBlock } from '~/interfaces/block'
import useApi from '~/composables/request/useApi'
import { block } from '~/assets/infoData'

const { get, update, create } = useApi('Block')
const { uploadFile, getFile } = useApi('File')

// get id url
const route = useRoute()
const router = useRouter()
const id = ref()
const currentImage = ref('')
const file = reactive({
  rawFile: {
    name: '',
    raw: null,
  },
  url: '',
})
// form

const disableButton = ref(true)
const ruleForm = reactive<IBlock>({
  title: '',
  link: '',
  blockGroup_id: '',
  text_link: '',
  image: '',
  description: '',
})

// validate form
const rules = reactive<FormRules<IBlock>>({
  title: [{ required: true, message: 'Please input title', trigger: 'blur' }],
})

const disableAction = (value: boolean) => {
  disableButton.value = value
}

const onChangeData = (value: any) => {
  const data = value.data as IBlock
  Object.assign(ruleForm, data)
  file.rawFile = value.file.rawFile
  file.url = value.file.url
  if (file.rawFile.name) currentImage.value = file.rawFile.name
}

// call api
const fetchData = async () => {
  try {
    const res = (await get(id.value)) as IBlock
    Object.assign(ruleForm, res)
    currentImage.value = res.image
    if (res.image) {
      const imageRes = await getFile(res.image)
      const reader = new FileReader()
      reader.readAsDataURL(imageRes as any)
      reader.onloadend = function () {
        const base64data = reader.result
        file.url = String(base64data) || ''
      }
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// watch state
watch(
  route,
  async () => {
    id.value = route.params?.id
    if (route.params?.id && route.params?.id !== 'new') await fetchData()
  },
  { immediate: true },
)

// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  try {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
      if (valid) {
        if (currentImage.value !== ruleForm.image) {
          const formData: any = new FormData()
          formData.append('file', file.rawFile.raw, file.rawFile.name)
          const res: any = await uploadFile(formData)
          ruleForm.image = res.url
        }
        delete ruleForm._id
        delete ruleForm.created_at
        delete ruleForm.updated_at
        delete ruleForm.deleted_at
        id.value !== 'new'
          ? await update(id.value, ruleForm)
          : await create(ruleForm)
        ElMessage.success('Successfully')
        router.push('/admin/block')
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
