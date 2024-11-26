<template>
  <div
    class="max-w-screen-2xl mx-auto py-20 px-10 md:px-20 2xl:px-0 space-y-10"
  >
    <div>
      <el-skeleton-item variant="h1" />
      <el-skeleton-item variant="text" />
    </div>

    <div class="flex-col lg:flex-row items-center flex w-full">
      <!-- left -->
      <!-- laptop, pc -->
      <div class="max-w-screen-2xl hidden lg:flex mr-[60px]">
        <!-- item -->
        <div>
          <div
            v-for="i in 3"
            :key="i"
            class="p-[10px] overflow-hidden bg-white pb-[15px] w-full cursor-pointer text-[15px] rounded-[12px] border border-solid border-[#c2d0dc] mb-[20px] lg:w-[550px]"
          >
            <div class="px-[15px] mb-[20px] pt-5">
              <el-skeleton-item variant="h1" />
              <el-skeleton-item variant="text" />
              <el-skeleton-item variant="text" class="link-width" />
            </div>
          </div>
        </div>
      </div>

      <!-- mobile -->
      <div class="lg:hidden w-full">
        <!-- item -->
        <div
          class="pt-5 overflow-hidden relative bg-white w-full cursor-pointer text-[15px] rounded-[12px] border border-solid border-[#c2d0dc] mb-[20px] lg:w-[550px]"
        >
          <div class="px-[15px] mb-[20px]">
            <el-skeleton-item variant="h1" />
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" class="link-width" />
          </div>

          <!-- link -->
        </div>
      </div>

      <div class="flex-1 w-full">
        <el-skeleton-item variant="image" :style="'height: 20rem;'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background: #f2e1e2;
  border-color: #f2e1e2;
  height: 100%;
}
:deep(.link-width) {
  width: 100px;
}
</style>
s
