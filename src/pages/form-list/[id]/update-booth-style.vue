<template>
  <div class="max-w-screen-2xl mx-auto px-10 py-10 lg:px-20 space-y-5">
    <h2 class="text-[36px] font-bold">{{ t('events.template_title') }}</h2>
    <div class="grid grid-cols-5 space-x-4 px-5">
      <div class="col-span-3 space-y-5">
        <div
          v-for="(item, index) in data.fields"
          :key="index"
          class="space-y-4"
        >
          <label class="font-semibold">{{ item.field }}</label>
          <CommonUploadImage
            :class-name="
              item.field === 'logo' ? 'aspect-square w-[200px]' : 'aspect-video'
            "
            :accept="item.extention"
            :before-image-upload="
              (val: any) => {
                beforeImageUpload(val, item.field, item.extention)
              }
            "
            :file-url="ruleForm[`${item.field}_url`]"
            :show-image="ruleForm[`${item.field}_url`]"
            :tips="`${item.extention} files with a size less than 2MB`"
          />
        </div>
      </div>
      <div class="col-span-2">
        <div class="w-full h-[500px] border-2 border-dashed rounded-lg"></div>
      </div>
    </div>
    <div class="px-5">
      <button
        class="bg-primary p-2 rounded-lg text-white"
        :class="
          isDisabledButton
            ? 'opacity-65 cursor-not-allowed'
            : 'hover:bg-secondary'
        "
        :disabled="isDisabledButton"
        @click="onSubmit"
      >
        {{ t('action.submit') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'

definePageMeta({ layout: 'page' })

const { getAll } = useApi('BoothStyle')
const { putFile, getFile } = useApi('BoothStyleField')

const { t } = useI18n()
const route = useRoute()
// Hold fetched fields and their data
const data = ref({
  fields: [{ _id: '', field: '', file: null, extention: '' }],
})
// Extract 'id' from route parameter
const formId = computed(() => route.params?.id)
const ruleForm = ref<any>({})

// Fetching data
const fetchData = async () => {
  try {
    const res = (await getAll({
      'filter[form_id]': formId.value,
      'populate[fields]': true,
    })) as any
    data.value = res.data[0]
    // Sort fields alphabetically by their `field` name (case-insensitive)
    data.value.fields.sort((a, b) => {
      const fa = a.field.toLowerCase()
      const fb = b.field.toLowerCase()
      if (fa < fb) {
        return -1
      }
      if (fa > fb) {
        return 1
      }
      return 0
    })
    // Store data in the 'ruleForm' object
    for (const item of data.value.fields) {
      // Store fetched file's URL
      ruleForm.value[`${item.field}_baseUrl`] = item.file
      const imageRes = await getFile(item.file || '')
      const reader = new FileReader() // Convert Blob to Base64
      reader.readAsDataURL(imageRes as any) // Convert the blob into a Base64 URL
      reader.onloadend = function () {
        const base64data: any = reader.result
        ruleForm.value[`${item.field}_url`] = base64data
      }
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// Control availability of 'Submit' button
const isDisabledButton = computed(() => {
  for (const item of data.value.fields) {
    if (item.file !== ruleForm.value[`${item.field}_baseUrl`]) {
      return true
    }
  }
  return false
})

// Validate file before upload, check file size and ensure file has the correct extension
const beforeImageUpload = (rawFile: any, field: string, extention: string) => {
  // Check file extension
  if (!rawFile.raw.name.includes(extention)) { 
    ElMessage.error('File must be image format!')
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Image size can not exceed 2MB!')
  } else {
    ruleForm.value[`${field}_baseUrl`] = ruleForm.value[`${field}_url`] =
      URL.createObjectURL(rawFile.raw)
    ruleForm.value[`${field}_file`] = rawFile.raw
  }
}

// Handle uploading file
const onSubmit = async () => {
  try {
    for (const item of data.value.fields) {
      if (item.file !== ruleForm.value[`${item.field}_baseUrl`]) {
        const formData = new FormData()
        formData.append(
          'file',
          ruleForm.value[`${item.field}_file`],
          ruleForm.value[`${item.field}_file`].name,
        )
        await putFile(item._id, formData)
      }
    }
    ElMessage.success(t('message.upload_success'))
    ruleForm.value = {}
    await fetchData()
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// Fetch data before mounting component
onBeforeMount(async () => {
  await fetchData()
})
</script>
