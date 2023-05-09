
<template>
  <div class="flex flex-col sm:flex-row flex w-full text-center dark:text-white h-full">
    <div class="flex flex-col justify-center w-auto text-left space-y-2 ">
      <h1 class="text-3xl sm:text-5xl">{{ naam }}</h1>
      <h2 class="text-3xl">Freelancer 💻, en student 📖</h2>
      <p class="text-lg">Ik volg de opleiding <b><a href="https://www.hva.nl/opleidingen/communication-and-multimedia-design">CMD</a></b> op het HVA.<br>
      Ook werk ik als freelancer om websites te bouwen voor klanten. Het gaat hier vaak om Wordpress websites. Ook ben ik veel bezig met het leren van VueJS, Nuxt3, en ThreeJS.<br><br>
      Mijn hobby's zijn onder andere skateboarden 🛹, het luisteren van muziek 🎵, en het leren van nieuwe dingen. <br><br> Om verder te experimenteren met de genoemde programmeertalen is deze portfolio ook gebouwd met VueJS, en Nuxt3, binnenkort zullen er ook 3d elementen in komen met ThreeJS 😉
      </p>
    </div>
    <div class="w-2/3 justify-center hidden sm:flex">
      <div class="ml-5 flex flex-col w-fit dark:shadow-[0_20px_25px_-5px_rgba(255,255,255,0.3)] shadow-xl rounded-3xl 2xl:w-[60%] w-[60%] hover:shadow-2xl dark:hover:shadow-[0_20px_50px_-5px_rgba(255,255,255,0.3)]">
        <nuxt-img preset="pictures" src="foto_evi.webp" alt="Foto van Evi Wammes" width="100%" height="auto" defer loading="lazy"/>
        <ul class="mt-5 bg-sky-500 dark:bg-sky-950 text-white rounded p-4 w-full -mt-1.5 text-base">
          <li><a href="mailto:mail@eviwammes.nl">✉️ mail@eviwammes.nl</a></li>
          <li><a href="tel:+31640707077">📞 +31640707077</a></li>
          <li>📍Amsterdam</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script setup>
  
  var naam = 'Evi Wammes'
  

</script>