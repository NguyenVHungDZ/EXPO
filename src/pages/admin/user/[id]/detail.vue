<template>
  <div>
    <DetailItemAdmin
      routes="User"
      :params="params"
      :is-translate="false"
      :template-data="user"
    />
  </div>
</template>

<script lang="ts" setup>
import { user } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
