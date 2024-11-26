<template>
  <div>
    <DetailItemAdmin
      routes="Language"
      :params="params"
      :is-translate="false"
      :template-data="language"
    />
  </div>
</template>

<script lang="ts" setup>
import { language } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
