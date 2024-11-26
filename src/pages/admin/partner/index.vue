<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.partner-title')"
      :columns="COLUMNS_TABLE.PARTNER"
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
const { getAll, remove } = useApi('Partner')

definePageMeta({
  layout: 'admin',
})
</script>
