
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['typeform']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['typeform']?: ModuleOptions }
}


export { default } from './module'
