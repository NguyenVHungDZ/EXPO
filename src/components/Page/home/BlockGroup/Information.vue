<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <SkeletonBlockGroupInformation />
      </template>
      <template #default>
        <div
          class="max-w-screen-2xl mx-auto py-20 px-10 md:px-20 2xl:px-0 space-y-10"
        >
          <div class="space-y-10">
            <p class="font-bold text-[48px] text-center mx-auto">
              {{ blockGroupItem.name || '' }}
            </p>
            <p
              v-dompurify-html="blockGroupItem.description || ''"
              class="sub-heading text-center text-[24px] leading-9"
            ></p>
          </div>
          <div class="w-full overflow-x-auto px- mb-5 pb-5">
            <div class="flex">
              <div
                v-for="item in dataBlock"
                :key="item.active"
                class="grid w-full mx-2 cursor-pointer"
                @click="changeActive(item._id, item.active)"
              >
                <span
                  class="text-base text-gray-400 text-center hover:text-[#082645] hover:font-bold cursor-pointer text-nowrap"
                  :class="
                    activeItem.position === item.active
                      ? 'text-primary font-bold'
                      : ''
                  "
                >
                  {{ item.title }}
                </span>
                <div class="w-full mt-4">
                  <el-progress
                    v-if="activeItem.position === item.active"
                    :percentage="percentToLoad"
                    :show-text="false"
                    :stroke-width="2.5"
                    :duration="20"
                    color="#356DF1"
                  />

                  <el-progress
                    v-else
                    :percentage="0"
                    :show-text="false"
                    :stroke-width="2.5"
                    color="#356DF1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-for="child in dataBlock" :key="child._id">
            <div
              v-if="activeItem.position === child.active"
              class="max-w-screen-2xl m-auto"
            >
              <PageHomeBlockGroupChild :data-item="child" />
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import useApi from '~/composables/request/useApi'

const props = defineProps({
  blockGroupItem: {
    type: Object,
    default: null,
  },
})
const { t, locale } = useI18n()
const { getAll } = useApi('Block')
const activeItem = ref<any>({ position: 1 })
const changeActive = (id: any, active: number) => {
  activeItem.value = { code: id, position: active }
  percentToLoad.value = 0
}
const loading = ref(true)
const loadABlockGroup = ref<any>('')
const dataBlock = ref<any>('')
const percentToLoad = ref(0)
const fetchData = async () => {
  try {
    const res: any = await getAll({
      'sort[created_at]': 'desc',
      language: locale.value,
      'filter[blockGroup_id]': props.blockGroupItem._id,
    })
    dataBlock.value = res.data

    dataBlock.value.forEach((e: any, i: number) => {
      e.active = i + 1
    })
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  } finally {
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
onMounted(() => {
  fetchData()
  setInterval(() => {
    percentToLoad.value = (percentToLoad.value % 100) + 1
  }, 100)
})
watch(percentToLoad, (e) => {
  if (e === 100) {
    setTimeout(() => {
      if (activeItem.value.position < dataBlock.value.length) {
        activeItem.value.position = activeItem.value.position + 1
      } else {
        activeItem.value.position = 1
      }
    }, 100)
  }
})
</script>
