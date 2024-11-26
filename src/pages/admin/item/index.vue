<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.item_title')"
      :columns="COLUMNS_TABLE.ITEM"
      :get-data="getAll"
      :remove-data="remove"
      :options-status-select="optionsStatus"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('Item')
const optionsStatus = [
  {
    value: 1,
    label: 'Active',
  },
  {
    value: 0,
    label: 'Disable',
  },
]
definePageMeta({
  layout: 'admin',
})
</script>
