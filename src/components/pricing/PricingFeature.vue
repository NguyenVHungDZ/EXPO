<template>
  <div>
    <!-- pricing feature  header -->
    <div class="my-[30px] py-[25px] border-b border-solid border-[#cccccca6]">
      <h3 class="text-[24px] text-[#000] font-bold">Features</h3>
    </div>
    <div>
      <PricingFeatureDropDown
        v-for="feature in FEATURES"
        :key="feature.id"
        :feature="feature"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FEATURES } from '~/assets/pricing'
</script>

<style></style>
