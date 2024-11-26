<template>
  <div>
    <DetailItemAdmin
      routes="EventType"
      :params="params"
      :template-data="eventType"
    />
  </div>
</template>

<script lang="ts" setup>
import { eventType } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
