<!-- TITLE/ -->
# nuxt-push-plugins
<!-- /TITLE -->

<!-- BADGES/ -->
  <p>
    <a href="https://npmjs.org/package/nuxt-push-plugins">
      <img
        src="https://img.shields.io/npm/v/nuxt-push-plugins.svg"
        alt="npm version"
      >
    </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/nuxt-push-plugins/actions">
      <img
        src="https://github.com/dword-design/nuxt-push-plugins/workflows/build/badge.svg"
        alt="Build status"
      >
    </a><a href="https://codecov.io/gh/dword-design/nuxt-push-plugins">
      <img
        src="https://codecov.io/gh/dword-design/nuxt-push-plugins/branch/master/graph/badge.svg"
        alt="Coverage status"
      >
    </a><a href="https://david-dm.org/dword-design/nuxt-push-plugins">
      <img src="https://img.shields.io/david/dword-design/nuxt-push-plugins" alt="Dependency status">
    </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/nuxt-push-plugins">
      <img
        src="https://gitpod.io/button/open-in-gitpod.svg"
        alt="Open in Gitpod"
        width="114"
      >
    </a><a href="https://www.buymeacoffee.com/dword">
      <img
        src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
        alt="Buy Me a Coffee"
        width="114"
      >
    </a><a href="https://paypal.me/SebastianLandwehr">
      <img
        src="https://sebastianlandwehr.com/images/paypal.svg"
        alt="PayPal"
        width="163"
      >
    </a><a href="https://www.patreon.com/dworddesign">
      <img
        src="https://sebastianlandwehr.com/images/patreon.svg"
        alt="Patreon"
        width="163"
      >
    </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Pushes Nuxt.js plugins to the end of the list instead of the start.
<!-- /DESCRIPTION -->

When calling [this.addPlugin](https://nuxtjs.org/docs/2.x/internals-glossary/internals-module-container#addplugin-template) inside a Nuxt module, Nuxt does in fact not add the plugin to the end of the list, but to the beginning via [Array.unshift](https://www.w3schools.com/jsref/jsref_unshift.asp). There are cases where you actually want to push plugins to the end of the list so that they can make use of already-added plugins. This package provides a helper function to do that.

<!-- INSTALL/ -->
## Install

```bash
# npm
$ npm install nuxt-push-plugins

# Yarn
$ yarn add nuxt-push-plugins
```
<!-- /INSTALL -->

## Usage

Import the function into your Nuxt module and call it by passing `this` and the plugins you want to add. It behaves like [Array.push](https://www.w3schools.com/jsref/jsref_push.asp).

```js
// module.js

import nuxtPushPlugins from 'nuxt-push-plugins'

export default function () {

  // single plugin
  nuxtPushPlugins(this, require.resolve('./plugin'))

  // plugin object
  nuxtPushPlugins(this, {
    src: require.resolve('./plugin'),
    mode: 'client',
  })

  // multiple plugins
  nuxtPushPlugins(this,
    require.resolve('./plugin'),
    { src: require.resolve('./plugin'), mode: 'client' },
  )
}
```

<!-- LICENSE/ -->
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/nuxt-push-plugins/issues) or a [pull request](https://github.com/dword-design/nuxt-push-plugins/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## License

[MIT License](https://opensource.org/licenses/MIT) © [Sebastian Landwehr](https://sebastianlandwehr.com)
<!-- /LICENSE -->
