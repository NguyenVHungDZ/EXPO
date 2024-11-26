<script setup>
import { RouterLink } from 'vue-router'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import NavBarMenuList from './NavBarMenuList.vue'
import BaseDivider from './BaseDivider.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()
const emit = defineEmits(['menu-click'])

const is = computed(() => {
  if (props.item.href) {
    return 'a'
  }

  if (props.item.to) {
    return RouterLink
  }

  return 'div'
})

const componentClass = computed(() => {
  const base = [
    isDropdownActive.value ? `text-blue-600 ` : `text-black hover:text-primary`,
    props.item.menu ? 'lg:py-2 lg:px-3' : 'py-2',
  ]

  if (props.item.isDesktopNoLabel) {
    base.push('lg:w-16', 'lg:justify-center')
  }

  return base
})

const isDropdownActive = ref(false)

const menuClick = (event) => {
  emit('menu-click', event, props.item)
  if (props.item.menu) {
    isDropdownActive.value = !isDropdownActive.value
  }
}

const menuClickDropdown = (event, item) => {
  emit('menu-click', event, item)
}

const root = ref(null)

const forceClose = (event) => {
  if (root.value && !root.value.contains(event.target)) {
    isDropdownActive.value = false
  }
}

onMounted(() => {
  if (props.item.menu) {
    window.addEventListener('click', forceClose)
  }
})

onBeforeUnmount(() => {
  if (props.item.menu) {
    window.removeEventListener('click', forceClose)
  }
})
</script>

<template>
  <div class="lg:hidden">
    <hr v-if="item.isDivider" nav-bar class="w-full" />
    <component
      :is="is"
      v-else
      ref="root"
      class="lg:hidden items-center relative cursor-pointer text-black hover:text-blue-500 py-2"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      @click.prevent="menuClick"
    >
      <div class="flex items-center">
        <component :is="item.icon" v-if="item.icon" class="lg:hidden" />
        <span
          v-if="item.label"
          class="px-2"
          :class="{ 'lg:hidden': item.isDesktopNoLabel && item.icon }"
          >{{ t(`${item.label}`) }}</span
        >
      </div>
      <div
        v-if="item.menu"
        class="text-sm right-2 w-50 space-y-3 px-10"
        :class="{ 'lg:hidden': !isDropdownActive }"
      >
        <NavBarMenuList :menu="item.menu" @menu-click="menuClickDropdown" />
      </div>
    </component>
  </div>
  <div class="hidden lg:grid">
    <BaseDivider v-if="item.isDivider" nav-bar />
    <component
      :is="is"
      v-else
      ref="root"
      class="block lg:flex items-center relative cursor-pointer"
      :class="componentClass"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      @click.prevent="menuClick"
    >
      <div
        class="flex items-center"
        :class="{
          'bg-gray-100 lg:bg-transparent p-3 lg:p-0': item.menu,
        }"
      >
        <Icon
          v-if="item.isCurrentUser"
          name="mingcute:user-4-fill"
          class="w-7 h-7 lg:hidden"
        />
        <component :is="item.icon" v-if="item.icon" />
        <span
          v-if="item.label"
          class="px-2"
          :class="{ 'lg:hidden': item.isDesktopNoLabel && item.icon }"
          >{{ t(`${item.label}`) }}</span
        >
        <Icon
          v-if="item.menu"
          :name="isDropdownActive ? 'subway:up-2' : 'subway:down-2'"
          class="hidden lg:inline-flex transition-colors w-3 h-3 ml-[5px]"
          :class="isDropdownActive && 'mt-[4px]'"
        />
      </div>
      <div
        v-if="item.menu"
        class="text-sm border-b border-gray-100 lg:border lg:bg-white lg:absolute lg:top-full lg:min-w-full lg:z-20 lg:rounded-lg lg:shadow-lg right-2 w-50 lg:w-48 px-3"
        :class="{ 'lg:hidden': !isDropdownActive }"
      >
        <NavBarMenuList :menu="item.menu" @menu-click="menuClickDropdown" />
      </div>
    </component>
  </div>
</template>
