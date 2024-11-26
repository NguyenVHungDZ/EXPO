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
        class="demo-ruleForm py-10 w-full md:w-[60%] flex-col sm:flex-row"
        :size="formSize"
        status-icon
        :label-position="windowWidth > 550 ? 'right' : 'top'"
      >
        <!--input name -->
        <el-form-item :label="t('datatable.name')" prop="name">
          <el-input
            v-model="ruleForm.name"
            :placeholder="t('datatable.name')"
          />
        </el-form-item>

        <!-- textarea -->
        <!-- <el-form-item label="Description" prop="description" class="flex-1">
          <el-input
            v-model="ruleForm.description"
            type="textarea"
            class="h-fulls"
            placeholder="Description"
          />
        </el-form-item> -->
        <el-form-item
          :label="t('datatable.description')"
          prop="description"
          class="flex-1"
        >
          <div>
            <TiptapEditor v-model="ruleForm['description']" />
          </div>
        </el-form-item>
        <!-- button -->
        <el-form-item>
          <div class="space-x-2">
            <button
              class="rounded px-2 bg-white border text-black hover:bg-gray-100"
              @click.prevent="resetForm(ruleFormRef)"
            >
              {{ t('button.reset') }}
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
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IRequestInterested } from '~/interfaces/request_interested'
import useApi from '~/composables/request/useApi'
import { validateEmail } from '~/composables/validator'

const { get, update, create } = useApi('RequestInterested')
// get id url
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params?.id)
const windowWidth = ref(0)
const { t } = useI18n()
// form
const formSize: any = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IRequestInterested>({
  name: '',
  description: '',
})

const options = ref([])

// validate form
const rules = reactive<FormRules<IRequestInterested>>({
  name: [
    {
      required: true,
      message: t('input_rule.input_event_type_name'),
      trigger: 'blur',
    },
  ],
})

// call api
const fetchDataItem = async () => {
  try {
    const res: IRequestInterested | any = await get(id.value)
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

// handle update item
const updateItem = async () => {
  try {
    await update(id.value, ruleForm)
    router.push('/admin/request-interest')
    ElMessage.success(t('message.success.success'))
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// handle create item
const createItem = async () => {
  try {
    await create(ruleForm)
    router.push('/admin/request-interest')
    ElMessage.success(t('message.success.success'))
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      id.value !== 'new' ? await updateItem() : await createItem()
    }
  })
}

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  // fetchDataExpo()
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style scoped>
:deep(.el-input) {
  width: 100% !important;
}
:deep(.el-select) {
  width: 100% !important;
}
:deep(.el-input-number) {
  width: 100% !important;
}
</style>
