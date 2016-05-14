<template>
  <div>
        <select-docs></select-docs>
        <button-docs text='查询' @click='query'></button-docs>
  </div>
</template>
<script>
import selectDocs from './selectDocs.vue'
import buttonDocs from './buttonDocs.vue'
export default {
  components: { selectDocs,buttonDocs },
  data(){
    return {

    }  
  },
  methods: {
      query(){
          
      }
  }
}
</script>
