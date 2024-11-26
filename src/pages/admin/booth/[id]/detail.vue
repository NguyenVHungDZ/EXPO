<template>
  <div>
    <DetailItemAdmin routes="Booth" :params="params" :template-data="booth" />
  </div>
</template>

<script lang="ts" setup>
import { booth } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
