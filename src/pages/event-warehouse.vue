<script lang="ts" setup>
// done
definePageMeta({ layout: 'page' })
useHead({
  title: 'VEXPO',
  titleTemplate: `%s - Nền tảng triển lãm ảo`,
})

const activeTab = ref('happening')
const { t } = useI18n()
</script>

<template>
  <div>
    <div class="container mx-auto 2xl:py-10">
      <h1 class="text-center font-bold py-5 text-[40px]">
        {{ t('page.menu.event') }}
      </h1>
      <el-tabs v-model="activeTab" class="demo-tabs px-5">
        <el-tab-pane
          :label="t('page.event-wavehouse.happening')"
          name="happening"
          ><page-event-ware-house-List type="happening" />
        </el-tab-pane>
        <el-tab-pane :label="t('page.event-wavehouse.upcoming')" name="upcoming"
          ><page-event-ware-house-List type="upcoming"
        /></el-tab-pane>
        <el-tab-pane :label="t('page.event-wavehouse.expired')" name="expired"
          ><page-event-ware-house-List type="expired"
        /></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$active-color: #356df1;

:deep(.el-tabs__nav) {
  justify-content: center;
  float: unset !important;
  .el-tabs__item {
    font-weight: 600;
    font-size: 18px;
  }
  :hover {
    color: $active-color !important;
  }
  .is-active {
    color: $active-color !important;
  }
  // .el-tabs__active-bar {
  //   background-color: $active-color !important;
  // }
}
</style>
