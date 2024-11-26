<template>
  <div>
    <div class="object-cover aspect-video w-full md:hidden">
      <el-skeleton-item variant="image" style="height: 100%; width: 100%" />
    </div>
    <div class="grid grid-cols-5 pb-5 md:pt-5">
      <div class="col-span-2 md:col-span-1 border-r">
        <div class="flex flex-col items-center justify-center h-full">
          <p
            class="border-b font-bold text-[40px] text-primary"
            style="font-variant: small-caps"
          >
            2024
          </p>
          <div class="flex w-full justify-center pt-4">
            <el-skeleton-item variant="text" style="width: 5rem" />
          </div>
        </div>
      </div>
      <div class="col-span-3 px-10 space-y-3 pt-3">
        <el-skeleton-item variant="h1" />
        <div class="space-y-2">
          <p
            class="text-[12px] text-gray flex gap-2 items-center text-gray-500 w-60"
          >
            <ClockIcon class="w-[2rem]" />
            <el-skeleton-item variant="text" /> -
            <el-skeleton-item variant="text" />
          </p>
          <p
            class="text-[12px] text-gray flex gap-2 items-center text-gray-500"
          >
            <PositionIcon /> <el-skeleton-item variant="text" />
          </p>
        </div>
        <div>
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" />
        </div>
      </div>
      <div class="w-full aspect-video hidden md:block">
        <el-skeleton-item variant="image" style="height: 100%; width: 100%" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ClockIcon from '~icons/ph/clock-bold'
import PositionIcon from '~icons/gis/position-o'
</script>

<style></style>
