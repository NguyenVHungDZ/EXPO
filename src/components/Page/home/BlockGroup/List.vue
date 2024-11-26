<script lang="ts" setup>
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
const loading = ref<boolean>(true)

const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}
const fetchData = async () => {
  try {
    loading.value = true

    const res = (await getAll({
      limit: 5,
      'sort[created_at]': 'desc',
      language: locale.value,
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
  } finally {
    await sleep(100)
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
  <div class="space-y-10 py-20 px-10">
    <ClientOnly>
      <el-skeleton :loading="loading" animated>
        <template #template>
          <SkeletonBlockGroupList />
        </template>
        <template #default>
          <div>
            <div class="lg:px-20">
              <h2 class="text-center text-[32px] lg:text-[48px] font-bold">
                {{ blockGroupItem.name }}
              </h2>
              <div
                class="text-center text-[18px] lg:text-[24px]"
                :innerHTML="blockGroupItem.description"
              />
            </div>
            <div
              v-for="(item, index) in data"
              :key="index"
              class="border-item lg:border-none"
            >
              <div
                v-if="index % 2 === 0"
                class="max-w-screen-2xl m-auto grid md:grid-cols-2 py-10 gap-10 items-center"
              >
                <img
                  class="w-full xl:w-[90%] rounded-lg"
                  :src="item.imageUrl"
                />
                <div class="flex flex-col justify-center">
                  <h1 class="text-[24px] lg:text-[32px] font-bold">
                    {{ item.translate.title || '' }}
                  </h1>
                  <p
                    class="text-lg py-5 leading-normal tiptap-content"
                    :innerHTML="item.translate.description || ''"
                  />
                  <a
                    class="text-primary hover:text-secondary font-bold space-x-2"
                    :href="item.link"
                    target="_blank"
                    ><span>{{ item.text_link }}</span
                    ><span>></span></a
                  >
                </div>
              </div>
              <!-- <hr class="mx-10 md:hidden" /> -->
              <div
                v-else
                class="max-w-screen-2xl m-auto grid md:grid-cols-2 py-10 lg:px-10 gap-10 items-center"
              >
                <div class="flex flex-col justify-center">
                  <h1 class="text-[24px] lg:text-[32px] font-bold">
                    {{ item.title }}
                  </h1>
                  <p
                    class="text-lg py-5 leading-normal tiptap-content"
                    :innerHTML="item.description"
                  />
                  <a
                    class="text-primary hover:text-secondary font-bold space-x-2 flex items-center"
                    :href="item.link"
                    target="_blank"
                    ><span>{{ item.text_link }}</span
                    ><AngleRightIcon class="text-[14px]"
                  /></a>
                </div>
                <img
                  class="w-full xl:w-[90%] rounded-lg"
                  :src="item.imageUrl"
                />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.border-item {
  border-bottom: 1px solid rgb(199, 199, 199);
  @media (min-width: 768px) {
    border: unset;
  }
}
.border-item:last-child {
  border: unset;
}
</style>
