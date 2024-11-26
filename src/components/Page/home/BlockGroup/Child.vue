<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 md:p-4 mb-10">
      <div class="container relative pt-5 mb-5 col-span-2">
        <div class="my-8 font-bold text-[26px]">
          {{ dataItem.translate.title || '' }}
        </div>
        <ul class="list-inside">
          <li class="flex text-lg">
            <p
              v-dompurify-html="dataItem.translate.description || ''"
              class="w-full text-[18px] mb-5 tiptap-content"
            ></p>
          </li>
        </ul>
      </div>
      <div v-if="fileData" class="container lg:mx-auto col-span-3">
        <el-image :src="fileData" fit="contain" lazy />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import IconDone from '~icons/material-symbols/done'
import useApi from '~/composables/request/useApi'
import '~/assets/tiptap.scss'
const { t } = useI18n()
const props = defineProps({
  dataItem: {
    type: Object,
    default: () => {},
  },
})
const fileData = ref('')
const { getFile } = useApi('File')
const getImage = async () => {
  try {
    const res = await getFile(props.dataItem.image)
    const reader = new FileReader()
    reader.readAsDataURL(res as any)
    reader.onloadend = function () {
      const base64data: any = reader.result
      fileData.value = String(base64data) || '/images/default.webp'
    }
  } catch (error) {
    fileData.value = '/images/default.webp'
  }
}
onMounted(() => {
  getImage()
})
</script>
<style scoped>
.w-full.text-lg {
  line-height: 1.737;
}
@keyframes fadeIn {
  0% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}
:deep(img.el-image__inner) {
  animation: fadeIn 3s;
}
</style>
