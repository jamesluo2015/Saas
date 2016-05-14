<template>
      <modal :show.sync="showmodal" effect="fade" width="50%">
        <div slot="modal-header" class="modal-header">
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div slot="modal-body" class="modal-body">
          <accordion-docs :list="list"></accordion-docs>
        </div>
        <div slot="modal-footer" class="modal-footer">
          <button type="button" class="btn btn-default" @click='showmodal = false'>Exit</button>
          <button type="button" class="btn btn-success" @click='showmodal = false'>Custom Save</button>
        </div>
      </modal>
</template>

<script>
  import modal from 'vue-strap/src/Modal.vue'
  import accordionDocs from './accordionDocs.vue'
  export default {
    components: {
      modal,accordionDocs
    },
     props:{
      title:{
          type: String,
        }
      },
    data() {
      return {
        showmodal:false,
        list:[]
      }
    }
  }
</script>
