<template>
  <div
    class="max-w-screen-2xl mx-auto py-20 px-10 md:px-20 2xl:px-0 space-y-10"
  >
    <ClientOnly>
      <el-skeleton :loading="loading" animated>
        <template #template>
          <SkeletonBlockGroupSolution />
        </template>
        <template #default>
          <div>
            <h1 class="text-center mx-auto text-[48px] font-bold">
              {{ blockGroupItem?.name || '' }}
            </h1>
            <div
              v-dompurify-html="blockGroupItem?.description || ''"
              class="text-center text-[24px]"
            ></div>

            <div class="grid lg:grid-cols-5 space-x-5 mt-10">
              <!-- left -->
              <!-- laptop, pc -->
              <div class="hidden lg:block lg:col-span-2">
                <!-- item -->
                <div
                  v-for="(item, index) in data"
                  :key="index"
                  class="overflow-hidden bg-white pb-[15px] w-full cursor-pointer text-[15px] rounded-[12px] border border-solid border-[#c2d0dc] mb-[20px]"
                  :class="index === currentActive && 'active'"
                >
                  <section
                    :class="currentActive === index ? 'block' : 'hidden'"
                  >
                    <el-progress
                      :percentage="percentage"
                      status="warning"
                      :duration="20"
                      :stroke-width="4"
                      :show-text="false"
                      :indeterminate="index === currentActive"
                      striped-flow
                    />
                  </section>
                  <!-- title and des -->
                  <div
                    class="px-[15px] mb-[20px]"
                    @click="handleClickActive(index)"
                  >
                    <h2 class="text-[24px] font-bold mb-[8px] pt-[15px]">
                      {{ item.title }}
                    </h2>
                    <div
                      v-dompurify-html="item.description"
                      class="leading-[32px] line-clamp-3"
                    ></div>
                  </div>

                  <!-- link -->
                  <nuxt-link
                    :to="item.link"
                    class="ml-[15px] flex text-primary text-[16px] font-bold hover:text-secondary"
                  >
                    {{ item.text_link }}
                    <MaterialSymbolsNavigateNext
                      class="ml-[10px] text-[24px]"
                    />
                  </nuxt-link>
                </div>
              </div>

              <!-- mobile -->
              <div class="lg:hidden">
                <!-- item -->
                <div
                  v-for="(item, index) in data"
                  :key="index"
                  class="overflow-hidden relative bg-white w-full cursor-pointer text-[15px] rounded-[12px] border border-solid border-[#c2d0dc] mb-[20px] lg:w-[550px]"
                  :class="currentActive === index ? 'block' : 'hidden'"
                >
                  <div
                    :class="index === currentActive && 'active'"
                    class="pb-[20px]"
                  >
                    <section
                      :class="currentActive === index ? 'block' : 'hidden'"
                    >
                      <el-progress
                        :percentage="percentage"
                        status="warning"
                        :duration="20"
                        :stroke-width="4"
                        :show-text="false"
                        :indeterminate="index === currentActive"
                        striped-flow
                      />
                    </section>
                    <!-- title and des -->
                    <div
                      class="px-[15px] mb-[35px]"
                      @click="handleClickActive(index)"
                    >
                      <h2 class="text-[24px] font-bold mb-[8px] pt-[15px]">
                        {{ item.translate.title || '' }}
                      </h2>
                      <div
                        v-dompurify-html="item.translate.description || ''"
                        class="leading-[32px]"
                      ></div>
                    </div>

                    <!-- link -->
                    <nuxt-link
                      :to="item.link"
                      class="ml-[15px] flex text-primary hover:text-secondary text-[18px] font-bold"
                    >
                      {{ item.text_link }}
                      <MaterialSymbolsNavigateNext
                        class="ml-[10px] text-[24px]"
                      />
                    </nuxt-link>
                  </div>
                </div>
              </div>

              <div class="lg:col-span-3 flex items-center">
                <img
                  class="w-full aspect-video object-cover"
                  :src="`${apiBase}${imageUrl}`"
                  alt="image"
                />
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import useApi from '~/composables/request/useApi'
import { type IRes } from '~/interfaces/res_type'
import { type IBlock } from '~/interfaces/block'
import MaterialSymbolsNavigateNext from '~icons/material-symbols/navigate-next'

const { getAll } = useApi('Block')
const { get } = useApi('BlockGroup')
const data = ref<IBlock[]>([])
const activeNames = ref(['1'])
const loading = ref(true)
const { t, locale } = useI18n()
const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}

const props = defineProps({
  blockGroupItem: {
    type: Object,
    default: null,
  },
})

// url image
const config = useRuntimeConfig()
const apiBase = config.public.apiBase
const currentActive = ref<number>(0)
// url image default
const imageUrl = ref('/images/default.webp')
const percentage = ref(100)

const intervalId = ref()

// setInterval auto next slide
const run = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }

  intervalId.value = setInterval(() => {
    nextActive()
  }, 6000)
}

// click slide
const handleClickActive = (id: number) => {
  imageUrl.value = data.value[id].image

  currentActive.value = id
  run()
}

// next active
const nextActive = () => {
  if (currentActive.value === data.value.length - 1) {
    imageUrl.value = data.value[0].image
    currentActive.value = 0
  } else {
    imageUrl.value = data.value[currentActive.value + 1].image
    currentActive.value += 1
  }
}

run()
watch(locale, () => {
  fetchData()
})
// fetch data
const fetchData = async () => {
  try {
    loading.value = true

    const res = (await getAll({
      limit: 3,
      'sort[created_at]': 'desc',
      language: locale.value,
      'filter[blockGroup_id]': props.blockGroupItem._id,
    })) as IRes
    const newArr = res.data.filter(
      (item: any) => item.blockGroup_id === props.blockGroupItem._id,
    )
    data.value = newArr
    imageUrl.value = newArr[0].image
    activeNames.value.push(data.value[0]._id || '1')
  } catch (error) {
  } finally {
    await sleep(100)
    loading.value = false
  }
}

watch(
  () => props.blockGroupItem,
  async () => {
    await fetchData()
  },
  {
    immediate: true,
  },
)
</script>

<style scoped>
.active {
  background: #f2e1e2;
  border-color: #f2e1e2;
}
</style>
