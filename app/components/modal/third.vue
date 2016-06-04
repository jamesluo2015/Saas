

<template id="">

<modal :show.sync="show" effect="fade" width="520px" title="选择销售平台">
    <div slot="modal-body" class="modal-body pd_0 clearfix" style="overflow-y:hidden">
        <!-- <ul class="modal_sell clearfix">
            <li v-for="item in thirds" :class="{'checked':item.ischeck}" @click="check($index)"><a href="#">{{item.name}}</a></li>
        </ul> -->
        <button-tab :list="tabs" :index.sync="index"></button-tab>
        <div class="clearfix t-c h370 mg_b20 ovsc-x ovsc-y poR" style="*padding-bottom:50px;">
            <div class="clearfix mg_t15">
                <span class="pull-left lineH30 mg_l20 mg_b10 f12 mg_t4">快速设置价格</span>
                <div class="pull-left clearfix mg_t5 mg_l30">
                    <label class="control-label pull-left f12 lineH26 fN col_767676">销售价：</label>
                    <input placeholder="" v-model="price" class="add_input w70 pull-left form-control" type="text">
                </div>
                <div class="pull-left">
                    <a href="#" @click="pricetype=1" :class="pricetype==1?'saas_moren':'saas_moren_gray'" class=" col_010101 text-none mg_l20 text-left">统一定价</a>
                    <a href="#" @click="pricetype=2" :class="pricetype==2?'saas_moren':'saas_moren_gray'" class=" col_010101 mg_l20 text-none text-left">根据车型价格等级定价</a>
                </div>
            </div>
            <p class="text-left col_ed5521 mg_l20">适用车型：</p>
            <div class="col-md-12  mg_t5 mg_b5 clearfix select_dropdown">
                <accordion :one-at-atime="true">
                    <panel v-for="(index,item) in list | orderBy 'fac'" :header="item.fac" :is-open="false">
                        <ul class="mg_b0" style="*width: 408px;">
                            <li class="clearfix mg_t5 mg_b5" v-for="car in item.carlist" class="clearfix mg_t5 mg_b5">
                                <span class="pull-left lineH26 f12 mg_l10 mg_b10 w40">{{car.text}}</span>
                                <label class="control-label pull-left lineH20 f10">建议销售价：</label>
                                <input placeholder="" v-model="car.price" class="add_input w70 pull-left form-control" type="text">
                                <span class="pull-right lineH26 col_b5 mg_r10 f10">（整车市场参考价：9.8万-15.6万）</span>
                            </li>
                        </ul>
                    </panel>
                </accordion>
            </div>
        </div>
        <div class="col-md-12 pd_b10 clearfix bdT_d0d0d0" style="*position:absolute;*bottom:0;*left:0;*background:#fff;">
            <a href="#" class="btn_red bg8 mg_t10 auto w120 h26">确&nbsp;定</a>
        </div>
    </div>
</modal>

</template>

<script>

import {
    modal
}
from 'vue-strap'
import {
    accordion
}
from 'vue-strap';
import {
    panel
}
from 'vue-strap';
import buttonTab from '../general/buttonTab.vue'
export default {
    components: {
        modal, accordion, panel, buttonTab
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        stockid: {
            require: true
        },
        inprice: {
            type: Number
        },
        //thirds: {}
    },
    data() {
        return {
            tabs: ["北迈","京东","天猫"],
            thirds: [{
                id: "1001",
                name: "北迈",
                price: 0,
            }, {
                id: "1002",
                name: "京东",
                price: 0,
            }, {
                id: "1003",
                name: "天猫",
                price: 0,
            }],
            pricetype: 1,
            price: "",
            index: 0,
            list: [{
                fac: "一汽大众",
                carlist: [{
                    text: "CC",
                    level: 3,
                    price: 0
                }, {
                    text: "迈腾",
                    level: 2,
                    price: 0
                }]
            }, {
                fac: "进口奥迪",
                carlist: [{
                    text: "TT",
                    level: 4,
                    price: 0
                }, {
                    text: "A6",
                    level: 4,
                    price: 0
                }]
            }]
        }
    },
    methods: {
        change(price) {
            let val = price || this.price;
            if (this.pricetype == 1) {
                this.list.forEach(function(item) {
                    item.carlist.forEach(function(car) {
                        car.price = val;
                    })
                })
            } else {
                this.list.forEach(function(item) {
                    item.carlist.forEach(function(car) {
                        car.price = val * car.level;
                    })
                })
            }
            this.thirds[this.index].price = val;
        }
    },
    watch: {
        price(val) {
                this.change(val);
            },
            pricetype() {
                this.change();
            },
            index(val){
              this.price=this.thirds[val].price;
            }
    }
}

</script>
