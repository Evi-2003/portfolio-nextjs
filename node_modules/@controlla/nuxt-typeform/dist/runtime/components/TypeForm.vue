<template>
  <div id="typeform" />
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { createWidget } from '@typeform/embed'
import '@typeform/embed/build/css/widget.css'

const props = defineProps({
  formId: {
    type: String,
    required: false,
    default: null
  },
  options: {
    type: [Object, undefined] as PropType<TypeformOptions | undefined>,
    required: false,
    default: undefined
  }
})

onMounted(() => {
  const { formId } = useRuntimeConfig().typeform
  createWidget(props.formId || formId, { container: document.querySelector('#typeform'), ...props.options })
})
</script>

<style scoped>
  #typeform {
    height: 99.6vh;
  }
</style>
