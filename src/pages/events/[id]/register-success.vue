<script setup lang="ts">
import IconSuccess from '~icons/ooui/success'
const { t } = useI18n()
const router = useRouter()

definePageMeta({ layout: 'page' })
useHead({
  titleTemplate: '',
  title: t('message.success.register_event_successfully'),
})
</script>

<template>
  <div
    class="bg-white my-[30px] mx-auto max-w-4xl py-10 px-16 h-[calc(100vh-200px)] flex flex-col items-center justify-center gap-4"
  >
    <IconSuccess class="text-[40px] text-green-500" />
    <h4 class="text-2xl text-center font-semibold pb-3">
      {{ t('events.message_success') }}
    </h4>
    <div class="flex gap-2">
      <button
        class="bg-secondary text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600"
        @click="router.push('/')"
      >
        {{ t('page.home') }}
      </button>
      <button
        class="bg-green-500 text-white px-3 py-1.5 rounded text-sm hover:bg-green-600"
        @click="router.push('/events')"
      >
        {{ t('page.expo_register') }}
      </button>
    </div>
  </div>
</template>
