<template>
  <el-card class="lg:w-[90%] p-5">
    <client-only>
      <el-form ref="ruleFormRef" :model="form" :rules="rules">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <div class="grid">
            <el-form-item :label="t('form.name')" prop="name">
              <el-input v-model="form.name" class="" size="large" />
            </el-form-item>
          </div>
          <div class="grid">
            <el-form-item :label="t('form.company_name')" prop="company">
              <el-input v-model="form.company" size="large" />
            </el-form-item>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-2">
          <div class="grid">
            <el-form-item :label="t('form.email')" prop="email">
              <el-input v-model="form.email" size="large" />
            </el-form-item>
          </div>
          <div class="grid">
            <el-form-item :label="t('form.phone')" prop="phone">
              <el-input v-model="form.phone" size="large" />
            </el-form-item>
          </div>
          <div class="grid justify-items-start items-end">
            <el-form-item
              class="w-full"
              :label="t('form.product_interested')"
              prop="eventType_id"
            >
              <el-select
                v-model="form.eventType_id"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in eventTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div class="grid justify-items-start">
            <el-form-item
              class="w-full"
              :label="t('form.kind_event')"
              prop="eventType_id"
            >
              <el-select
                v-model="form.requestInterested_id"
                placeholder="Select"
                size="large"
              >
                <el-option
                  v-for="item in requestInterestOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="grid justify-items-center mt-5">
          <button
            class="transition-all duration-500 bg-gradient-to-r from-blue-300 to-primary text-white py-2 px-3 rounded-3xl hover:from-primary hover:to-blue-300"
            @click="onSubmit(ruleFormRef)"
          >
            {{ t('register.register_infomation') }}
          </button>
        </div>
      </el-form>
    </client-only>
  </el-card>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import useApi from '~/composables/request/useApi'
import { validateEmail } from '~/composables/validator'
interface RuleForm {
  name: string
  email: string
  company: string
  phone: string
  requestInterested_id: string
  eventType_id: string
}

interface optionsType {
  value: string
  label: string
}

const { getAll: getRequestInterests } = useApi('RequestInterested')
const { create } = useApi('Request')
const { getAll: getEventTypes } = useApi('EventType')
const { t, locale } = useI18n()
const ruleFormRef = ref<FormInstance>()
const eventTypeOptions = ref<optionsType[]>([])
const requestInterestOptions = ref<optionsType[]>([])

// Form data
const form = reactive<RuleForm>({
  name: '',
  company: '',
  phone: '',
  email: '',
  requestInterested_id: '',
  eventType_id: '',
})

// Set rules for form validation
const rules = reactive<FormRules<RuleForm>>({
  name: [
    {
      required: true,
      message: t('input_rule.name'),
      trigger: 'blur',
    },
  ],
  company: [
    { required: true, message: t('input_rule.company'), trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: t('input_rule.email'),
      trigger: 'blur',
    },
    {
      validator: validateEmail,
      trigger: ['blur', 'change'],
    },
  ],
  phone: [
    {
      required: true,
      message: t('input_rule.phone'),
      trigger: 'blur',
    },
  ],
})

// Fetch event types from API
const fetchEvenTypes = async () => {
  try {
    const res: any = await getEventTypes({ limit: 100, language: locale.value })
    eventTypeOptions.value = []
    for (const item of res.data) {
      eventTypeOptions.value.push({
        value: item._id,
        label: item.translate.name,
      })
    }
    if (eventTypeOptions.value.length)
      form.eventType_id = eventTypeOptions.value[0].value
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// Fetch request interests from API
const fetchRequestInterested = async () => {
  try {
    const res: any = await getRequestInterests({
      limit: 100,
      language: locale.value,
    })
    requestInterestOptions.value = []
    for (const item of res.data) {
      requestInterestOptions.value.push({
        value: item._id,
        label: item.translate.name,
      })
    }
    if (requestInterestOptions.value.length)
      form.requestInterested_id = requestInterestOptions.value[0].value
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// Watch locale to fetch data when locale changes 
watch(
  locale,
  () => {
    fetchRequestInterested()
    fetchEvenTypes()
  },
  { immediate: true, deep: true },
)

// Fetch data when mounted
onMounted(async () => {
  await fetchEvenTypes()
  await fetchRequestInterested()
})

// Submit form
const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await create(form)
      ElMessage.success('Gửi yêu cầu thành công')
      formEl.resetFields()
    }
  })
}
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  font-size: 15px;
}
:deep(.el-button--large.is-round) {
  border: none;
}
</style>
