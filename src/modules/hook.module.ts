import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options) {
    const resolver = createResolver(import.meta.url)

    extendPages((pages) => {
      pages.push({
        name: 'profile',
        path: '/profile',
        file: '~/pages/profile.vue',
      })
      pages.push({
        name: 'password manager',
        path: '/profile/password-manager',
        file: '~/pages/profile.vue',
      })
      pages.push({
        name: 'google login',
        path: '/callback/google',
        file: '~/pages/redirect-login.vue',
      })
      pages.push({
        name: 'facebook login',
        path: '/callback/facebook',
        file: '~/pages/redirect-login.vue',
      })
      pages.push({
        name: 'github login',
        path: '/callback/github',
        file: '~/pages/redirect-login.vue',
      })
    })
  },
})
