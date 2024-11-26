<template>
  <div class="border rounded-lg p-5 space-y-5">
    <div>
      <h4 class="text-xl font-semibold">{{ t('navbar.event_type') }}</h4>
      <hr class="w-10 border-t-[5px] border-primary my-1" />
      <el-checkbox-group v-model="checkList" class="px-3" size="large">
        <div v-for="item in dataEventType" :key="item._id">
          <el-checkbox :label="item.translate.name" />
        </div>
      </el-checkbox-group>
    </div>
    <div>
      <h4 class="text-xl font-semibold">{{ t('datatable.date') }}</h4>
      <hr class="w-10 border-t-[5px] border-primary my-1" />
      <div class="flex flex-wrap gap-2 pt-4">
        <button
          class="px-2 py-1 border rounded-lg"
          :class="
            chooseDate === 1 ? 'bg-primary text-white border-primary' : ''
          "
          @click="onChooseDate(1)"
        >
          {{ t('time.today') }}
        </button>
        <button
          class="px-2 py-1 border rounded-lg"
          :class="
            chooseDate === 2 ? 'bg-primary text-white border-primary' : ''
          "
          @click="onChooseDate(2)"
        >
          {{ t('time.this_week') }}
        </button>
        <button
          class="px-2 py-1 border rounded-lg"
          :class="
            chooseDate === 3 ? 'bg-primary text-white border-primary' : ''
          "
          @click="onChooseDate(3)"
        >
          {{ t('time.this_month') }}
        </button>
        <button
          class="px-2 py-1 border rounded-lg"
          :class="
            chooseDate === 4 ? 'bg-primary text-white border-primary' : ''
          "
          @click="onChooseDate(4)"
        >
          {{ t('time.this_year') }}
        </button>
      </div>
      <div class="mt-5">
        <span>{{ t('time.time_place') }}: {{ time }} {{ t('time.day') }}</span>
        <el-slider v-model="time" :max="365" />
      </div>
    </div>
    <button
      class="border px-3 py-2 rounded-lg hover:bg-secondary hover:text-white w-full"
      @click="reset"
    >
      {{ t('action.reset') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'
import type { IEventType } from '~/interfaces/event_type'

const emit = defineEmits(['onFilterData'])
const { getAll: getEventTypes } = useApi('EventType')
const { t, locale } = useI18n()
const dataEventType = ref<Array<IEventType>>([])
const checkList = ref([]) // "Event type"
const time = ref(365) // Hold the value of "Times take place", initialized to 365
const chooseDate = ref(0) // Current time option for event's duration

// fetch data
const fetchData = async () => {
  try {
    const res = (await getEventTypes({ language: locale.value })) as any
    dataEventType.value = res.data
  } catch (error) {
    ElMessage.success(t('message.errors.error'))
  }
}
watch(
  // constantly watch for change on monitor, if there is one, refetch
  locale,
  () => {
    fetchData()
  },
  { immediate: true, deep: true },
)

// reset the all made options to default
const reset = () => {
  checkList.value = [] // Clear the selected event type
  time.value = 365 // Reset "Times take place" to 365
  chooseDate.value = 0 // Reset the time option for event's duration to none
  emit('onFilterData', {
    listEventTypeId: [],
    period: {
      startDate: '',
      endDate: '',
    },
    time: time.value,
  })
}

// Everytime user change time sorting option, immediately update the list
watchEffect(() => {
  const listIndex = Object.keys(checkList.value)
  const listEventTypeId = []
  const period = {
    startDate: '',
    endDate: '',
  }
  for (const index of listIndex) {
    const item = dataEventType.value[Number(index)]
    listEventTypeId.push(item._id)
  }
  // Sorting trade fairs base on duration (today, this week, this month, this year)
  switch (chooseDate.value) {
    case 1:
      period.startDate = period.endDate = moment().toISOString()
      break
    case 2:
      period.startDate = moment().startOf('week').toISOString()
      period.endDate = moment().endOf('week').toISOString()
      break
    case 3:
      period.startDate = moment().startOf('month').toISOString()
      period.endDate = moment().endOf('month').toISOString()
      break
    case 4:
      period.startDate = moment().startOf('year').toISOString()
      period.endDate = moment().endOf('year').toISOString()
      break
    default:
      break
  }
  emit('onFilterData', {
    listEventTypeId,
    period,
    time: time.value,
  })
})

// undone
const onChooseDate = (val: number) => {
  val === chooseDate.value ? (chooseDate.value = 0) : (chooseDate.value = val)
}

onMounted(async () => {
  await fetchData()
})
</script>

<style lang="scss" scoped>
:deep(.el-checkbox__label) {
  font-size: 16px !important;
  text-wrap: wrap;
}
</style>
