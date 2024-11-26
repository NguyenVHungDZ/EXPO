<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const emit = defineEmits(['fileUpload', 'onRemove'])
const { t } = useI18n()

const props = defineProps({
  files: {
    type: Array as any,
    default: () => [],
  },
})
const fileList = ref([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// Remove file
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  if (String(uploadFile.uid).includes('-')) emit('onRemove', uploadFile.uid)
}

// Preview a file (picture)
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

watch(
  props,
  () => {
    fileList.value = props.files
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo w-full"
      :auto-upload="false"
      drag
      multiple
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      @change="
        (file, fileList) => {
          emit('fileUpload', fileList)
        }
      "
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        {{ t('upload.drop') }} <em> {{ t('upload.click_to_upload') }}</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">{{ t('upload.upload_image_rule') }}</div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-upload-list--picture-card) {
  display: block !important;
  .el-upload {
    width: 100%;
    height: auto !important;
  }
}
:deep(.el-overlay) {
  z-index: 10000 !important;
}
</style>
