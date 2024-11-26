<template>
  <el-skeleton style="width: 100%">
    <template #template>
      <div class="max-w-screen-2xl mx-auto md:px-0">
        <div class="lg:px-10">
          <el-skeleton-item
            variant="h1"
            class="text-[32px] lg:text-[48px] font-bold text-center"
          />
          <el-skeleton-item
            variant="h1"
            class="text-[18px] lg:text-[24px] text-center"
          />
        </div>
        <div
          class="grid md:grid-cols-4 gap-x-4 gap-y-40 md:gap-y-24 xl:gap-y-36 mt-10 xl:px-16"
        >
          <div
            v-for="one in 4"
            :key="one"
            class="group border rounded-2xl transition duration-500 ease-in-out hover:-translate-y-[5px] hover:scale-105 hover:shadow-lg bg-gradient-to-r hover:from-blue-300 hover:to-primary block-item px-3"
          >
            <el-skeleton-item
              variant="image"
              style="width: 100%; height: 240px; border-radius: 10px"
            />
            <div class="w-full grid justify-items-center mt-2">
              <el-skeleton-item
                variant="h2"
                style="width: 70%; margin-bottom: 5px"
              />
            </div>
            <el-skeleton-item style="padding: 5px 10px 5px 10px" variant="p" />
            <el-skeleton-item style="padding: 5px 10px 5px 10px" variant="p" />

            <el-skeleton-item style="padding: 5px; width: 10%" variant="text" />
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<script setup></script>
