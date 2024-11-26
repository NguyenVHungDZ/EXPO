<template>
  <div>
    <DetailItemAdmin routes="Faq" :params="params" :template-data="faq" />
  </div>
</template>

<script lang="ts" setup>
import { faq } from '~/assets/detailData'

const params = {
  'populate[faqType]': true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
