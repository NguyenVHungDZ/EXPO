import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getUserMe } from '@/composables/userApi'
type UserType = {
  _id: string
  username: string
  email: string
  role: string
  address: string
  bio: string
  facebook_id: string
  github_id: string
  google_id: string
  name: string
  phone: string
}

// using vueuse to store user data in local storage
const baseUser = useStorage('base_user', {} as UserType)

// using pinia store to manage user data and actions
export const useUser = defineStore('user', {
  state: () => ({
    user: {} as UserType,
  }),
  getters: {
    getInformation: (state) => state.user,
  },
  actions: {
    setUserData() {
      watch(
        baseUser,
        (value) => {
          this.user = value
        },
        { immediate: true },
      )
    },
    async getUserInfo() {
      try {
        const res = await getUserMe()
        baseUser.value = res
        this.setUserData()
      } catch (error) {}
    },
    removeUserInfo() {
      const baseToken = useCookie('expo_token')
      baseToken.value = ''
      this.user = baseUser.value = {} as UserType
    },
  },
})
