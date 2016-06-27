

<template>

<div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown bd_bD_d9">
    <label class="control-label pull-left f16 col_000 w140" for="input01">输入零件编号：</label>
    <textinfo width="160px !important;" :list="skulist" :value.sync="txtsku" placeholder=""></textinfo>
    <button-docs :text="isquery?'查询中':'查&nbsp;询'" @click='query' class="mg_l30" :state="!txtsku"></button-docs>
</div>

<div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20" v-if="isnosku">
    <img src="../../../images/saas04.png" class="block auto mg_t20">
    <div class="w240 clearfix mg_t30 mg_b30 auto">
        <span class=" h26 f12 mg_r10 col_767676 pull-right" >找不到此零件号，请确认零件号是否正确</span>
        <a href="/product/addprodbysuit" class="green_btn w140 h26 pull-right mg_r10" >通过适用性添加商品</a>
        <span class="pull-right h26 f12 mg_r10 col_767676">或者您可以</span>
    </div>
</div>

</template>

<script>

import textinfo from '../../general/textinfo.vue'
import buttonDocs from '../../general/buttonDocs.vue'
// import store from 'store'

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
                // store.set('sku', _this.txtsku);
                Vue.http.get('/product/GetProdBySku?sku=' + _this.txtsku).then(function(res) {
                    if(!res.data.ok){
                      layer.alert(res.data.mes,{icon:5});
                      _this.isnosku = true;
                      _this.$dispatch('skumodel', {})
                      return false;
                    }
                    if (res.data.data && res.data.data.BmNo > 0) {
                        //_this.model=res.data;
                        _this.$dispatch('skumodel', res.data.data)
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
