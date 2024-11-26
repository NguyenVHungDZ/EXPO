<script setup lang="ts">
import useApi from '~/composables/request/useApi'
import { blobToBase64 } from '~/utils/image'
import IconImage from '~icons/ic/outline-image'

// Image's properties
const props = defineProps({
  url: { type: String, default: '' },
  link: { type: String, default: '' },
  height: { type: String, default: 'auto' },
  width: { type: String, default: 'auto' },
})

const { getFile } = useApi('')

const fileData = ref('')

// Fetch image
const getImage = async () => {
  try {
    if (props.url) {
      const res = (await getFile(props.url)) as Blob
      blobToBase64(res).then((res) => {
        fileData.value = String(res)
      })
    }
  } catch (error) {}
}

// When props change, trigger callback function below
watch(
  props, 
  () => {
    getImage()
  },
  { immediate: true },
)
</script>

<template>
  <div
    v-if="!fileData.length"
    :style="`height: ${height} !important; width: ${width} !important`"
  >
    <img
      src="/images/default.webp"
      :style="`height: ${height} !important; width: ${width} !important`"
    />
  </div>

  <img
    v-else
    :src="fileData"
    class="object-contain"
    :style="`height: ${height} !important; width: ${width} !important`"
  />
</template>

<style>
:deep(.el-image-viewer__wrapper) {
  z-index: 1000000000 !important;
}
</style>
