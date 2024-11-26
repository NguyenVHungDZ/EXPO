<template>
  <el-select
    v-model="selectValue"
    :class="className"
    filterable
    :style="style"
    @change="updateData"
  >
    <div v-infinite-scroll="fetchData" class="max-h-60">
      <el-option
        v-for="(item, index) in data"
        :key="index"
        :label="item[labelOption]"
        :value="item['_id']"
      >
        <p v-dompurify-html="item[labelOption]" />
      </el-option>
    </div>
    <template #selection>123</template>
  </el-select>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, watch } from 'vue'
import useApi from '~/composables/request/useApi'
import type { IRes } from '~/interfaces/res_type'

const emit = defineEmits(['onChangeData'])

const props = defineProps({
  route: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  style: {
    type: String,
    default: '',
  },
  labelOption: {
    type: String,
    default: 'name',
  },
  value: {
    type: String,
    default: '',
  },
})

const { getAll, get } = useApi(props.route)
const selectValue = ref('')

const page = ref(1)
const data = ref<any>([])

const fetchData = async () => {
  try {
    if (page.value) {
      if (props.value) {
        const checkData = data.value.find((x: any) => x._id === props.value)
        if (!checkData) {
          const resItem = (await get(props.value)) as any
          if (resItem && resItem._id) data.value.push(resItem)
        }
      }
      // Fetch data by page
      const res = (await getAll({
        offset: (page.value - 1) * 10,
      })) as IRes
      data.value = data.value.concat(
        res.data.filter((x: any) => x._id !== props.value),
      )
      if (res.data.length < 10) page.value = 0
      else page.value += 1
    }
    if (props.value) selectValue.value = props.value
    else selectValue.value = data.value[0]._id
  } catch (error) {}
}

// Handle change data
const updateData = (value: string) => {
  emit('onChangeData', value)
}

onMounted(async () => await fetchData())

// When props are changed, reset 'data' and 'page'
watch(props, async () => {
  data.value = []
  page.value = 1
  await fetchData()
})
</script>

<style></style>
