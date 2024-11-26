<template>
  <div>
    <DetailItemAdmin
      routes="Request"
      :params="params"
      :template-data="request"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { request } from '~/assets/detailData'

const params = {
  'populate[requestInterested]': true,
  'populate[eventType]': true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
