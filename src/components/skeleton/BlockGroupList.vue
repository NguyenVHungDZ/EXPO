<template>
  <div class="space-y-10 py-20 px-10">
    <div class="lg:px-20">
      <div>
        <el-skeleton-item variant="h1" />
      </div>
      <div>
        <el-skeleton-item variant="text" />
      </div>
    </div>
    <div class="border-item lg:border-none">
      <div
        class="max-w-screen-2xl m-auto grid md:grid-cols-2 py-3 gap-10 items-center"
      >
        <el-skeleton-item variant="image" :style="'height: 18rem;'" />

        <div class="flex flex-col">
          <el-skeleton-item variant="h1" class="mb-[40px]" />
          <el-skeleton-item variant="text" />
          <el-skeleton-item variant="text" class="mt-[80px]" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.border-item {
  border-bottom: 1px solid rgb(199, 199, 199);
  @media (min-width: 768px) {
    border: unset;
  }
}
.border-item:last-child {
  border: unset;
}
</style>
