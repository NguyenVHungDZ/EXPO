<template>
  <section class="bg-gray-50">
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
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            {{ t('register.register') }}
          </h1>
          <el-form
            ref="ruleForm"
            :model="formState"
            class="space-y-4 md:space-y-6"
            label-position="top"
            :rules="rules"
            action=""
            @submit="submitForm"
          >
            <el-form-item :label="t('register.username')" prop="username">
              <el-input v-model="formState.username" />
            </el-form-item>
            <el-form-item :label="t('register.email')" prop="email">
              <el-input v-model="formState.email" />
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
            <p class="text-sm align-middle">
              <el-checkbox v-model="formState.confirm"> </el-checkbox>
              {{ t('register.rules') }}
              <NuxtLink class="underline" href="/terms-of-service">{{
                t('register.terms')
              }}</NuxtLink>
            </p>
            <button
              type="submit"
              class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="disabledButton ? 'opacity-70 cursor-not-allowed' : ''"
              :disabled="disabledButton"
            >
              {{ t('register.register') }}
            </button>
            <p class="text-sm font-light text-gray-500">
              {{ t('register.confirm_have_account') }}
              <a
                href="/login"
                class="font-medium text-primary hover:underline"
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
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { validateEmail } from '../composables/validator'
import authRequest from '../composables/request/auth'

interface FormState {
  username: string
  email: string
  password: string
  rePassword: string
  confirm: boolean
}

definePageMeta({ layout: 'blank' })
useHead({ titleTemplate: '', title: 'Register' })

// Create a reactive object from 'FormState' interface
const formState = reactive<FormState>({
  username: '',
  email: '',
  password: '',
  rePassword: '',
  confirm: false,
})
const { t } = useI18n()
const ruleForm = ref()
const router = useRouter()
const { register } = authRequest()

// Set validation rules for input
const validatePass = (rule: any, value: string, callback: any) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  if (!value) {
    callback(new Error(t('message.errors.form.password')))
  } else if (!value.match(regex)) {
    callback(new Error(t('message.errors.form.password_rule')))
  } else {
    if (formState.rePassword !== '') {
      ruleForm.value.validateField('rePassword')
    }
    callback()
  }
}

// Set validation rules for each prop in 'FormState' in 'element-plus' element
const rules = reactive<FormRules<FormState>>({
  username: [
    {
      required: true,
      message: t('message.errors.form.name'),
      trigger: ['blur', 'change'],
    },
  ],
  email: [
    {
      required: true,
      message: t('message.errors.form.email'),
      trigger: ['blur', 'change'],
    },
    {
      validator: validateEmail,
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: t('message.errors.form.password'),
      trigger: ['blur', 'change'],
    },
    { validator: validatePass, trigger: 'blur' },
  ],
  rePassword: [
    {
      required: true,
      message: t('message.errors.form.confirm_password'),
      trigger: 'change',
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== formState.password) {
          callback(new Error(t('message.errors.form.password_not_match')))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  confirm: [],
})

// If true, 'Register' button is unabled
const disabledButton = ref(true)

// Constantly watch for change in ruleForm in order to enable 'Register' button
watch(
  formState,
  () => {
    if (ruleForm.value)
      ruleForm.value.validate((valid: any) => {
        if (valid && formState.confirm) disabledButton.value = false
        else disabledButton.value = true
      })
  },
  { immediate: true },
)

// Handle submit form
const submitForm = async (e: any) => {
  e.preventDefault()
  try {
    if (!disabledButton.value) {
      const res = await register({
        username: formState.username,
        password: formState.password,
        email: formState.email,
      })
      if (res.status === 200) {
        // Using 'ElMessage' to show success message
        ElMessage.success(t('message.success.create_account'))
        router.push('/login')
      } else {
        const data = await res.json()
        // Using 'ElMessage' to show warning
        if (data.message.includes('username'))
          ElMessage.warning(t('message.errors.form.name_invalid'))
        else if (data.message.includes('duplicate'))
          ElMessage.warning(t('message.errors.form.email_exist'))
      }
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
