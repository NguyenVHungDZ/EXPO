<template>
  <div class="flex gap-3 flex-col">
    <div class="w-full flex justify-between">
      <h1 class="text-black font-bold text-[24px]">
        {{ t('title-admin-page.file_management') }}
      </h1>
    </div>

    <div
      class="w-full flex justify-end bg-white py-[8px] px-[10px] rounded-[4px]"
    >
      <el-input
        v-model="searchKeyword"
        :placeholder="t('input_rule.search_input')"
        class="p-[10px]"
      >
        <template #append>
          <el-button @click="handleSearch">
            <icon-round-search class="text-[18px]" />
          </el-button>
        </template>
      </el-input>
    </div>

    <div class="w-full flex items-start flex-col mt-2 lg:flex-row">
      <div
        class="bg-white lg:w-[250px] pb-4 mr-5 mb-5 w-full rounded-[4px] flex-1"
      >
        <div class="p-4 w-full">
          <nuxt-link
            to="/admin/file/upload"
            class="text-white font-bold flex justify-center items-center w-full bg-[#409eff] p-2 hover:bg-[#398fe6] rounded-md"
          >
            <icon-baseline-plus class="text-[20px]" />
            <span>{{ t('upload.upload') }}</span>
          </nuxt-link>
        </div>
        <ul class="px-4 lg:px-2 xl:px-3 w-full lg:w-[140px] xl:w-[200px]">
          <li v-for="item in FILE_MENU" :key="item.id" class="w-full">
            <hr v-if="item.isDivider" class="my-1" />
            <a
              v-else
              class="cursor-pointer flex items-center py-1 hover:bg-gray-200 w-full mb-[3px]"
              :class="item.label === activeFieldFilter ? 'active_field ' : ''"
              @click="pickFieldFilter(item)"
            >
              <component :is="item.icon" class="w-15 lg:w-8 xl:w-10" />
              <span class="text-sm">{{ t(`datatable.${item.trans}`) }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="w-full">
        <common-data-table
          :is-add="false"
          :get-data="getAll"
          :columns="COLUMNS_TABLE.FILE"
          :remove-data="remove"
          :show-search="false"
          :operation="false"
          :is-fill="isFill"
          :params="params"
          :is-back="isBack"
          :keyword-search="bindKeyword"
          :is-translate="false"
          :restore="restore"
          :filter-label-file="activeFieldFilter"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFieldFilter } from '~/interfaces/file'
import useApi from '~/composables/request/useApi'
import { FILE_MENU } from '~/assets/fileMenu'
import { COLUMNS_TABLE } from '~/assets/data'
import IconRoundSearch from '~icons/ic/round-search'
import IconBaselinePlus from '~icons/ic/baseline-plus'

const { getAll, restore, remove } = useApi('File')

const { t } = useI18n()

const activeFieldFilter = ref<string | undefined>('Home')

const isFill = ref(true)
const isBack = ref(false)

const searchKeyword = ref<string>('')

const bindKeyword = ref<string>('')

const handleSearch = () => {
  bindKeyword.value = searchKeyword.value
}

// Params filter
const params = ref({})

// Pick field filter
const pickFieldFilter = (item: IFieldFilter | any) => {
  activeFieldFilter.value = item.label
  if (item.label === 'Home') {
    isFill.value = true
    isBack.value = false
    params.value = {}
  } else if (
    item.label === 'Images' ||
    item.label === 'Videos' ||
    item.label === 'Documents'
  ) {
    isFill.value = true
    isBack.value = false
    params.value = {
      'filter[mimetype][$stringContains]': item.key,
    }
  } else if (item.label === 'Trash') {
    isFill.value = false
    isBack.value = true
    params.value = {
      'filter[deleted_at][$null]': false,
      withDeleted: true,
    }
  } else if (item.label === 'Share') {
    isBack.value = false
    isFill.value = false
    isFill.value = false
    params.value = {
      'filter[is_public]': 'true',
    }
  }
}
</script>

<style scoped>
:deep(input) {
  padding: 10px;
}

.active_field {
  background-color: #cfd4da;
  border-radius: 2px;
}
</style>
