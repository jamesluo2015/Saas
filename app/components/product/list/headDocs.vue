
<template>

<div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
    <datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left mg_l30">
    </datepicker>

    <span class="pull-left mg_l10 mg_r10 f12 lineH26">至</span>

    <datepicker :value.sync="edate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
    </datepicker>

    <div class="dropdown pull-left mg_l30">
        <v-select :value.sync="type" :options="typelist" :close-on-select="true" class='' placeholder="选择条件"></v-select>
    </div>
    <input placeholder="请输入关键字" class="add_input w160 pull-left form-control mg_l30" type="text" v-model='key'>
    <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
</div>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
import {
    option as vOption
}
from 'vue-strap'
import {
    datepicker
}
from 'vue-strap'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import buttonDocs from '../../general/buttonDocs.vue'

export default {
    components: {
        vSelect, vOption, datepicker, PulseLoader, buttonDocs
    },
    props: {
        pagesize: {
            type: Number
        }
    },
    data() {
        return {
            sdate: GetFormatDate(1),
            edate: GetFormatDate(),
            typelist: [{
                value: '1',
                label: '零件编号'
            }, {
                value: '2',
                label: '供应商编码'
            }, {
                value: '3',
                label: '配件名称'
            }],
            state:0,
            type: [],
            key: "",
            loading: false
        }
    },
    methods: {
        query(index) {
            let _this = this;
            let param = {
                pageindex: index||1,
                pagesize: this.pagesize,
                sdate: _this.sdate,
                edate: _this.edate,
                state: this.state || 0,
                type: _this.type.length ? _this.type[0] : 0,
                key: _this.key,
            };
            _this.loading = true;
            Vue.http.get('/product/GetProducts', param).then(function(response) {
                  _this.$dispatch('GetProducts', response.data)
            
                _this.loading = false;
            }, function(err) {
                _this.loading = false;
                console.log('查询失败');
            })
        }
    },
    ready(){
      this.query(1);
    }
}

</script>
