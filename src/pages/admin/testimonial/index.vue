<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.feedback')"
      :columns="COLUMNS_TABLE.TESTIMONIAL"
      :get-data="getAll"
      :remove-data="remove"
      :is-edit="true"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
const { t } = useI18n()

// get methods getAll item
const { getAll, remove } = useApi('Testimonial')
definePageMeta({
  layout: 'admin',
})
</script>
