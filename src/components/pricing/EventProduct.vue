<template>
  <div class="flex flex-col lg:flex-row">
    <div class="mt-[40px] w-full lg:w-[330px]">
      <h4
        class="text-[18px] font-bold pb-[20px] border-b border-solid border-[#ccc]"
      >
        {{ t('events.event_products') }}
      </h4>
      <div class="mt-[20px] block lg:inline-block">
        <div
          v-for="tab in TABS_PRODUCT"
          :key="tab.id"
          class="text-[#000] text-[16ox] mb-[16px] cursor-pointer p-[16px]"
          :class="activeTabs === tab.id && 'active'"
          @click="activeTabs = tab.id"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>
    <div class="bg-white flex-1 rounded-[16px] py-[30px] ml-[60px">
      <EventProductItem :active-tabs="activeTabs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TABS_PRODUCT } from '~/assets/pricing'
const { t } = useI18n()

const activeTabs = ref<number>(1)
</script>

<style scoped>
.active {
  background: #fef0eb;
  border-radius: 96px;
  color: #356df1;
  box-sizing: border-box;
  border: 1px solid #f28573;
}
</style>
