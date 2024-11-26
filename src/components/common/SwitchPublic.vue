<template>
  <el-switch
    v-model="isCheck"
    :disabled="item.user_id !== user?._id && user.role !== 'admin'"
    @click="
      (item.user_id === user?._id || user?.role === 'admin') &&
        changePublicFile()
    "
  />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import useApi from '~/composables/request/useApi'
import type { IItem } from '~/interfaces/item'
import { useUser } from '~/stores/user'

// props
const props = defineProps({
  item: {
    type: Object,
    default: {} as IItem,
  },
  isPublic: {
    type: Boolean || null,
    default: false || null,
  },
})

const { changeStatusShare } = useApi('File')

// user
const userStore = useUser()

const user = computed(() => userStore.getInformation)

const isLoadingChangePublic = ref(false)

const isCheck = ref(true)

watch(
  props,
  () => {
    isCheck.value = props.isPublic === true
  },
  {
    immediate: true,
  },
)

// change public file
const changePublicFile = async () => {
  isLoadingChangePublic.value = true

  try {
    await changeStatusShare(props.item._id, {
      is_public: isCheck.value,
    })
    ElMessage.success('Change status share thành công!')
    isLoadingChangePublic.value = false
  } catch (error) {
    ElMessage.error('Change status share thất bại!')
    isLoadingChangePublic.value = false
  }
}
</script>

<style></style>
