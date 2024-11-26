export default {
  strategy: 'no_prefix',
  defaultLocale: 'vn',
  langDir: 'locales',
  detectBrowserLanguage: {
    useCookie: true,
    fallbackLocale: 'vn',
    redirectOn: 'root',
    cookieKey: 'base_locale',
  },
  locales: [
    {
      code: 'vi', // VietNam
      iso: 'vi-VN',
      name: 'Tiếng Việt',
      file: 'vi.json',
    },
    {
      code: 'en', // English
      iso: 'en-US',
      name: 'English',
      file: 'en.json',
    },
    {
      code: 'ja', // Japanese
      iso: 'ja-JP',
      name: 'Japanese',
      file: 'ja.json',
    },
  ],
}
