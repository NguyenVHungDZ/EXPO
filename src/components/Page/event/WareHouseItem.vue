<script lang="ts" setup>
import moment from 'moment'
import ClockIcon from '~icons/ph/clock-bold'
import PositionIcon from '~icons/gis/position-o'
import type { IEvent } from '#build/interfaces/event'

const props = defineProps({
  dataItem: {
    type: Object,
    default: {} as IEvent,
  },
})
const router = useRouter()

// extract year element from a string
const getYear = (date: string) => {
  return moment(date).format('YYYY')
}

// extract date element as 'date/month' from a string
const getDate = (date: string) => {
  return moment(date).format('DD/MM')
}

// extract VNDate element from a string
const getVNDate = (date: string) => {
  return moment(date).format('hh:mm DD/MM/YYYY')
}
</script>
<template>
  <div>
    <img class="w-full aspect-video md:hidden block" :src="dataItem.imageUrl" />
    <div class="grid grid-cols-5 pb-5 md:pt-5">
      <div class="col-span-2 md:col-span-1 border-r">
        <div class="flex flex-col items-center justify-center h-full">
          <p
            class="border-b font-bold text-[40px] text-primary"
            style="font-variant: small-caps"
          >
            {{ getDate(dataItem.date_start) }}
          </p>
          <p class="font-bold text-[25px] text-gray-600">
            {{ getYear(dataItem.date_start) }}
          </p>
        </div>
      </div>
      <div class="col-span-3 px-10 space-y-3 pt-3">
        <h4
          class="font-bold text-xl text-primary hover:text-secondary hover:underline cursor-pointer"
          @click="router.push(`/events/${dataItem._id}`)"
        >
          {{ dataItem.translate.name || '' }}
        </h4>
        <div>
          <p
            class="text-[12px] text-gray flex gap-2 items-center text-gray-500"
          >
            <ClockIcon /> {{ getVNDate(dataItem.date_start) }} -
            {{ getVNDate(dataItem.date_end) }}
          </p>
          <p
            class="text-[12px] text-gray flex gap-2 items-center text-gray-500"
          >
            <PositionIcon /> {{ dataItem.address }}
          </p>
        </div>
        <p
          v-dompurify-html="dataItem.translate.detail || dataItem.detail"
          class="line-clamp-2 text-sm"
        />
      </div>
      <img
        class="w-full aspect-video hidden md:block"
        :src="dataItem.imageUrl"
      />
    </div>
  </div>
</template>
