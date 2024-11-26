<template>
  <!-- popup rename, remove -->
  <el-dialog v-model="isShow" @close="onClose">
    <div class="flex justify-center">
      <img :src="fileUrl" alt="preview" class="l object-cover" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'

const fileUrl = ref()

const { getFile } = useApi('File')
const emit = defineEmits(['closeDialog'])
// props
const props = defineProps({
  url: {
    type: String,
    default: '',
  },
  isShowPreviewFile: {
    type: Boolean,
    default: false,
  },
})

// handle get File
const handleGetFile = async () => {
  try {
    const res: any = await getFile(props.url)
    const reader = new FileReader()
    reader.readAsDataURL(res as any)
    reader.onloadend = () => {
      fileUrl.value = reader.result
    }
  } catch (error) {}
}
const isShow = computed({
  get: () => {
    handleGetFile()
    return props.isShowPreviewFile
  },
  set: (value: any) => {},
})

const onClose = () => {
  emit('closeDialog', 'false')
}
</script>
