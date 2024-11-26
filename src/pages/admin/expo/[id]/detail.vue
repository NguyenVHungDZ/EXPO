<template>
  <div>
    <DetailItemAdmin routes="Expo" :params="params" :template-data="expo" />
  </div>
</template>

<script lang="ts" setup>
import { expo } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
