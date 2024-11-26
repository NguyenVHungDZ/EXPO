<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.request_management')"
      :is-add="false"
      :columns="COLUMNS_TABLE.REQUEST"
      :get-data="getAll"
      :remove-data="remove"
      :is-view="true"
      :is-edit="false"
      :is-translate="false"
      :params="{
        'populate[requestInterested]': true,
        'populate[eventType]': true,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove, updateOneField } = useApi('Request')
definePageMeta({
  layout: 'admin',
})
</script>
