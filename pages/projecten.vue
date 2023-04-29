<template>
  <div class="flex flex-col sm:flex-col flex w-full justify-start text-center dark:text-white h-full">
    <h1 class="text-5xl sm:text-6xl pb-5">Projecten</h1>
    <div class="sm:grid sm:grid-rows-3 sm:grid-flow-col grid-rows-1 mt-4">
      <div @click="openInNewTab('https://zonweringapeldoorn.nl')" class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100 sm:rounded-2xl h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/zonweringapeldoorn.webp" alt="Logo van Zonwering Apeldoorn" class="w-full sm:rounded-t-2xl"/>
      </div>
      <div @click="openInNewTab('https://guust-meubelmakerij.nl/')" class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100  sm:rounded-2xl   h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/guust.webp" alt="Logo van Guust Meubelmakerij" class="w-full sm:rounded-t-2xl"/>
      </div>
      <div @click="openInNewTab('https://heartfeltequinebodywork.nl/')" class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100  sm:rounded-2xl   h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/heartfelt.webp" alt="Logo van Heartfelt Equine Bodyworks" class="w-full sm:rounded-t-2xl"/>
      </div>
      <div @click="openInNewTab('https://brainnovation.nl/')" class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100  sm:rounded-2xl   h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/brainnovation.webp" alt="Logo van Brainnovation" class="w-full sm:rounded-t-2xl"/>
      </div>
      <div @click="openInNewTab('https://valleibloemen.nl/')" class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100  sm:rounded-2xl   h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/valleibloemen.webp" alt="Logo van Valleibloemen.nl" class="w-full sm:rounded-t-2xl"/>
      </div>
      <div class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100  sm:rounded-2xl   h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/sb.webp" alt="Logo van Saucijzenbakker" class="w-full sm:rounded-t-2xl"/>
      </div>
      <div @click="openInNewTab('http://bkbn.nl/')" class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100  sm:rounded-2xl   h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/bkbn.webp" alt="Logo van Best Kept Beauty Nederland" class="w-full sm:rounded-t-2xl"/>
      </div>
      <div @click="openInNewTab('https://lifecoachapeldoorn.nl/')" class="card container inline-block m-auto shadow-xl bg-indigo-100 dark:bg-slate-100  sm:rounded-2xl   h-30 sm:w-60  hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)] mb-5">
        <img src="@/assets/lifecoach.webp" alt="Logo van Lifecoach Apeldoorn" class="w-full sm:rounded-t-2xl"/>
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
};
</script>