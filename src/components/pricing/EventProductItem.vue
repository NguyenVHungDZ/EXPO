<template>
  <div class="">
    <div
      class="max-w-[900px] mx-auto text-center text-[#000] mb-[50px] mt-[20px ]"
    >
      <h3 class="text-[32px] font-bold mb-[10px]">
        {{ EVENT_PRODUCT_ITEM[activeTabs - 1].title }}
      </h3>
      <p class="text-[20px]">
        {{ EVENT_PRODUCT_ITEM[activeTabs - 1].description }}
      </p>
    </div>

    <div
      class="border-t border-solid border-[#cccccca6] pt-[40px] flex flex-col lg:flex-row"
    >
      <EventProductFeature
        class="w-full lg:w-[45%]"
        :feature="EVENT_PRODUCT_ITEM[activeTabs - 1].feature"
      />
      <EventProductForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import EventProductForm from './EventProductForm.vue'
import { EVENT_PRODUCT_ITEM } from '~/assets/pricing'

const props = defineProps({
  activeTabs: {
    type: Number,
    default: 1,
  },
})
</script>

<style></style>
