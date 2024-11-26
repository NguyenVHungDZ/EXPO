<script lang="ts" setup>
import type { UploadProps } from 'element-plus'
const emit = defineEmits(['disableAction', 'onChangeData'])
const props = defineProps({
  items: {
    type: Array as any,
    default: () => [],
  },
  fileData: {
    type: Object,
    default: () => {},
  },
  rules: {
    type: Object,
    default: {} as Object,
  },
  data: {
    type: Object,
    default: () => {},
  },
  isAction: {
    type: Boolean,
    default: true,
  },
  submitForm: {
    type: Function,
    default: () => {},
  },
})
const { t } = useI18n()
const ruleForm = ref<any>({})
const formSize = ref()

const dataTranfer = computed(() => props.data)

const windowWidth = ref(0)
const ruleFormRef = ref()
const file = reactive({
  rawFile: {},
  url: '',
})
// Validate the uploaded file if it is an image and the size is smaller than 2MB
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
  emit('onChangeData', { data: ruleForm.value, file })
}

// Update the form's latitude and longtitude
const changePosition = (value: any) => {
  ruleForm.value.lat = value.lat
  ruleForm.value.lon = value.lon
}

// Handle window's size changing behavior
const onWidthChange = () => (windowWidth.value = window.innerWidth)
onMounted(() => {
  windowWidth.value = window.innerWidth
  window.addEventListener('resize', onWidthChange)
})

// Remove the 'resize' to avoid memory leak
onUnmounted(() => window.removeEventListener('resize', onWidthChange))

watch(
  ruleForm,
  () => {
    emit('onChangeData', { data: ruleForm.value, file })
    if (ruleFormRef.value)
      ruleFormRef.value.validate((valid: any) => {
        if (valid) emit('disableAction', false)
        else emit('disableAction', true)
      })
  },
  { deep: true },
)
// Navigate user back to the previous page
const backPage = () => {
  history.back()
}

// Update a specific field in the form
const updateField = (value: any, field: string) => {
  ruleForm.value[field] = value
}

watch(
  dataTranfer,
  () => {
    ruleForm.value = dataTranfer.value.ruleForm
    file.url = dataTranfer.value.file?.url || ''
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :label-width="windowWidth > 765 ? '200px' : '100px'"
      class="demo-ruleForm pt-2 lg:pt-10 pb-10 w-full md:w-[80%] flex-col sm:flex-row"
      :size="formSize"
      status-icon
      :label-position="windowWidth > 550 ? 'right' : 'top'"
    >
      <el-form-item
        v-for="item in items"
        :key="item.key"
        :label="t(`datatable.${item.key}`)"
        :prop="item.key"
      >
        <el-input
          v-if="item.type === 'text'"
          v-model="ruleForm[item.key]"
          :placeholder="item.placeholder || ''"
        />
        <el-input-number
          v-else-if="item.type === 'number'"
          v-model="ruleForm[item.key]"
          :min="item.min || 0"
          :max="item.max || 1000000"
        />
        <CommonUploadImage
          v-else-if="item.type === 'image'"
          :before-image-upload="beforeImageUpload"
          :file-url="file.url"
          :show-image="ruleForm[item.key] || file.url"
        />
        <CommonSelect
          v-else-if="item.type === 'select'"
          :route="item.extra"
          :data-form="ruleForm"
          :default-value="ruleForm[item.key]"
          @on-change-data="
            (value) => {
              updateField(value, item.key)
            }
          "
        >
        </CommonSelect>
        <div v-else-if="item.type === 'tiptap'">
          <TiptapEditor v-model="ruleForm[item.key]" />
        </div>
        <MapLatLonField
          v-else-if="item.type === 'location'"
          :data="{ lat: ruleForm['lat'], lon: ruleForm['lon'] }"
          @change-data="changePosition"
        />
      </el-form-item>
      <slot />
      <el-form-item v-if="isAction">
        <div class="space-x-2">
          <button
            class="rounded-[10px] px-2 bg-white border text-black hover:bg-gray-100"
            @click.prevent="backPage"
          >
            {{ t('button.back') }}
          </button>
          <button
            class="px-2 bg-primary hover:bg-secondary rounded-[10px] text-white"
            @click.prevent="submitForm(ruleFormRef)"
          >
            {{
              $route.params.id === 'new' ? t('button.create') : t('button.edit')
            }}
          </button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-input) {
  width: 100% !important;
}
:deep(.el-select) {
  width: 100% !important;
}
.avatar-uploader {
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  :hover {
    border-color: var(--el-color-primary);
  }
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
