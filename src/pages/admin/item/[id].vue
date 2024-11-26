<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>

    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        :label-width="windowWidth > 765 ? '200px' : '100px'"
        class="demo-ruleForm py-10 w-full md:w-[80%] flex-col sm:flex-row"
        :size="formSize"
        status-icon
        :label-position="windowWidth > 550 ? 'right' : 'top'"
      >
        <!--input name -->
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name" placeholder="Name" />
        </el-form-item>

        <!-- input status -->
        <el-form-item label="Status" prop="status">
          <el-select v-model="ruleForm.status" placeholder="Activity zone">
            <el-option label="Active" value="Active" />
            <el-option label="Disable" value="Disable" />
          </el-select>
        </el-form-item>

        <!-- textarea -->
        <el-form-item label="Description" prop="description" class="flex-1">
          <el-input
            v-model="ruleForm.description"
            type="textarea"
            class="h-fulls"
            placeholder="Description"
          />
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <div class="space-x-2">
            <button
              class="rounded px-2 bg-white border text-black hover:bg-gray-100"
              @click.prevent="resetForm(ruleFormRef)"
            >
              Reset
            </button>
            <button
              class="px-2 bg-primary hover:bg-secondary rounded text-white"
              @click.prevent="submitForm(ruleFormRef)"
            >
              {{
                $route.params.id === 'new'
                  ? t('button.create')
                  : t('button.edit')
              }}
            </button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IItem } from '~/interfaces/item'
import useApi from '~/composables/request/useApi'

const { get, update, create } = useApi('Item')

// get id url
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params?.id)
const windowWidth = ref(0)

// form
const formSize: any = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IItem>({
  name: '',
  status: '',
  description: '',
})

// validate form
const rules = reactive<FormRules<IItem>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  status: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  description: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

// call api
const fetchDataItem = async () => {
  try {
    const res: IItem | any = await get(id.value)
    const newData = { ...res, status: res.status === 1 ? 'Active' : 'Disabled' }
    for (const item of Object.keys(ruleForm)) {
      ruleForm[item] = newData[item]
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// watch state
watch(
  id,
  async (value: any) => {
    if (value && value !== 'new') await fetchDataItem()
  },
  { immediate: true },
)

// handle rest form
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// handle convert to number
const convertToNumber = (data: string | number) =>
  typeof data === 'number' ? data : data === 'Active' ? 1 : 0

// handle update item
const updateItem = async () => {
  const newItem = {
    ...ruleForm,
    status: convertToNumber(ruleForm.status),
  }

  try {
    await update(id.value, newItem)
    router.push('/admin/item')
    ElMessage.success('Cập nhật thành công!')
  } catch (error) {
    ElMessage.error('Cập nhật thất bại')
  }
}

// handle create item
const createItem = async () => {
  const newItem = {
    ...ruleForm,
    status: convertToNumber(ruleForm.status),
  }

  try {
    await create(newItem)
    router.push('/admin/item')
    ElMessage.success('Thêm thành công!')
  } catch (error) {
    ElMessage.error('Thêm thất bại')
  }
}

// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      id.value !== 'new' ? updateItem() : createItem()
    }
  })
}

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
