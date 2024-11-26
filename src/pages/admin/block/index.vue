<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.block_management')"
      :columns="COLUMNS_TABLE.BLOCK"
      :get-data="getAll"
      :remove-data="remove"
      :params="{ 'populate[blockGroup]': true }"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('Block')
definePageMeta({
  layout: 'admin',
})
</script>
