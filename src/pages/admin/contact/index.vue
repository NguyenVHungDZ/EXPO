<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.contact_management')"
      :columns="COLUMNS_TABLE.CONTACT"
      :get-data="getAll"
      :remove-data="remove"
      :is-view="true"
      :update="updateOneField"
      :is-edit="false"
      :is-add="false"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove, updateOneField } = useApi('Contact')
definePageMeta({
  layout: 'admin',
})
</script>
