

<template id="">

<div class="right_contain">
    <div class="row">
        <tab :data="tablist" :value="1"></tab>
        <category v-if="state==1"></category>
        <carmodel v-if="state==2"></carmodel>
    </div>
</div>

</template>

<script>

import category from './category.vue'
import carmodel from './carmodel.vue'
import tab from '../general/tabDocs.vue'
export default {
    components: {
        tab, category, carmodel
    },
    data() {
        return {
            tablist: [{
                val: 1,
                text: "允许经营品类"
            }, {
                val: 2,
                text: "允许经营车型"
            }],
            state: 1
        }
    },
    events: {
        'tab': function(val) {
            this.state = val
        }
    }
}

</script>
