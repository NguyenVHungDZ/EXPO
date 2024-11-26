<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.list_language')"
      :columns="COLUMNS_TABLE.LANGUAGE"
      :get-data="getAll"
      :remove-data="remove"
      :is-view="true"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'

const { t } = useI18n()

definePageMeta({
  layout: 'admin',
})

// get methods getAll item
const { getAll, remove } = useApi('Language')
</script>
