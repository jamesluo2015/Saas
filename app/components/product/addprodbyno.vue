

<template>

<div class="right_contain">
    <div class="row">
        <head-docs></head-docs>
        <body-docs :model='model' v-if="model.BmNo"></body-docs>
    </div>
</div>

</template>

<script>

import headDocs from './addprodbyno/headDocs.vue'
import bodyDocs from './addprodbyno/bodyDocs.vue'

export default {
    components: {
        headDocs, bodyDocs
    },
    data() {
        return {
            model: {}
        }
    },
    events: {
        'skumodel': function(model) {
          model.StockCount="";
          model.SalePrice="";
          model.InPrice="";
          model.slotcode=[];
          this.model = model;
        }
    },
    methods: {

    }
}

</script>
