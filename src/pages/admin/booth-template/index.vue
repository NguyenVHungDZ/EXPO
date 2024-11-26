<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.booth_template_style')"
      :columns="COLUMNS_TABLE.BOOTHTEMPLATE"
      :get-data="getAll"
      :remove-data="remove"
      :is-view="true"
      :is-translate="false"
      :params="{ 'populate[booth]': true }"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('BoothTemplate')
definePageMeta({
  layout: 'admin',
})
</script>
