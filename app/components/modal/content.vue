
<style scope>
  p{
    word-wrap: break-word;
  }
</style>
<template id="">

<modal :show.sync="show" effect="fade" width="360px" :title="title">
    <div slot="modal-body" class="modal-body ">
      <p class="content">
        {{text || '无'}}
      </p>
    </div>
</modal>

</template>

<script>

import {
    modal
}
from 'vue-strap'
export default {
    components: {
        modal
    },
    props:{
      show:{
        type:Boolean,
        default: false
      },
      title:{
        type:String
      },
      text:{
        type:String
      }
    },
    methods: {

    }
}

</script>
