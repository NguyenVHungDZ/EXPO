<template>
  <div class="text-center">
    <h2 class="text-[32px] font-bold mb-[25px]">
      {{ t('action.title_annualplan') }}
    </h2>
    <div class="flex flex-col lg:flex-row">
      <PricingAnnualPlanCard
        v-for="item in CARD"
        :key="item.id"
        :title="item.title"
        :detail="item.detail"
        :icon="item.icon"
        :list="item.list"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CARD } from '~/assets/pricing'
const { t } = useI18n()
</script>

<style></style>
