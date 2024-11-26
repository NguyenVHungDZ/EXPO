<template>
  <div>
    <div class="flex justify-between mb-4">
      <h1 class="text-black font-bold text-[26px]">
        {{ t('dashboard.title') }}
      </h1>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-3 lg:col-span-3 bg-white rounded">
        <DashboardStats />
      </div>
      <div class="col-span-3 lg:col-span-2 p-5 bg-white rounded">
        <DashboardBarChart :data-item="data" />
      </div>
      <div class="col-span-3 lg:col-span-1 p-5 bg-white rounded">
        <DashboardPieChart :data-item="data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRes } from '#build/interfaces/res_type'
import useApi from '~/composables/request/useApi'

const data = ref<any>({
  expo: [],
  count: [],
  approved: [],
  pending: [],
  rejected: [],
})

const { getAll } = useApi('Event')

const { t } = useI18n()

// fetch data
const fetchData = async () => {
  try {
    const res = (await getAll({
      withCount: true,
      limit: 10,
    })) as IRes

    for (const item of res.data) {
      data.value = {
        expo: [...data.value.expo, item.name],
        count: [...data.value.count, item.forms_count],
        approved: [
          ...data.value.approved,
          item.forms_status_count.approved || 0,
        ],
        pending: [...data.value.pending, item.forms_status_count.pending || 0],
        rejected: [
          ...data.value.rejected,
          item.forms_status_count.rejected || 0,
        ],
      }
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

onMounted(async () => {
  await fetchData()
})

definePageMeta({
  layout: 'admin',
})
</script>
