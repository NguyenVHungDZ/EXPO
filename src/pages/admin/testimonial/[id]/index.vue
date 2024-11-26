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
        :label-width="windowWidth > 765 ? '200px' : '100px'"
        class="demo-ruleForm py-10 w-full md:w-[80%] flex-col sm:flex-row"
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

        <!--input company -->
        <el-form-item :label="t('datatable.company')" prop="company">
          <el-input
            v-model="ruleForm.company"
            :placeholder="t('datatable.company')"
          />
        </el-form-item>

        <!--input address -->
        <el-form-item :label="t('datatable.address')" prop="address">
          <el-input
            v-model="ruleForm.address"
            :placeholder="t('datatable.address')"
          />
        </el-form-item>

        <!--input position -->
        <el-form-item :label="t('datatable.position')" prop="position">
          <el-input
            v-model="ruleForm.position"
            :placeholder="t('datatable.position')"
          />
        </el-form-item>

        <!--input rate -->
        <el-form-item :label="t('datatable.rate')" prop="rate">
          <el-rate
            v-model="ruleForm.rate"
            show-score
            allow-half
            text-color="#ff9900"
            :score-template="`${ruleForm.rate} points`"
          />
        </el-form-item>

        <!-- textarea -->
        <el-form-item :label="t('datatable.quote')" prop="quote" class="flex-1">
          <TiptapEditor v-model="ruleForm.quote" />
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <div class="space-x-2">
            <button
              class="rounded px-2 border text-black hover:bg-gray-100"
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
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { ITestimonial } from '~/interfaces/testimonial'
import useApi from '~/composables/request/useApi'

const { get, update, create } = useApi('Testimonial')
const { t } = useI18n()
// get id url
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params?.id)
const windowWidth = ref(0)

// form
const formSize: any = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<ITestimonial>({
  name: '',
  company: '',
  address: '',
  position: '',
  rate: 0,
  quote: '',
})

// validate form
const rules = reactive<FormRules<ITestimonial>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],

  company: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
  address: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
  position: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
  rate: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
  quote: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

// call api
const fetchDataItem = async () => {
  try {
    const res: ITestimonial | any = await get(id.value)

    for (const item of Object.keys(ruleForm)) {
      ruleForm[item] = res[item]
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
    router.push('/admin/testimonial')
    ElMessage.success('Cập nhật thành công!')
  } catch (error) {
    ElMessage.error('Cập nhật thất bại')
  }
}

// handle create item
const createItem = async () => {
  try {
    await create(ruleForm)
    router.push('/admin/testimonial')
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
