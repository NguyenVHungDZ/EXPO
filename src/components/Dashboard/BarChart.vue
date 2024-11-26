<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { defineProps, watchEffect } from 'vue'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  dataItem: {
    type: Object,
    default: () => {},
  },
})

const { t } = useI18n()

const data = ref<any>({})

watchEffect(() => {
  data.value = {
    labels: props.dataItem.expo,
    datasets: [
      {
        label: t('dashboard.approved'),
        data: props.dataItem.approved,
        backgroundColor: ['rgba(0,191,255, .2)'],
        borderColor: ['rgb(255, 99, 132 )'],
        borderWidth: 1,
      },
      {
        label: t('dashboard.pending'),
        data: props.dataItem.pending,
        backgroundColor: ['rgba(255,191,0, 0.2)'],
        borderColor: ['rgb(255, 159, 64)'],
        borderWidth: 1,
      },
      {
        label: t('dashboard.rejected'),
        data: props.dataItem.rejected,
        backgroundColor: ['rgba(226,6,44,.2)'],
        borderColor: ['rgb(255, 159, 64)'],
        borderWidth: 1,
      },
    ],
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
}
// fetch data
</script>
<template>
  <Bar id="my-chart-id" :data="data" :options="options" />
</template>
