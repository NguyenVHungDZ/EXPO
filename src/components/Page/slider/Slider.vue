<template>
  <div class="grid">
    <div class="client-logos">
      <ClientOnly>
        <p class="my-10 font-bold text-[48px] text-center">
          {{ t('page.index.feedback') }}
        </p>
      </ClientOnly>
      <div class="my-20 max-w-screen-2xl m-auto">
        <el-skeleton :loading="loading" animated>
          <template #template>
            <div class="hidden lg:grid grid-cols-3 px-10">
              <SkeletonTestimonialSlider />
              <div class="scale-y-125">
                <SkeletonTestimonialSlider />
              </div>
              <SkeletonTestimonialSlider />
            </div>
            <div class="p-5 lg:hidden">
              <SkeletonTestimonialSlider />
            </div>
          </template>
          <template #default>
            <div class="md:hidden">
              <el-carousel :interval="4000" height="420px">
                <el-carousel-item v-for="item in data" :key="item._id">
                  <PageSliderItem :item="item" />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="hidden md:block">
              <el-carousel :interval="400000" type="card" height="420px">
                <el-carousel-item v-for="item in data" :key="item._id">
                  <PageSliderItem :item="item" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useApi from '~/composables/request/useApi'
import type { ITestimonial } from '~/interfaces/testimonial'

const { getAll } = useApi('Testimonial')

const data = ref<ITestimonial[]>([])
const { t, locale } = useI18n()
const loading = ref(true)
const fetchDataItem = async () => {
  try {
    loading.value = true
    const res: any = await getAll({ language: locale.value })

    data.value = res.data
  } catch (error) {
  } finally {
    loading.value = false
  }
}

// Watch locale to fetch data when locale changes
watch(
  locale,
  () => {
    fetchDataItem()
  },
  { immediate: true, deep: true },
)
onMounted(async () => {
  await fetchDataItem()
})
</script>

<style scope>
:deep(.el-card__header) {
  padding: 0;
  display: grid;
  align-items: center;
}
:deep(.el-card__footer) {
  padding: 5px;
}
:deep(.el-form-item__content) {
  flex-wrap: nowrap !important;
}
:deep(.el-select.el-select--large.m-2) {
  width: 60%;
}
:deep(.el-form-item.asterisk-left) {
  display: grid !important;
}
:deep(.el-form-item__label) {
  display: block !important;
}
.el-carousel__item {
  height: 100%;
  opacity: 0.95;
  margin: 0;
  /* width: 200px; */
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  display: grid;
  justify-items: center;
}

.el-carousel__item:nth-child(2n + 1) {
  display: grid;
  justify-items: center;
}

.el-carousel__arrow--right,
.el-carousel__arrow--left {
  background-color: rgb(88, 84, 84);
}
</style>
