

<template>

<template v-if="show">

    <div class="right_contain1">
        <div class="row">
            <div class="col-md-12 pd_l0 pd_r0 mg_r0">
                <div class="bdB_d0d0d0 lineH30 pd_b10 clearfix">
                    <span class="mg_l20 pull-left">来源单号：{{model.SourceOrderId}}</span>
                    <span class="mg_l110 pull-left">订单号：{{model.OrderCode}}</span>
                    <span class="mg_l110 pull-left">订单状态：{{model.OrderStatus>2?"已发货":"待发货"}}</span>
                    <img :src="'/content/images/third'+model.SourceId+'.png'" class="pull-right mg_r10">
                </div>
                <div class="mg_1">
                    <div class="bg10 h40">
                        <span class="mg_l20">收货人和物流信息</span>
                    </div>
                    <div class="bd_tD_d9 bdB_d0d0d0 mg_t2 clearfix">
                        <img :src="'/content/images/third'+model.SourceId+'.png'" class="pull-left mg_l70 mg_t20">
                        <div class="pull-left">
                            <div class="mg_t20 clearfix select_dropdown">
                                <label class="control-label pull-left mg_l15 col_010101">收货地址：</label>
                                <p class="pull-left pd_l0 mg_t2">
                                    <span>{{model.Address}}，{{model.Receiver}}，{{model.TelPhone}}</span>
                                </p>
                            </div>
                            <div class="col-md-12 clearfix select_dropdown">
                                <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w300">
                                    <label class="control-label pull-left">配送方式：</label>
                                    <v-select :value.sync="express" :options="expresslist" :close-on-select="true" placeholder="请选择快递公司"></v-select>
                                </div>
                                <div class=" pd_l0 mg_t20 clearfix pd_b20 select_dropdown pull-left w300">
                                    <label class="control-label pull-left" for="input01">运单编号：</label>
                                    <input placeholder="" v-model="expressno" class="add_input w160 form-control pull-left" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mg_1">
                    <div class="bg10 h40">
                        <span class="mg_l20">选择发货位</span>
                    </div>
                    <div class="bd_tD_d9 bd_bD_d9 pd_b20 mg_t2 clearfix">
                        <div class="col-md-12 clearfix select_dropdown" v-for="detail in model.OrderDetails">
                            <span class="pull-left mg_t20 mg_l10">{{detail.ProdName}}</span>
                            <span class="pull-left mg_t20 mg_l40">x{{detail.Quantity}}</span>
                            <em class="pull-left mg_t20 col_b5 fS mg_l40">|</em>
                            <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w250">
                                <label class="control-label pull-left f12 lineH20">选择库区：</label>
                                <v-select :value.sync="detail.stockareaid" :options="areas" :close-on-select="true"></v-select>
                            </div>
                            <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w250">
                                <label class="control-label pull-left f12 lineH20">选择库房：</label>
                                <v-select :value.sync="detail.stockhouseid" :options="houses" :close-on-select="true"></v-select>
                            </div>
                            <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w250">
                                <label class="control-label pull-left f12 lineH20">选择库位：</label>
                                <v-select :value.sync="detail.stockmainid" :options="slots" :close-on-select="true"></v-select>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-12 clearfix select_dropdown">
                        <a href="#" class="btn_red bg8 f14 w120 h30 mg_t20 mg_b20 pull-left mg-l40" :class="{'disable':!valid}" @click="commit">确认发货</a>
                        <a href="#" class="btn_green f14 w120 h30 mg_t20 mg_b20 mg_l30 pull-left" @click="show=false">返&nbsp;回</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
export default {
    components: {
        vSelect
    },
    props: {
        model: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            express: [],
            expresslist: [{
                label: "顺丰",
                value: "0"
            }],
            expressno: "",
            // arealist: [],
            // houselist: [],
            // slotlist: [],
            selectlist:[]
        }
    },
    computed:{
      valid(){
        if(!this.expressno){
          return false;
        }
        return true;
      }
    },
    ready() {
        let _this = this;
        Vue.http.get('/config/GetExpress', {}).then(function(response) {
            let data = response.data;
            let arr = [];

            data.forEach(function(item) {
                arr.push({
                    label: item.ExpressName,
                    value: item.Id.toString()
                })
                if (item.IsDefault) {
                    _this.express = [item.Id.toString()];
                }
            })
            _this.expresslist = arr;
        });
        Vue.http.get('/stock/GetSelect').then(function(res){
          _this.selectlist=res.data;
        })
    },
    methods: {
        commit() {
            //确认发货
            if(!valid){
              return false;
            }
            this.show = false;
        }
    }
}

</script>
