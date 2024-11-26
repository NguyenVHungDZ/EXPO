<template>
  <el-card class="box-card w-[90%] md:w-4/6 grid">
    <template #header>
      <div class="p-0 font-bold text-[24px] text-primary">
        {{ item.company }}
      </div>
    </template>
    <!-- html -->
    <div
      v-dompurify-html="item.translate.quote || item.quote || ''"
      class="text-[18px] line-clamp-6"
    ></div>
    <div class="mt-[20px]">
      <el-rate v-model="rate" disabled class="flex" />
    </div>
    <!--eslint-enable-->
    <template #footer>
      <div class="flex flex-col">
        <p class="font-bold text-[18px]">{{ item.translate.name || '' }}</p>

        <span class="text-sm">{{ item.position }}</span>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import type { ITestimonial } from '~/interfaces/testimonial'

const props = defineProps({
  item: {
    type: Object,
    default: {} as ITestimonial,
  },
})
const rate: number = props.item.rate
</script>

<style scoped>
:deep(.el-icon svg) {
  font-size: 28px;
}
</style>
