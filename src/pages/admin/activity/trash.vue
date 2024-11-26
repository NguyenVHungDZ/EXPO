<template>
  <div>
    <h1 class="text-black text-[24px] font-bold mb-2">
      {{ t('navbar.activity_trash') }}
    </h1>

    <div>
      <CommonDataTable
        :columns="COLUMNS_TABLE.ACTIVITY"
        :get-data="getAll"
        :is-loading="isLoading"
        :operation="false"
        :is-back="true"
        :show-filter-activity="true"
        :params="params"
        :restore="restore"
        :show-search="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'

const { getAll, restore } = useApi('Activity')
const { t } = useI18n()
const isLoading = ref<boolean>(true)

const params = {
  // Filter deleted_at is not null
  'filter[deleted_at][$null]': false,
  withDeleted: true,
}

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style></style>
