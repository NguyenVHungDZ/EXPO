<script lang="ts" setup>
import IconAdminGeneric from '~icons/dashicons/admin-generic'
import IconInformaionDesk from '~icons/streamline/information-desk'
import IconForms from '~icons/fluent-mdl2/form-library'
import IconLogout from '~icons/mdi/logout'
import IconAvatar from '~icons/carbon/user-avatar-filled'
import menuData from '~/assets/menuNavBar'
import { useUser } from '~/stores/user'
const props = defineProps({
  type: {
    type: String,
    default: 'dropdown-right-top',
  },
})

type menuType = {
  icon: any
  label: string
  to: string
  disabled?: boolean
  isDivider?: boolean
  isLogout?: boolean
  action?: any
}

const userStore = useUser()
const router = useRouter()
const user = computed(() => userStore.getInformation)

const { locales, locale, setLocale } = useI18n()

const language = computed({
  get: () => locale.value,
  set: (value) => setLocale(value),
})
const { t } = useI18n()
const menuList = computed(() => {
  const admin = {
    icon: IconAdminGeneric,
    label: 'role.admin',
    to: '/admin/dashboard',
    disabled: user.value.role === 'user',
  }
  return [admin, ...(menuData[1].menu || [])] as menuType[]
})

const currentStyle = toRef(props, 'type')

const onLogout = () => {
  userStore.removeUserInfo()
  router.push('/')
}
</script>

<template>
  <div>
    <div v-if="user && user._id" class="flex items-center">
      <HeadlessListbox
        v-if="currentStyle === 'dropdown-right-top'"
        v-model="language"
        as="div"
        class="relative flex items-center"
      >
        <HeadlessListboxLabel class="sr-only">Menu</HeadlessListboxLabel>
        <HeadlessListboxButton type="template">
          <a class="text-gray-600">
            <span class="flex justify-center items-center text-2xl">
              <icon-avatar />
            </span>
          </a>
        </HeadlessListboxButton>
        <HeadlessListboxOptions
          class="p-1 absolute z-50 origin-top-right top-full right-0 outline-none bg-white rounded-lg ring-1 ring-gray-900/10 shadow-lg overflow-hidden w-48 py-1 text-sm text-gray-700 font-semibold"
        >
          <HeadlessListboxOption
            v-for="(item, index) in menuList"
            v-show="!item.disabled"
            :key="index"
            class="py-2 px-2 flex items-center cursor-pointer hover:bg-gray-100"
            @click="item.action"
          >
            <hr v-if="item.isDivider" class="bg-gray-500 w-full" />
            <nuxt-link
              v-else
              :to="item.to"
              class="flex w-full h-full hover:text-primary"
              @click="
                () => {
                  if (item.isLogout) onLogout()
                }
              "
            >
              <span class="text-sm mr-2 flex items-center">
                <component :is="item.icon" />
              </span>
              {{ t(item.label) }}
            </nuxt-link>
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </HeadlessListbox>
      <client-only>
        <el-select
          v-if="currentStyle === 'select-box'"
          v-model="language"
          class="w-full px-2 pr-3 py-1 outline-none rounded border bg-transparent text-gray-700 border-gray-900/10"
        >
          <el-option
            v-for="lang in locales"
            :key="typeof lang === 'object' ? lang.code : lang"
            :value="typeof lang === 'object' ? lang.code : lang"
          >
            {{ typeof lang === 'object' ? lang.name : lang }}
          </el-option>
        </el-select>
      </client-only>
    </div>
    <div
      v-else
      class="text-white px-3 py-1 rounded-[10px] cursor-pointer bg-primary hover:bg-secondary text-nowrap"
      @click.prevent="router.push('/login')"
    >
      <span class="text-[15px]">{{ t('register.login') }}</span>
    </div>
  </div>
</template>
