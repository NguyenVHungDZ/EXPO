<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.expo_management')"
      :columns="COLUMNS_TABLE.EXPO"
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
const { getAll, remove } = useApi('Expo')

definePageMeta({
  layout: 'admin',
})
</script>
