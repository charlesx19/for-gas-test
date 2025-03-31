// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    baseURL: "/for-gas-test/", // 替換成您的 GitHub 倉庫名稱
    buildAssetsDir: "/_nuxt/",
  },
});
