<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>
    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <div class="pb-10">
        <div v-if="!active">
          <admin-form
            :items="faq"
            :data="{
              ruleForm,
              file,
            }"
            :rules="rules"
            :submit-form="submitForm"
            @disable-action="disableAction"
            @on-change-data="onChangeData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Select, Edit, Picture } from '@element-plus/icons-vue'
import type { IFaq } from '~/interfaces/faq'
import useApi from '~/composables/request/useApi'
import { faq } from '~/assets/infoData'

const { get, update, create } = useApi('Faq')
const { t } = useI18n()
// get id url
const route = useRoute()
const router = useRouter()
const id = ref()
const windowWidth = ref(0)
const file = reactive({
  rawFile: {},
  url: '',
})

const active = ref(0)

// form
const disableButton = ref(true)
const ruleForm = reactive<IFaq>({
  ask: '',
  answer: '',
  faqType_id: '',
})

// validate form
const rules = reactive<FormRules<IFaq>>({
  ask: [{ required: true, message: t('input_ask'), trigger: 'blur' }],
})

const disableAction = (value: boolean) => {
  disableButton.value = value
}

const onChangeData = (value: any) => {
  Object.assign(ruleForm, value.data)
}

// call api
const fetchData = async () => {
  try {
    const res: IFaq | any = await get(id.value)
    Object.assign(ruleForm, res)
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
// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  try {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
      if (valid) {
        delete ruleForm._id
        delete ruleForm.created_at
        delete ruleForm.updated_at
        delete ruleForm.deleted_at
        id.value !== 'new'
          ? await update(id.value, ruleForm)
          : await create(ruleForm)
        ElMessage.success('Successfully')
        router.push('/admin/faq')
      }
    })
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}
// layout
definePageMeta({
  layout: 'admin',
})
</script>
