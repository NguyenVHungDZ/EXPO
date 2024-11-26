<template>
  <div>
    <DetailItemAdmin
      routes="FaqType"
      :params="params"
      :is-translate="false"
      :template-data="faqType"
    />
  </div>
</template>

<script lang="ts" setup>
import { faqType } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
