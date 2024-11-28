<script lang="ts" setup>
import { defineProps } from 'vue'
import useApi from '~/composables/request/useApi'
import type { IRes } from '@/interfaces/res_type'
import type { IBlock } from '@/interfaces/block'
import AngleRightIcon from '~icons/ep/arrow-right-bold'

const props = defineProps({
  blockGroupItem: {
    type: Object,
    default: null,
  },
})
const { t, locale } = useI18n()
const blockGroupData = computed(() => props.blockGroupItem as IBlock)
const { getAll } = useApi('Block')
const { getFile } = useApi('File')
const data = ref<IBlock[]>([])
const activeNames = ref([])
const imageUrl = ref('')
const loading = ref(true)
// Get image
const getImage = async (url: string) => {
  try {
    const imageRes = await getFile(url)
    const reader = new FileReader()
    reader.readAsDataURL(imageRes as any)
    reader.onloadend = function () {
      const base64data = reader.result
      imageUrl.value = String(base64data) || '/images/default.webp'
    }
  } catch (error) {
    imageUrl.value = '/images/default.webp'
  }
}
const fetchData = async () => {
  try {
    const res = (await getAll({
      limit: 4,
      'sort[created_at]': 'desc',
      language: locale,
      'filter[blockGroup_id]': blockGroupData.value._id,
    })) as IRes
    data.value = res.data

    for (const item of data.value) {
      try {
        const imageRes = await getFile(item.image)
        const reader = new FileReader()
        reader.readAsDataURL(imageRes as any)
        reader.onloadend = function () {
          const base64data = reader.result
          item.imageUrl = String(base64data) || '/images/default.webp'
        }
      } catch (error) {
        item.imageUrl = '/images/default.webp'
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
watch(
  locale,
  () => {
    fetchData()
  },
  { immediate: true, deep: true },
)
watch(
  blockGroupData,
  async (value: IBlock) => {
    if (value && value._id) await fetchData()
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div class="rounded-2xl bg-[#F1F5F8] py-20 px-10 md:px-20">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <SkeletonBlockGroupCard />
      </template>
      <template #default>
        <div class="max-w-screen-2xl mx-auto md:px-0">
          <div class="lg:px-10">
            <h1 class="text-[32px] lg:text-[48px] font-bold text-center">
              {{ blockGroupItem.name || '' }}
            </h1>
            <h1
              v-dompurify-html="blockGroupItem.description || ''"
              class="text-[18px] lg:text-[24px] text-center"
            />
          </div>
          <div
            class="grid md:grid-cols-4 gap-x-4 gap-y-40 md:gap-y-24 xl:gap-y-36 mt-10 xl:px-16"
          >
            <div
              v-for="(item, index) in data"
              :key="index"
              class="group border rounded-2xl transition duration-500 ease-in-out hover:-translate-y-[5px] hover:scale-105 hover:shadow-lg bg-gradient-to-r hover:from-blue-300 hover:to-primary block-item"
            >
              <img
                class="w-[90%] mx-auto aspect-video rounded-2xl"
                :src="item.imageUrl"
              />
              <div
                class="p-5 space-y-5 flex flex-col justify-between h-[240px] group-hover:text-white"
              >
                <h3 class="font-bold text-[24px] truncate">
                  {{ item.translate.title || '' }}
                </h3>
                <p
                  v-dompurify-html="item.translate.description || ''"
                  class="text-[16px] line-clamp-4"
                />
                <div>
                  <a
                    class="text-primary hover:text-secondary font-bold space-x-1 group-hover:text-white flex items-center"
                    :href="item.link"
                    target="_blank"
                    ><span>{{ item.text_link }}</span
                    ><AngleRightIcon class="text-[14px]"
                  /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
