<template>
  
  <div class="flex flex-col flex w-full justify-start text-left dark:text-white h-full z-0 mt-20 pb-10">
    <h1 class="text-4xl sm:text-5xl pb-5">Guust® Meubelmakerij</h1>
    <div class="hidden sm:flex sm:inline-flex sm:space-x-3 text-left">
        <span class="text-base opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-5 -mt-1">Wordpress</span>
        <span class="text-base opacity-80 text-left bg-white dark:bg-cyan-700 dark:opacity-100 dark:text-white text-black p-1 rounded-full px-5 -mt-1">Ontwerp & Development</span>
        <span class="text-base opacity-70 text-left sm:text-right"><a href="https://guust-meubelmakerij.nl/" target="_blank">Guust Meubelmakerij</a></span>
    </div>
    <p class="text-lg sm:mt-5">
      Richard van Guust® Meubelmakerij stuude me een bericht via Fiverr omdat hij een nieuwe Wordpress website wou. Hij had zelf al meerdere pogingen gedaan om goede websites te maken voor zijn bedrijf, en dat ging nog best goed. Maar toch koos hij ervoor om een website te laten maken. Hij kwam met voorbeelden waar hij graag naar toe wou werken met zijn website. Hij leverde ook zelf de teksten en foto's aan die we konden gebruiken voor de website.</p>
      <nuxt-img preset="pictures" src="guust.webp" alt="Laptop met de website van Guust Meubelmakerij" class="my-3 rounded bg-blend-darken w-2/4" defer/>
    <p class="text-lg">Eerst ging ik aan de slag met schetsen op papier, en nadat ik een goed idee voor me had, ging ik bouwen in Elementor (Wordpress). Toen de eerste versie van de website klaar was stuurde ik deze naar hem door, en er hoefde eigenlijk weinig aangepast te worden. Hij was al super tevreden met het resultaat. Vervolgens plande we een datum om de website live te zetten, en overlegde en een onderhoudsabonnement. Nu is de website al een tijd live en kreeg hij complimenten over zijn nieuwe website.
    </p>
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