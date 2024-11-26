<template>
  <div>
    <el-popover
      :visible="visible"
      placement="top"
      :width="300"
      style="background-color: aqua"
    >
      <p class="mb-2">Are you sure to delete {{ name }}?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="small" text @click="visible = false">cancel</el-button>
        <el-button size="small" type="primary" @click="handleDelete"
          >confirm</el-button
        >
      </div>
      <template #reference>
        <el-button @click="visible = true">Delete</el-button>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import useApi from '~/composables/request/useApi'

const visible = ref(false)

// props
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  route: {
    type: String,
    default: '',
  },
})

// handle remove item
const deleteItem = async () => {
  // route call api
  const { remove, getAll } = useApi(props?.route)

  try {
    await remove(props.id)
    await getAll({})
    ElMessage.success(success.delete_success)
  } catch (error) {
    ElMessage.error('Xóa thất bại!')
  }
}

const handleDelete = () => {
  deleteItem()
  visible.value = false
}
</script>

<style scoped>
:deep(.el-popover.el-popper) {
  font-size: 14px;
  padding: 15px !important;
}
</style>
