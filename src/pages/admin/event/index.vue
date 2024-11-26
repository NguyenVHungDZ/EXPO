<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.event_management')"
      :columns="COLUMNS_TABLE.EVENT"
      :get-data="getAll"
      :remove-data="remove"
      :is-view="true"
      :list-ignored="['email', 'website', 'featured_image']"
      :params="{ 'populate[eventType]': true }"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('Event')
definePageMeta({
  layout: 'admin',
})
</script>
