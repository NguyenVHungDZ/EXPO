<template>
  <el-form
    ref="ruleForm"
    class="demo-ruleForm lg:w-[100%]"
    :model="formState"
    label-position="top"
    :rules="rules"
    action=""
    @submit="submitForm"
  >
    <el-form-item :label="t('form.old-password')" prop="oldPassword">
      <el-input
        v-model="formState.oldPassword"
        type="password"
        :placeholder="t('input_rule.password')"
        show-password
    /></el-form-item>
    <el-form-item :label="t('form.new-password')" prop="newPassword">
      <el-input
        v-model="formState.newPassword"
        type="password"
        :placeholder="t('input_rule.password')"
        show-password
    /></el-form-item>
    <el-form-item :label="t('form.confirm-password')" prop="rePassword">
      <el-input
        v-model="formState.rePassword"
        type="password"
        :placeholder="t('input_rule.password')"
        show-password
    /></el-form-item>

    <div class="flex justify-end mt-[20px]">
      <button
        type="submit"
        class="w-[80px] text-white bg-secondary hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-sm px-5 py-2.5 text-center"
        :class="disabledButton ? 'opacity-70 cursor-not-allowed' : ''"
        :disabled="disabledButton"
      >
        {{ t('button.save') }}
      </button>
    </div>
  </el-form>
</template>

<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'
import { useUser } from '~/stores/user'

const userStore = useUser()

const router = useRouter()
const { t } = useI18n()
// api
const { updateProfile } = useApi('auth/change-password')

interface FormState {
  newPassword: string
  oldPassword: string
  rePassword: string
}
const formState = reactive<FormState>({
  newPassword: '',
  oldPassword: '',
  rePassword: '',
})

const ruleForm = ref()

// validate password
const validatePass = (rule: any, value: string, callback: any) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  if (!value) {
    callback(new Error(t('input_rule.password')))
  } else if (!value.match(regex)) {
    callback(new Error(t('input_rule.password-rule')))
  } else {
    if (formState.rePassword !== '') {
      ruleForm.value.validateField('rePassword')
    }
    callback()
  }
}

// rules
const rules = reactive<FormRules<FormState>>({
  oldPassword: [
    {
      required: true,
      message: t('input_rule.password'),
      trigger: ['blur', 'change'],
    },
    { validator: validatePass, trigger: 'blur' },
  ],
  newPassword: [
    {
      required: true,
      message: t('input_rule.password'),
      trigger: ['blur', 'change'],
    },
    { validator: validatePass, trigger: 'blur' },
  ],
  rePassword: [
    {
      required: true,
      message: t('input_rule.confirm-password'),
      trigger: 'change',
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== formState.newPassword) {
          callback(new Error(t('input_rule.password-not-match')))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})
const disabledButton = ref(true)

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

// submit change password, success -> page login
const submitForm = async (e: any) => {
  e.preventDefault()
  const newData = {
    password: formState.newPassword,
    old_password: formState.oldPassword,
  }
  try {
    await updateProfile(newData)
    userStore.removeUserInfo()
    ElMessage.success('Thay đổi mật khẩu thành công!')
    router.push('/login')
  } catch (error) {
    ElMessage.error('Thay đổi mật khẩu thất bại!')
  }
}
</script>
