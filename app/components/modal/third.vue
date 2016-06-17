

<template id="">

<modal :show.sync="show" effect="fade" width="520px" title="选择销售平台">
    <div slot="modal-body" class="modal-body pd_0 clearfix" style="overflow-y:hidden">
        <!-- <ul class="modal_sell clearfix">
            <li v-for="item in thirds" :class="{'checked':item.ischeck}" @click="check($index)"><a href="#">{{item.name}}</a></li>
        </ul> -->
        <button-tab :list="tabs" :index.sync="index" v-if="tabs.length"></button-tab>
        <div class="clearfix t-c h370 mg_b20 ovsc-x ovsc-y poR" style="*padding-bottom:50px;" v-if="tabs.length">
            <div class="clearfix mg_t15">
                <span class="pull-left lineH30 mg_l20 mg_b10 f12 mg_t4">快速设置价格</span>
                <div class="pull-left clearfix mg_t5 mg_l30">
                    <label class="control-label pull-left f12 lineH26 fN col_767676">销售价：</label>
                    <input placeholder="" v-model="price" class="add_input w70 pull-left form-control" type="text">
                </div>
                <div class="pull-left">
                    <a href="javascript:void(0)" @click="pricetype=1" :class="pricetype==1?'saas_moren':'saas_moren_gray'" class=" col_010101 text-none mg_l20 text-left">统一定价</a>
                    <a href="javascript:void(0)" @click="pricetype=2" :class="pricetype==2?'saas_moren':'saas_moren_gray'" class=" col_010101 mg_l20 text-none text-left">根据车型价格等级定价</a>
                </div>
            </div>
            <p class="text-left col_ed5521 mg_l20">适用车型：</p>
            <div class="col-md-12  mg_t5 mg_b5 clearfix select_dropdown">
                <accordion :one-at-atime="false">
                    <panel v-for="(index,item) in list | orderBy 'fac'" :header="item.FactoryName" :is-open="false">
                        <ul class="mg_b0" style="*width: 408px;">
                            <li class="clearfix mg_t5 mg_b5" v-for="car in item.carlist" class="clearfix mg_t5 mg_b5">
                                <span class="pull-left lineH26 f12 mg_l10 mg_b10 w40">{{car.Carmodel}}</span>
                                <label class="control-label pull-left lineH20 f10">建议销售价：</label>
                                <input placeholder="" v-model="car.Price" class="add_input w70 pull-left form-control" type="text">
                                <span class="pull-right lineH26 col_b5 mg_r10 f10">（整车市场参考价：9.8万-15.6万）</span>
                            </li>
                        </ul>
                    </panel>
                </accordion>
            </div>
        </div>
        <div class="t-c h370 lineH320" v-if="!tabs.length">
            <p class="f12">该商品已在所有平台上架</p>
        </div>
        <div v-if="tabs.length" class="col-md-12 pd_b10 clearfix bdT_d0d0d0" style="*position:absolute;*bottom:0;*left:0;*background:#fff;">
            <a href="javascript:void(0)" class="btn_red bg8 mg_t10 auto w120 h26" :class="{ 'disable':!price }" @click="commit">确&nbsp;定</a>
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
        suitcars: {
            type: Array
        }
    },
    ready() {
        let _this = this;
        let obj = {};
        Vue.http.get('/product/GetCarLevelRatio').then(function(res) {
            if (res.data) {
                res.data.forEach(function(item) {
                    obj[item.CarLevel] = item.Ratio
                })
                _this.carlevel = obj;
            }
        })
    },
    data() {
        return {
            tabs: [],
            thirds: [],
            pricetype: 1,
            price: "",
            index: 0,
            list: [],
            carlevel: {}
        }
    },
    computed: {

    },
    methods: {
        commit() {
                if (!this.price) {
                    return false;
                }
                let _this = this;
                let model = {
                    StockId: this.stockid
                };
                let pricelist = [];
                let third = this.thirds[this.index];
                let ThirdId = third.id;
                let ThirdName = third.name;
                this.list.forEach(function(item) {
                    item.carlist.forEach(function(car) {
                        let obj = {
                            ThirdId: ThirdId,
                            ThirdName: ThirdName,
                            FactoryId: item.FactoryId,
                            FactoryName: item.FactoryName,
                            CarModelId: car.CarmodelId,
                            CarModelName: car.Carmodel,
                            SalePrice: car.Price || _this.price,
                            InPrice: _this.inprice,
                            StockId: _this.stockid
                        }
                        pricelist.push(obj);
                    })
                });
                Vue.http.post('/product/SaveThirdInfo', {
                    model: model,
                    pricelist: pricelist,
                    code: third.code
                }).then(function(res) {
                    if (res.data.ok) {
                        layer.msg('提交成功', {
                            icon: 1,
                            time: 800
                        });

                        _this.tabs.splice(_this.index, 1);
                        _this.thirds.splice(_this.index, 1);
                        if (_this.tabs.length) {
                            _this.index = 0;
                            _this.price = _this.thirds[0].price;
                        } else {
                            _this.show = false;
                        }
                    }
                })
            },
            getthirds() {
                let _this = this;
                let arr = [];
                let tab = [];
                Vue.http.get('/product/GetThirdsByStockid?stockid=' + this.stockid).then(function(res) {
                    if (res.data && res.data.length) {
                        res.data.forEach(function(item) {
                            arr.push({
                                id: item.Id,
                                name: item.CompanyName,
                                price: 0,
                                code: item.InnerCode
                            })
                            tab.push(item.CompanyName);
                        })
                        _this.thirds = arr;
                        _this.tabs = tab;
                    } else {
                        //layer.alert('该商品已在所有平台上架');
                        _this.show = false;
                        _this.tabs = [];
                        _this.thirds = [];
                    }
                })
            },
            change(price) {
                let val = price || this.price;
                let _this = this;
                if (this.pricetype == 1) {
                    this.list.forEach(function(item) {
                        item.carlist.forEach(function(car) {
                            car.Price = val;
                        })
                    })
                } else {
                    this.list.forEach(function(item) {
                        item.carlist.forEach(function(car) {
                            car.Price = val * (_this.carlevel[car.Level] || 1);
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
            index(val) {
                this.price = this.thirds[val].price;
            },
            // stockid(val) {
            //     if (val && this.show) {
            //
            //     }
            // },
            show(val) {
              this.getthirds();
                let _this = this;
                let arr = [];
                let cids = [];
                if (this.suitcars && this.suitcars.length && val) {
                    this.suitcars.forEach(function(car) {

                        cids.push(car.CarmodelId);

                        let temp = arr.filter(function(item) {
                            return item.FactoryId == car.FactoryId;
                        });
                        if (!temp.length) {
                            arr.push({
                                FactoryName: car.FactoryName,
                                FactoryId: car.FactoryId,
                                carlist: [{
                                    Carmodel: car.Carmodel,
                                    CarmodelId: car.CarmodelId,
                                    Level: 1,
                                    Price: 0
                                }]
                            });
                        } else {
                            let isexists = temp[0].carlist.some(function(carmodel) {
                                return carmodel.CarmodelId == car.CarmodelId;
                            })
                            if (!isexists) {
                                temp[0].carlist.push({
                                    Carmodel: car.Carmodel,
                                    CarmodelId: car.CarmodelId,
                                    Level: 1,
                                    Price: 0
                                })
                            }
                        }
                    })
                }
                _this.list = arr;
                if (cids.length) {
                    Vue.http.get('/product/GetCarLevelByIds?ids=' + cids.join(',')).then(function(res) {
                        if (res.data && res.data.length) {
                            let obj = {};
                            res.data.forEach(function(item) {
                                obj[item.ID] = item.PriceLevelId;
                            })
                            _this.list.forEach(function(item) {
                                item.carlist.forEach(function(car) {
                                    car.Level = obj[car.CarmodelId];
                                })
                            })
                        }
                    })
                }
            }
    }
}

</script>
