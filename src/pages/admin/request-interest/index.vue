<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.request_interested')"
      :columns="COLUMNS_TABLE.REQUESTINTEREST"
      :get-data="getAll"
      :remove-data="remove"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('RequestInterested')
definePageMeta({
  layout: 'admin',
})
</script>
