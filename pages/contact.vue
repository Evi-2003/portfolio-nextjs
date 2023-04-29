<template>
  <div class="flex flex-col sm:flex-row flex w-full text-center dark:text-white h-full dark:text-white">
    <div class="block w-full text-left space-y-5 w-1/2">
      <h1 class="text-5xl sm:text-6xl">Contact</h1>
      <ul class="bg-white dark:bg-indigo-100 text-black flex sm:space-x-5 p-5 rounded-xl sm:rounded-full w-fit flex flex-col sm:flex-row">
        <li><a class="w-full block text-left" href="mailto:mail@eviwammes.nl">✉️ mail@eviwammes.nl</a></li>
        <li><a class="w-full block text-left" href="tel:+31640707077">📞 +31640707077</a></li>
      </ul>
    <FormKit v-if="isFormOpen" submit-label="Verstuur" type="form" @submit="submitHandler" #default="{ value }">
      <FormKit type="text" name="naam" id="naam" validation="required" placeholder="Naam"/>
      <FormKit type="email" name="email" id="email" validation="required" placeholder="E-mail"/>
      <FormKit class="dark:text-white" type="textarea" name="message" id="message" validation="required" placeholder="Uw bericht" />
    </FormKit>
      <div v-if="!isFormOpen">
        <p class="text-[1.4em]">Verstuurd!<br>Ik neem zo spoedig mogelijk contact op 👋🏻</p>
      </div>
    </div>

    <div class="w-1/2 flex items-center">
      <iframe src="https://giphy.com/embed/ICOgUNjpvO0PC" width="130%" height="130%" class="rounded-lg" v-if="!isFormOpen"></iframe>
      <iframe src="https://giphy.com/embed/Cmr1OMJ2FN0B2" class="rounded-2xl w-[20em] h-[20em] sm:w-[100%]" v-if="isFormOpen"></iframe>
    </div>
  </div>

</template>




<style>
  li{
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
  }
  .light #input_1{
    background: #1e293b;
    font-weight: 700;
    color: white;
  }
  .dark #input_1{
    background: #e0e7ff;
    color: black;
    font-weight: 700;
  }
  .dark #message{
    color: white;
  }
</style>

<script>

      export default {
        data: () => ({
          isFormOpen: true,
        }),
        methods: {
          submitHandler(values){
            this.$mail.send({
            from: 'mail@eviwammes.nl',
            subject: values['naam'] + ' - Contactformulier Website',
            text: 'Contactformulier ingevuld door: ' + values['naam'] + ', hun e-mail is: ' + values['email'] + ' en hun bericht is: ' + values['message']
            })
          this.isFormOpen =  false
         }
       }
      }

</script>
