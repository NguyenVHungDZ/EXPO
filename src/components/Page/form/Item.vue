<template>
  <div :class="{ 'container mx-auto py-10 px-5': layout === 'page' }">
    <DetailItemAdmin
      :title="layout === 'admin' ? '' : 'form.register_content'"
      routes="Form"
      :params="params"
      :is-edit="false"
      :template-data="form"
      :is-translate="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { form } from '~/assets/detailData'

const params = {
  'populate[event]': true,
  'populate[user]': true,
  'populate[form_booth]': true,
}
const route = useRoute()

const layout = computed(() =>
  route.fullPath.includes('admin') ? 'admin' : 'page',
)
</script>
