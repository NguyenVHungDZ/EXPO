<template>
  <div class="px-[20px] py-[10px] mr-[20px]">
    <div class="mb-[60px]">
      <h3 class="font-bold text-[20px]">Features Included:</h3>

      <div>
        <div
          v-for="item in feature"
          :key="item.id"
          class="flex items-start text-[#3F4850] mb-[10px] w-full mt-[15px]"
        >
          <Icon
            name="mdi:check-bold"
            class="mr-[12px]"
            width="24"
            height="24"
          />
          <p class="text-[18px]">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <div>
      <PricingFeatureDropDown title="Add-Ons" :list="ADD_ON_PRODUCT" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ADD_ON_PRODUCT } from '~/assets/pricing'

interface IItem {
  id: number
  name: string
}

const props = defineProps({
  feature: {
    type: Array as () => IItem[],
    default: () => [],
  },
})
</script>

<style></style>
