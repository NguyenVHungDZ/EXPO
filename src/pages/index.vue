<script lang="ts" setup>
// done
import IconDone from '~icons/lets-icons/done-ring-round-fill'

const { t } = useI18n() // Multiple language

// do not use same name with ref
const valueRate = ref(4.5)

definePageMeta({ layout: 'page' })
useHead({
  title: 'VEXPO',
  titleTemplate: `%s - Nền tảng triển lãm ảo`,
})
</script>

<template>
  <div class="bg-white">
    <div
      class="container grid sm:grid-cols-1 md:grid md:grid-cols-2 py-10 px-5 xl:px-10 md:p-0 gap-5 mx-auto my-10"
    >
      <div class="container relative pt-5 mb-5">
        <div class="my-8 font-black text-4xl">
          {{ t('index.title_info') }}
        </div>
        <ul class="list-inside">
          <li class="flex text-lg">
            <IconDone class="mr-2 text-primary" />
            <span class="w-full mb-5">{{ t('index.customized_quote') }}</span>
          </li>
          <li class="flex text-lg">
            <IconDone class="mr-2 text-primary" />
            <span class="w-full mb-5">{{ t('index.persionalized_demo') }}</span>
          </li>
          <li class="flex text-lg">
            <IconDone class="mr-2 text-primary" />
            <span class="w-full mb-5">{{ t('index.gain_access') }} </span>
          </li>
          <li class="flex text-lg">
            <IconDone class="mr-2 text-primary" />
            <span class="w-full mb-5">{{ t('index.receive_industry') }}</span>
          </li>
        </ul>
        <!-- <div class="absolute bottom-0 mt-4"> -->
        <div class="mt-4">
          <el-card shadow="hover" class="w-max">
            <el-rate
              v-model="valueRate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
              shadow="hover"
            />
          </el-card>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <PageRequestContactForm />
      </div>
    </div>
    <div class="py-14">
      <PageHomeRenderBlock />
    </div>
    <!-- partner -->
    <PagePartner />

    <!-- slider -->
    <PageSlider />
    <div class="flex mt-10 md:px-20">
      <Faq />
    </div>
  </div>
</template>

<style scoped>
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
