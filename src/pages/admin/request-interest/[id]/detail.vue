<template>
  <div>
    <DetailItemAdmin
      routes="RequestInterested"
      :params="params"
      :template-data="requestInterested"
    />
  </div>
</template>

<script lang="ts" setup>
import { requestInterested } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
