<script setup>
import { computed, ref } from 'vue'
import AsideMenuList from './AsideMenuList.vue'
import IconArrowCollapseLeft from '~icons/mdi/arrow-collapse-left'
import IconExpo from '~icons/file-icons/expo'
defineProps({
  menu: {
    type: Array,
    required: true,
  },
})

// Emits
// menu-click: Emit when the menu item is clicked
// aside-lg-close-click: Emit when the aside menu is closed
const emit = defineEmits(['menu-click', 'aside-lg-close-click'])

const open = ref(false)

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const asideLgCloseClick = (event) => {
  emit('aside-lg-close-click', event)
}
</script>
<template>
  <aside
    id="aside"
    class="transition-all ease-in-out delay-0 w-[18rem] fixed flex top-0 h-screen transition-position overflow-hidden"
    style="z-index: 3000"
  >
    <div class="bg-gray-800 flex-1 flex flex-col overflow-hidden">
      <div
        class="bg-gray-900 text-white flex flex-row h-14 items-center justify-between"
      >
        <div
          class="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0"
        >
          <div class="flex justify-center">
            <NuxtLink to="/">
              <div class="font-bold text-xl text-primary flex items-center">
                <IconExpo class="mr-2" /> VEXPO
              </div>
            </NuxtLink>
          </div>
        </div>
        <button
          class="hidden lg:inline-block xl:hidden p-3"
          @click.prevent="asideLgCloseClick"
        >
          <icon-arrow-collapse-left size="20" />
        </button>
      </div>
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars-gray pb-5"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>
    </div>
  </aside>
</template>
