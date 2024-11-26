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
const blockGroupData = computed(() => props.blockGroupItem as IBlock)
const { getAll } = useApi('Block')
const { getFile } = useApi('File')
const { t, locale } = useI18n()
const i18n = computed(() => {
  return {
    iconArrowRight: t('slider.arrow_right'),
    iconArrowLeft: t('slider.arrow_left'),
  }
})
const data = ref<IBlock[]>([])
const currentSlide = ref(0)
const windowWidth = ref(0)
const loading = ref(true)
const breakpoints = ref({
  // 700px and up
  700: {
    itemsToShow: 3.5,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
})

const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}

const fetchData = async () => {
  try {
    loading.value = true
    const res = (await getAll({
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
const centerIndex = ref(0)

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

const chooseItem = (index: number) => {
  // currentSlide.value = index
  if (windowWidth.value >= 1024) {
    const indexNumber = index + 4
    if (indexNumber === data.value.length) currentSlide.value = 0
    else if (indexNumber === data.value.length + 1) currentSlide.value = 1
    else if (indexNumber === data.value.length + 2) currentSlide.value = 2
    else if (indexNumber === data.value.length + 3) currentSlide.value = 3
    else currentSlide.value = indexNumber
  } else {
    currentSlide.value = index
  }
  centerIndex.value = index
}

watch(
  currentSlide,
  (value) => {
    if (windowWidth.value >= 1024) {
      if (value + 2 === data.value.length) centerIndex.value = 0
      else if (value + 2 === data.value.length + 1) centerIndex.value = 1
      else centerIndex.value = value + 2
    } else {
      centerIndex.value = currentSlide.value
    }
  },
  { immediate: true },
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
  <div class="rounded-2xl bg-[#F1F5F8] py-20 px-5 md:px-20">
    <ClientOnly>
      <el-skeleton :loading="loading" animated>
        <template #template>
          <SkeletonBlockGroupSlider />
        </template>
        <template #default>
          <div class="max-w-screen-2xl mx-auto md:px-0 space-y-5 2xl:px-10">
            <div class="lg:px-10">
              <h1 class="text-[32px] lg:text-[48px] font-bold text-center">
                {{ blockGroupItem.name || '' }}
              </h1>
              <h1
                v-dompurify-html="blockGroupItem.description || ''"
                class="text-[18px] lg:text-[24px] text-center"
              />
            </div>
            <div class="bg-white p-4 rounded-3xl shadow-lg">
              <Carousel
                v-model="currentSlide"
                :i18n="i18n"
                :autoplay="3500"
                :breakpoints="breakpoints"
                :wrap-around="true"
              >
                <Slide
                  v-for="(item, index) in data"
                  :key="item._id"
                  class="px-3"
                >
                  <button
                    :class="
                      centerIndex === index
                        ? 'border border-primary p-3 rounded-full text-primary'
                        : ''
                    "
                    @click="chooseItem(index)"
                  >
                    {{
                      data[centerIndex].translate.title ||
                      data[centerIndex].title
                    }}
                  </button>
                </Slide>

                <template #addons>
                  <Navigation />
                </template>
              </Carousel>
            </div>
            <div v-if="data.length" class="relative">
              <el-image
                class="w-full aspect-video rounded-3xl"
                :src="data[centerIndex].imageUrl || '/images/default.webp'"
                lazy
              />
              <div class="md:absolute bottom-0 z-[49] w-full p-5">
                <div
                  class="bg-[rgba(0,0,0,.5)] backdrop-blur-[10px] w-full rounded-3xl p-4 text-white flex items-center justify-between"
                >
                  <div class="w-full">
                    <h4 class="text-[24px] font-bold">
                      {{ data[centerIndex].translate.title || '' }}
                    </h4>
                    <p
                      v-dompurify-html="
                        data[centerIndex].translate.description || ''
                      "
                      class="text-[16px] line-clamp-2"
                    />
                  </div>
                  <a
                    class="min-w-40 bg-white text-primary rounded-3xl p-2 text-center hover:text-secondary"
                    :href="data[centerIndex].link || ''"
                    target="_blank"
                    >{{
                      data[centerIndex].text_link || t('action.learn_more')
                    }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped></style>
