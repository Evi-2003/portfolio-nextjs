<template>
    <header class="sm:text-center text-right mt-0 sm:mt-10 bg-indigo-100" >
        <div class="container sm:w-auto inline-block m-auto p-7 shadow-2xl bg-indigo-100 sm:rounded-full grow">
                <button @click="openMenu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 sm:rounded-lg rounded md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="nav" aria-expanded="false">
                  <span class="sr-only">Open main menu</span>
                  <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="hidden sm:block sm:flex-grow sm:text-right text-xl sm:m-auto w-full h-[70vh] items-center sm:h-auto" id="nav">
                    <nav>
                    <ul class="flex sm:inline-flex space-x-5 sm:text-base text-5xl sm:w-auto sm:w-full sm:flex-row flex-col text-center items-center h-[70v] justify-center">
                        <router-link to="/" class="hover:text-white p-2 rounded hover:bg-slate-900 hover:shadow-xl sm:w-auto dark:hover:text-white dark:hover:bg-slate-900">Home</router-link>
                        <router-link to="/projecten" class="hover:text-white p-2 rounded hover:bg-slate-900 hover:shadow-xl sm:w-auto dark:hover:text-white dark:hover:bg-slate-900">Projecten</router-link>
                        <router-link to="/contact" class="text-white p-2 rounded hover:bg-slate-900 hover:shadow-xl bg-red-400 mx-5 sm:w-auto dark:hover:text-white dark:hover:bg-slate-900">Contact</router-link>
                        <button class="text-1xl rounded-xl py-2 px-3 shadow-lg font-bold hover:bg-yellow-400 dark:bg-yellow-400 sm:w-auto w-auto mt-5 sm:mt-0" @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')"><nuxt-img src="https://henzapra.sirv.com/Images/bulb.svg" class="w-6" alt="Dark mode switch"/></button>
                    </ul>
                    </nav>
                </div>
        </div>
    </header>

    <div class="w-full h-fit py-20 sm:py-0 sm:min-h-[100vh] flex items-center justify-center sm:-mt-[8.5em] z-0 bg-indigo-100 dark:bg-gray-950">
      <div class="sm:w-3/5 w-4/5 sm:mt-[7em]">
        <slot />
      </div>
    </div>
</template>

<script setup>
  import
  { inject } 
  from
  
  '@vercel/analytics'
  ;
  inject
    useHead({
        title: 'Portfolio - Evi Wammes',
        meta: [{
            name: "viewport",
            content: 'width=device-width, initial-scale=1'
        }]
    })
  var setColorTheme = function (newTheme) {
    useColorMode().preference = newTheme;
  };
  var isMenuOpen = false;
  
  function openMenu(){
    if(isMenuOpen == false){
      document.querySelector('#nav').style.display = 'flex'
      isMenuOpen = true
    } else if (isMenuOpen == true){
      document.querySelector('#nav').style.display = 'none'
      isMenuOpen = false;
    }
  }
    

  
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

  .naam{
    font-family: 'Gloria Hallelujah', cursive;
  }
  header{
    z-index: 999;
  }



  .dark ul a.router-link-active{
    background-color: white;
    color: #0f172a;
  }
  .light ul a.router-link-active{
    background-color: #0f172a;
    color: white;
  }
  .dark body{
    background: black;
  }

  h1,h2,p,li{
    font-family: 'Open Sans', sans-serif;
  }
  h2{
    font-weight: 500;
  }
  p{
    font-weight: 400;
  }
  p a{
    text-decoration: underline;
   }
   .page-enter-active,
  .page-leave-active {
  transition: all 0.1s;
}
  .page-enter-from,
  .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

</style>