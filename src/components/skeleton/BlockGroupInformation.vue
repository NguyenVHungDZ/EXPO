<template>
  <el-skeleton style="width: 100%">
    <template #template>
      <div
        class="max-w-screen-2xl mx-auto py-20 px-10 md:px-20 2xl:px-0 space-y-10"
      >
        <div class="space-y-1">
          <el-skeleton-item
            variant="h1"
            style="width: 100%; margin-bottom: 20px"
          />
          <div class="mb-10">
            <el-skeleton-item variant="text" style="width: 100%" />
            <el-skeleton-item variant="text" style="width: 100%" />
            <el-skeleton-item variant="text" style="width: 100%" />
          </div>
        </div>
        <div class="w-full overflow-x-auto px- mb-5 pb-5">
          <div class="flex">
            <div
              v-for="one in 5"
              :key="one"
              class="grid w-full mx-2 cursor-pointer"
            >
              <el-skeleton-item variant="p" style="width: 100%" />

              <div class="w-full mt-4">
                <el-skeleton-item variant="text" style="width: 100%" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="max-w-screen-2xl m-auto">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 md:p-4 mb-10">
              <div class="container relative pt-5 mb-5 col-span-2">
                <div class="mb-8 font-bold text-[26px]">
                  <el-skeleton-item variant="h3" style="width: 80%" />
                </div>
                <ul class="list-inside">
                  <li class="flex text-lg mb-2">
                    <el-skeleton-item variant="caption" style="width: 100%" />
                  </li>
                  <li class="flex text-lg mb-2">
                    <el-skeleton-item variant="caption" style="width: 100%" />
                  </li>
                  <li class="flex text-lg mb-2">
                    <el-skeleton-item variant="caption" style="width: 100%" />
                  </li>
                  <li class="flex text-lg mb-2">
                    <el-skeleton-item variant="caption" style="width: 100%" />
                  </li>
                  <li class="flex text-lg mb-2">
                    <el-skeleton-item variant="caption" style="width: 100%" />
                  </li>
                </ul>
                <el-skeleton-item variant="caption" style="width: 50%" />
              </div>
              <div class="container lg:mx-auto col-span-3">
                <el-skeleton-item
                  variant="image"
                  style="width: 100%; height: 50vh"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<script setup></script>
