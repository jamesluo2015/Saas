<template>
      <modal :show.sync="showmodal" effect="fade" width="50%" :title="title">
        <div slot="modal-body" class="modal-body">
          <accordion-docs :list="list"></accordion-docs>
        </div>
      </modal>
</template>

<script>
  import modal from 'vue-strap/src/modal'
  import accordionDocs from './accordionDocs.vue'
  export default {
    components: {
      modal,accordionDocs
    },
     props:{
      title:{
          type: String,
        },
       showmodal:{
         type: Boolean,
         default: false
       },
       list:{
         type: Array
       }
      },
    data() {
      return {

      }
    }
  }
</script>
