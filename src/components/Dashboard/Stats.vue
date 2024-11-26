<template>
  <div class="grid grid-cols-3 p-4">
    <div v-for="(item, index) in data" :key="index" class="border-r stats-item">
      <DashboardStatsItem :data="item" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IRes } from '~/interfaces/res_type'
import useApi from '~/composables/request/useApi'

const { getAll } = useApi('Event')
const { t } = useI18n()
const happening = ref(0)
const upcoming = ref(0)
const expired = ref(0)

const data = computed(() => [
  {
    title: 'dashboard.happening',
    toolbar: '',
    count: happening.value,
    grouthColor: 'primary',
    growthNumber: 0,
  },
  {
    title: 'dashboard.comming',
    toolbar: '',
    count: upcoming.value,
    grouthColor: 'primary',
    growthNumber: 0,
  },
  {
    title: 'dashboard.ending',
    toolbar: '',
    count: expired.value,
    grouthColor: 'primary',
    growthNumber: 0,
  },
])

// Function to fetch data and event counts for different categories
const fetchData = async () => {
  try {
    const date = new Date().toISOString()
    let res = (await getAll(
      {
        withCount: true,
        limit: 1,
      },
      `&filter[date_start][$lte]=${date}&filter[date_end][$gte]=${date}`,
    )) as IRes
    happening.value = res.count || 0
    res = (await getAll(
      {
        withCount: true,
        limit: 1,
      },
      `&filter[date_start][$gt]=${date}`,
    )) as IRes
    upcoming.value = res.count || 0
    res = (await getAll(
      {
        withCount: true,
        limit: 1,
      },
      `&filter[date_end][$lt]=${date}`,
    )) as IRes
    expired.value = res.count || 0
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

onBeforeMount(async () => {
  await fetchData()
})
</script>
<style scoped lang="scss">
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
