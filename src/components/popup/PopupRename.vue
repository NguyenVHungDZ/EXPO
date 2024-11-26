<template>
  <!-- popup rename, remove -->
  <el-dialog v-model="isPopup" :title="title" @close="onClose">
    <el-form :model="formPopup">
      <el-input v-model="formPopup.name" autocomplete="off" />
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleActionFile">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'

const formPopup = reactive({ name: '' })
const cutTailFile = ref('')

const { update } = useApi('File')

const emit = defineEmits(['closeDialog'])
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  isShowPopupFile: {
    type: Boolean,
    default: false,
  },
  fileCurrent: {
    type: String,
    default: '',
  },
  fetchData: {
    type: Function,
    default: () => {},
  },
})

const isPopup = computed({
  get: () => {
    const dotLastIndex = props.fileCurrent.lastIndexOf('.')

    cutTailFile.value = props.fileCurrent.slice(
      dotLastIndex,
      props.fileCurrent.length,
    )

    formPopup.name = props.fileCurrent.slice(0, dotLastIndex)
    return props.isShowPopupFile
  },
  set: (value: any) => {},
})

const onClose = () => {
  emit('closeDialog', 'false')
}

// handle close
const handleClose = () => {
  isPopup.value = false
}

// Handle rename
const handleActionFile = async () => {
  try {
    await update(props.id, {
      originalname: `${formPopup.name}${cutTailFile.value}`,
    })
    ElMessage.success('Đổi tên thành công!')
    await props.fetchData()
    isPopup.value = false
  } catch (error) {
    ElMessage.error('Đổi tên thất bại!')
  }
}
</script>
