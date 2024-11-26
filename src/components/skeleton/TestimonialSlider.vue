<template>
  <div class="border shadow">
    <div class="w-full p-5 border-b">
      <el-skeleton-item variant="h1" />
    </div>
    <div class="p-5 border-b">
      <el-skeleton-item v-for="item in 6" :key="item" variant="p" />
      <div class="flex justify-center">
        <el-rate v-model="rateValue" />
      </div>
    </div>
    <div class="p-5">
      <el-skeleton-item variant="h1" />
      <el-skeleton-item variant="p" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const rateValue = ref(5)
</script>

<style></style>
