<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { defineProps } from 'vue'
const { t } = useI18n()
const props = defineProps({
  beforeImageUpload: {
    type: Function,
    default: () => {},
  },
  fileUrl: {
    type: String,
    default: '',
  },
  showImage: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  tips: {
    type: String,
    default: '',
  },
  accept: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <el-upload
    class="avatar-uploader h-[300px] mb-8"
    :class="className"
    drag
    :accept="accept"
    :auto-upload="false"
    :show-file-list="false"
    :on-change="beforeImageUpload"
  >
    <img v-if="showImage" :src="fileUrl" class="avatar" :class="className" />
    <div v-else>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        {{ t('upload.drop') }} <em>{{ t('upload.click_to_upload') }}</em>
      </div>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        {{ tips ? tips : t('upload.upload_image_rule') }}
      </div>
    </template>
  </el-upload>
</template>

<style lang="scss" scoped>
:deep(.el-upload.is-drag) {
  height: 100%;
  .el-upload-dragger {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
