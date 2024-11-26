<script setup lang="ts">
import useApi from '~/composables/request/useApi'
import type { IPartner } from '~/interfaces/partner'

type settingType = {
  itemsToShow: number
  snapAlign: string
}

const { getAll } = useApi('Partner')

const { t, locale } = useI18n()

const i18n = computed(() => {
  return {
    iconArrowRight: t('slider.arrow_right'),
    iconArrowLeft: t('slider.arrow_left'),
  }
})

// any settings not specified will fallback to the carousel settings
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
const data = ref<IPartner[]>([])

const fetchDataItem = async () => {
  try {
    const res: any = await getAll()
    data.value = res.data
  } catch (error) {}
}

onBeforeMount(async () => {
  await fetchDataItem()
})
</script>

<template>
  <div class="container mx-auto">
    <div class="flex flex-col client-logos my-10 lg:w-[94%] mx-auto">
      <!-- <p class="my-10 font-black text-lg text-center">
        Fairs.vn Has Connected Over 58,000 Exhibitors With 48 Million+ Visitors.
      </p> -->
      <Carousel
        :i18n="i18n"
        :autoplay="2000"
        :breakpoints="breakpoints"
        :wrap-around="true"
      >
        <Slide v-for="item in data" :key="item._id" class="px-3">
          <a :href="item.link" target="_blank">
            <CommonTableTemplateImage height="100px" :url="item.image" />
          </a>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
</template>
