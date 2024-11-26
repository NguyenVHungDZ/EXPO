<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.booth_management')"
      :columns="COLUMNS_TABLE.BOOTH"
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
const { getAll, remove } = useApi('Booth')

definePageMeta({
  layout: 'admin',
})
</script>
