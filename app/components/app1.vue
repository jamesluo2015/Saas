<template>
    <head-docs></head-docs>
    <table-docs :list='list'></table-docs>
</template>
<script>
import headDocs from './app1/headDocs.vue'
import tableDocs from './app1/tableDocs.vue'

export default {
  components: { headDocs,tableDocs },
  data(){
     return {
       
     }
  },
  methods: {
     
  },
  computed:{
      list(){
          return this.$children[0].list;
      } 
  }
}
</script>