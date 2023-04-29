// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    assets: '/<rootDir>/assets',
  },
  app: {
    pageTransition: {name: 'page', mode: 'out-in'},
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'nl'
      }
    }
  },
    postcss: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    css: [
        "~/css/styles.css",
        "~/node_modules/@formkit/themes/dist/genesis/theme.css",
    ],
    modules: [
        '@nuxtjs/color-mode',
        '@nuxt/image-edge',
        '@formkit/nuxt',
        ['nuxt-mail', {
          message: {
            from: 'mail@eviwammes.nl',
            to: 'mail@eviwammes.nl',
          },
          smtp: {
            host: 'smtp.hostinger.com',
            port: '465',
            
            auth: {
              user: 'mail@eviwammes.nl',
              pass: 'wuDme1-mimwig-bagted',
            },
          },
        }],
    ],
    colorMode: {
      classSuffix: ''
    },
    image: {
      provider: 'netlify',
      dir: 'assets',
      domains: [
        'eviwammes.nl'
      ],
      presets: {
        pictures: {
          modifiers: {
            format: 'webp',
            quality: 'auto:best',
            effect: 'sharpen:100',
            width: 50,
            height: 50,
          }
        }
      }
    }
})



