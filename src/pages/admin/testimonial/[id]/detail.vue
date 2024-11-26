<template>
  <div>
    <DetailItemAdmin
      routes="Testimonial"
      :params="params"
      :template-data="testimonial"
    />
  </div>
</template>

<script lang="ts" setup>
import { testimonial } from '~/assets/detailData'

const params = {}

// layout
definePageMeta({
  layout: 'admin',
})
</script>
