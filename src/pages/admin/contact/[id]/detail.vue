<template>
  <div>
    <DetailItemAdmin
      routes="Contact"
      :params="params"
      :template-data="contact"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { contact } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
