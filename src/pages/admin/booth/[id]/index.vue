<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>
    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <ClientOnly
        ><el-steps
          :active="active"
          class="pt-10 lg:px-10 w-full"
          finish-status="success"
        >
          <el-step :title="t('form.info')" :icon="Edit" />
          <el-step :title="t('form.photo_library')" :icon="Picture" />
          <el-step :title="t('form.done')" :icon="Select" /> </el-steps
      ></ClientOnly>
      <div class="pb-10">
        <div v-if="!active">
          <admin-form
            :items="booth"
            :data="{
              ruleForm,
              file,
            }"
            :rules="rules"
            :is-action="false"
            @disable-action="disableAction"
            @on-change-data="onChangeData"
          />
          <div class="space-x-2 flex justify-center">
            <button
              class="rounded px-2 py-1 bg-white border text-black hover:bg-gray-100"
              @click.prevent="router.push('/admin/booth')"
            >
              {{ t('button.cancel') }}
            </button>
            <button
              class="px-2 py-1 bg-primary hover:bg-secondary rounded text-white"
              :class="disableButton ? 'opacity-65 cursor-not-allowed' : ''"
              :disabled="disableButton"
              @click.prevent="active++"
            >
              {{ t('button.next') }}
            </button>
          </div>
        </div>
        <div v-else-if="active === 1" class="w-full pt-10 px-20">
          <AdminUpload
            class="w-full pb-10"
            :files="listGallery"
            @file-upload="onFileChange"
            @on-remove="onRemove"
          />
          <div class="flex justify-center space-x-2">
            <button
              class="rounded px-2 py-1 bg-white border text-black hover:bg-gray-100"
              @click="active--"
            >
              {{ t('button.previous') }}
            </button>
            <button
              class="px-2 bg-primary py-1 hover:bg-secondary rounded text-white"
              @click.prevent="submitForm"
            >
              {{ t('button.submit') }}
            </button>
          </div>
        </div>
        <div
          v-else-if="active === 2"
          class="h-[calc(100vh-350px)] w-full flex flex-col justify-center items-center gap-4"
        >
          <component
            :is="isFail ? IconFail : IconLoading"
            class="text-[30px]"
            :class="isFail ? 'text-red-500' : 'text-green-500'"
          />
          <p>{{ isFail ? t('message.errors.error') : t('message.loading') }}</p>
          <button
            v-show="isFail"
            class="rounded px-2 py-1 bg-white border text-black hover:bg-gray-100"
            @click="active--"
          >
            {{ t('button.previous') }}
          </button>
        </div>
        <div
          v-else-if="active === 3"
          class="h-[calc(100vh-350px)] w-full flex flex-col justify-center items-center gap-4"
        >
          <IconSuccess class="text-[30px] text-blue-500" />
          <p>{{ t('message.success.success') }}</p>
          <button
            class="rounded px-2 py-1 bg-white border text-black hover:bg-gray-100"
            @click="router.push('/admin/booth')"
          >
            {{ t('button.back') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Select, Edit, Picture } from '@element-plus/icons-vue'
import type { IBooth } from '~/interfaces/booth'
import useApi from '~/composables/request/useApi'
import { booth } from '~/assets/infoData'
import IconLoading from '~icons/eos-icons/loading'
import IconFail from '~icons/ep/failed'
import IconSuccess from '~icons/ooui/success'
const { get, update, create } = useApi('Booth')
const {
  getAll,
  create: createGallery,
  remove: removeGallery,
} = useApi('BoothGallery')
const { uploadFile, getFile } = useApi('File')

// get id url
const route = useRoute()
const router = useRouter()
const id = ref()
const windowWidth = ref(0)
const currentImage = ref('')
const file = reactive({
  rawFile: {
    name: '',
    raw: {} as Blob,
  },
  url: '',
})
const { t } = useI18n()
const isFail = ref(false)

const active = ref(0)

// form
const listGallery = ref<any>([])
const listRemove = ref<string[]>([])

const disableButton = ref(true)
const ruleForm = reactive<IBooth>({
  name: '',
  featured_image: '',
  detail: '',
  width: 0,
  length: 0,
})

const onFileChange = (value: any) => {
  listGallery.value = value
}

const onRemove = (value: string) => {
  listRemove.value.push(value)
}

// validate form
const rules = reactive<FormRules<IBooth>>({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
})

const disableAction = (value: boolean) => {
  disableButton.value = value
}

const onChangeData = (value: any) => {
  Object.assign(ruleForm, value.data)
  file.rawFile = value.file.rawFile
  file.url = value.file.url
  if (file.rawFile.name) currentImage.value = file.rawFile.name
}

// call api
const fetchData = async () => {
  try {
    const res: IBooth | any = await get(id.value)
    Object.assign(ruleForm, res)
    currentImage.value = ruleForm.featured_image
    if (res._id) {
      const egRes: any = await getAll(
        {
          limit: 100,
          'filter[booth_id]': res._id,
        },
        '&fields=_id&fields=image',
      )
      for (const item of egRes.data) {
        const str = item.image.split('/')
        const imageRes = await getFile(item.image)
        const reader = new FileReader()
        reader.readAsDataURL(imageRes as any)
        reader.onloadend = function () {
          const base64data = reader.result
          listGallery.value.push({
            uid: item._id,
            name: str[str.length - 1],
            url: base64data,
          })
        }
      }
    }
    if (res.featured_image) {
      const imageRes = await getFile(res.featured_image)
      const reader = new FileReader()
      reader.readAsDataURL(imageRes as any)
      reader.onloadend = function () {
        const base64data: any = reader.result
        file.url = base64data
      }
    }
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// watch state
watch(
  route,
  async () => {
    id.value = route.params?.id
    if (route.params?.id && route.params?.id !== 'new') await fetchData()
  },
  { immediate: true },
)

const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}

// handle submit
const submitForm = async () => {
  try {
    active.value = 2
    if (currentImage.value !== ruleForm.featured_image) {
      const formData = new FormData()
      formData.append('file', file.rawFile.raw, file.rawFile.name)
      const res: any = await uploadFile(formData)
      ruleForm.featured_image = res.url
    }

    delete ruleForm._id
    delete ruleForm.created_at
    delete ruleForm.updated_at
    delete ruleForm.deleted_at
    delete ruleForm.template

    id.value !== 'new'
      ? await update(id.value, ruleForm)
      : await create(ruleForm)
    for (const item of listGallery.value) {
      if (item.raw) {
        const formData = new FormData()
        formData.append('file', item.raw, item.name)
        const res: any = await uploadFile(formData)
        ruleForm.featured_image = res.url
        await createGallery({
          booth_id: id.value,
          image: res.url,
        })
      }
    }
    for (const item of listRemove.value) {
      await removeGallery(item)
    }
    await sleep(1000)
    active.value = 3
    await sleep(1000)
    router.push('/admin/booth')
  } catch (error) {
    isFail.value = true
  }
}

// Handle window's size change
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
