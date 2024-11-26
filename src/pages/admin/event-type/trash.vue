<template>
  <div>
    <h1 class="text-black text-[24px] font-bold mb-6">
      {{ t('event_type_trash') }}
    </h1>

    <div>
      <common-data-table
        :columns="COLUMNS_TABLE.EVENT_TYPE"
        :get-data="getAll"
        :is-loading="isLoading"
        :operation="false"
        :is-back="true"
        :params="params"
        :restore="restore"
        :is-add="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'

const { getAll, restore } = useApi('EventType')
const { t } = useI18n()
const isLoading = ref<boolean>(true)

const params = {
  'filter[deleted_at][$null]': false,
  withDeleted: true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style></style>
