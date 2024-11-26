<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.translation')"
      :columns="COLUMNS_TABLE.TRANSLATION"
      :get-data="getAll"
      :remove-data="remove"
      :is-view="true"
      :update="updateOneField"
      :params="params"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'

const { t } = useI18n()

const params = {
  'populate[language]': true,
}
definePageMeta({
  layout: 'admin',
})

// get methods getAll item
const { getAll, remove, updateOneField } = useApi('Translation')
</script>
