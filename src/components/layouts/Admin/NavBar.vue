<script setup>
import { ref } from 'vue'
import LangSwitcher from '../Page/NavbarDropdown/LangSwitcher.vue'
import NavBarMenuList from './NavBarMenuList.vue'
import NavBarItemPlain from './NavBarItemPlain.vue'
import MenuAdmin from './MenuAdmin.vue'

defineProps({
  menu: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

const isMenuNavBarActive = ref(false)
</script>

<template>
  <nav
    class="top-0 inset-x-0 fixed bg-white shadow-md shadow-gray-200 h-14 z-30 transition-position w-full lg:w-auto"
  >
    <div class="flex lg:items-stretch xl:mx-10">
      <div class="flex flex-1 items-stretch h-14">
        <slot />
      </div>
      <div class="flex-none items-stretch flex h-14 lg:hidden">
        <NavBarItemPlain>
          <Icon
            :name="
              isMenuNavBarActive
                ? 'material-symbols:close'
                : 'pepicons-pop:dots-y'
            "
            size="26"
            @click="isMenuNavBarActive = !isMenuNavBarActive"
          />
        </NavBarItemPlain>
      </div>
      <div
        class="max-h-screen-menu overflow-y-auto lg:overflow-visible absolute w-full top-14 left-0 bg-white shadow-lg lg:w-auto lg:flex lg:static lg:shadow-none"
        :class="[isMenuNavBarActive ? 'block' : 'hidden']"
      >
        <div class="gap-3 hidden lg:flex">
          <LangSwitcher />
        </div>
        <MenuAdmin class="lg:hidden" />
        <NavBarMenuList :menu="menu" @menu-click="menuClick" />
      </div>
    </div>
  </nav>
</template>
