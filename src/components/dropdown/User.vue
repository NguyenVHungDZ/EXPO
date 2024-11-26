<!-- eslint-disable vue/no-template-shadow -->
<template>
  <div class="text-right h-[90%]">
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
          class="inline-flex w-full justify-center pr-7 rounded-full text-sm font-medium text-white"
        >
          <img
            src="https://th.bing.com/th/id/OIP.4zcsq9O8CpoUnXXypY5x1QHaHa?w=198&h=198&c=7&r=0&o=5&dpr=1.1&pid=1.7"
            alt="avatar"
            class="w-[50px] h-[50px] shadow-l rounded-full border-r"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-4 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div class="px-2 py-2 text-black font-bold border border-b-2">
            Hi, Nguyen
          </div>
          <div class="px-3 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                Profile
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                Setting
              </button>
            </MenuItem>
          </div>
          <div class="px-3 py-1">
            <MenuItem v-slot="{ active }">
              <button
                :class="[
                  active ? 'bg-violet-500 text-white' : 'text-gray-900',
                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]"
              >
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
const active = ref(true)
</script>
