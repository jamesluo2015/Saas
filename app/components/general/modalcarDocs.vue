<template>
      <modal :show.sync="showmodal" effect="fade" width="50%">
        <div slot="modal-header" class="modal-header">
          <button type="button" class="close" @click='showmodal = false'><span>×</span></button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div slot="modal-body" class="modal-body">
          <accordion-docs :list="list"></accordion-docs>
        </div>
      </modal>
</template>

<script>
  import {modal} from 'vue-strap'
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
