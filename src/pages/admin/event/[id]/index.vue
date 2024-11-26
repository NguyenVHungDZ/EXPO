<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>

    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <ClientOnly>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          :label-width="windowWidth > 765 ? '150px' : '100px'"
          class="demo-ruleForm py-10 pr-[50px] w-full 2xl:flex md:w-[80%] 2xl:w-full sm:flex-row 2xl:flex-row 2xl:flex-wrap"
          :size="formSize"
          status-icon
          :label-position="windowWidth > 550 ? 'right' : 'top'"
        >
          <!--input name -->
          <el-form-item
            :label="t('datatable.name')"
            prop="name"
            class="2xl:w-[50%] 2xl:ml-0"
          >
            <el-input v-model="ruleForm.name" placeholder="Name" />
          </el-form-item>

          <el-form-item
            :label="t('datatable.email')"
            prop="email"
            class="2xl:w-[50%]"
          >
            <el-input v-model="ruleForm.email" placeholder="Email" />
          </el-form-item>

          <el-form-item
            :label="t('datatable.phone')"
            prop="phone"
            class="2xl:w-[50%]"
          >
            <el-input v-model="ruleForm.phone" placeholder="Phone" />
          </el-form-item>

          <el-form-item
            :label="t('datatable.date_start')"
            prop="date_start"
            class="2xl:w-[50%]"
          >
            <el-date-picker v-model="ruleForm.date_start" type="date" />
          </el-form-item>

          <el-form-item
            :label="t('datatable.date_end')"
            prop="date_end"
            class="2xl:w-[50%]"
          >
            <el-date-picker v-model="ruleForm.date_end" type="date" />
          </el-form-item>

          <!-- address -->
          <el-form-item
            :label="t('datatable.address')"
            prop="address"
            class="2xl:w-[50%]"
          >
            <el-input v-model="ruleForm.address" placeholder="Address" />
          </el-form-item>

          <!-- input event type -->
          <el-form-item
            :label="t('eventType_id')"
            prop="eventType_id"
            class="2xl:w-[50%]"
          >
            <el-select v-model="ruleForm.eventType_id">
              <el-option
                v-for="item in optionEventType"
                :key="item._id"
                :label="item.name"
                :value="item._id || ''"
              />
            </el-select>
          </el-form-item>

          <!-- input expo -->
          <el-form-item
            :label="t('datatable.expo_id')"
            prop="event_expo_id"
            class="2xl:w-[50%]"
          >
            <el-select v-model="ruleForm.event_expo_id">
              <el-option
                v-for="item in optionExpo"
                :key="item._id"
                :label="item.name"
                :value="item._id || ''"
              />
            </el-select>
          </el-form-item>

          <!-- website -->
          <el-form-item
            :label="t('datatable.address')"
            prop="website"
            class="2xl:w-[100%]"
          >
            <el-input v-model="ruleForm.website" placeholder="website" />
          </el-form-item>

          <!-- textarea -->
          <el-form-item
            :label="t('datatable.description')"
            prop="description"
            class="flex-1 w-full"
          >
            <TiptapEditor v-model="ruleForm.detail" />
          </el-form-item>

          <!-- upload -->
          <el-form-item
            :label="t('datatable.featured_image')"
            prop="feat"
            class="2xl:w-[100%]"
          >
            <CommonUploadImage
              :before-image-upload="beforeImageUpload"
              :file-url="file.url"
              :show-image="ruleForm['featured_image'] || file.url"
            />
          </el-form-item>

          <!-- location -->
          <el-form-item :label="t('datatable.location')" class="title w-full" />
          <el-form-item prop="longitude" class="w-full"
            ><MapLatLonField
              :data="{ lat: ruleForm.latitude, lon: ruleForm.longitude }"
              @change-data="changePosition"
            />
          </el-form-item>
          <!-- button -->
          <el-form-item>
            <div class="space-x-2">
              <button
                class="rounded px-2 border text-black bg-[#e5e3e3] hover:bg-gray-100"
                @click.prevent="resetForm(ruleFormRef)"
              >
                {{ t('button.reset') }}
              </button>
              <button
                class="px-2 bg-primary hover:bg-secondary rounded text-white"
                @click.prevent="submitForm(ruleFormRef)"
              >
                {{
                  $route.params.id === 'new'
                    ? t('button.create')
                    : t('button.edit')
                }}
              </button>
            </div>
          </el-form-item>
        </el-form>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IEvent } from '~/interfaces/event'
import useApi from '~/composables/request/useApi'
import { validateEmail } from '~/composables/validator'

const { get, update, create } = useApi('Event')
const { getAll } = useApi('Expo')
const { getFile, uploadFile } = useApi('File')
const { t } = useI18n()
// get id url
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params?.id)
const windowWidth = ref(0)

// form
const formSize: any = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<IEvent>({
  name: '',
  address: '',
  detail: '',
  date_start: new Date(),
  date_end: new Date(),
  latitude: 0,
  longitude: 0,
  email: '',
  website: '',
  phone: '',
  event_expo_id: '',
  eventType_id: '',
  featured_image: '',
})
const file = reactive({
  rawFile: {} as any,
  url: '',
})
const currentImage = ref('')

const beforeImageUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (!rawFile.raw.type.includes('image')) {
    ElMessage.error('File must be image format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Image size can not exceed 2MB!')
    return false
  }
  file.rawFile = rawFile
  file.url = URL.createObjectURL(rawFile.raw)
}

const optionExpo = ref<IEvent[] | any>([])
const optionEventType = ref<IEvent[] | any>([])

const changePosition = (value: any) => {
  ruleForm.latitude = value.lat
  ruleForm.longitude = value.lon
}

// call api expo
const fetchDataExpo = async () => {
  const { getAll } = useApi('Expo')

  try {
    const res: any = await getAll({
      limit: 100,
    })
    optionExpo.value = res.data
    if (optionExpo.value.length) {
      ruleForm.event_expo_id = optionExpo.value[0]._id
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// call api event type
const fetchDataEventType = async () => {
  const { getAll } = useApi('EventType')

  try {
    const res: any = await getAll({
      limit: 100,
    })
    optionEventType.value = res.data
    if (optionEventType.value.length) {
      ruleForm.eventType_id = optionEventType.value[0]._id
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// validate form
const rules = reactive<FormRules<IEvent>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  email: [
    {
      required: true,
      message: 'Please input email',
      trigger: ['blur', 'change'],
    },
    {
      validator: validateEmail,
      trigger: ['blur', 'change'],
    },
  ],
})

// call api
const fetchDataItem = async () => {
  try {
    const res: IEvent | any = await get(id.value)
    Object.assign(ruleForm, res)
    currentImage.value = ruleForm.featured_image || ''
    if (ruleForm.featured_image) {
      const imageRes = await getFile(ruleForm.featured_image)
      const reader = new FileReader()
      reader.readAsDataURL(imageRes as any)
      reader.onloadend = function () {
        const base64data = reader.result
        file.url = String(base64data)
      }
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

// handle rest form
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// handle update item
const updateItem = async () => {
  try {
    await update(id.value, ruleForm)
    router.push('/admin/event')
    ElMessage.success('Cập nhật thành công!')
  } catch (error) {
    ElMessage.error('Cập nhật thất bại')
  }
}

// handle create item
const createItem = async () => {
  try {
    await create(ruleForm)
    router.push('/admin/event')
    ElMessage.success('Thêm thành công!')
  } catch (error) {
    ElMessage.error('Thêm thất bại')
  }
}

// handle submit
const submitForm = async (formEl: FormInstance | undefined) => {
  if (file.rawFile.raw) {
    const formData = new FormData()
    formData.append('file', file.rawFile.raw, file.rawFile.name)
    const res = (await uploadFile(formData)) as any
    ruleForm.featured_image = res.url
  }
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      id.value !== 'new' ? updateItem() : createItem()
    }
  })
}

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  fetchDataExpo()
  fetchDataEventType()
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

// layout
definePageMeta({
  layout: 'admin',
})
</script>

<style scoped>
:deep(.el-input) {
  width: 100% !important;
}
:deep(.el-select) {
  width: 100% !important;
}
:deep(.el-input-number) {
  width: 100% !important;
}
:deep(.title .el-form-item__label) {
  font-size: large !important;
  font-weight: bold !important;
}
</style>
