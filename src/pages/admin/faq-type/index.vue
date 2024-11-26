<template>
  <div>
    <CommonDataTable
      :title="t('faq_type')"
      :columns="COLUMNS_TABLE.FAQTYPE"
      :get-data="getAll"
      :remove-data="remove"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('FaqType')

definePageMeta({
  layout: 'admin',
})
</script>
