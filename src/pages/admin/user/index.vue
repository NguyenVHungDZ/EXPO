<template>
  <div>
    <CommonDataTable
      :title="t('title-admin-page.user_management')"
      :columns="COLUMNS_TABLE.USER"
      :get-data="getAll"
      :is-loading="isLoading"
      :remove-data="remove"
      :reset-password-button="true"
      :reset-password="update"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'
import { COLUMNS_TABLE } from '~/assets/data'
import type { IUser } from '~/interfaces/user'

const users = ref<IUser[]>([])
const countUsers = ref<number>(0)

const isLoading = ref<boolean>(true)
const { t } = useI18n()
// get methods getAll user
const { getAll, remove, update } = useApi('User')

// call API getAll
const fetchDataUsers = async () => {
  try {
    const res: any = await getAll({ withCount: true })
    countUsers.value = res.count
    users.value = res.data
    isLoading.value = false
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

onMounted(async () => {
  await fetchDataUsers()
})

definePageMeta({
  layout: 'admin',
})
</script>
