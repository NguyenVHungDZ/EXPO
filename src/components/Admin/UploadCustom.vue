<script lang="ts" setup>
import type { UploadProps, UploadInstance, UploadRawFile } from 'element-plus'
import { genFileId } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
const { t } = useI18n()
const props = defineProps({
  onChange: {
    type: Function,
    default: () => {},
  },
  onRemove: {
    type: Function,
    default: () => {},
  },
  accept: {
    type: String,
    default: '',
  },
  tips: {
    type: String,
    default: '',
  },
  limit: {
    type: Number,
    default: 1,
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
})

const upload = ref<UploadInstance>()
// If file is not compressed before upload, show message
const onBeforeChange: UploadProps['onChange'] = (rawFile: any) => {
  if (!rawFile.raw.type.includes('compressed')) {
    ElMessage.error('The file must be in compressed format!')
    // fileList.value.pop()
  } else {
    props.onChange(rawFile)
  }
}

// When file size exceeds limit, clear the file list and start uploading the new file
const handleExceed: UploadProps['onExceed'] = (files) => {
  if (props.limit === 1) {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
  }
}

// Remove file
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  props.onRemove(uploadFile)
}
</script>

<template>
  <el-upload
    ref="upload"
    class="avatar-uploader w-full"
    drag
    :auto-upload="false"
    :show-file-list="showFileList"
    :accept="accept"
    :limit="limit"
    :on-change="onBeforeChange"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
  >
    <div>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        {{ t('upload.drop') }} <em>{{ t('upload.click_to_upload') }}</em>
      </div>
    </div>
    <template #tip>
      <div class="el-upload__tip">{{ tips }}</div>
    </template>
  </el-upload>
</template>
