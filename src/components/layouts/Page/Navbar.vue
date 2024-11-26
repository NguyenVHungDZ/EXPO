<script lang="ts" setup>
import { useUser } from '~/stores/user'
import menuNavBar from '~/assets/menuNavBar'
import IconExpo from '~icons/file-icons/expo'
import IconMenu from '~icons/gg/menu'
import IconClose from '~icons/mdi/close'
import IconAdminGeneric from '~icons/dashicons/admin-generic'
import IconLogin from '~icons/material-symbols/login'

const showMenuOnReponse = ref(false)
const { t } = useI18n()
const router = useRouter()
const userStore = useUser()
const user = computed(() => userStore.getInformation)
const onLogout = () => {
  userStore.removeUserInfo()
  router.push('/')
}
</script>

<template>
  <header
    class="fixed backdrop-filter backdrop-blur-md top-0 z-40 w-full transition-colors duration-300 lg:z-50 border-b border-gray-950/10 bg-white/[0.5]"
  >
    <!-- content -->
    <div
      class="flex-1 max-w-screen-2xl m-auto px-4 flex items-center justify-between h-full"
    >
      <!-- title -->
      <div>
        <slot name="title">
          <NuxtLink to="/" class="font-bold text-lg text-primary-500">
            <IconExpo class="font-black text-xl font-mono mr-2 inline-block" />
            <span class="capitalize">VEXPO</span>
          </NuxtLink>
        </slot>
      </div>
      <div
        class="hidden menu w-[70vw] lg:flex gap-2 font-semibold text-md overflow-x-auto justify-center"
      >
        <nuxt-link
          v-for="(item, index) in menuNavBar[0].pages"
          :key="index"
          :to="item.link"
          class="menu-item hover:text-primary cursor-pointer hover:border-b-3 p-4 text-nowrap"
          >{{ t(item.title) }}</nuxt-link
        >
      </div>
      <!-- menus -->
      <client-only>
        <div class="flex space-x-4 items-center">
          <!-- others -->
          <div class="pl-4 lg:flex space-x-5 text-xl hidden">
            <LayoutsPageNavbarDropdownLangSwitcher />
            <LayoutsPageNavbarDropdownMenu />
          </div>
          <div class="block lg:hidden">
            <button @click="showMenuOnReponse = true">
              <IconMenu />
            </button>
            <div
              v-show="showMenuOnReponse"
              class="absolute top-0 right-0 w-full z-50 bg-white py-3 space-y-2 shadow-md"
            >
              <p
                class="text-right px-2 hover:text-blue-500 cursor-pointer"
                @click="
                  () => {
                    showMenuOnReponse = false
                  }
                "
              >
                <IconClose />
              </p>
              <div class="px-3 space-y-3">
                <LayoutsAdminMenuAdmin />
                <div>
                  <p class="text-sm font-bold">Menu</p>
                  <nuxt-link
                    v-for="(item, index) in menuNavBar[0].pages"
                    :key="index"
                    :to="item.link"
                    class="block py-2 hover:bg-gray-100 w-full text-sm border-b px-8"
                    @click="showMenuOnReponse = false"
                  >
                    {{ t(item.title) }}
                  </nuxt-link>
                </div>
                <div>
                  <p class="text-sm font-bold">{{ t('setting') }}</p>
                  <div v-if="user && user._id">
                    <a
                      v-if="
                        user.role === 'admin' ||
                        user.role === 'organizer' ||
                        user.role === 'company'
                      "
                      href="/admin/dashboard"
                      class="flex items-center py-2 hover:bg-gray-100 w-full"
                      @click="showMenuOnReponse = false"
                    >
                      <IconAdminGeneric class="text-xl w-20" />
                      <p class="text-sm">{{ t('role.admin') }}</p>
                    </a>

                    <div
                      v-for="(item, index) in menuNavBar[1].menu"
                      :key="index"
                    >
                      <nuxt-link
                        v-if="item.to"
                        :to="item.to"
                        class="flex items-center py-2 hover:bg-gray-100 w-full"
                        @click="showMenuOnReponse = false"
                      >
                        <component :is="item.icon" class="text-xl w-20" />
                        <p class="text-sm">{{ t(item.label) }}</p>
                      </nuxt-link>
                      <hr v-else-if="item.isDivider" class="my-1" />
                      <button
                        v-else
                        :to="item.to"
                        class="flex items-center py-2 hover:bg-gray-100 w-full"
                        @click="
                          () => {
                            if (item.isLogout) onLogout()
                            showMenuOnReponse = false
                          }
                        "
                      >
                        <component :is="item.icon" class="text-xl w-20" />
                        <p class="text-sm">{{ t('login.logout') }}</p>
                      </button>
                    </div>
                  </div>
                  <nuxt-link
                    v-else
                    to="/login"
                    class="flex items-center py-2 hover:bg-gray-100 w-full"
                  >
                    <IconLogin class="text-xl w-20" />
                    <p class="text-sm">{{ t('login.logout') }}</p>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </client-only>

      <!-- drawer:btn -->
    </div>
  </header>
</template>

<style scoped>
.menu .menu-item {
  border-bottom: solid 3px transparent;
}
.menu .router-link-active,
.menu .menu-item:hover {
  color: theme('colors.primary.DEFAULT');
  border-bottom: solid 3px;
}
</style>
