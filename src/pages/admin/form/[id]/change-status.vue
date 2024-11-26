<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ t('datatable.change_status') }}
    </h3>

    <!-- form -->
    <div>
      <el-form
        :label-width="windowWidth > 765 ? '200px' : '100px'"
        class="demo-ruleForm py-10 w-full md:w-[80%] flex-col sm:flex-row"
        size="default"
        status-icon
        :label-position="windowWidth > 550 ? 'right' : 'top'"
      >
        <el-form-item
          v-for="(item, key) in ruleForm"
          :key="key"
          :label="t(`datatable.${key}`)"
        >
          <!-- change status -->

          <el-select
            v-if="key === 'status'"
            v-model="ruleForm[key]"
            class="w-full"
            placeholder="status"
            @change="(value) => {}"
          >
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="t(`datatable.${option.value}`)"
              :value="option.value"
            />
          </el-select>

          <!-- input -->
          <el-input
            v-else
            :value="ruleForm[key]"
            class="h-full text-black bg-white"
            disabled
          />
        </el-form-item>

        <el-form-item>
          <button
            class="bg-[#29a7ff] text-[white] px-4 rounded mr-[10px]"
            @click.prevent="backPage"
          >
            {{ t('button.back') }}
          </button>

          <button
            class="bg-yellow-500 text-[white] px-4 rounded"
            @click.prevent="onSelect"
          >
            {{ t('save') }}
          </button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'

const options = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
]

const ruleForm = ref({
  _id: '',
  name: '',
  email: '',
  status: '',
})
const { t } = useI18n()
const { get, updateOneField } = useApi('Form')

const windowWidth = ref(0)
const route = useRoute()

const id = route.params?.id

// form
const fetchDataItem = async () => {
  try {
    const res: any = await get(id)

    // Update local state instead of modifying props directly
    Object.assign(ruleForm.value, res)
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// save status
const onSelect = async () => {
  const updateData = {} as any
  const field = 'status'

  updateData[field] = ruleForm.value.status

  try {
    await updateOneField(id, field, updateData)
    backPage()
    ElMessage.success('Update thành công')
  } catch (error) {
    ElMessage.error('Restore file thất bại!')
  }
}

// handle back page
const backPage = () => {
  history.back()
}

watch(
  () => id,
  async () => {
    await fetchDataItem()
  },
  { immediate: true },
)

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})

onUnmounted(() => window.removeEventListener('resize', onWidthChange))

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style></style>
