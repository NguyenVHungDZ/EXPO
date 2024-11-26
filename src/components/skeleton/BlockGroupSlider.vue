<script lang="ts" setup>
const currentSlide = ref(0)
const windowWidth = ref(0)

const breakpoints = ref({
  // 700px and up
  700: {
    itemsToShow: 3.5,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: 'start',
  },
})

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => window.removeEventListener('resize', onWidthChange))
</script>

<template>
  <div class="rounded-2xl bg-[#F1F5F8] py-20 px-5 md:px-20">
    <div class="max-w-screen-2xl mx-auto md:px-0 space-y-5 2xl:px-10">
      <div class="mb-[20px]">
        <el-skeleton-item
          variant="h1"
          :style="'background: white;  margin-bottom: 10px;'"
        />
        <el-skeleton-item variant="text" :style="'background: white;'" />
      </div>
      <div class="p-4 rounded-3xl shadow-lg bg-white flex justify-between">
        <div class="w-[20%]">
          <el-skeleton-item variant="h1" />
        </div>
        <div class="w-[20%]">
          <el-skeleton-item variant="h1" />
        </div>
        <div class="w-[20%]">
          <el-skeleton-item variant="h1" />
        </div>
        <div class="w-[20%]">
          <el-skeleton-item variant="h1" />
        </div>
      </div>
      <div class="relative">
        <el-skeleton-item
          variant="image"
          :style="'height: 40rem; background: white;'"
        />

        <div class="md:absolute bottom-0 z-[1000] w-full p-5">
          <div
            class="bg-[rgba(221,218,218,0.3)] backdrop-blur-[10px] w-full rounded-3xl p-4 flex items-center justify-between"
          >
            <div class="flex-1">
              <div class="w-[50%]">
                <el-skeleton-item variant="h1" :style="'background: white;'" />
              </div>

              <el-skeleton-item variant="text" :style="'background: white;'" />
            </div>

            <div class="w-[55%] flex justify-end">
              <el-skeleton-item
                variant="button"
                :style="'background: white;'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
