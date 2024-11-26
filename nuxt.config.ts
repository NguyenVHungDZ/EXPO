// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'
import i18nConfig from './i18n.config'

export default defineNuxtConfig({
  srcDir: 'src',
  devtools: { enabled: true },

  runtimeConfig: {
    apiBaseUrl: '',
    apiSecret: '', // can be overridden by NUXT_API_SECRET environment variable
    turnstile: {
      secretKey: process.env.RECAPTCHA_SECRET_KEY,
    },
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
  },

  // exp
  experimental: {
    localLayerAliases: true,
  },

  app: {
    head: {
      title: 'A Better Nuxt 3 Starter',
      link: [{ rel: 'icon', type: 'image/*', href: '/favicon.svg' }],
    },
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  modules: [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    'unplugin-icons/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '~/modules/hook.module.ts',
    '@nuxtjs/turnstile',
    'vue3-carousel-nuxt',
    '@nuxtjs/google-fonts',
  ],

  imports: {
    dirs: ['~/stores'],
  },

  plugins: ['~/plugins/dompurify-html.ts'],

  // module::color-mode
  colorMode: {
    classSuffix: '',
  },

  // module::pinia
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },

  // module::headlessui
  headlessui: {
    prefix: 'Headless',
  },

  // module::i18n
  i18n: i18nConfig,

  // module::turnstile
  turnstile: {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
  },

  // module::googleFonts
  googleFonts: {
    display: 'swap',
    overwriting: true,
    families: {
      Inter: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
  },

  compatibilityDate: '2024-11-16',
})
