<template>
  <div
    class="border rounded-lg shadow hover:shadow-lg cursor-pointer 2xl:max-h-[425px]"
    :class="!sort ? '' : 'lg:flex'"
  >
    <div
      class="object-cover aspect-video"
      :class="
        !sort
          ? ' w-full h-[40%]'
          : 'w-full lg:w-[15rem] lg:h-full 2xl:w-[25rem]'
      "
    >
      <el-skeleton-item variant="image" style="height: 100%; width: 100%" />
    </div>

    <div
      class="2xl:p-8 p-4 space-y-3 2xl:space-y-2 w-full"
      :class="!sort ? 'lg:h-[300px] xl:h-[250px] pt-0 ' : ''"
    >
      <div class="flex items-center gap-2">
        <h4 class="text-2xl font-bold text-primary">2024</h4>
        <p class="h-4 border-l mx-2 border-gray-300" />
        <el-skeleton-item variant="h1" class="font-semibold text-gray-500" />
      </div>
      <el-skeleton-item variant="h1" />
      <h4 class="text-sm items-center flex">
        <TimeLineIcon class="text-primary mr-[5px] inline-block w-[2rem]" />
        <el-skeleton-item variant="text" /> -
        <el-skeleton-item variant="text" />
      </h4>
      <h4 class="text-xs flex items-center">
        <PositionIcon class="text-primary mr-[5px]" />
        <el-skeleton-item variant="text" />
      </h4>
      <!-- form count -->
      <div class="flex gap-3">
        <h5 class="text-[12px] flex mb-[3px]">
          <FormCountIcon class="text-blue-600 mr-[5px]" />
          <span> 0 </span>
        </h5>
        <h5 class="text-[12px] flex mb-[3px]">
          <ElCheckIcon class="text-green-600 mr-[5px]" />
          <span>0 </span>
        </h5>
        <h5 class="text-[12px] flex mb-[3px]">
          <PendingFormIcon class="text-yellow-600 mr-[5px]" />
          <span>0 </span>
        </h5>
        <h5 class="text-[12px] flex mb-[3px]">
          <RejectFormIcon class="text-red-600 mr-[5px]" />
          <span>0 </span>
        </h5>
      </div>
      <el-skeleton-item variant="text" />
      <el-skeleton-item variant="text" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimeLineIcon from '~icons/mingcute/time-line'
import PositionIcon from '~icons/gis/position-o'
import FormCountIcon from '~icons/clarity/form-line'
import RejectFormIcon from '~icons/fluent/text-change-reject-20-filled'
import ElCheckIcon from '~icons/icon-park-outline/doc-success'
import PendingFormIcon from '~icons/ic/baseline-pending-actions'
defineProps({
  sort: {
    type: Number,
    default: 0,
  },
})
</script>

<style></style>
