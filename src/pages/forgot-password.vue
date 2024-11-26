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
          <el-tag class="w-full" type="warning" size="large">{{
            t('forgot_password.input_email')
          }}</el-tag>
          <el-form
            ref="ruleForm"
            :model="formState"
            class="space-y-4 md:space-y-6"
            label-position="top"
            :rules="rules"
            @submit="submitForm"
          >
            <el-form-item :label="t('register.username')" prop="username">
              <el-input v-model="formState.username" />
            </el-form-item>
            <el-form-item :label="t('register.email')" prop="email">
              <el-input v-model="formState.email" />
            </el-form-item>
            <button
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="disabledButton ? 'opacity-70 cursor-not-allowed' : ''"
              :disabled="disabledButton"
            >
              {{ t('button.submit') }}
            </button>
            <p class="text-sm font-light text-gray-500">
              {{ t('change_password.wait') }}
              <a
                href="/login"
                class="font-medium text-blue-600 hover:underline"
              >
                {{ t('register.login') }}
              </a>
            </p>
          </el-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// done
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import authRequest from '../composables/request/auth'

// Declare an interface for form
interface FormState {
  username: string
  email: string
}

definePageMeta({ layout: 'blank' })
useHead({ titleTemplate: '', title: 'login' })

const { forgotPassword } = authRequest()

// Create reactive object
const formState = reactive<FormState>({
  username: '',
  email: '',
})

const ruleForm = ref()
const { t } = useI18n()

// Set rules for form's input
const rules = reactive<FormRules<FormState>>({
  username: [
    {
      required: true,
      message: t('login.input_username'),
      trigger: ['blur', 'change'],
    },
  ],
  email: [
    {
      required: true,
      message: t('login.input_email'),
      trigger: ['blur', 'change'],
    },
    { validator: validateEmail, trigger: ['blur', 'change'] },
  ],
})

const disabledButton = ref(true)

// Function to handle form submission
const submitForm = async (e: any) => {
  // Prevent event e from happening
  e.preventDefault() 
  try {
    if (!disabledButton.value) {
      // Calling the forgotPassword function
      const res = await forgotPassword({
        username: formState.username,
        email: formState.email,
      })
      ElMessage.success(t('forgot_password.email_notification'))
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
// Constantly watch for change in formState
watch(
  formState,
  // Function to run when there is change
  () => {
    // If there is value in ruleForm
    if (ruleForm.value)
      // valiate, enable button if validation passes, otherwise disable it
      ruleForm.value.validate((valid: any) => { 
        if (valid) disabledButton.value = false
        else disabledButton.value = true
      })
  },
  { immediate: true },
)
</script>

<style scoped>
:deep(.el-tag__content) {
  font-size: larger;
}
</style>
