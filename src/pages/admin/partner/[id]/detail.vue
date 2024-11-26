<template>
  <div>
    <DetailItemAdmin
      routes="Partner"
      :params="params"
      :template-data="partner"
    />
  </div>
</template>

<script lang="ts" setup>
import { partner } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
