// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // https://nuxt.com/modules
  modules: ['@nuxthub/core', '@nuxt/eslint', 'nuxt-vuefire', '@nuxt/ui'],
  devtools: { enabled: true },
  ui: {
    safelistColors: ['shakespeare'],
  },
  // Env variables - https://nuxt.com/docs/getting-started/configuration#environment-variables-and-private-tokens
  runtimeConfig: {
  },
  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {},
  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  vuefire: {
    config: {
      apiKey: 'AIzaSyBaoefKgT--RBvl2iyAZ1JJh6HAROzZmvQ',
      authDomain: 'foosball-scores.firebaseapp.com',
      projectId: 'foosball-scores',
      storageBucket: 'foosball-scores.firebasestorage.app',
      messagingSenderId: '129555003295',
      appId: '1:129555003295:web:65b71de89771ee30f8afaa',
      measurementId: 'G-3BW83JBCZ8',
    },
  },
})
