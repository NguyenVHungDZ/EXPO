<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ title ? t(title) : t('title-admin-page.detail') }}
    </h3>

    <!-- form -->
    <div
      v-if="data && data._id"
      a
      class="text-black bg-white p-4 md:p-10 space-y-5"
    >
      <div
        v-for="item of templateData"
        :key="item.field"
        class="border-b border-[#e3d8d8]"
      >
        <div class="text-bold text-[16px] flex items-center mb-[2px] gap-2">
          <component :is="item.icon" />
          <span>{{ t(item.title) }}</span>
        </div>

        <!-- date time -->
        <div class="px-3 py-2">
          <p
            v-if="item.type === 'rangeDate'"
            class="text-[#7c7575] text-[15px]"
          >
            {{ moment.utc(data[item.start]).format('DD/MM/YYYY') }} -
            {{ moment.utc(data[item.end]).format('DD/MM/YYYY') }}
          </p>

          <p
            v-else-if="item.type === 'date'"
            class="text-[#7c7575] text-[15px]"
          >
            {{ moment.utc(data[item.field]).format('DD/MM/YYYY') }}
          </p>
          <!-- detail -->
          <p
            v-else-if="item.type === 'html'"
            v-dompurify-html="data[item.field] || ''"
            class="text-[#7c7575] text-[15px]"
          />
          <div v-else-if="item.type === 'tag'">
            <el-tag
              v-if="data[item.field]"
              :type="getTag(item.options, data[item.field]).color"
              >{{ t(getTag(item.options, data[item.field]).title) }}</el-tag
            >
          </div>
          <!-- link website -->
          <a
            v-else-if="item.type === 'link'"
            :href="data[item.field]"
            target="_blank"
            class="text-primary text-[15px] hover:text-secondary"
          >
            {{ item.linkTitle ? data[item.linkTitle] : data[item.field] }}
          </a>

          <!-- Image -->
          <CommonTableTemplateImage
            v-else-if="item.type === 'image'"
            height="200px"
            :url="data[item.field]"
          />

          <!-- map -->
          <Map
            v-else-if="item.type === 'map'"
            :location="{ lat: data[item.lat], lon: data[item.lon] }"
            :style="'height: 20rem;'"
          />
          <div
            v-else-if="item.type === 'contraint'"
            class="text-[#7c7575] text-[15px]"
          >
            <div v-if="data[item.extraName]">
              {{ data[item.extraName][item.field] }}
              <CommonTableTemplateImage
                v-if="item.withImage"
                height="200px"
                :url="data[item.extraName][item.image]"
              />
            </div>
          </div>
          <CommonGallery
            v-else-if="item.type === 'gallery'"
            :id="id"
            :route="item.route"
            image-style="height: 100px"
          />
          <CommonTableTemplateTranslateContent
            v-else-if="item.type === 'translate'"
            class="text-gray-500"
            :object-id="data.id"
            :model="data.model"
            :field="data.field"
          />
          <el-rate
            v-else-if="item.type === 'rate'"
            v-model="data[item.field]"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} points"
          />
          <!-- else -->
          <p v-else class="text-[#7c7575] text-[15px]">
            {{ data[item.field] }}
          </p>
        </div>
      </div>

      <!-- button -->
      <div class="w-full mt-[80px] flex justify-center">
        <el-button @click.prevent="backPage">{{ t('button.back') }}</el-button>
        <el-button
          v-if="user?.role === 'admin' && isEdit"
          color="#356df1"
          class="hover:bg-white"
          @click.prevent="editPage"
          >{{ t('button.edit') }}</el-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { useUser } from '~/stores/user'
import useApi from '~/composables/request/useApi'

const userStore = useUser()
const user = computed(() => userStore.getInformation)

const { t, locale } = useI18n()

const props = defineProps({
  routes: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  params: {
    type: Object,
    default: () => {},
  },
  isEdit: {
    type: Boolean,
    default: true,
  },
  templateData: {
    type: Object,
    default: () => {},
  },
  isTranslate: {
    type: Boolean,
    default: true,
  },
})
// data form
const data = ref<any>({})

const { get: getData } = useApi(props.routes)

// get Tag data
const getTag = (options: any, value: any) => {
  const defaultData = {
    color: 'primary',
    title: 'datatable.' + value,
  }
  return options.find((x: any) => x.value === value) || defaultData
}

// get id url
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params?.id)
const windowWidth = ref(0)

const backUrl = route.path.split('/').slice(0, 3).join('/')

// back page
const backPage = () => {
  history.back()
}

// navigation page edit
const editPage = () => {
  router.push(`${backUrl}/${id.value}`)
}

// call api
const fetchDataItem = async () => {
  const requestData: any = props.params

  if (props.isTranslate) {
    requestData.language = locale.value
  }

  try {
    const res: any = await getData(id.value, requestData)

    // handle data

    const newObject = {}
    for (const key in res.translate) {
      if (res.translate[key] !== '') newObject[key] = res.translate[key]
    }

    const newData = { ...res, ...newObject }

    data.value = newData
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

// watch state
watch(
  id,
  async () => {
    await fetchDataItem()
  },
  { immediate: true, deep: true },
)

const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})

onUnmounted(() => window.removeEventListener('resize', onWidthChange))
</script>

<style scoped>
:deep(.el-tag__content) {
  font-size: 15px;
}
:deep(.el-button:hover) {
  background-color: theme('colors.secondary.DEFAULT') !important;
  color: white !important;
  border-color: theme('colors.secondary.DEFAULT') !important;
}
</style>
