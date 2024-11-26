<template>
  <div>
    <DetailItemAdmin routes="Block" :params="params" :template-data="block" />
  </div>
</template>

<script lang="ts" setup>
import { block } from '~/assets/detailData'

const params = {
  'populate[blockGroup]': true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
