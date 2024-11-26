<template>
  <div class="flex gap-3">
    <CommonTableTemplateImage
      v-for="(item, index) in data"
      :key="index"
      :url="item.image"
      :style="imageStyle"
    />
  </div>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import type { IRes } from '~/interfaces/res_type'
const props = defineProps({
  route: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  imageStyle: {
    type: String,
    default: '',
  },
})

const { getAll } = useApi(props.route)

const data = ref<any>([])

// Fetch data
const fetchData = async () => {
  try {
    const res = (await getAll({
      'sort[created_at]': 'desc',
    })) as IRes
    data.value = res.data
  } catch (error) {}
}

onMounted(() => {
  fetchData()
})
</script>

<style></style>
