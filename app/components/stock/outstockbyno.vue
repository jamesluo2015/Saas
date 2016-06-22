<style lang="css">



</style>

<template lang="html">

<div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown bd_bD_d9">
    <label class="control-label pull-left f16 col_000 w140 mg_l20" for="input01">输入供应商编码：</label>
    <!-- <input placeholder="" type="text" class="add_input w160 form-control pull-left"> -->
    <textinfo width="160px" :list="numlist" :value.sync="dealerno" placeholder=""></textinfo>
    <button-docs text="查&nbsp;询" @click="query" class="mg_l30" :state='!dealerno'></button-docs>
</div>
<div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20" v-if="nonedealerno">
    <img src="../../images/saas04.png" class="block auto mg_t20">
    <div class="w240 clearfix mg_t30 mg_b30 auto">
        <span class=" h26 f12 mg_r10 col_767676 pull-right">找不到此供销商编码，请确认否正确</span>
        <a href="#" class="green_btn w140 h26 pull-right mg_r10" @click="tab=2">通过适用性添加商品</a>
        <span class="pull-right h26 f12 mg_r10 col_767676">或者您可以</span>
    </div>
</div>
<div class="col-md-12 pull-right" v-if="model.StockId">
    <div class="row pd_l0 pd_r0 mg_l0 mg_r0 mg_b20 pd_b200">
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left">名称：</label>
            <p class="pull-left pd_l0 mg_t2">{{model.ProdName}}</p>
        </div>
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left">库存数：</label>
            <p class="pull-left pd_l0 mg_t2">{{model.StockCount}}</p>
        </div>
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left">配件说明：</label>
            <div class="col-md-10 pull-left pd_l0 mg_t2">
                {{model.ContentInfo}}
            </div>
        </div>
        <!-- <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                  <label class="control-label pull-left">货位：</label>
                  <div class="col-md-10 pull-left pd_l0 mg_t2">
                      {{model.SlotCode}}
                  </div>
              </div> -->
        <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
            <label class="control-label pull-left">开单年款：</label>
            <input placeholder="" v-model="model.Memo" type="text" class="add_input w160 form-control">
        </div>
        <!-- <div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown">
                  <label class="control-label pull-left" for="input01">开单数：</label>
                  <input placeholder="" v-model="model.Quantity" type="text" class="add_input w160 form-control">
              </div> -->
        <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
            <div class="pull-left">
                <label class="control-label pull-left">销售单价：</label>
                <input placeholder="" v-model="model.SalePrice" type="text" class="add_input w160 pull-left form-control">
                <label class="pull-left fN mg_t2 mg_l5">元</label>
            </div>
        </div>
        <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown" v-for="slot in model.Slots">
            <label class="control-label pull-left">货位：</label>
            <div class="pull-left pd_l0 mg_t2">
                {{ slot.SlotCode }}
            </div>
            <label class="control-label pull-left">库存数：</label>
            <div class="pull-left pd_l0 mg_t2">
                {{ slot.StockCount }}
            </div>
            <label class="control-label pull-left mg_l20">开单数量：</label>
            <div class="pull-left pd_l0 mg_t2">
                <input placeholder="" type="text" v-model="slot.OutCount" class="add_input w100 pull-left form-control">
            </div>
        </div>
        <div class="col-md-12">
            <a href="javascript:void(0)" class="btn_red bg8 f16 mg_t20 mg_l120 w200 h40" :class="{'disable':!valid}" @click="add(model)">选&nbsp;择</a>
        </div>
    </div>
</div>

</template>

<script>

import textinfo from '../general/textinfo.vue'
import buttonDocs from '../general/buttonDocs.vue'
export default {
    data: function() {
        return {
            model: {},
            dealerno: "",
            numlist: [],
            nonedealerno: false
        }
    },
    computed: {
        allcount() {
                let icount = 0;
                if (this.model.Slots && this.model.Slots.length) {
                    this.model.Slots.forEach(function(item) {
                        icount += parseInt(item.OutCount);
                    })
                }
                return icount;
            },
            valid() {
                let allcount = 0;
                if (this.model.Slots && this.model.Slots.length) {
                    for (var i = 0; i < this.model.Slots.length; i++) {
                        let item = this.model.Slots[i];
                        allcount += parseInt(item.OutCount);
                        if (item.OutCount > item.StockCount) {
                            layer.msg('开单数量不允许大于当前货位的库存数', {
                                icon: 7,
                                time: 2000
                            });
                            return false;
                        }
                    }
                }
                if (!this.model.SalePrice || isNaN(this.model.SalePrice) || isNaN(allcount) || !allcount || this.model.StockCount < allcount) {
                    return false;
                }

                return true;
            },
    },
    ready: function() {},
    attached: function() {},
    methods: {
        query() {
                if (!this.dealerno) {
                    return false;
                }
                this.nonedealerno = false;
                let _this = this;
                Vue.http.get('/stock/GetProdByDealerNo?dealerno=' + this.dealerno).then(function(res) {
                    if (res.data.StockId) {
                        res.data.SalePrice = "";
                        res.data.Quantity = "";
                        _this.model = res.data;
                    } else {
                        _this.model = {};
                        _this.nonedealerno = true;
                    }
                })
            },
            add(model) {
                if (!this.valid) {
                    //layer.alert('请正确输入开单数和销售价');
                    return false;
                }
                model.SalePrice = parseInt(model.SalePrice);
                model.Quantity = parseInt(model.Quantity);
                this.$dispatch('add', model)
            },
    },
    watch: {
        dealerno(val) {
            let _this = this;
            this.numlist = [];
            if (val) {
                Vue.http.get('/product/GetDealerNo?key=' + this.dealerno).then(function(res) {
                    if (res.data) {
                        if (res.data[0] == _this.dealerno) {
                            res.data.splice(0, 1);
                        }
                        _this.numlist = res.data;
                    }
                })
            }
        }
    },
    components: {
        textinfo, buttonDocs
    }
}

</script>
