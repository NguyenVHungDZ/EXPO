<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.faq')"
      :columns="COLUMNS_TABLE.FAQ"
      :get-data="getAll"
      :remove-data="remove"
      :params="{ 'populate[faqType]': true }"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('Faq')

getAll().then((e) => {})
definePageMeta({
  layout: 'admin',
})
</script>
