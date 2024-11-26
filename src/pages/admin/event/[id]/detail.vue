<template>
  <div>
    <DetailItemAdmin routes="Event" :params="params" :template-data="event" />
  </div>
</template>

<script lang="ts" setup>
import { event } from '~/assets/detailData'

const params = {
  'populate[eventType]': true,
  'populate[user]': true,
  'populate[event_expo]': true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
