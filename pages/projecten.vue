<template>
  
  <div class="flex flex-col flex w-full justify-start text-center dark:text-white h-full mt-0 sm:mt-20 z-0">
    <h1 class="text-5xl sm:text-6xl pb-5">Projecten</h1>
    <div class="sm:grid sm:grid-cols-2 sm:grid-rows-4 sm:grid-flow-col grid-rows-1 mt-4 gap-0">
      <div class="bg-sky-500 dark:bg-slate-800 rounded-xl m-2 text-white flex flex-col p-6 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] h-fit">
        <div class="hidden sm:inline-flex justify-between">
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Wordpress</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Ontwerp & Development</span>
          <span class="text-sm opacity-70 text-right"><a href="https://zonweringapeldoorn.nl" target="">Zonweringapeldoorn.nl</a></span>
        </div>
        <div class="space-y-4 w-full text-left">
          <h3 class="text-2xl sm:text-3xl text-left h-10 my-3 mb-4" >Zonwering Apeldoorn</h3>
          <nuxt-img preset="pictures" src="zonwering_screenshot.webp" alt="Laptop met de website van Zonwering" class="rounded-2xl" defer/>
          <button class="bg-cyan-50 text-black rounded-xl py-1 px-4 text-base hover:bg-sky-700 hover:text-white  dark:bg-sky-800 dark:text-white" >
            <router-link to="/zonweringapeldoorn">Lees meer</router-link>
          </button>
        </div>
      </div>


      <div class="bg-sky-500 dark:bg-slate-800 rounded-xl m-2 text-white flex flex-col p-6 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] h-fit">
        <div class="hidden sm:inline-flex justify-between">
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Wordpress</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Ontwerp & Development</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Saucijzenbakker</span>
        </div>
        <div class="space-y-0 text-left">
          <h3 class="text-2xl sm:text-3xl  text-left h-10 my-3 mb-2">SB Chauffeur Systeem</h3>
          <nuxt-img preset="pictures" src="sb.webp" alt="Laptop met de website van de Saucijzenbakker" class="rounded-2xl bg-blend-darken" defer/>

          <div class="pt-3">
            <p class="text-sm opacity-80 text-left bg-white text-black p-1 rounded-full px-3 mt-2">Let op; Enkel het chauffeur order-systeem is door mij gemaakt.</p>
            
          </div>  
        </div>
      </div>


      <div class="bg-sky-500 dark:bg-slate-800 rounded-xl m-2 text-white flex flex-col p-6 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] h-fit">
        <div class="hidden sm:inline-flex justify-between">
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Wordpress</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Ontwerp & Development</span>
          <span class="text-sm opacity-60 text-right"><a href="https://brainnovation.nl" target="">Brainnovation.nl</a></span>
        </div>
        <div class="space-y-4 text-left">
          <h3 class="text-2xl sm:text-3xl  text-left h-10 my-3 mb-4">Brainnovation</h3>
          <nuxt-img preset="pictures" src="brainnovation.webp" alt="Laptop met de website van Brainnovation" class="rounded-2xl" defer/>
          <button class="bg-cyan-50 text-black rounded-xl py-1 px-4 text-base hover:bg-sky-700 hover:text-white dark:bg-sky-800 dark:text-white">
            <router-link to="/brainnovation">Lees meer</router-link>
          </button>
        </div>
      </div>

      <div class="bg-sky-500 dark:bg-slate-800 rounded-xl m-2 text-white flex flex-col p-6 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] h-fit">
        <div class="hidden sm:inline-flex justify-between">
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Wordpress</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Development</span>
          <span class="text-sm opacity-70 text-right"><a href="https://valleibloemen.nl" target="">Valleibloemen.nl</a></span>
        </div>
        <div class="space-y-0">
          <h3 class="text-2xl sm:text-3xl  text-left h-10 my-3 mb-4">Valleibloemen</h3>
          <nuxt-img preset="pictures" src="valleibloemen.webp" alt="Laptop met de website van Valleibloemen" class="rounded-2xl" defer/>

        </div>
      </div>

      <div class="bg-sky-500 dark:bg-slate-800 rounded-xl m-2 text-white flex flex-col p-6 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] h-fit">
        <div class="hidden sm:inline-flex justify-between">
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">VueJS</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Nuxt3</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">TailwindCSS</span>
          <span class="text-xs opacity-70 text-right"><nuxt-link to="/">Eviwammes.amsterdam</nuxt-link></span>
        </div>
        <div class="space-y-4 text-left">
          <h3 class="text-2xl sm:text-3xl  text-left h-10 my-3 mb-4">Portfolio</h3>
          <nuxt-img preset="pictures" src="portfolio_screenshot.webp" alt="Laptop met de website van Evi Wammes" class="rounded-2xl bg-blend-darken" defer/>
          <button class="bg-cyan-50 text-black rounded-xl py-1 px-4 text-base hover:bg-sky-700 hover:text-white dark:bg-sky-800 dark:text-white">
            <router-link to="/portfolio">Lees meer</router-link>
          </button>
        </div>
      </div>

      <div class="bg-sky-500 dark:bg-slate-800 rounded-xl m-2 text-white flex flex-col p-6 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] h-fit">
        <div class="hidden sm:inline-flex justify-between">
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Wordpress</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Ontwerp & Development</span>
          <span class="text-xs opacity-70 text-right"><a href="https://guust-meubelmakerij.nl" target="">Guust-meubelmakerij.nl</a></span>
        </div>
        <div class="space-y-4 text-left">
          <h3 class="text-2xl sm:text-3xl  text-left h-10 my-3 mb-4">Guust® Meubelmakerij</h3>
          <nuxt-img preset="pictures" src="guust.webp" alt="Laptop met de website van Guust Meubelmakerij" class="rounded-2xl bg-blend-darken" defer/>
          <button class="bg-cyan-50 text-black rounded-xl py-1 px-4 text-base hover:bg-sky-700 hover:text-white dark:bg-sky-800 dark:text-white">
            <router-link to="/guust-meubelmakerij">Lees meer</router-link>
          </button>
        </div>
      </div>

      <div class="bg-sky-500 dark:bg-slate-800 rounded-xl m-2 text-white flex flex-col p-6 hover:shadow-xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] h-fit">
        <div class="hidden sm:inline-flex justify-between">
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Wordpress</span>
          <span class="text-sm opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-2 -mt-1">Ontwerp & Development</span>
          <span class="text-xs opacity-70 text-right"><a href="https://heartfeltequinebodywork.nl/" target="">Heartfeltequinebodywork.nl</a></span>
        </div>
        <div class="space-y-4 text-left">
          <h3 class="text-[1.4rem] sm:text-3xl  text-left h-10 my-3 mb-4">Heartfelt Equine Bodywork</h3>
          <nuxt-img preset="pictures" src="Heartfelt.webp" alt="Laptop met de website van Heartfelt Equine Bodywork" class="rounded-2xl bg-blend-darken" defer/>
          <button class="bg-cyan-50 text-black rounded-xl py-1 px-4 text-base hover:bg-sky-700 hover:text-white dark:bg-sky-800 dark:text-white">
            <router-link to="/heartfelt">Lees meer</router-link>
          </button>
        </div>
      </div>

      
    </div>
  </div>
</template>

<style>


</style>

<script>
export default {
  methods: {
    openInNewTab(url) {
      window.open(url, '_blank', 'noreferrer');
    },
  },
  
}

</script>