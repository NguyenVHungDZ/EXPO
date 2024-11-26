<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">Detail item</h3>

    <!-- form -->
    <DetailAdmin :id="$route.params.id" route="Item" :rule-form="ruleForm" />
  </div>
</template>

<script lang="ts" setup>
import type { IItem } from '~/interfaces/item'

// form
const ruleForm = reactive<IItem>({
  name: '',
  status: 0,
  description: '',
})

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style></style>
