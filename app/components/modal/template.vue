

<template id="">

<modal :show.sync="show" effect="fade" width="360px" title="配件编号列表">
    <div slot="modal-body" class="modal-body ">

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
      }
    },
    methods: {

    }
}

</script>
