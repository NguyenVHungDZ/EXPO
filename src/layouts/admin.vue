<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { useUser } from '~/stores/user'
import { menuAside } from '~/assets/menuAside.js'
import menuNavBar from '~/assets/menuNavBar.js'
import IconBackburger from '~icons/mdi/backburger'
import IconForwardburger from '~icons/mdi/forwardburger'
import IconMenu from '~icons/mdi/menu'

const layoutAsidePadding = 'xl:pl-[18rem]'
const user = useStorage('base_user', {})

const router = useRouter()

const isAsideMobileExpanded = ref(false)
const isAsideLgActive = ref(false)

router.beforeEach(() => {
  isAsideMobileExpanded.value = false
  isAsideLgActive.value = false
})
const userStore = useUser()

const menuClick = (event: any, item: any) => {
  if (item.isLogout) {
    userStore.removeUserInfo()
    window.open('/', '_self')
  }
}
</script>

<template>
  <div
    :class="{
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <div
      :class="[layoutAsidePadding, { 'ml-72 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-full transition-position lg:w-auto bg-gray-100"
    >
      <ClientOnly>
        <LayoutsAdminNavBar
          :menu="menuNavBar"
          :class="[
            layoutAsidePadding,
            { 'ml-72 lg:ml-0': isAsideMobileExpanded },
          ]"
          @menu-click="menuClick"
        >
          <LayoutsAdminNavBarItemPlain
            display="flex lg:hidden"
            @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
          >
            <component
              :is="isAsideMobileExpanded ? IconBackburger : IconForwardburger"
              size="24"
            />
          </LayoutsAdminNavBarItemPlain>
          <LayoutsAdminNavBarItemPlain
            display="hidden lg:flex xl:hidden"
            @click.prevent="isAsideLgActive = true"
          >
            <IconMenu size="24" />
          </LayoutsAdminNavBarItemPlain>
        </LayoutsAdminNavBar>
        <LayoutsAdminAsideMenu
          :is-aside-mobile-expanded="isAsideMobileExpanded"
          :is-aside-lg-active="isAsideLgActive"
          :menu="menuAside(user)"
          @menu-click="menuClick"
          @aside-lg-close-click="isAsideLgActive = false"
      /></ClientOnly>
      <div class="m-10">
        <slot />
      </div>
      <LayoutsAdminFooterBar> </LayoutsAdminFooterBar>
    </div>
  </div>
</template>
