<script setup lang="ts">
import { defineProps, watchEffect } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { options } from '~/assets/chartData.js'

ChartJS.register(ArcElement, Tooltip, Legend)
const { t } = useI18n()

const data = ref<any>({})

const props = defineProps({
  dataItem: {
    type: Object,
    default: () => {},
  },
})

watchEffect(() => {
  data.value = {
    labels: props.dataItem.expo,
    datasets: [
      {
        label: t('dashboard.pie_chart'),
        data: props.dataItem.count,
        backgroundColor: [
          'rgb(46,176,250)',
          'rgb(240,163,196)',
          'rgb(179,185,201)',
          'rgb(128, 128, 0)',
          'rgb(0, 0, 255)',
          'rgb(255, 255, 0)',
          'rgb(0, 255, 255)',
          'rgb(53, 129, 205)',
          'rgb(163, 9, 205)',
          'rgb(63, 19, 25)',
        ],
      },
    ],
  }
})
</script>
<template>
  <Pie :data="data" :options="options" />
</template>
