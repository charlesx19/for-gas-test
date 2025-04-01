// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    baseURL: '/for-gas-test/',
    buildAssetsDir: '/_nuxt/'
  },

  runtimeConfig: {
    public: {
      gasUrl: process.env.NUXT_PUBLIC_GAS_URL
    }
  },

  compatibilityDate: '2025-04-01'
})