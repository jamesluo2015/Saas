

<template>

<div class="right_contain">
    <div class="row">
        <head-docs v-ref:head storename="param" :callback='query'></head-docs>
        <pulse-loader :loading="false"></pulse-loader>
        <table-docs v-ref:table></table-docs>
    </div>
</div>

</template>

<script>
import vSelect from 'vue-strap/src/select'

import tableDocs from './addprodbysuit/tableDocs.vue'
import headDocs from './addprodbysuit/headDocs.vue'
import buttonDocs from '../general/buttonDocs.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import store from 'store'

export default {
    components: {
        vSelect, buttonDocs, tableDocs, PulseLoader, headDocs
    },
    data() {
        return {

        }
    },
    ready() {

    },
    computed: {

    },
    methods: {
        query(param) {
            let _this = this;
            this.$refs.table.query(param, function() {
                _this.$refs.head.isquery = false;
            });
        },
    },
    watch: {

    }
}

</script>
