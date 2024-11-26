<script lang="ts" setup>
import type { IRes } from '~/interfaces/res_type'
import useApi from '~/composables/request/useApi'

const { getAll: getBlockGroups } = useApi('BlockGroup')
const blockGroupList = ref<any>([])

const fetchBlockGroups = async () => {
  try {
    const res = (await getBlockGroups({
      limit: 5,
      'populate[blockType]': true,
    })) as IRes
    blockGroupList.value = res.data
  } catch (error) {}
}

const myDiv = ref()
onBeforeMount(async () => {
  await fetchBlockGroups()
})
</script>

<template>
  <div v-for="item in blockGroupList" :key="item._id">
    <PageHomeBlockGroupCard
      v-if="item.blockType.name === 'BlockGroupCard'"
      :block-group-item="item"
    />
    <PageHomeBlockGroupGrid
      v-else-if="item.blockType.name === 'BlockGroupGrid'"
      :block-group-item="item"
    />
    <PageHomeBlockGroupList
      v-else-if="item.blockType.name === 'BlockGroupList'"
      :block-group-item="item"
    />
    <PageHomeBlockGroupMenu
      v-else-if="item.blockType.name === 'BlockGroupMenu'"
      :block-group-item="item"
    />
    <PageHomeBlockGroupSlider
      v-else-if="item.blockType.name === 'BlockGroupSlider'"
      :block-group-item="item"
    />
    <PageHomeBlockGroupInformation
      v-else-if="item.blockType.name === 'BlockGroupInformation'"
      :block-group-item="item"
    />
    <PageHomeBlockGroupSolution
      v-else-if="item.blockType.name === 'BlockGroupSolution'"
      :block-group-item="item"
    />
  </div>
</template>

<style lang="scss" scoped></style>
