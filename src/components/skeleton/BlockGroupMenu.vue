<template>
  <div class="py-20 px-10">
    <div class="lg:px-20">
      <el-skeleton-item variant="h1" />

      <div class="mt-[15px]">
        <el-skeleton-item variant="text" />
      </div>
    </div>
    <div
      class="max-w-screen-2xl m-auto grid lg:grid-cols-2 gap-10 py-10 lg:px-10"
    >
      <div>
        <div class="mb-[40px] border rounded-[10px] border-spacing-2 p-5">
          <div class="flex justify-between mb-[20px]">
            <div class="w-[200px]">
              <el-skeleton-item variant="h1" class="mr-[20px]" />
            </div>
            <div class="w-[80px]">
              <el-skeleton-item variant="h1" />
            </div>
          </div>
          <div class="mt-[10px]">
            <el-skeleton-item variant="text" />
            <el-skeleton-item variant="text" />
          </div>
        </div>

        <div class="w-[200px]">
          <el-skeleton-item variant="h1" class="mb-[30px]" />
        </div>
        <div class="w-[200px]">
          <el-skeleton-item variant="h1" />
        </div>
      </div>

      <div class="lg:hidden">
        <el-skeleton-item variant="image" :style="'height: 20rem;'" />
      </div>

      <div class="hidden lg:block">
        <el-skeleton-item variant="image" :style="'height: 20rem;'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-collapse) {
  border: unset !important;
  .el-collapse-item {
    padding: 10px;
    .el-collapse-item__header {
      color: #a6b3be;
      font-size: 20px;
      font-weight: bold;
      border: unset !important;
      padding: 0 20px;
    }
  }
}
:deep(.el-collapse-item.is-active) {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  border-radius: 8px;
  background: white !important;
  .el-collapse-item__header {
    color: black;
    background: white !important;
  }
  .el-collapse-item__content {
    font-size: 16px;
    padding: 10px 20px;
  }
  .el-collapse-item__wrap {
    border: unset;
  }
}
</style>
