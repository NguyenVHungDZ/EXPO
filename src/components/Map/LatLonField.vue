<template>
  <div class="w-full mt-2">
    <el-form class="2xl:flex w-full flex-col 2xl:flex-row" label-position="top">
      <el-form-item :label="t('datatable.lat')" class="2xl:flex 2xl:mr-[100px]">
        <el-input-number v-model="lat"
      /></el-form-item>
      <el-form-item :label="t('datatable.lon')" class="2xl:flex">
        <el-input-number v-model="lon"
      /></el-form-item>
    </el-form>
    <Map
      class="mt-3"
      :is-get-location="true"
      :location="{ lat, lon }"
      :style="'height: 20rem;'"
      @get-location="getLocation"
    />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['changeData'])

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})
// Variables for longtitude and lattitude
const lat = ref(21.028511)
const lon = ref(105.804817)
const { t } = useI18n()
const getLocation = (location: any) => {
  emit('changeData', {
    lat: location.lat || 21.028511,
    lon: location.lon || 105.804817,
  })
}

watch(
  props,
  () => {
    const location = props.data
    // If valid location is provided, then update
    if (location && location.lat && location.lon) {
      lat.value = location.lat
      lon.value = location.lon
    }
  },
  { immediate: true },
)
onMounted(() => {
  emit('changeData', {
    lat: 21.028511,
    lon: 105.804817,
  })
})
</script>

<style scoped>
:deep(.el-form-item .el-form-item) {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
