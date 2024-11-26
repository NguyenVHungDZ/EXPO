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
            :items="language"
            :data="{
              ruleForm,
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
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'
import { language } from '~/assets/infoData'
import type { ILanguage } from '#build/interfaces/language'

const { get, update, create } = useApi('Language')
const { t } = useI18n()
// get id url
const route = useRoute()
const router = useRouter()
const id = ref()

const active = ref(0)

// form
const disableButton = ref(true)
const ruleForm = reactive<ILanguage>({
  name: '',
  code: '',
})

// validate form
const rules = reactive<FormRules<ILanguage>>({
  name: [{ required: true, message: t('input_validate'), trigger: 'blur' }],
  code: [{ required: true, message: t('input_validate'), trigger: 'blur' }],
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
    const res: ILanguage | any = await get(id.value)
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
        router.push('/admin/language')
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

<style scoped>
:deep(.ql-editor) {
  min-height: 200px;
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
:deep(.el-input) {
  width: 100% !important;
}
:deep(.el-select) {
  width: 100% !important;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
