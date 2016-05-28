

<template>

<div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown bd_bD_d9">
    <label class="control-label pull-left f16 col_000 w140" for="input01">输入零件编号：</label>
    <textinfo width="160px !important;" :list="skulist" :value.sync="txtsku" placeholder=""></textinfo>
    <button-docs :text="isquery?'查询中':'查&nbsp;询'" @click='query' class="mg_l30" :class="{'disable':!txtsku }"></button-docs>
</div>
<div class="col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_t20 mg_b20" v-if="isnosku">
    <div class="alert alert-danger" role="alert">
        <h3>
           <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
           找不到此零件号,请确认零件号是否正确，或者您可以<a href="/product/addprodbysuit"><span class="label label-success">通过适用性添加商品</span></a>
       </h3>
    </div>
</div>

</template>

<script>

import textinfo from '../../general/textinfo.vue'
import buttonDocs from '../../general/buttonDocs.vue'
import store from 'store'

export default {
    components: {
        textinfo, buttonDocs
    },
    data() {
        return {
            txtsku: "",
            err: false,
            skulist: [],
            isnosku: false,
            model: {},
            brands: []
        }
    },
    ready() {
        //读取 sku
        // let sku = store.get('sku');
        // if (sku) {
        //     this.txtsku = sku;
        // }
    },
    methods: {
        query() {
                let _this = this;
                if (!_this.txtsku) {
                    SetError('#txtsku');
                    return false;
                }

                _this.isnosku = false;
                store.set('sku', _this.txtsku);
                Vue.http.get('/product/GetProdBySku?sku=' + _this.txtsku).then(function(res) {
                    if (res.data && res.data.BmNo > 0) {
                        //_this.model=res.data;
                        _this.$dispatch('skumodel', res.data)
                    } else {
                        _this.$dispatch('skumodel', {})
                        _this.isnosku = true;
                    }
                }, function() {
                    _this.isnosku = true;
                })
            },
            showsku() {

            }
    },
    watch: {
        txtsku(val) {
            let _this = this;
            _this.skulist = [];
            if (val) {
                // if (!_this.txtsku) {
                //     return false;
                // }
                //关键字查询
                Vue.http.get(`/product/GetSkuList?key=${_this.txtsku}`).then(function(response) {
                    let data = response.data;
                    if (data.length) {
                        if (data[0] == val) {
                            data.splice(0, 1);
                        }
                        _this.skulist = data;
                    }
                }, function() {
                    _this.skulist = [];
                })
            }
        }
    }
}

</script>
