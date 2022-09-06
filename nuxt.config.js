// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
  target: 'static',
  ssr: false,
  server: {
    port: 3000,
    // host: 0,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MiTag',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: 'leading-normal tracking-normal text-light gradient theme-default',
    },
    script: [
      {
        rel: 'preload',
        src: 'https://kit.fontawesome.com/3c4bd3a972.js',
        crossorigin: 'anonymous',
      },
      { rel: 'preload', src: '//www.instagram.com/embed.js' },
      {
        src: 'https://platform.twitter.com/widgets.js',
        rel: 'preconnect',
      },
      {
        hid: 'maps-googleapis',
        src: `https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBextg5ie_El0O6y5TlpIbbXQeVgLavKO4`,
        defer: true,
        rel: 'preload',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['vuejs-noty/dist/vuejs-noty.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/estructuras.client.js',
    '~/plugins/validate.client.js',
    '~/plugins/noty.client.js',
    '~/plugins/vuetailwind.client.js',
    '~/plugins/fb_errores.client.js',
    '~/plugins/qr.client.js',
    '~/plugins/phone.client.js',
    '~/plugins/avatar.client.js',
    '~/plugins/draggable.client.js',
    '~/plugins/maps.client.js',
    // '~/plugins/video.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv',
    // 'nuxt-delay-hydration',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-buefy',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCLIhpkgR0WEBx2VaRhSjUJSV-2BpeA2Ws',
          authDomain: 'mitag-b1e8a.firebaseapp.com',
          projectId: 'mitag-b1e8a',
          storageBucket: 'mitag-b1e8a.appspot.com',
          messagingSenderId: '812923620139',
          appId: '1:812923620139:web:cc678a897a76519103936e',
          measurementId: 'G-R7H677H8SR',
          // fcmPublicVapidKey:
          //   'AAAAQ4c9_EQ:APA91bGXvBfnoK5tlp2RCYOwmZv4Tp2m4SIOxu6EI2hvAh4V0Z6V3m1ToNwsVq2mo0dXhPj2apkrwfGMzFbfKFS31WKNa_sGoQs3MvTzxdrS-wdHe0HEnn9DiH71S6XpUmchBLZpTmzR',
        },
        onFirebaseHosting: false,
        services: {
          auth: {
            disableEmulatorWarnings: false,
            persistence: 'local',
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChanged',
            },
            ssr: true,
            emulatorPort:
              process.env.NODE_ENV === 'production' ? undefined : 9099,
          },
          firestore: {
            enablePersistence: true,
            // memoryOnly: false,
            // // chunkName:
            // //   process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
            // static: false,
            // // enablePersistence: true,
            emulatorPort: process.env.NODE_ENV === 'development' ? 8081 : false,
          },
          functions: {
            emulatorPort: process.env.NODE_ENV === 'development' ? 5001 : false,
          },
          storage: {
            emulatorPort: process.env.NODE_ENV === 'development' ? 9199 : false,
            emulatorHost: 'localhost',
          },
          database: {
            emulatorPort: process.env.NODE_ENV === 'development' ? 9000 : false,
          },
          realtimeDb: true,
          performance: true,
          analytics: true,
          remoteConfig: {
            settings: {
              fetchTimeoutMillis: 60000,
              minimumFetchIntervalMillis: 43200000,
            },
            defaultConfig: {
              welcome_message: 'Welcome',
            },
          },
          messaging: {
            createServiceWorker: true,
            actions: [
              {
                action: 'goToUrl',
                url: 'https://github.com/lupas',
              },
              {
                action: 'goToModuleGithub',
                url: 'https://github.com/nuxt-community/firebase-module',
              },
            ],
          },
        },
      },
    ],
    'vue-social-sharing/nuxt',
  ],
  // pwa: {
  //   meta: {
  //     title: 'MiTag',
  //     author: 'MiTag',
  //   },
  //   manifest: {
  //     name: 'MiTag ',
  //     short_name: 'MiTag',
  //     lang: 'es',
  //   },
  // },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {},
    injectPosition: 0,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://us-central1-mitag-b1e8a.cloudfunctions.net/'
        : 'http://localhost:5001/mitag-b1e8a/us-central1/',
  },
  // delayHydration: {
  //   mode: 'init',
  //   debug: process.env.NODE_ENV === 'development',
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-nested': {},
        'postcss-custom-properties': false,
      },
      preset: {
        // Change the postcss-preset-env settings
        autoprefixer: {
          grid: true,
        },
      },
    },

    // extractCss: true,
    // babel: {
    //   presets: ({ isServer }) => [
    //     [
    //       '@nuxt/babel-preset-app',
    //       {
    //         targets: isServer
    //           ? { node: '10.21.0' }
    //           : { browsers: ['defaults'] },
    //       },
    //     ],
    //   ],
    // },
  },
}
