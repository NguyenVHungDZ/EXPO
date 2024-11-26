<template>
  <div class="rounded-[16px] mb-[20px] bg-[#fff]">
    <div
      class="flex px-[16px] cursor-pointer items-center justify-between py-[20px]"
      :class="isDropDown && ' text-primary'"
      @click="isDropDown = !isDropDown"
    >
      <h3 class="text-[20px] font-bold mb-0">{{ item.title }}</h3>
      <Icon
        :name="isDropDown ? 'icon-park-outline:down' : 'icon-park-outline:up'"
        class="text-[36px]"
      />
    </div>

    <div
      class="border-t border-solid border-[#cccccca6]"
      :class="isDropDown ? 'block' : 'hidden'"
    >
      <!-- show -->
      <div class="p-[20px]">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDropDown = ref(false)

interface IItem {
  id: number
  title: string
  name: string
}

const props = defineProps({
  item: {
    type: Object as () => IItem,
    default: () => {},
  },
})
</script>

<style></style>
