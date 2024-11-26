<script lang="ts" setup>
import IconDone from '~icons/lets-icons/done-ring-round-fill'
import useApi from '~/composables/request/useApi'
import type { ITestimonial } from '~/interfaces/testimonial'
import { dataRequest } from '~/assets/request'

const { t, locale } = useI18n()
const { getAll: getTestimonial } = useApi('Testimonial')

const dataTestimonial = ref<ITestimonial[]>([])

// Fetch testimonial data
const fetchDataTestimonial = async () => {
  try {
    const res: any = await getTestimonial({ language: locale.value })

    dataTestimonial.value = res.data
  } catch (error) {}
}

// Constantly fetch testimonial data
watch(
  locale,
  () => {
    fetchDataTestimonial()
  },
  { immediate: true, deep: true },
)
onMounted(async () => {
  await fetchDataTestimonial()
})

const valueRate = ref(4.5)

definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: 'Contact Us' })
</script>

<template>
  <div class="bg-white p-10">
    <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-5 mb-10">
      <div class="container relative pt-5 mb-5">
        <div class="my-8 font-black text-4xl">
          {{ dataRequest?.title }}
        </div>
        <ul class="list-inside">
          <li
            v-for="item in dataRequest.list"
            :key="item.id"
            class="flex items-center text-lg"
          >
            <IconDone class="mr-2 text-primary" />{{ item.name }}
          </li>
        </ul>
        <div class="mt-4">
          <el-card shadow="hover" class="w-max">
            <el-rate
              v-model="valueRate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
              shadow="hover"
            />
          </el-card>
        </div>
      </div>
      <div class="container lg:w-[80%] lg:mx-auto">
        <PageRequestContactForm />
      </div>
    </div>

    <div class="grid">
      <div class="client-logos my-10">
        <!-- logo -->
        <PagePartner />
      </div>
    </div>
    <div class="grid">
      <div class="client-logos">
        <p class="my-10 font-black text-4xl text-center">
          {{ t('page.index.feedback') }}
        </p>
        <div class="my-20 max-w-screen-2xl m-auto">
          <div class="md:hidden">
            <el-carousel :interval="4000" height="380px">
              <el-carousel-item v-for="item in dataTestimonial" :key="item._id">
                <PageSliderItem :item="item" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="hidden md:block">
            <el-carousel :interval="400000" type="card" height="380px">
              <el-carousel-item v-for="item in dataTestimonial" :key="item._id">
                <PageSliderItem :item="item" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
