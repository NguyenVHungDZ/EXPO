<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="/"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
      >
        <img class="w-20 h-20 mr-2" src="/favicon.ico" alt="logo" />
      </a>
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <el-form
            ref="ruleForm"
            :model="formState"
            class="space-y-4 md:space-y-6"
            label-position="top"
            :rules="rules"
            action=""
            @submit="submitForm"
          >
            <el-form-item :label="t('change_password.reset')" prop="resetCode">
              <el-input v-model="formState.resetCode" />
            </el-form-item>
            <el-form-item :label="t('register.password')" prop="password">
              <el-input
                v-model="formState.password"
                type="password"
                :placeholder="t('register.placeholder_password')"
                show-password
            /></el-form-item>
            <el-form-item
              :label="t('register.confirm_password')"
              prop="rePassword"
            >
              <el-input
                v-model="formState.rePassword"
                type="password"
                :placeholder="t('register.placeholder_password')"
                show-password
            /></el-form-item>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="disabledButton ? 'opacity-70 cursor-not-allowed' : ''"
              :disabled="disabledButton"
            >
              {{ disabledButton }}
              {{ t('button.submit') }}
            </button>
            <p class="text-sm font-light text-gray-500">
              {{ t('change_password.wait') }}
              <a
                href="/login"
                class="font-medium text-blue-600 hover:underline cursor-pointer"
                >{{ t('register.login') }}</a
              >
            </p>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// done
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import authRequest from '../composables/request/auth'

// Define the structure of Form
interface FormState {
  resetCode: string
  password: string
  rePassword: string
  confirm: boolean
}

definePageMeta({ layout: 'blank' })
useHead({ titleTemplate: '', title: 'Register' })

// Reactive state for form, initialized with default value
const formState = reactive<FormState>({
  resetCode: '',
  password: '',
  rePassword: '',
  confirm: true,
})

const router = useRouter()
const ruleForm = ref()
const { t } = useI18n()

// Custom validation function for password, ensuring password meets criteria
const validatePass = (rule: any, value: string, callback: any) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  if (!value) {
    callback(new Error(t('login.input_password')))
  } else if (!value.match(regex)) {
    callback(new Error(t('change_password.rule_password')))
  } else {
    if (formState.rePassword !== '') {
      ruleForm.value.validateField('rePassword')
    }
    callback()
  }
}

// Form validation rules for each field using Element Plus `FormRules`
const rules = reactive<FormRules<FormState>>({
  resetCode: [
    {
      required: true,
      message: t('change_password.input_reset_code'),
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: t('login.input_password'),
      trigger: ['blur', 'change'],
    },
    { validator: validatePass, trigger: 'blur' },
  ],
  rePassword: [
    {
      required: true,
      message: t('login.input_confirm_password'),
      trigger: 'change',
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== formState.password) {
          callback(new Error(t('login.error_confirm_password')))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  confirm: [],
})

// State of the submit button
const disabledButton = ref(true)

// Constantly watch the 'formState' and control the submit button state
watch(
  formState,
  () => {
    if (ruleForm.value)
      ruleForm.value.validate((valid: any) => {
        // Enable button if form is valid
        if (valid && formState.confirm) disabledButton.value = false
        // Disable button otherwise
        else disabledButton.value = true
      })
  },
  { immediate: true }, // Immediately run validation when formState is initailized
)

// Handle form for resetting the password
const submitForm = async (e: any) => {
  e.preventDefault()
  try {
    // Check if submit button is enabled
    if (!disabledButton.value) {
      const res = await authRequest().resetPassword({
        reset_code: formState.resetCode,
        password: formState.password,
      })
      ElMessage.success(t('change_password.success'))
      router.push('/login') // Redirect to login page
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
</script>

<style>
:deep(input) {
  padding: 0.625rem !important;
}
</style>
