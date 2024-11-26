<template>
  <div>
    <!-- field  -->
    <el-form class="flex justify-between gap-2">
      <div class="flex flex-wrap gap-2">
        <el-form-item v-for="(item, key) in columnData" :key="key" class="w-60">
          <el-autocomplete
            v-if="item.index === 'constraint'"
            v-model="autoCompleteRef[item.key]"
            :fetch-suggestions="
              (queryString, cb) => {
                querySearch(queryString, cb, item.foreignKey)
              }
            "
            clearable
            :placeholder="t(item.label)"
            class="w-full"
            @select="
              (e) => {
                handleSelectAutoComplete(e, item.key)
              }
            "
            @clear="onClearSearch(item.key)"
          >
          </el-autocomplete>
          <el-select
            v-else-if="
              item.index === 'select' ||
              item.index === 'role' ||
              item.index === 'tag'
            "
            v-model="searchData[item.key]"
            filterable
            :placeholder="t(item.label)"
          >
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="t(option.label)"
              :value="option.value"
            />
          </el-select>
          <el-date-picker
            v-else-if="item.index === 'date'"
            v-model="
              searchData[
                `filter[${item.key}][$${item.query || 'stringContainsI'}]`
              ]
            "
            format="DD/MM/YYYY"
            value-format="YYYY-MM-DDTHH:mm:ss[Z]"
            type="date"
            :placeholder="t(item.label)"
          />
          <el-input
            v-else
            :model-value="searchData[`filter[${item.key}][$stringContainsI]`]"
            :disabled="isLoading"
            :placeholder="t(item.label)"
            @update:model-value="
              (val) =>
                (searchData[`filter[${item.key}][$stringContainsI]`] = val)
            "
          />
        </el-form-item>
      </div>

      <div
        class="flex flex-col md:flex-row min-w-32 gap-2 flex-wrap md:justify-end content-start"
      >
        <el-tooltip
          placement="bottom"
          trigger="hover"
          :content="t('datatable.search')"
          popper-class="text-center"
          effect="light"
        >
          <button
            class="bg-primary hover:bg-secondary rounded p-2 text-white"
            @click.prevent="handleClick"
          >
            <icon-round-search />
          </button>
        </el-tooltip>

        <!-- clear content search -->
        <el-tooltip
          placement="bottom"
          :content="t('datatable.clear_search')"
          effect="light"
        >
          <button
            class="bg-red rounded hover:bg-red-700 p-2 text-white"
            @click.prevent="onClear"
          >
            <icon-clear />
          </button>
        </el-tooltip>
      </div>
    </el-form>

    <!-- option status form -->
  </div>
</template>
<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import IconRoundSearch from '~icons/ic/round-search'
import IconClear from '~icons/ant-design/clear-outlined'
import useApi from '~/composables/request/useApi'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  columns: {
    type: Array as any,
    default: () => [],
  },
  listIgnored: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})
const { t } = useI18n()

// Filter out ignored columns
const columnData = computed(() => {
  let data = []
  if (props.listIgnored.length) {
    for (const column of props.columns) {
      const item = props.listIgnored.find((x: any) => x === column.key)
      if (!item || item === undefined) {
        data.push(column)
      }
    }
  } else data = props.columns
  return data
})

// Query: query to fetch data
const query = (key: String, query = '') =>
  `filter[${key}][$${query || 'stringContainsI'}]`

const emit = defineEmits(['searchKey'])
const autoCompleteRef = ref<any>({})
const searchKeyword = ref<string>('')
const searchData = ref<any>({})

// Query string: string to search
// Callback: callback function
// Route: route to fetch data
// Query: query to fetch data
const querySearch = async (queryString: string, cb: any, route: string) => {
  const { getAll } = useApi(route)
  const results = []
  const res: any = await getAll(
    { withCount: true },
    `&filter[name][$stringContains]=${queryString}`,
  )
  for (const item of res.data) {
    results.push({
      id: item._id,
      value: item.name,
    })
  }

  // Calculate number of pages and fetch data for remaining pages
  const pageCount = res.count / 10
  const pageNumber = Number(pageCount.toFixed())
  for (let i = 0; i < pageNumber; i++) {
    const resPageData: any = await getAll(
      { withCount: true, offset: (i + 1) * 10 },
      `&filter[name][$stringContains]=${queryString}`,
    )
    for (const item of resPageData.data) {
      results.push({
        id: item._id,
        value: item.name,
      })
    }
  }
  cb(results)
}

const handleSelectAutoComplete = (item: any, key: string) => {
  searchData.value[query(key)] = item.id
}

const onClearSearch = (key: string) => {
  searchData.value[key] = ''
}

const handleClick = () => {
  emit('searchKey', searchKeyword.value)
}

const onClear = () => {
  searchData.value = {}
  searchKeyword.value = ''
  handleClick()
}

// watch search data
// convert to array key
// convert to string
// emit to parent
watch(
  searchData,
  (value) => {
    const keys = Object.keys(value)
    const arrayKey = []
    for (const key of keys) {
      if (value[key]) arrayKey.push(`&${key}=${value[key]}`)
    }
    searchKeyword.value = arrayKey.join('')
  },
  { deep: true },
)
</script>
<style scoped lang="scss">
:deep(.el-form-item__content) {
  width: 100%;
  .el-input {
    width: 100%;
  }
}
:deep(.el-form-item) {
  margin-bottom: 0px;
}
:deep(button.el-button.el-button--danger) {
  margin-left: 0px;
}
</style>
