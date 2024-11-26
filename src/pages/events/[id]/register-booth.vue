<script setup lang="ts">
import type { FormRules } from 'element-plus'
import type { IBooth } from '~/interfaces/booth'
import type { IForm } from '~/interfaces/form'
import countries from '~/assets/country.json'
import countryDetails from '~/assets/by-code.json'
import useApi from '~/composables/request/useApi'
import { validateEmail } from '~/composables/validator'
import { useUser } from '~/stores/user'

const userStore = useUser()

const user = computed(() => userStore.getInformation)
const token = ref()
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: 'Đăng ký hội chợ triển lãm' })

const { get: getEvent } = useApi('Event')
const { getAll: getBooths } = useApi('Booth')
const { create } = useApi('Form')
const { getFile } = useApi('File')
const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const { id: eventId } = route.params
useHead({ titleTemplate: '', title: t('page.register_expo') })
const formData = reactive<IForm>({
  name: '',
  name_en: '',
  country: 'VN',
  province: '',
  tax: '',
  email: '',
  phone: '',
  fax: '',
  website: '',
  position: '',
  form_booth_id: '',
  event_id: eventId,
  imageUrl: '',
})

const provinceList = ref<any>([])
const event = ref({
  name: '',
})
const booths = ref<IBooth[]>([])
const isCheck = ref(false)
const ruleForm = ref()
const disabledButton = ref(true)

const checkValidate = () => {
  if (ruleForm.value)
    ruleForm.value.validate((valid: any) => {
      if (valid) disabledButton.value = false
      else disabledButton.value = true
    })
}

watch(
  formData,
  () => {
    if (isCheck.value) checkValidate()
  },
  { immediate: true },
)

const rules = reactive<FormRules<IForm>>({
  name: [
    {
      required: true,
      message: t('login.input_username'),
      trigger: ['blur', 'change'],
    },
  ],
  tax: [
    {
      required: true,
      message: t('message.required_tax'),
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

const getCountryData = (code: string) => {
  const data = countryDetails
  return data[code].image
}

const getImageBooth = (id: string) => {
  return id
    ? booths?.value?.find((x) => x._id === id)?.imageUrl
    : '/images/default.webp'
}

const onSelectCountry = (value: string) => {
  const country = countries.find(
    (country) => country.countryShortCode === formData.country,
  )
  provinceList.value = country ? country.regions : []
  formData.province = provinceList.value.length
    ? provinceList.value[0].shortCode
    : ''
}

const fetchDataEvent = async () => {
  try {
    const res = (await getEvent(eventId, { language: locale.value })) as any
    event.value.name = res.translate.name
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

const fetchDataBooth = async () => {
  try {
    const res = (await getBooths({
      withCount: true,
      limit: 100,
      'sort[created_at]': 'desc',
      language: locale.value,
    })) as any

    booths.value = res.data
    for (const item of booths.value) {
      try {
        const imageRes = await getFile(item.featured_image)
        const reader = new FileReader()
        reader.readAsDataURL(imageRes as any)
        reader.onloadend = function () {
          const base64data: any = reader.result
          item.imageUrl = String(base64data) || '/images/default.webp'
        }
      } catch (error) {
        item.imageUrl = '/images/default.webp'
      }
    }
    if (booths.value) formData.form_booth_id = booths.value[0]._id || ''
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

const onSubmit = async (e: any) => {
  e.preventDefault()
  try {
    if (!disabledButton.value) {
      delete formData.imageUrl
      await create(formData)
      router.push(route.fullPath + '-success')
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
watch(
  locale,
  () => {
    fetchDataEvent()
    fetchDataBooth()
  },
  { immediate: true, deep: true },
)
onBeforeMount(async () => {
  onSelectCountry('VN')
  await fetchDataEvent()
  await fetchDataBooth()
  isCheck.value = true
})
</script>

<template>
  <div class="bg-white my-[30px] mx-auto max-w-4xl py-10 px-16">
    <section v-if="user.role === 'admin' || user.role === 'company'">
      <h4 class="text-2xl text-center font-semibold pb-3">
        {{ t('events.event_register') }}: {{ event.name }}
      </h4>
      <el-form
        ref="ruleForm"
        :model="formData"
        :rules="rules"
        label-position="top"
        label-width="100px"
      >
        <h4 class="text-xl font-semibold pb-3">
          {{ t('events.company_info') }}
        </h4>
        <el-form-item :label="t('events.name')" prop="name">
          <el-input v-model="formData.name" size="large" />
        </el-form-item>
        <el-form-item :label="t('events.english_name')" prop="name_en">
          <el-input v-model="formData.name_en" size="large" />
        </el-form-item>
        <el-form-item :label="t('datatable.tax')" prop="tax">
          <el-input v-model="formData.tax" size="large" />
        </el-form-item>
        <div class="grid grid-cols-2 gap-x-5">
          <el-form-item :label="t('events.country')" prop="country">
            <el-select
              v-model="formData.country"
              filterable
              size="large"
              @change="onSelectCountry"
            >
              <el-option
                v-for="item in countries"
                :key="item.countryShortCode"
                :label="item.countryName"
                :value="item.countryShortCode"
              >
                <div class="flex gap-2 items-center">
                  <img
                    width="30"
                    :src="getCountryData(item.countryShortCode)"
                  />
                  <span>{{ item.countryName }}</span>
                </div>
              </el-option>
              <template #prefix>
                <img width="25" :src="getCountryData(formData.country)" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="t('events.city')" prop="province">
            <el-select v-model="formData.province" filterable size="large">
              <el-option
                v-for="item in provinceList"
                :key="item.shortCode"
                :label="item.name"
                :value="item.shortCode"
              >
                <span>{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="t('events.email')" prop="email">
            <el-input v-model="formData.email" size="large" />
          </el-form-item>
          <el-form-item :label="t('events.phone')" prop="phone">
            <el-input v-model="formData.phone" size="large" />
          </el-form-item>
          <el-form-item :label="t('events.fax')" prop="fax">
            <el-input v-model="formData.fax" size="large" />
          </el-form-item>
          <el-form-item :label="t('events.website')" prop="website">
            <el-input v-model="formData.website" size="large" />
          </el-form-item>
        </div>
        <h4 class="text-xl font-semibold pb-3">
          {{ t('events.register_content') }}
        </h4>
        <div class="grid grid-cols-2 gap-x-5">
          <el-form-item :label="t('events.booth')" prop="form_booth_id">
            <el-select v-model="formData.form_booth_id" filterable size="large">
              <el-option
                v-for="item in booths"
                :key="item._id"
                :label="item.translate.name"
                :value="item._id || ''"
              >
                <el-popover
                  placement="top-start"
                  title=""
                  :width="400"
                  trigger="hover"
                >
                  <img class="aspect-video w-full" :src="item.imageUrl" />
                  <template #reference>
                    <div class="flex gap-2 items-center">
                      <span>{{ item.translate.name }}</span>
                    </div>
                  </template>
                </el-popover>
              </el-option>
              <template #prefix>
                <img width="30" :src="getImageBooth(formData.form_booth_id)" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="t('events.position')" prop="position">
            <el-input v-model="formData.position" size="large" />
          </el-form-item>
        </div>
      </el-form>
      <NuxtTurnstile v-model="token" />
      <p v-if="!token || token === undefined" class="text-sm text-red-500">
        (*) {{ t('captcha.verification') }}
      </p>
      <div class="flex justify-center mt-5">
        <button
          class="bg-primary text-white p-2 rounded text-sm hover:bg-secondary w-full"
          :class="
            disabledButton || !token || token === undefined
              ? 'opacity-60 cursor-not-allowed'
              : ''
          "
          :disabled="disabledButton || !token || token === undefined"
          @click="onSubmit"
        >
          {{ t('action.submit') }}
        </button>
      </div>
    </section>

    <section v-else>
      {{ t('role.notification') }}
    </section>
  </div>
</template>

<style scoped>
:deep(.el-select) {
  width: 100% !important;
}
</style>
