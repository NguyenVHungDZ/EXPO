<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import type { IEvent } from '#build/interfaces/event'
import type { IRes } from '#build/interfaces/res_type'

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
})

const { getAll, getFile } = useApi('Event')
const data = ref<Array<IEvent>>([])
const currentPage = ref(1)
const pageSize = ref(4)
const total = ref(0)
const typeEvent = computed(() => props.type)
const isLoading = ref(false)
const { t, locale } = useI18n()
const fetchData = async () => {
  try {
    isLoading.value = true
    let filter = ''
    const date = new Date().toISOString()
    if (typeEvent.value === 'happening') {
      filter += `&filter[date_end][$gte]=${date}`
    } else if (typeEvent.value === 'upcoming') {
      filter += `&filter[date_start][$gt]=${date}`
    } else if (typeEvent.value === 'expired') {
      filter += `&filter[date_end][$lt]=${date}`
    }
    const res = (await getAll(
      {
        limit: pageSize.value,
        offset: pageSize.value * (currentPage.value - 1),
        withCount: true,
        'sort[created_at]': 'desc',
        language: locale.value,
      },
      filter,
    )) as IRes
    data.value = res.data
    for (const item of data.value as any) {
      try {
        const imageRes = await getFile(item.featured_image)
        const reader = new FileReader()
        reader.readAsDataURL(imageRes as any)
        reader.onloadend = function () {
          const base64data = reader.result
          item.imageUrl = String(base64data) || '/images/default.webp'
        }
      } catch (error) {
        item.imageUrl = '/images/default.webp'
      }
    }
    total.value = Number(res.count)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}
watch(
  locale,
  () => {
    fetchData()
  },
  { immediate: true, deep: true },
)
watch(
  typeEvent,
  async () => {
    await fetchData()
  },
  { immediate: true, deep: true },
)

const handleSizeChange = async (val: number) => {
  await fetchData()
}

// current change
const handleCurrentChange = async (val: number) => {
  await fetchData()
}
</script>
<template>
  <div>
    <ClientOnly>
      <el-skeleton :loading="isLoading" animated>
        <template #template>
          <div>
            <SkeletonEventWarehouseItem
              v-for="item in 3"
              :key="item"
              class="border-b clear-border-end"
            />
          </div>
        </template>
        <template #default>
          <div class="min-h-[600px]">
            <PageEventWareHouseItem
              v-for="item in data"
              :key="item._id"
              :data-item="item"
              class="border-b clear-border-end"
            />
          </div>
          <div class="flex justify-center mt-10">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              layout="prev, pager, next"
              class="mt-4"
              :small="false"
              :background="true"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </template>
      </el-skeleton>
    </ClientOnly>
  </div>
</template>

<style scoped>
.clear-border-end:last-child {
  border-bottom: unset;
}
:deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: #356df1;
}
</style>
