<script lang="ts" setup>
import moment from 'moment'
import { TransitionRoot } from '@headlessui/vue'
import { Search } from '@element-plus/icons-vue'
import useApi from '~/composables/request/useApi'
import TimeLineIcon from '~icons/mingcute/time-line'
import PositionIcon from '~icons/gis/position-o'
import FormCountIcon from '~icons/clarity/form-line'
import GridIcon from '~icons/ion/grid'
import ListIcon from '~icons/fa/list'
import RejectFormIcon from '~icons/fluent/text-change-reject-20-filled'
import ElCheckIcon from '~icons/icon-park-outline/doc-success'
import PendingFormIcon from '~icons/ic/baseline-pending-actions'
import type { IEvent } from '~/interfaces/event'

type periodType = {
  startDate: string
  endDate: string
}

type valueFilter = {
  time: number
  listEventTypeId: Array<string>
  period: periodType
}

definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: 'events' })

const { getAll } = useApi('Event')
const { getFile } = useApi('File')
const data = ref<Array<IEvent>>([])
const currentPage = ref(1)
const pageSize = ref(6)
const searchKey = ref('')
const total = ref(0)
const { t } = useI18n()
const sort = ref(1) // Sorting order
const isLoading = ref(false)

// Reactive filter object
const dataFilter = reactive<valueFilter>({
  time: 365,
  listEventTypeId: [],
  period: {
    startDate: '',
    endDate: '',
  },
})

// call api
const fetchData = async () => {
  try {
    isLoading.value = true
    let filter = `&filter[name][$stringContainsI]=${searchKey.value}`
    // Add event type filter
    if (dataFilter.listEventTypeId && dataFilter.listEventTypeId.length) {
      if (dataFilter.listEventTypeId.length > 1) {
        for (const eventTypeId of dataFilter.listEventTypeId)
          filter += `&filter[eventType_id][$in]=${eventTypeId}`
      } else {
        filter += `&filter[eventType_id][$eq]=${dataFilter.listEventTypeId[0]}`
      }
    }
    // Add date filter
    if (dataFilter.period.startDate && dataFilter.period.endDate) {
      filter += `&filter[date_start][$gte]=${dataFilter.period.startDate}`
      filter += `&filter[date_end][$lte]=${dataFilter.period.endDate}`
    } else {
      const dateNow = new Date().toISOString()
      filter += `&filter[date_end][$gte]=${dateNow}`
    }
    // Fetch data
    const res = (await getAll(
      {
        limit: pageSize.value, // Limit the number of items
        offset: pageSize.value * (currentPage.value - 1),
        withCount: true, // Activate counter
        'sort[created_at]': 'desc', // Sort by creation date in descending order
        'populate[eventType]': true,
      },
      filter,
    )) as any
    // Reset data
    data.value = []
    for (const item of res.data) {
      const endDate = moment(item.date_end)
      const startDate = moment(item.date_start)
      const days = endDate.diff(startDate, 'days') // Event duration in days
      if (days <= dataFilter.time) data.value.push(item)
    }
    // Fet and process images for each event
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
    total.value = res.count
    window.scrollTo({ top: 0, behavior: 'smooth' }) 
  } catch (error) {
  } finally {
    isLoading.value = false
  }
}

// Handle page size change
const handleSizeChange = async (val: number) => {
  await fetchData()
}

// Hnadle current page change
const handleCurrentChange = async (val: number) => {
  await fetchData()
}

// Function for date formatting
const getYear = (date: string) => {
  return moment(date).format('YYYY')
}
const getMonthText = (date: string) => {
  return moment(date).format('MMMM')
}
const getVNDate = (date: string) => {
  return moment(date).format('hh:mm DD/MM/YYYY')
}

// Hnadle sorting toogle when change sorting order
const onToggle = async (val: number) => {
  if (sort.value !== val) {
    sort.value = val
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 200))
    isLoading.value = false
  }
}

// Handle filtering
const onFilter = async (val: valueFilter) => {
  dataFilter.listEventTypeId = val.listEventTypeId
  dataFilter.period = val.period
  dataFilter.time = val.time
  await fetchData()
}

// Fetch data when the component is mounted
onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div
    class="container mx-auto bg-white px-10 lg:p-20 pt-10 my-10 lg:grid lg:grid-cols-7 lg:space-x-4"
  >
    <ClientOnly>
      <div class="lg:col-span-5 space-y-5">
        <div class="lg:flex justify-between items-center">
          <div class="flex gap-x-2 items-center">
            <button
              :class="
                !sort
                  ? 'text-primary hover:text-secondary'
                  : 'text-gray-400 hover:text-gray-500'
              "
              @click="onToggle(0)"
            >
              <GridIcon />
            </button>
            <button
              :class="
                sort == 1
                  ? 'text-primary hover:text-secondary'
                  : 'text-gray-400 hover:text-gray-500'
              "
              @click="onToggle(1)"
            >
              <ListIcon />
            </button>
            <span
              >{{ t('content-page.events.showing') }} 1-6
              {{ t('content-page.events.of') }} {{ total }}
              {{ t('content-page.events.results') }}</span
            >
          </div>

          <el-input v-model="searchKey" style="width: 250px" size="large">
            <template #append>
              <el-button :icon="Search" @click="fetchData" /> </template
          ></el-input>
        </div>
        <div class="min-h-[60rem]">
          <!-- Your content goes here -->

          <el-skeleton :loading="isLoading" animated>
            <template #template>
              <div class="grid gap-5" :class="!sort ? 'lg:grid-cols-3' : ''">
                <SkeletonEventItem v-for="item in 6" :key="item" :sort="sort" />
              </div>
            </template>
            <template #default>
              <div class="grid gap-5" :class="!sort ? 'lg:grid-cols-3' : ''">
                <NuxtLink
                  v-for="item of data"
                  :key="item._id"
                  :to="`/events/${item._id}`"
                  class="border rounded-lg shadow hover:shadow-lg cursor-pointer 2xl:max-h-[425px]"
                  :class="!sort ? '' : 'lg:flex'"
                >
                  <img
                    :src="item.imageUrl"
                    class="object-cover aspect-video"
                    :class="
                      !sort
                        ? ' w-full h-[40%]'
                        : 'w-full lg:w-[15rem]  2xl:w-[25rem] lg:h-full'
                    "
                  />
                  <div
                    class="2xl:p-8 p-4 space-y-3 w-auto"
                    :class="!sort ? 'lg:h-[300px] xl:h-[250px] pt-0 ' : ''"
                  >
                    <div class="flex items-center gap-2">
                      <h4 class="text-2xl font-bold text-primary">
                        {{ getYear(item.date_start) }}
                      </h4>
                      <h4
                        class="font-semibold border-l pl-2 border-gray-300 text-gray-500"
                      >
                        {{ getMonthText(item.date_start) }}
                      </h4>
                    </div>
                    <h4 class="text-lg truncate" style="margin: 0 !important">
                      {{ item.name }}
                    </h4>
                    <h4 class="text-xs items-center">
                      <TimeLineIcon
                        class="text-primary mr-[5px] inline-block"
                      /><span>{{ getVNDate(item.date_start) }} - </span>

                      <span>{{ getVNDate(item.date_end) }}</span>
                    </h4>
                    <h4 class="text-xs flex items-center">
                      <PositionIcon class="text-primary mr-[5px]" />
                      <span>{{ item.address }}</span>
                    </h4>
                    <!-- form count -->
                    <div class="flex gap-3">
                      <h5 class="text-[12px] flex mb-[3px]">
                        <FormCountIcon class="text-blue-600 mr-[5px]" />
                        <span> {{ item.forms_count }} </span>
                      </h5>
                      <h5 class="text-[12px] flex mb-[3px]">
                        <ElCheckIcon class="text-green-600 mr-[5px]" />
                        <span
                          >{{
                            (item.forms_status_count &&
                              item.forms_status_count.approved) ||
                            0
                          }}
                        </span>
                      </h5>
                      <h5 class="text-[12px] flex mb-[3px]">
                        <PendingFormIcon class="text-yellow-600 mr-[5px]" />
                        <span
                          >{{
                            (item.forms_status_count &&
                              item.forms_status_count.pending) ||
                            0
                          }}
                        </span>
                      </h5>
                      <h5 class="text-[12px] flex mb-[3px]">
                        <RejectFormIcon class="text-red-600 mr-[5px]" />
                        <span
                          >{{
                            (item.forms_status_count &&
                              item.forms_status_count.rejected) ||
                            0
                          }}
                        </span>
                      </h5>
                    </div>
                    <p class="line-clamp-2 text-sm" :innerHTML="item.detail" />
                  </div>
                </NuxtLink>
              </div>
            </template>
          </el-skeleton>
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
      </div>
    </ClientOnly>
    <div class="lg:col-span-2 mt-10 lg:mt-0">
      <PageEventFilter @on-filter-data="onFilter" />
    </div>
  </div>
</template>
