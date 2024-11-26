<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-6">
      {{ t('upload.upload') }}
    </h3>

    <el-upload
      ref="upload"
      class="w-full px-[20px] bg-white rounded-md shadow-md p-4 pb-[60px]"
      action="#"
      drag
      list-type="picture-card"
      :auto-upload="false"
      :limit="1"
      :on-exceed="handleExceed"
      file
    >
      <div class="flex flex-col items-center">
        <IconUpload class="text-[60px] mb-6" />
        <div class="el-upload__text">
          {{ t('upload.drop') }} <em> {{ t('upload.click_to_upload') }}</em>
        </div>
      </div>

      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />

          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>

            <span
              class="el-upload-list__item-delete"
              @click="handleUpToServer(file)"
            >
              <el-icon><Upload /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { genFileId, ElMessage } from 'element-plus'
import { ZoomIn, Upload } from '@element-plus/icons-vue'
import type {
  UploadFile,
  UploadProps,
  UploadInstance,
  UploadRawFile,
} from 'element-plus'
import IconUpload from '~icons/material-symbols/upload'
import useApi from '~/composables/request/useApi'
const { t } = useI18n()
const { uploadFile: uploadFileData } = useApi('File')

const router = useRouter()
const route = useRoute()

const id = computed(() => route.params?.id)

// dialog Image && is show dialog
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const upload = ref<UploadInstance>()

// limit file = 1, up new file -> remove file current
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile

  file.uid = genFileId()
  upload.value!.handleStart(file)
}

// watch file current
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

// up file to server
const handleUpToServer = async (fileUpload: any) => {
  try {
    const formData = new FormData()

    formData.append('file', fileUpload.raw, fileUpload.name)
    ElMessage.success('Upload file thành công!')
    await uploadFileData(formData)
    router.push('/admin/file')
  } catch (error) {
    ElMessage.error('Upload file thất bại!')
  }
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style scoped>
:deep(.el-upload-list) {
  width: 100%;
}

:deep(.el-upload) {
  width: 100%;
}

:deep(.el-upload-list--picture-card) {
  --el-upload-list-picture-card-size: 18%;
}
</style>
