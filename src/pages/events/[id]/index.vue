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
import { useUser } from '~/stores/user'
import '~/assets/tiptap.scss'

const { get, getFile } = useApi('Event')
const getForm = useApi('Form').getAll({ 'populate[user]': true })
const { t, locale } = useI18n()
const title = ref('')
const route = useRoute()
const { id } = route.params
// Create an object to store event's information
const data = ref<IEvent>({
  name: '',
  date_start: '',
  date_end: '',
  detail: '',
  phone: '',
  latitude: 21.028511,
  longitude: 105.804817,
  email: '',
  event_expo_id: '',
  address: '',
  featured_image: '',
  imageUrl: '/images/default.webp',
  website: '',
  translate: {},
  user: {
    name: '',
  },
  forms_count: 0,
  forms_status_count: {
    approved: 0,
    pending: 0,
    rejected: 0,
  },
})
const userStore = useUser()
const user = computed(() => userStore.getInformation)
const loading = ref(true)
const userForm = ref({ status: 'register' })
const formatDate = (date: string) => moment(date).format('DD/MM/YYYY hh:mm')
definePageMeta({ layout: 'page' })

// Function to simulate a delay
const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}
// Fetch data
const fetchData = async () => {
  try {
    loading.value = true
    const res: any = await get(id, {
      'populate[eventType]': true,
      'populate[user]': true,
      language: locale.value,
    })
    data.value = res
    try {
      // Fetch image if available, if not then show default image
      const imageRes = await getFile(data.value.featured_image || '')
      const reader = new FileReader()
      reader.readAsDataURL(imageRes as any)
      reader.onloadend = function () {
        const base64data = reader.result
        data.value.imageUrl = String(base64data) || '/images/default.webp'
      }
    } catch (error) {
      data.value.imageUrl = '/images/default.webp'
    }
    title.value = data.value.translate.name || ''
  } catch (error) {
  } finally {
    // Simulate a delay in loading process
    await sleep(200)
    loading.value = false
  }
}

// Fetch data before the component is mounted
onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <div class="container mx-auto bg-white my-10">
    <ClientOnly>
      <el-skeleton :loading="loading" animated>
        <template #template>
          <SkeletonEventPage />
        </template>
        <template #default>
          <img
            :src="data.imageUrl || ''"
            class="w-full h-[25rem] object-cover"
          />
          <div class="py-10 space-y-8 px-20">
            <div>
              <h1>{{ data.translate.name || '' }}</h1>
              <div class="flex text-sm">
                <p class="border-r pr-5 mr-5">
                  {{ formatDate(data.date_start) }} -
                  {{ formatDate(data.date_end) }}
                </p>
                <div class="flex gap-3">
                  <p class="flex items-center gap-1">
                    <FormCountIcon class="text-blue-600" />{{
                      data.forms_count || 0
                    }}
                  </p>
                  <p class="flex items-center gap-1">
                    <ElCheckIcon class="text-green-600" />{{
                      data.forms_status_count?.approved || 0
                    }}
                  </p>
                  <p class="flex items-center gap-1">
                    <PendingFormIcon class="text-yellow-600" />{{
                      data.forms_status_count?.pending || 0
                    }}
                  </p>
                  <p class="flex items-center gap-1">
                    <RejectFormIcon class="text-red-600" />{{
                      data.forms_status_count?.rejected || 0
                    }}
                  </p>
                </div>
              </div>
            </div>
            <p
              :innerHTML="data.translate.detail || ''"
              class="tiptap-content"
            />
            <p class="text-right font-bold">-- {{ data.user?.name }} --</p>
            <hr />

            <!-- banner -->
            <div class="grid lg:grid-cols-2 gap-4">
              <div class="space-y-5">
                <!-- contact -->
                <p class="text-[16px] font-bold">
                  {{ t('events.information') }}
                </p>
                <div class="px-5 pb-5 space-y-4">
                  <div
                    class="space-x-2 flex items-center border-b border-dotted"
                  >
                    <IconEmail class="text-blue-500" /><span class="text-sm">{{
                      data.email
                    }}</span>
                  </div>
                  <div
                    class="space-x-2 flex items-center border-b border-dotted"
                  >
                    <IconPhone class="text-blue-500" /><span class="text-sm">{{
                      data.phone
                    }}</span>
                  </div>
                  <div
                    class="space-x-2 flex items-center border-b border-dotted"
                  >
                    <IconAddress class="text-blue-500" /><span
                      class="text-sm"
                      >{{ data.address }}</span
                    >
                  </div>
                  <div
                    class="space-x-2 flex items-center border-b border-dotted"
                  >
                    <IconWebsite class="text-blue-500" /><a
                      class="text-sm hover:text-blue-500 hover:text-underline cursor-pointer"
                      :href="data.website"
                      target="_blank"
                      >{{ data.website }}</a
                    >
                  </div>
                </div>

                <!-- register -->
                <p
                  v-if="userForm.status === 'pending'"
                  class="text-blue-500 font-bold mt-5 hover:text-blue-600 select-none flex"
                >
                  <PendingFormIcon class="mr-1" /> {{ t('events.pending') }}
                </p>
                <p
                  v-else-if="userForm.status === 'approved'"
                  class="text-green-600 font-bold mt-5 hover:text-green-700 select-none flex"
                >
                  <ElCheckIcon class="mr-1" /> {{ t('events.approved') }}
                </p>
                <p
                  v-else-if="userForm.status === 'rejected'"
                  class="text-red-600 font-bold mt-5 hover:text-red-700 select-none flex"
                >
                  <RejectFormIcon class="mr-1" /> {{ t('events.rejected') }}
                </p>
                <nuxt-link
                  v-else
                  :to="`${route.fullPath}/register-booth`"
                  class="text-blue-500 font-bold mt-5 hover:text-blue-600 select-none"
                >
                  {{ t('events.event_register') }} >>
                </nuxt-link>
              </div>

              <!-- map -->
              <div class="space-y-4">
                <p class="text-[16px] font-bold">
                  {{ t('events.position_event') }}:
                </p>
                <Map
                  :location="{ lat: data.latitude, lon: data.longitude }"
                  :style="'height: 20rem;'"
                />
              </div>
            </div>
          </div> </template
      ></el-skeleton>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 2rem !important;
  font-weight: bold !important;
}
h2 {
  font-size: 1.5rem !important;
  font-weight: bold !important;
}
</style>
