<template>
  <div>
    <DetailItemAdmin
      routes="Translation"
      :params="params"
      :is-translate="false"
      :template-data="translation"
    />
  </div>
</template>

<script lang="ts" setup>
import { translation } from '~/assets/detailData'

const params = {
  'populate[language]': true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
