

<template id="">

<modal :show.sync="show" effect="fade" width="800px" title="适用年款">
    <div slot="modal-body" class="modal-body" style="overflow-y:hidden;padding:0px">
        <button-tab :list="factorylist" :index.sync="index" class="saas_year"></button-tab>
        <div class="clearfix t-c h370 mg_b20 ovsc-x ovsc-y poR" style="*padding-bottom:50px;padding:20px;">
            <accordion-docs :list="carmodellist" :one="true" :bmno="bmno"></accordion-docs>
        </div>
        <div v-if="showsupple" class="col-md-12 pd_b10 clearfix bdT_d0d0d0" style="*position:absolute;*bottom:0;*left:0;*background:#fff;">
            <a href="#" class="red_btn bg8 mg_t10 auto w150 h26" @click="supple">补充更多适用年款</a>
        </div>
    </div>
</modal>

</template>

<script>

import {
    modal
}
from 'vue-strap'
import buttonTab from '../general/buttonTab.vue'
import accordionDocs from '../general/accordionDocs.vue'
import convert from '../utils/convert.js'
export default {
    components: {
        modal, buttonTab, accordionDocs
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        list: {
            type: Array
        },
        showsupple: {
            type: Boolean,
            default: true
        },
        bmno:{
          require: true
        }
    },
    data() {
        return {
            index: 0
        }
    },
    methods: {
      supple(){
        this.show=false;
        this.$parent.$refs.year.show=true;
      }
    },
    computed: {
        factorylist() {
                let arr = [];
                let set = new Set();
                if (this.list&&this.list.length) {
                    this.list.forEach(function(x) {
                        if (!set.has(x.FactoryId)) {
                            arr.push({
                                text: x.FactoryName,
                                value: x.FactoryId,
                            })
                        };
                        set.add(x.FactoryId);
                    })
                }
                return arr;
            },
            carmodellist() {
              if(this.factorylist && this.factorylist.length){
                return convert(this.list, this.factorylist[this.index].value);
              }else{
                return [];
              }
            }
    }
}

</script>
