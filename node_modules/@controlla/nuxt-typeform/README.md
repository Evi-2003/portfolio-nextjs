[![@controlla/nuxt-typeform](https://images.ctfassets.net/co0pvta7hzrh/5A4NiAWcPUDSXrkCH7z2EL/773b8251e22e888aec7fcdf0c4a82f96/meta_Homepage.png_h_250)](https://typeform.controlla.org)

# @controlla/nuxt-typeform

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codacy Badge][codacy-src]][codacy-href]
[![License][license-src]][license-href]

> [Typeform](https://www.typeform.com/) module for [Nuxt](https://v3.controlla.org)

-   [✨  Release Notes](https://github.com/Controlla/nuxt-typeform/releases)
-   [📖  Read the documentation](https://typeform.controlla.org)

## Features

-   Nuxt 3 ready
-   Easy integration with Typeform
-   Support for Vue Widget component
-   Support for Typeform Recommend
-   TypeScript support

## Setup

```sh
yarn add @controlla/nuxt-typeform # yarn
npm i @controlla/nuxt-typeform # npm
```

## Basic usage

Firstly, you need to add `@controlla/nuxt-typeform` to your Nuxt config.

```javascript
// nuxt.config.js

{
    modules: [
        "@controlla/nuxt-typeform",
    ],
    typeform: {
        formId: "<FORM_ID>"
    }
}
```

## Development

1.  Clone this repository
2.  Install dependencies using `yarn install` or `npm install`
3.  Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@controlla/nuxt-typeform/latest.svg

[npm-version-href]: https://npmjs.com/package/@controlla/nuxt-typeform

[npm-downloads-src]: https://img.shields.io/npm/dt/@controlla/nuxt-typeform.svg

[npm-downloads-href]: https://npmjs.com/package/@controlla/nuxt-typeform

[github-actions-ci-src]: https://github.com/Controlla/nuxt-typeform/actions/workflows/ci.yml/badge.svg

[github-actions-ci-href]: https://github.com/Controlla/nuxt-typeform/actions?query=workflow%3Aci

[codacy-src]: https://app.codacy.com/project/badge/Grade/25ac74a8298b4bcab29b4d062106eba0

[codacy-href]: https://www.codacy.com/gh/Controlla/nuxt-typeform/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Controlla/nuxt-typeform&utm_campaign=Badge_Grade

[license-src]: https://img.shields.io/npm/l/@controlla/nuxt-typeform.svg

[license-href]: https://npmjs.com/package/@controlla/nuxt-typeform
