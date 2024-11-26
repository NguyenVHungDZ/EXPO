<template>
  <div
    :class="
      layout === 'page' ? 'max-w-screen-2xl mx-auto px-10 py-10 lg:px-20' : ''
    "
  >
    <CommonDataTable
      :title="t('title-admin-page.form_management')"
      :columns="COLUMNS_TABLE.FORM"
      :get-data="getAll"
      :is-show-create="layout === 'admin'"
      :is-show-trash="layout === 'admin'"
      :is-add="false"
      :remove-data="remove"
      :is-view="true"
      :update="updateOneField"
      :is-edit="false"
      :is-translate="false"
      :is-change-status="true"
      :params="{
        'populate[event]': true,
        'populate[form_booth]': true,
        ...userParam,
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
import { useUser } from '~/stores/user'

const { t } = useI18n()

const userStore = useUser()
const route = useRoute()
const user = computed(() => userStore.getInformation)
const layout = computed(() =>
  route.fullPath.includes('admin') ? 'admin' : 'page',
)
const userParam = computed(() => {
  if (user.value.role === 'company')
    return {
      'filter[user_id]': user.value._id || '',
    }
  else return {}
})
// get methods getAll item
const { getAll, remove, updateOneField } = useApi('Form')
</script>
