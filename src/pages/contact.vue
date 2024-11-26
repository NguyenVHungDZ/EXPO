<script setup lang="ts">
// done
import type { FormRules, FormInstance } from 'element-plus'
import useApi from '~/composables/request/useApi'
import type { IContact } from '~/interfaces/contact'
const { t } = useI18n()
const token = ref()
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: t('page.register_contact') })

const { create } = useApi('Contact')
// Reactive object stores form data
const formData = reactive<IContact>({
  name: '',
  email: '',
  phone: '',
  title: '',
  content: '',
})

const formRef = ref()

// Set validation for input form
const rules = reactive<FormRules<IContact>>({
  name: [
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
    {
      validator: validateEmail,
      trigger: ['blur', 'change'],
    },
  ],
  phone: [
    {
      required: true,
      message: t('login.input_phone'),
      trigger: ['blur', 'change'],
    },
  ],
})

// Reset all field in form to default value
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// Fetching function used to register contact
const onSubmit = async () => {
  try {
    await create(formData)
    ElMessage.success('Đăng ký thành công!')
    resetForm(formRef.value)
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
</script>

<template>
  <div class="bg-white my-5 mx-auto max-w-4xl py-10 px-16 rounded">
    <h4 class="text-2xl text-center font-semibold pb-3">
      {{ t('page.register_contact') }}
    </h4>
    <el-form
      ref="formRef"
      :rules="rules"
      label-position="top"
      label-width="100px"
      :model="formData"
    >
      <el-form-item :label="t('datatable.name')" prop="name">
        <el-input v-model="formData.name" size="large" />
      </el-form-item>

      <el-form-item :label="t('datatable.email')" prop="email">
        <el-input v-model="formData.email" size="large" />
      </el-form-item>

      <el-form-item :label="t('datatable.phone')" prop="phone">
        <el-input v-model="formData.phone" size="large" />
      </el-form-item>

      <el-form-item :label="t('datatable.title')" prop="title">
        <el-input v-model="formData.title" size="large" />
      </el-form-item>

      <el-form-item :label="t('datatable.content')" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="5" />
      </el-form-item>
    </el-form>
    <NuxtTurnstile v-model="token" />
    <p v-if="!token || token === undefined" class="text-sm text-red-500">
      {{ t('message.verify') }}
    </p>
    <div class="flex justify-center mt-5">
      <button
        class="w-full bg-primary text-white p-2 rounded text-sm hover:bg-secondary"
        :class="!token ? 'opacity-60 cursor-not-allowed' : ''"
        :disabled="!token"
        @click="onSubmit"
      >
        {{ t('datatable.send') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-select) {
  width: 100% !important;
}
</style>
