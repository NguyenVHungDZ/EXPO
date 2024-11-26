<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.faq_management')"
      :columns="COLUMNS_TABLE.FAQ"
      :get-data="getAll"
      :remove-data="remove"
      :params="params"
      :restore="restore"
      :operation="false"
      :is-back="true"
      :is-add="false"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove, restore } = useApi('Faq')

const params = {
  'filter[deleted_at][$null]': false,
  withDeleted: true,
}
definePageMeta({
  layout: 'admin',
})
</script>
