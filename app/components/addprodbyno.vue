<template>
  <head-docs></head-docs>
  <body-docs :model='model' v-if="model.BmNo"></body-docs>
</template>
<script>
import headDocs from './addprodbyno/headDocs.vue'
import bodyDocs from './addprodbyno/bodyDocs.vue'

export default {
  components: { headDocs,bodyDocs },
  data(){
     return {
       model: {}
     }
  },
  events:{
    'skumodel':function(model){
      this.model=model;
    }
  },
  methods: {

  }
}
</script>
