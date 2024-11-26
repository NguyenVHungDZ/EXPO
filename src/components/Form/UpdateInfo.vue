<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-position="top"
    class="demo-ruleForm lg:w-[100%]"
    :size="formSize"
    status-icon
  >
    <el-form-item :label="t('datatable.username')">
      <el-input
        v-model="user.username"
        :placeholder="t('datatable.username')"
      />
    </el-form-item>
    <el-form-item :label="t('datatable.name')" prop="name">
      <el-input v-model="ruleForm.name" :placeholder="t('datatable.name')" />
    </el-form-item>

    <el-form-item :label="t('datatable.address')" prop="address">
      <el-input
        v-model="ruleForm.address"
        :placeholder="t('datatable.address')"
      />
    </el-form-item>

    <el-form-item :label="t('datatable.phone')" prop="phone">
      <el-input v-model="ruleForm.phone" :placeholder="t('datatable.phone')" />
    </el-form-item>

    <el-form-item :label="t('datatable.bio')" prop="bio" class="flex-1">
      <el-input
        v-model="ruleForm.bio"
        type="textarea"
        :placeholder="t('datatable.bio')"
      />
    </el-form-item>

    <div class="flex justify-end">
      <el-form-item class="justify-end">
        <button
          class="px-3 py-1 bg-secondary rounded text-white text-black hover:bg-blue-600"
          @click.prevent="submitForm(ruleFormRef)"
        >
          {{ t('button.save') }}
        </button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'
import { useUser } from '~/stores/user'

const userStore = useUser()
const user = computed(() => {
  return userStore.getInformation
})

const { updateProfile } = useApi('User/me')

interface RuleForm {
  name: string
  address: string
  phone: string
  bio: string
}
const { t } = useI18n()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: user.value?.name || '',
  address: user.value?.address || '',
  phone: user.value?.phone || '',
  bio: user.value?.bio || '',
})

// Setting fules for input field
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
  address: [
    { required: true, message: 'Please input address', trigger: 'blur' },
  ],
  phone: [{ required: true, message: 'Please input phone', trigger: 'blur' }],
  bio: [{ required: true, message: 'Please input bio', trigger: 'blur' }],
})

// handle update info
const handleUpdateInfo = async () => {
  const newData = {
    ...ruleForm,
    phone: '' + ruleForm.phone,
  }
  try {
    await updateProfile(newData)
    ElMessage.success('Cập nhập thông tin thành công!')
  } catch (error) {
    ElMessage.error('Cập nhập thông tin thất bại!')
  }
}

// handle submit
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      handleUpdateInfo()
    }
  })
}
</script>
