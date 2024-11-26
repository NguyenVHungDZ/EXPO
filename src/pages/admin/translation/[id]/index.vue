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
            :items="translation"
            :data="{
              ruleForm,
            }"
            :rules="rules"
            :submit-form="submitForm"
            @disable-action="disableAction"
            @on-change-data="onChangeData"
          >
            <el-form-item prop="model" :label="t('datatable.model')">
              <el-select
                v-model="ruleForm.model"
                filterable
                style="width: 100%"
                @change="onChangeModel"
              >
                <el-option
                  v-for="item in models"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="field" :label="t('datatable.field')">
              <el-select
                v-model="ruleForm.field"
                filterable
                style="width: 100%"
              >
                <el-option
                  v-for="item in fields"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <template #tag> </template>
            </el-form-item>
            <el-form-item :label="t('datatable.content')">
              <el-select v-model="ruleForm.id">
                <div v-infinite-scroll="fetchData" class="max-h-60">
                  <el-option
                    v-for="(item, index) in dataModel"
                    :key="index"
                    :label="item[ruleForm.field]"
                    :value="item['_id']"
                  >
                    <p v-dompurify-html="item[ruleForm.field]" />
                  </el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="t('datatable.translate')">
              <tiptap-editor v-if="checkField" v-model="ruleForm.translate" />
              <el-input v-else v-model="ruleForm.translate" />
            </el-form-item>
          </admin-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { convert } from 'html-to-text'
import type { IRes } from '~/interfaces/res_type'
import type { ITranslation } from '~/interfaces/translation'
import useApi from '~/composables/request/useApi'
import { translation, SELECT_STATIC, FIELD } from '~/assets/infoData'

const { get, update, create } = useApi('Translation')
const { t } = useI18n()
// get id url
const route = useRoute()
const router = useRouter()
const dataModel = ref<any>([])
const id = ref()

const active = ref(0)
const page = ref(1)
const listHTMLData = ref(['detail', 'description', 'ask', 'answer'])

// form
const disableButton = ref(true)
const ruleForm = reactive<ITranslation>({
  language_id: '',
  model: '',
  field: '',
  translate: '',
  id: '',
})

const checkField = computed(
  () => !!listHTMLData.value.find((x) => x === ruleForm.field),
)

// validate form
const rules = reactive<FormRules<ITranslation>>({
  translate: [
    {
      required: true,
      message: t('input_rule.input_validate'),
      trigger: 'blur',
    },
  ],
})

const models = computed(() => {
  const data = []
  for (const item of SELECT_STATIC.MODEL) {
    data.push({
      label: item,
      value: item,
    })
  }
  ruleForm.model = data[0].value
  return data
})

const fields = computed(() => {
  const data = []
  const fieldData = FIELD as any
  if (fieldData[ruleForm.model] && fieldData[ruleForm.model].length) {
    for (const item of fieldData[ruleForm.model]) {
      data.push({
        label: item,
        value: item,
      })
    }
  } else {
    ruleForm.field = ''
  }
  return data
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
    const res: ITranslation | any = await get(id.value)
    Object.assign(ruleForm, res)
  } catch (error) {
    ElMessage.error(t('message.errors.error'))
  }
}

const fetchDataModel = async () => {
  try {
    const { getAll: getModels, get: getModel } = useApi(ruleForm.model)
    if (page.value) {
      if (ruleForm.id) {
        const checkData = dataModel.value.find(
          (x: any) => x._id === ruleForm.id,
        )
        if (!checkData) {
          const resItem = (await getModel(ruleForm.id)) as any
          if (resItem && resItem._id) dataModel.value.push(resItem)
        }
      }
      const res = (await getModels({
        offset: (page.value - 1) * 10,
      })) as IRes
      dataModel.value = dataModel.value.concat(
        res.data.filter((x: any) => x._id !== ruleForm.id),
      )
      for (const item of dataModel.value) {
        for (const key of listHTMLData.value) {
          if (item[key])
            item[key] = convert(item[key], {}).substring(0, 130) + '...'
        }
      }
      if (res.data.length < 10) page.value = 0
      else page.value += 1
    }
  } catch (error: any) {}
}

// watch state
watch(
  route,
  async () => {
    id.value = route.params?.id
    if (route.params?.id && route.params?.id !== 'new') {
      await fetchData()
      await fetchDataModel()
    } else {
      ruleForm.model = SELECT_STATIC.MODEL[0]
      ruleForm.field = fields.value[0].value
      await fetchDataModel()
      ruleForm.id = dataModel.value.length ? dataModel.value[0]._id : ''
    }
  },
  { immediate: true },
)

const onChangeModel = async (value: string) => {
  ruleForm.id = ''
  dataModel.value.length = 0
  page.value = 1
  await fetchDataModel()
  ruleForm.id = dataModel.value.length ? dataModel.value[0]._id : ''
}

// handle submit
const submitForm = (formEl: FormInstance | undefined) => {
  try {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
      if (valid) {
        delete ruleForm._id
        delete ruleForm.created_at
        delete ruleForm.updated_at
        delete ruleForm.language
        delete ruleForm.deleted_at
        id.value !== 'new'
          ? await update(id.value, ruleForm)
          : await create(ruleForm)
        ElMessage.success('Successfully')
        router.push('/admin/translation')
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
