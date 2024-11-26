<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>
    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <div class="pb-10">
        <div v-if="!active">
          <admin-form
            :items="partner"
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
  </div>
</template>

<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IPartner } from '~/interfaces/partner'
import useApi from '~/composables/request/useApi'
import { partner } from '~/assets/infoData'
const { get, update, create } = useApi('Partner')
const { uploadFile, getFile } = useApi('File')
const { t } = useI18n()
// get id url
const route = useRoute()
const router = useRouter()
const id = ref()
const windowWidth = ref(0)
const currentImage = ref('')
const file = reactive({
  rawFile: {
    name: '',
    raw: {} as Blob,
  },
  url: '',
})
const isFail = ref(false)

const active = ref(0)

// form

const disableButton = ref(true)
const ruleForm = reactive<IPartner>({
  name: '',
  image: '',
  link: '',
})

// validate form
const rules = reactive<FormRules<IPartner>>({
  name: [{ required: true, message: t('input_rule.name'), trigger: 'blur' }],
})

const disableAction = (value: boolean) => {
  disableButton.value = value
}

const onChangeData = (value: any) => {
  Object.assign(ruleForm, value.data)
  file.rawFile = value.file.rawFile
  file.url = value.file.url
  if (file.rawFile.name) currentImage.value = file.rawFile.name
}

// call api
const fetchData = async () => {
  try {
    const res: IPartner | any = await get(id.value)
    Object.assign(ruleForm, res)
    currentImage.value = ruleForm.image
    if (res.image) {
      const imageRes = await getFile(res.image)
      const reader = new FileReader()
      reader.readAsDataURL(imageRes as any)
      reader.onloadend = function () {
        const base64data: any = reader.result
        file.url = base64data
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
const submitForm = async () => {
  try {
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

    router.push('/admin/partner')
  } catch (error) {
    isFail.value = true
  }
}

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

// layout
definePageMeta({
  layout: 'admin',
})
</script>
