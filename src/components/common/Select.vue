<script lang="ts" setup>
import useApi from '~/composables/request/useApi'

type option = {
  value: string
  label: string
}
const emit = defineEmits(['onChangeData'])
const props = defineProps({
  route: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [] as option[],
  },
  defaultValue: {
    type: String,
    default: '',
  },
  dataForm: {
    type: Object,
    default: () => {},
  },
})

const optionSelect = ref<option[]>([])
const value = ref<string>('')

// Fetch data
const fetchData = async () => {
  try {
    const { getAll } = useApi(props.route)
    const res: any = await getAll({ withCount: true })
    optionSelect.value = [] as option[]
    for (const item of res.data) {
      optionSelect.value.push({
        value: item._id,
        label: item.name,
      })
    }
    // Fetch data by page
    const pageCount = res.count / 10
    const pageNumber = Number(pageCount.toFixed())
    for (let i = 0; i < pageNumber; i++) {
      const resPageData: any = await getAll({
        withCount: true,
        offset: (i + 1) * 10,
      })
      for (const item of resPageData.data) {
        optionSelect.value.push({
          label: item._id,
          value: item.name,
        })
      }
    }
  } catch (error) {}
}

// Watch effect to handle initialization and prop changes
watchEffect(async () => {
  if (props.route && !props.options.length) {
    await fetchData()
  } else {
    optionSelect.value = props.options
  }

  if (props.defaultValue) value.value = props.defaultValue
  else if (optionSelect.value.length) value.value = optionSelect.value[0].value
})

watch(
  value,
  (value) => {
    emit('onChangeData', value)
  },
  { immediate: true },
)
</script>

<template>
  <el-select
    v-model="value"
    filterable
    :placeholder="placeholder"
    style="width: 100%"
  >
    <el-option
      v-for="item in optionSelect"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>
