<template>
  <div class="container m-10 md:mx-24">
    <el-collapse>
      <el-collapse-item
        v-for="item in faq"
        :key="item._id"
        :title="item.translate.ask || ''"
      >
        <div :innerHTML="item.translate.answer || ''" class="px-5 pt-2"></div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script lang="ts" setup>
import useApi from '~/composables/request/useApi'
const { getAll } = useApi('Faq')

const { t, locale } = useI18n()

interface IFaq {
  _id: string
  created_at?: any
  updated_at?: any
  deleted_at: null
  ask: string
  answer: string
  faqType_id?: null
}

const faq = ref<IFaq>()
const fetchData = async () => {
  try {
    const res: any = await getAll({
      withCount: true,
      language: locale.value,
    })
    faq.value = res.data
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
watch(
  locale,
  () => {
    fetchData()
  },
  { immediate: true, deep: true },
)
onMounted(async () => {
  await fetchData()
})
</script>
<style scoped lang="scss">
:deep(.el-collapse) {
  border-top: unset;
  border-bottom: unset;
  .el-collapse-item {
    margin-bottom: 10px;
    border: 1px solid var(--el-collapse-border-color);
    border-radius: 16px;
    background: white;
    .el-collapse-item__header {
      height: auto;
      line-height: unset;
      border-radius: 16px;
      padding: 20px;
      font-size: 22px;
      border-bottom: unset;
      font-weight: 600;
    }
    .el-collapse-item__header.is-active {
      color: #356df1 !important;
      background: white;
      border-bottom: 1px solid rgb(223, 223, 223);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .el-collapse-item__wrap {
      border-radius: 0 0 16px 16px;
      background-color: unset !important;
      border-bottom: unset !important;
      .el-collapse-item__content {
        font-size: 18px;
        font-weight: 100 !important;
      }
    }
  }
}
</style>
