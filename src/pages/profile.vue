<template>
  <div class="lg:container mx-auto p-5">
    <div class="w-full bg-white mb-3 py-5 px-10 flex">
      <IconAccount class="w-14 h-14 rounded-full" />
      <div class="ml-5">
        <ClientOnly
          ><p class="text-lg font-semibold">
            {{ user.username || '' }}
          </p>
          <el-tag :type="getRole(user.role)?.type">{{
            t(`role.${getRole(user.role)?.value}`)
          }}</el-tag></ClientOnly
        >
      </div>
    </div>
    <div class="flex gap-3" :class="positionTab ? 'flex-col' : 'flex-row'">
      <ul
        class="h-full bg-white flex"
        :class="positionTab ? 'flex-row' : 'flex-col w-80'"
      >
        <li
          v-for="TAB in TABS_PROFILE"
          :key="TAB.id"
          class="flex items-center px-3 py-2 border-primary hover:bg-gray-200 cursor-pointer"
          :class="
            TAB.id === tabIndex
              ? positionTab
                ? 'border-b-2 bg-gray-50 text-primary'
                : 'border-l-2 bg-gray-50 text-primary'
              : ''
          "
          @click="router.push(TAB.to)"
        >
          <component :is="TAB.icon" class="w-10 h-5" />
          <p>{{ t(TAB.key) }}</p>
        </li>
      </ul>
      <div class="w-full bg-white px-10 py-8">
        <h4 class="text-2xl font-medium mb-2">{{ t('profile.info') }}</h4>
        <hr class="mb-5" />
        <form-update-info v-if="tabIndex === 1" />
        <form-change-password v-else-if="tabIndex === 2" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ROLE, TABS_PROFILE } from '../assets/data'
import { useUser } from '~/stores/user'
import IconAccount from '~icons/codicon/account'

const userStore = useUser()
const route = useRoute()
const router = useRouter()
const user = computed(() => userStore.getInformation)
// Decide what tab is currently in
const tabIndex = ref(0)
const { t } = useI18n()
// Position tab for responsive design
const positionTab = ref(false)

// update this value for responsive web
const updatePositionTab = () => {
  // Set 'positionTab' to true if window's innerWidth is less than 1024
  positionTab.value = window.innerWidth <= 1024
}

// check role
const getRole = (role: string) => ROLE.find((item) => item.value === role)

// Constantly watch for change in tabIndex, and change to 'Account information' or 'Password management' accordingly
watch(
  route,
  () => {
    const fullPath = route.fullPath
    if (fullPath.includes('password-manager')) {
      tabIndex.value = 2
    } else {
      tabIndex.value = 1
    }
  },
  { immediate: true },
)

// Listen to tab resize event, and call 'updatePositionTab'
onMounted(() => {
  updatePositionTab()
  window.addEventListener('resize', updatePositionTab)
})

// Before unmount, remove the resize event listener
onBeforeUnmount(() => {
  window.removeEventListener('resize', updatePositionTab)
})

definePageMeta({
  layout: 'page',
})
</script>
