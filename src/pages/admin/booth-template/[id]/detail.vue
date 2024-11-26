<template>
  <div>
    <DetailItemAdmin
      routes="BoothTemplate"
      :params="params"
      :is-translate="false"
      :template-data="boothTemplate"
    />
  </div>
</template>

<script lang="ts" setup>
import { boothTemplate } from '~/assets/detailData'

const params = {
  'populate[booth]': true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
