<template>
  <el-skeleton style="width: 100%">
    <template #template>
      <div class="container lg:px-10 mx-auto px-5 md:px-0">
        <div class="pb-10">
          <el-skeleton-item
            variant="h1"
            class="text-[32px] lg:text-[48px] font-bold text-center"
          />
          <el-skeleton-item
            variant="h1"
            class="text-[18px] lg:text-[24px] text-center"
          />
        </div>
        <div class="pb-10">
          <el-skeleton-item
            variant="p"
            class="text-[18px] lg:text-[24px] text-center"
          />
          <el-skeleton-item
            variant="p"
            class="text-[18px] lg:text-[24px] text-center"
          />
        </div>
        <div
          class="grid md:grid-cols-3 gap-x-4 gap-y-40 md:gap-y-24 xl:gap-y-36 mt-20"
        >
          <div
            v-for="one in 3"
            :key="one"
            class="border rounded-2xl transition duration-500 ease-in-out hover:-translate-y-[5px] hover:scale-105 bg-white hover:shadow-lg w-full grid justify-items-center px-4"
          >
            <el-skeleton-item
              variant="image"
              style="
                width: 100%;
                height: 130px;
                position: relative;
                top: -45px;
                border-radius: 10px;
              "
            />
            <div class="w-full relative top-[-10px]">
              <el-skeleton-item
                variant="h1"
                style="width: 100%; margin-bottom: 10px"
              />
              <el-skeleton-item variant="text" style="width: 100%" />
              <el-skeleton-item variant="text" style="width: 100%" />
              <el-skeleton-item variant="text" style="width: 100%" />
              <el-skeleton-item variant="p" style="width: 30%" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<script setup></script>
<style lang="scss" scoped>
:deep(.el-skeleton__item) {
  width: 100%;
}
</style>
