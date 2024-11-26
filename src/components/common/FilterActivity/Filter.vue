<template>
  <div
    class="flex justify-end bg-white mb-3 p-4 gap-2 text-[14px] rounded-[4px]"
  >
    <button
      class="p-2 border rounded hover:text-white"
      :class="onDateActive(1)"
      @click="setDateActive(1)"
    >
      {{ t('time.today') }}
    </button>
    <button
      class="p-2 border rounded hover:text-white"
      :class="onDateActive(2)"
      @click="setDateActive(2)"
    >
      {{ t('time.this_week') }}
    </button>
    <button
      class="p-2 border rounded hover:text-white"
      :class="onDateActive(3)"
      @click="setDateActive(3)"
    >
      {{ t('time.this_month') }}
    </button>
    <button
      class="p-2 border rounded hover:text-white"
      :class="onDateActive(4)"
      @click="setDateActive(4)"
    >
      {{ t('time.this_year') }}
    </button>
    <div>
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        :start-placeholder="t('datatable.date_start')"
        :end-placeholder="t('datatable.date_end')"
        :default-value="[new Date(), new Date()]"
        size="large"
      />
    </div>
    <button
      class="p-2 border rounded hover:bg-secondary hover:text-white flex gap-1"
      :class="onSortActive('asc')"
      @click="sortActive = 'asc'"
    >
      <IconSortCalendarAscending class="text-[18px]" />
      {{ t('datatable.ascending') }}
    </button>
    <button
      class="p-2 border rounded hover:bg-secondary hover:text-white flex gap-1"
      :class="onSortActive('desc')"
      @click="sortActive = 'desc'"
    >
      <IconSortCalendarDescending class="text-[18px]" />
      {{ t('datatable.descending') }}
    </button>
    <button
      class="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
      :disabled="isDisabledClear"
      :class="{ 'opacity-50 cursor-not-allowed': isDisabledClear }"
      @click="onClear"
    >
      {{ t('button.clear') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
// Provide time's duration such as 'Today, This Week,...', customize 'Start Date' and 'End Date', sort by Ascending or Descending order
import moment from 'moment'
import IconSortCalendarAscending from '~icons/mdi/sort-calendar-ascending'
import IconSortCalendarDescending from '~icons/mdi/sort-calendar-descending'

const props = defineProps({
  // An array of items to be removed
  removeList: {
    type: Array,
    default: () => [],
  },
  // Function to handle remove
  remove: {
    type: Function,
    default: () => {},
  },
})

const emit = defineEmits(['updateDateFilter', 'updateSort', 'onClear'])
const { t } = useI18n()
const date = ref()
const dateRange = ref()
const dateActiveButton = ref(0)
const sortActive = ref('desc')
// Sort by 'today/this week/...'
const setDateActive = (tier: number) => {
  dateActiveButton.value = dateActiveButton.value === tier ? 0 : tier
  switch (dateActiveButton.value) {
    case 1:
      date.value = moment().startOf('day').toISOString()
      break
    case 2:
      date.value = moment().startOf('week').toISOString()
      break
    case 3:
      date.value = moment().startOf('month').toISOString()
      break
    case 4:
      date.value = moment().startOf('year').toISOString()
      break
    default:
      date.value = ''
      break
  }
}

// Check if the removeList is empty
// If empty, disable the clear button
const isDisabledClear = computed(() => !props.removeList.length)

// Clear sorting options
const onClear = async () => {
  for (const item of props.removeList) {
    await props.remove(item?._id)
  }
}

// Check if the date active button is active
const onDateActive = (tier: number) => {
  return dateActiveButton.value === tier
    ? 'bg-primary text-white '
    : 'hover:bg-secondary'
}

// Check if the sort active button is active
const onSortActive = (type: string) => {
  return sortActive.value === type
    ? 'bg-primary text-white '
    : 'hover:bg-secondary'
}

// Clear date filter
// If date and dateRange are empty, emit an empty string
// Otherwise, emit the date or dateRange
const clearDateFilter = () => {
  if (!date.value && !dateRange.value) emit('updateDateFilter', '')
}

// Watch for sorting change and fetch data
watch(
  date,
  (value: any) => {
    if (value) {
      emit('updateDateFilter', value)
      dateRange.value = ''
    }
    clearDateFilter()
  },
  { immediate: true },
)
watch(
  sortActive,
  (value: any) => {
    emit('updateSort', value)
  },
  { immediate: true },
)
watch(
  dateRange,
  (value: any) => {
    if (value) {
      emit('updateDateFilter', value)
      setDateActive(0)
    }
    clearDateFilter()
  },
  { immediate: true },
)
</script>

<style></style>
