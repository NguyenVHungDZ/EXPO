<script lang="ts" setup>
import moment from 'moment'
import type { IEvent } from '~/interfaces/event'
import useApi from '~/composables/request/useApi'
import IconEmail from '~icons/ic/outline-email'
import IconPhone from '~icons/ph/phone'
import FormCountIcon from '~icons/clarity/form-line'
import IconWebsite from '~icons/mdi/web'
import IconAddress from '~icons/mdi/address-marker-outline'
import RejectFormIcon from '~icons/fluent/text-change-reject-20-filled'
import ElCheckIcon from '~icons/icon-park-outline/doc-success'
import PendingFormIcon from '~icons/ic/baseline-pending-actions'
const { t } = useI18n()
</script>
<template>
  <div>
    <el-skeleton-item
      variant="image"
      class="w-full h-[25rem]"
      style="height: 25rem"
    />
    <div class="py-10 space-y-8 px-20">
      <div>
        <el-skeleton-item variant="h1" />
        <div class="flex text-sm">
          <p class="border-r pr-5 mr-5 flex w-60 items-center gap-2">
            <el-skeleton-item variant="text" /> -
            <el-skeleton-item variant="text" />
          </p>
          <div class="flex gap-3">
            <p class="flex items-center gap-1">
              <FormCountIcon class="text-blue-600" />0
            </p>
            <p class="flex items-center gap-1">
              <ElCheckIcon class="text-green-600" />0
            </p>
            <p class="flex items-center gap-1">
              <PendingFormIcon class="text-yellow-600" />0
            </p>
            <p class="flex items-center gap-1">
              <RejectFormIcon class="text-red-600" />0
            </p>
          </div>
        </div>
      </div>
      <div>
        <el-skeleton-item v-for="(item, key) in 6" :key="key" variant="text" />
      </div>

      <div class="flex font-bold justify-end items-center">
        <p>--</p>
        <el-skeleton-item variant="text" style="width: 50px" />
        <p>--</p>
      </div>
      <hr />

      <!-- banner -->
      <div class="grid lg:grid-cols-2 gap-4">
        <div class="space-y-5">
          <!-- contact -->
          <p class="text-[16px] font-bold">
            {{ t('events.information') }}
          </p>
          <div class="px-5 pb-5 space-y-4">
            <div class="space-x-2 flex items-center border-b border-dotted">
              <IconEmail class="text-blue-500" /><el-skeleton-item
                variant="text"
              />
            </div>
            <div class="space-x-2 flex items-center border-b border-dotted">
              <IconPhone class="text-blue-500" /><el-skeleton-item
                variant="text"
              />
            </div>
            <div class="space-x-2 flex items-center border-b border-dotted">
              <IconAddress class="text-blue-500" /><el-skeleton-item
                variant="text"
              />
            </div>
            <div class="space-x-2 flex items-center border-b border-dotted">
              <IconWebsite class="text-blue-500" /><el-skeleton-item
                variant="text"
              />
            </div>
          </div>

          <!-- register -->
        </div>

        <!-- map -->
        <div class="space-y-4">
          <p class="text-[16px] font-bold">{{ t('events.position_event') }}:</p>
          <el-skeleton-item variant="image" :style="'height: 20rem;'" />
        </div>
      </div>
    </div>
  </div>
</template>
