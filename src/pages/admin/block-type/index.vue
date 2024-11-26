<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.block_type_management')"
      :columns="COLUMNS_TABLE.BLOCK_TYPE"
      :get-data="getAll"
      :remove-data="remove"
      :is-view="false"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('BlockType')
definePageMeta({
  layout: 'admin',
})
</script>
