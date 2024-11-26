<template>
  <p v-dompurify-html="content" class="line-clamp-4" />
</template>

<script lang="ts" setup>
import useApi from '~/composables/request/useApi'

const props = defineProps({
  model: {
    type: String,
    default: '',
  },
  field: {
    type: String,
    default: '',
  },
  objectId: {
    type: String,
    default: '',
  },
})

const content = ref('')

const fetchData = async () => {
  try {
    const { get } = useApi(props.model)
    const res = (await get(props.objectId)) as any
    content.value = res[props.field]
  } catch (error) {}
}

onMounted(() => {
  if (props.model && props.field && props.objectId) {
    fetchData()
  }
})
</script>

<style></style>
