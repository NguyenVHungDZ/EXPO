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
        class="demo-ruleForm py-10 w-full md:w-[80%] flex-col sm:flex-row"
        :size="formSize"
        status-icon
        :label-position="windowWidth > 550 ? 'right' : 'top'"
      >
        <!--input name -->
        <el-form-item :label="t('datatable.username')" prop="username">
          <el-input
            v-model="ruleForm.username"
            :placeholder="t('datatable.username')"
          />
        </el-form-item>

        <!-- input email -->
        <el-form-item :label="t('datatable.email')" prop="email">
          <el-input
            v-model="ruleForm.email"
            :placeholder="t('datatable.email')"
          />
        </el-form-item>

        <!-- input role -->
        <el-form-item :label="t('datatable.role')" prop="role">
          <el-select v-model="ruleForm.role" :placeholder="t('datatable.role')">
            <el-option
              v-for="role in ROLE"
              :key="role.id"
              :label="t(`datatable.${role.value}`)"
              :value="role.value"
            />
          </el-select>
        </el-form-item>

        <!-- input password -->
        <el-form-item
          v-show="$route.params.id === 'new'"
          :label="t('datatable.password')"
          prop="password"
        >
          <el-input
            v-model="ruleForm.password"
            :placeholder="t('datatable.password')"
            :disabled="isRandom"
            :clear-validate="isRandom"
          />
          <el-switch
            v-model="isRandom"
            size="large"
            class="mb-2"
            inline-prompt
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #ff4949;
            "
            :active-text="t('datatable.random_password')"
            :inactive-text="t('datatable.custom_password')"
          />
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <button
            class="px-2 bg-primary rounded-[10px] text-white hover:bg-secondary"
            @click.prevent="submitForm(ruleFormRef)"
          >
            {{
              $route.params.id === 'new' ? t('button.create') : t('button.edit')
            }}
          </button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'
import type { ICreateUser, IUser } from '~/interfaces/user'
import { validateEmail } from '~/composables/validator'
import { ROLE } from '~/assets/data'

const { get, update, create } = useApi('User')

// random password
const isRandom = ref(true)

// get id url
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params?.id)
const windowWidth = ref(0)
const { t } = useI18n()
// random password
const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
const generatePassword = (passwordLength: number) => {
  const numberChars = '0123456789'
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
  const specialChars = '!#$%&*'
  const allChars = numberChars + upperChars + lowerChars
  let randPasswordArray = Array(passwordLength)
  randPasswordArray[0] = numberChars
  randPasswordArray[1] = upperChars
  randPasswordArray[2] = lowerChars
  randPasswordArray[3] = specialChars

  randPasswordArray = randPasswordArray.fill(allChars, 4)
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)]
    }),
  ).join('')
}

// form
const formSize: any = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<ICreateUser>({
  username: '',
  email: '',
  password: '',
  role: '',
})

// handle clear mess error when switch : filed password
const handleClearField = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.clearValidate('password')
}

// random password
watch(
  () => isRandom.value,
  (newValue) => {
    ruleForm.value = {
      ...ruleForm.value,
      password: newValue ? generatePassword(10) : '',
    }
    if (newValue) handleClearField()
  },
  { immediate: true },
)

// validate Password
const validatePass = (rule: any, value: string, callback: any) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

  if (!isRandom.value) {
    if (!value) {
      callback(new Error('Please input the password'))
    } else if (!value.match(regex)) {
      callback(
        new Error(
          'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters',
        ),
      )
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// validate form
const rules = reactive<FormRules<ICreateUser>>({
  username: [
    {
      required: true,
      message: 'Minimum 8 characters',
      trigger: 'blur',
    },
  ],
  email: [
    { required: true, message: 'Please input Activity email', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur',
    },
    { validator: validatePass, trigger: 'blur' },
  ],
  role: [
    {
      required: true,
      message: 'Please select Activity role',
      trigger: 'change',
    },
  ],
})

// call api
const fetchDataItem = async () => {
  try {
    const res: IUser | any = await get(id.value)

    for (const item of Object.keys(ruleForm.value)) {
      ruleForm.value[item] = res[item]
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

// handle update user
const updateUser = async () => {
  try {
    await update(id.value, ruleForm.value)
    router.push('/admin/user')
    ElMessage.success('Cập nhật người dùng thành công!')
  } catch (error) {
    ElMessage.error('Cập nhật người dùng thất bại!')
  }
}

// handle create user
const createUser = async () => {
  try {
    await create(ruleForm.value)
    router.push('/admin/user')
    ElMessage.success('Tạo người dùng thành công!')
  } catch (error) {
    ElMessage.error('Tạo người dùng thất bại!')
  }
}

// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    id.value !== 'new' ? updateUser() : createUser()
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
