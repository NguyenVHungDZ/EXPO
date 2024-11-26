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
            {{ t('register.placeholder_password') }}
          </h1>
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
            <el-form-item :label="t('register.password')" prop="password">
              <el-input
                v-model="formState.password"
                type="password"
                :placeholder="t('register.placeholder_password')"
                show-password
            /></el-form-item>
            <div class="flex items-center justify-between">
              <el-checkbox
                v-model="formState.remember"
                :label="t('login.remember')"
              />
              <a
                href="/forgot-password"
                class="text-sm font-medium text-primary hover:underline"
                >{{ t('login.forgot_password') }}</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="disabledButton ? 'opacity-70 cursor-not-allowed' : ''"
              :disabled="disabledButton"
            >
              {{ t('register.login') }}
            </button>
            <div class="flex justify-center items-center">
              <hr class="w-full" />
              <p class="px-3">
                {{ t('login.or') }}
              </p>
              <hr class="w-full" />
            </div>
          </el-form>
          <div class="grid grid-cols-3 gap-3">
            <button
              class="border rounded flex items-center gap-2 px-2 py-1 justify-center hover:bg-gray-100 cursor-pointer"
              @click="onLoginWith('google')"
            >
              <icon-google class="text-[30px]" />
            </button>
            <button
              class="border rounded flex items-center gap-2 px-2 py-1 justify-center hover:bg-gray-100 cursor-pointer"
              @click="onLoginWith('github')"
            >
              <icon-github class="text-[30px]" />
            </button>
            <button
              class="border rounded flex items-center gap-2 px-2 py-1 justify-center hover:bg-gray-100 cursor-pointer"
              @click="onLoginWith('facebook')"
            >
              <icon-facebook class="text-[30px]" />
            </button>
          </div>

          <p class="text-sm font-light text-gray-500">
            {{ t('login.dont_have_account') }}
            <a href="/register" class="font-medium text-primary hover:underline"
              >{{ t('register.register') }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import authRequest from '~/composables/request/auth'
import IconGoogle from '~icons/devicon/google'
import IconGithub from '~icons/devicon/github'
import IconFacebook from '~icons/devicon/facebook'
import useApi from '~/composables/request/useApi'

interface FormState {
  username: string
  password: string
  remember: boolean
}

definePageMeta({ layout: 'blank' })
useHead({ titleTemplate: '', title: 'login' })

const router = useRouter()
// Retrieve token from cookie
const token = useCookie('expo_token')

const { login: currentLogin } = authRequest()
const { t } = useI18n()
// Create a reactive object for form filling
const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
})

const ruleForm = ref()
// Rule validation for form filling
const rules = reactive<FormRules<FormState>>({
  username: [
    {
      required: true,
      message: t('login.input_username'),
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: t('login.input_password'),
      trigger: ['blur', 'change'],
    },
  ],
  remember: [],
})

const onLoginWith = async (platform: string) => {
  try {
    const { getAll: getLoginUrl } = useApi(`auth/${platform}`)
    const res = (await getLoginUrl()) as any
    window.open(
      res.location,
      platform === 'google'
        ? 'Base login with google'
        : platform === 'github'
          ? 'Base login with github'
          : 'Base login with facebook',
      'height=700,width=500,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,modal=yes',
    )
  } catch (error) {}
}

const disabledButton = ref(true)

const submitForm = async (e: any) => {
  // Prevent any events when submit form
  e.preventDefault()
  try {
    if (!disabledButton.value) {
      const res = await currentLogin({
        username: formState.username,
        password: formState.password,
      })
      if (res.status === 200) {
        ElMessage.success(t('login.success'))
        token.value = await res.json()
        setTimeout(() => {}, 2000)
        // router.push('/')
      } else {
        ElMessage.warning(t('login.check_again'))
      }
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
watch(
  formState,
  () => {
    if (ruleForm.value)
      ruleForm.value.validate((valid: any) => {
        if (valid) disabledButton.value = false
        else disabledButton.value = true
      })
  },
  { immediate: true },
)

watch(
  token,
  (value) => {
    if (value) {
      window.location.reload()
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
:deep(.el-checkbox__label) {
  color: theme('colors.primary.DEFAULT') !important;
}
</style>
