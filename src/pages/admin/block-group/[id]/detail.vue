<template>
  <div>
    <DetailItemAdmin
      routes="BlockGroup"
      :params="params"
      :template-data="blockGroup"
    />
  </div>
</template>

<script lang="ts" setup>
import { blockGroup } from '~/assets/detailData'

const params = {
  'populate[blockType]': true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
