export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',
  // mode: "spa",
  ssr: false,
  generate: {
    fallback: true,
    routes: [
      'passwordreset/token/email'
      // '/payment/code/userObj',
      // '/dashboard/test/index',
      // '/dashboard/test/report/preview/index',
    ]
  },
  loadingIndicator: {
    name: 'circle',
    color: '#45CEDB',
    background: 'white'
  },
  loading: {
    color: '#45CEDB',
    height: '5px'
  },
  server: {
    port: 4800 // default: 3000
  },
  head: {
    title: 'Timetable',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'CarDocx' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cairo&family=Montserrat:ital@1&display=swap' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/icon'
    // { src: '~/plugins/auth', ssr: false }
  ],
  pwa: {// disables the icon module
    meta: {
      title: 'Timetable',
      author: 'Virus',
      description: 'Timetable Management System.'
    },
    manifest: {
      name: 'Timetable by Virus',
      short_name: 'TT',
      lang: 'en',
      description: 'Timetable Management System.'
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/style-resources',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/svg',
    // '@nuxtjs/auth',
  ],
 
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },
  styleResources: {
    scss: '@/assets/scss/_variables.scss'
  },
 
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: `${process.env.BASE_URL}`,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: `${process.env.BASE_URL}admin/login`, method: 'post', propertyName: 'accessToken' },
          logout: { url: `${process.env.BASE_URL}admin/logout`, method: 'post' },
          user: { url: `${process.env.BASE_URL}admin/getdata`, method: 'post', propertyName: 'userdata'}
        },
        // tokenRequired: true,
        // tokenType: 'Bearer',
        autoFetchUser: true
      },
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/dashboard'
    },
    
  },

  env: {
    baseUrl: process.env.BASE_URL,
    // pk_live_77d04c5e95bd05b1cf4fbfa6cfc9ffaaf1240d95
    //
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}