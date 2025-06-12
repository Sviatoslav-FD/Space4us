// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  pages: {
    pattern: ['**/*.vue', '!**/components/**'],
  },
  components: [
    '~/components', {
      path: '~/pages',
      pattern: ['**/components/**'],
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
