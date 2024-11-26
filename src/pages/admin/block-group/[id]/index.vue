<template>
  <div>
    <h3 class="text-black text-[24px] font-bold mb-2">
      {{ $route.params.id === 'new' ? t('button.create') : t('button.edit') }}
    </h3>
    <!-- form -->
    <div class="text-black bg-white px-[10px]">
      <div class="pb-10">
        <admin-form
          :items="blockGroup"
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
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IBlockGroup } from '~/interfaces/block_group'
import useApi from '~/composables/request/useApi'
import { blockGroup } from '~/assets/infoData'

const { get, update, create } = useApi('BlockGroup')
const { t } = useI18n()
// get id url
const route = useRoute()
const router = useRouter()
const id = ref()
const file = reactive({
  rawFile: {},
  url: '',
})

// form

const disableButton = ref(true)
const ruleForm = reactive<IBlockGroup>({
  name: '',
  description: '',
  blockType_id: '',
})

// validate form
const rules = reactive<FormRules<IBlockGroup>>({
  name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
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
    const res: IBlockGroup | any = await get(id.value)
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
        router.push('/admin/block-group')
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
