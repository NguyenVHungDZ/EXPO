<template>
  <div>
    <common-data-table
      :get-data="getAll"
      :columns="COLUMNS_TABLE.ACTIVITY"
      :operation="false"
      :show-search="false"
      :show-number="false"
      :is-selected="true"
      :flash-remove="true"
      table-content-class="p-4 bg-white"
      :show-filter-activity="true"
      :is-translate="false"
      :remove-data="remove"
      :params="{ 'populate[user]': true }"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'

const { getAll, remove } = useApi('Activity')
</script>

<style scoped>
:deep(.el-table__header th) {
  background: rgb(231, 231, 231) !important;
  color: rgb(43, 42, 42);
}
</style>
