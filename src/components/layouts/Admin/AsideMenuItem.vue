<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import AsideMenuList from './AsideMenuList.vue'
import IconUp from '~icons/mingcute/up-line'
import IconDown from '~icons/mingcute/down-line'

const { t } = useI18n()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isDropdownList: Boolean,
})

const route = useRoute()
// Get page url
const pageUrl = computed(() => {
  const str = route.fullPath.split('/')
  return str[2]
})

const emit = defineEmits(['menu-click'])

// Active style
const asideMenuItemActiveStyle = computed(
  () => 'text-white font-bold bg-[#5d7c91] rounded-[3px]',
)

// Active dropdown
const isDropdownActive = ref(false)

// Component class
const componentClass = computed(() => [
  props.isDropdownList ? 'text-sm ' : '',
  `flex cursor-pointer  text-gray-300 hover:text-white `,
])

// Has dropdown
const hasDropdown = computed(() => !!props.item.menu)

// Handle menu click
const menuClick = (event) => {
  emit('menu-click', event, props.item)

  if (hasDropdown.value) {
    isDropdownActive.value = !isDropdownActive.value
  }
}
</script>

<template>
  <div class="text-[15px]">
    <component
      :is="item.to ? RouterLink : 'a'"
      v-slot="vSlot"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      class="flex cursor-pointer items-center px-4"
      :class="componentClass"
      @click="menuClick"
    >
      <div
        class="flex justify-between w-full py-2 my-1"
        :class="[
          (vSlot && vSlot.isExactActive) || pageUrl === item.key
            ? asideMenuItemActiveStyle
            : '',
        ]"
      >
        <!-- {{ vSlot }} -->
        <component
          :is="item.icon"
          v-if="item.icon"
          class="flex-none w-12 h-6"
        />
        <div
          class="grow text-ellipsis line-clamp-1"
          :class="[
            { 'pr-12': !hasDropdown },
            vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '',
          ]"
        >
          {{ t(item.label) }}
        </div>
        <component
          :is="isDropdownActive ? IconDown : IconUp"
          v-if="hasDropdown"
          class="flex-none w-8 h-6"
          :class="[
            vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '',
          ]"
        />
      </div>
    </component>
    <AsideMenuList
      v-if="hasDropdown"
      :menu="item.menu"
      class="bg-gray-700/50"
      :class="isDropdownActive ? 'block' : 'hidden'"
      is-dropdown-list
    />
  </div>
</template>
