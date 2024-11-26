<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
import { type IBlock } from '~/interfaces/block'
import { type IRes } from '~/interfaces/res_type'
import '~/assets/tiptap.scss'

const props = defineProps({
  blockGroupItem: {
    type: Object,
    default: null,
  },
  className: {
    type: String,
    default: '',
  },
})

const blockGroupData = computed(() => props.blockGroupItem as IBlock)
const { getAll } = useApi('Block')
const { getFile } = useApi('File')
const data = ref<Array<IBlock>>([])
const activeNames = ref(['1'])
const imageUrl = ref('')
const loading = ref<boolean>(true)
const { t, locale } = useI18n()
const sleep = async (time: number) => {
  await new Promise((resolve) => setTimeout(resolve, time))
}

const fetchData = async () => {
  try {
    loading.value = true

    const res = (await getAll({
      limit: 5,
      'sort[created_at]': 'desc',
      language: locale.value,
      'filter[blockGroup_id]': blockGroupData.value._id,
    })) as IRes
    data.value = res.data
    activeNames.value.push(data.value[0]._id || '1')
    getImage(data.value[0].image)
  } catch (error) {
  } finally {
    await sleep(100)
    loading.value = false
  }
}
watch(
  locale,
  () => {
    fetchData()
  },
  { immediate: true, deep: true },
)
const getImage = async (url: string) => {
  try {
    const imageRes = await getFile(url)
    const reader = new FileReader()
    reader.readAsDataURL(imageRes as any)
    reader.onloadend = function () {
      const base64data = reader.result
      imageUrl.value = String(base64data) || '/images/default.webp'
    }
  } catch (error) {
    imageUrl.value = '/images/default.webp'
  }
}

const handleChange = (val: any) => {
  const item = data.value.find((x: any) => x._id === val) as IBlock
  getImage(item.image)
}

watch(
  blockGroupData,
  async (value: IBlock) => {
    if (value && value._id) await fetchData()
  },
  { immediate: true },
)
</script>

<template>
  <div class="py-20 px-10" :class="className">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <SkeletonBlockGroupMenu />
      </template>
      <template #default>
        <div>
          <div class="lg:px-20">
            <h2 class="text-center text-[32px] lg:text-[48px] font-bold">
              {{ blockGroupItem.name }}
            </h2>
            <div
              class="text-center tiptap-content text-[18px] lg:text-[24px]"
              :innerHTML="blockGroupItem.description"
            />
          </div>
          <div
            class="max-w-screen-2xl m-auto grid lg:grid-cols-2 gap-10 py-10 lg:px-10"
          >
            <div class="lg:hidden">
              <img class="w-full aspect-video object-cover" :src="imageUrl" />
            </div>
            <el-collapse v-model="activeNames" accordion @change="handleChange">
              <el-collapse-item
                v-for="item in data"
                :key="item._id"
                :title="item.title"
                :name="item._id"
              >
                <div class="tiptap-content" :innerHTML="item.description" />
              </el-collapse-item>
            </el-collapse>
            <div class="hidden lg:block">
              <img class="w-full aspect-video object-cover" :src="imageUrl" />
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-collapse) {
  border: unset !important;
  .el-collapse-item {
    padding: 10px;
    .el-collapse-item__header {
      color: #a6b3be;
      font-size: 20px;
      font-weight: bold;
      border: unset !important;
      padding: 0 20px;
    }
  }
}
:deep(.el-collapse-item.is-active) {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  border-radius: 8px;
  background: white !important;
  .el-collapse-item__header {
    color: black;
    background: white !important;
  }
  .el-collapse-item__content {
    font-size: 16px;
    padding: 10px 20px;
  }
  .el-collapse-item__wrap {
    border: unset;
  }
}
</style>
