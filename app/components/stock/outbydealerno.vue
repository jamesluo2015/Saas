

<template id="">

<div class="right_contain">
    <div class="row">
        <tab-docs :data="tablist" :value="tab"></tab-docs>
        <template id="" v-if="tab==1">
            <div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown bd_bD_d9">
                <label class="control-label pull-left f16 col_000 w140 mg_l20" for="input01">输入供应商编码：</label>
                <!-- <input placeholder="" type="text" class="add_input w160 form-control pull-left"> -->
                <textinfo width="160px" :list="numlist" :value.sync="dealerno" placeholder=""></textinfo>
                <button-docs text="查&nbsp;询" @click="query" class="mg_l30"></button-docs>
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
                <div class="row pd_l0 pd_r0 mg_l0 mg_r0 mg_b20">
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
                    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                        <label class="control-label pull-left">货位：</label>
                        <div class="col-md-10 pull-left pd_l0 mg_t2">
                            {{model.SlotCode}}
                        </div>
                    </div>
                    <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
                        <label class="control-label pull-left">开单年款：</label>
                        <input placeholder="" v-model="model.Memo" type="text" class="add_input w160 form-control">
                    </div>
                    <div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown">
                        <label class="control-label pull-left" for="input01">开单数：</label>
                        <input placeholder="" v-model="model.Quantity" type="text" class="add_input w160 form-control">
                    </div>
                    <div class="col-md-12 pd_l0 clearfix pd_b20 select_dropdown">
                        <div class="pull-left">
                            <label class="control-label pull-left">销售单价：</label>
                            <input placeholder="" v-model="model.SalePrice" type="text" class="add_input w160 pull-left form-control">
                            <label class="pull-left fN mg_t2 mg_l5">元</label>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <a href="javascript:void(0)" class="btn_red bg8 f16 mg_t20 mg_l120 w200 h40" :class="{'disable':!valid}" @click="add(model)">选&nbsp;择</a>
                    </div>
                </div>
            </div>
        </template>

        <template id="" v-if="tab==2">
            <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
                <label class="control-label pull-left">开单品类：</label>
                <v-select :value.sync="standardname" :options="standardlist" :close-on-select="true" placeholder="选择标准名称">
                </v-select>
            </div>
            <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20">
                <label class="control-label pull-left">开单车型：</label>
                <v-select :value.sync="factory" class="pull-left mg_r30" :options="fac_select" :close-on-select="true" placeholder="选择主机厂">
                </v-select>
                <v-select id="carmodel" :show.sync="selectshow" :close-on-select="true" :value.sync="carmodel" class="pull-left mg_r30" :options="car_select" :close-on-select="true" placeholder="选择车型">
                </v-select>
                <v-select :value.sync="partsyear" class="pull-left mg_r30" :options="yearlist" :close-on-select="true" placeholder="选择年款">
                </v-select>
                <button-docs text="查&nbsp;询" @click='query2' :state="!valid2"></button-docs>
            </div>
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th width="11%">名称</th>
                        <th width="12%">供应商码</th>
                        <th width="20%">车型</th>
                        <th width="10%">库存数</th>
                        <th width="10%">货位</th>
                        <th width="13%">开单数</th>
                        <th width="13%">销售单价</th>
                        <th width="11%">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in products">
                        <td>{{item.ProdName}}</td>
                        <td>{{item.DealerProdNo}}</td>
                        <td>奇瑞瑞虎5 1，6L 2006-2012</td>
                        <td>{{item.StockCount}}</td>
                        <td>{{item.SlotCode}}</td>
                        <td>
                            <input placeholder="" v-model="item.Quantity" class="add_input w100 form-control" type="text">
                        </td>
                        <td>
                            <input placeholder="" v-model="item.SalePrice" class="add_input w100 form-control" type="text">
                        </td>
                        <td><a href="#" class="saas_add mg_l0" @click="add(item)">选择</a></td>
                    </tr>
                </tbody>

            </table>
        </template>

    </div>
</div>

<div class="alert_dialog" v-if="list.length">
    <div class="alert_body poR mg_b20">
        <h3><span class="mg_l15 pull-left">已选配件</span>
          <a href="#" class="pull-right mg_r10 arial" @click="list=[]"></a>
        </h3>
        <div class="w_100 ovau-x">
            <ul class="alert_list clearfix" >
                <li class="clearfix poR" v-for="item in list" @mouseover="item.ishover=true" @mouseout="item.ishover=false">
                    <img v-if="item.SmallPic" :src="item.SmallPic" class="pull-left" />
                    <img v-else src="../../images/noimg.png" class="pull-left" />
                    <div class="pull-left mg_l10 bd_rD_d9">
                        <p><span class="w80 text-right col_767676">名称：</span><span class="w80">{{item.ProdName}}</span></p>
                        <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥{{item.SalePrice}}</span></p>
                        <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">{{item.Quantity}}</span></p>
                        <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">{{item.DealerProdNo}}</span></p>
                    </div>
                    <div class="alert_list_close" :style="{ display: item.ishover?'block':'' }">
                      <em class="pull-right mg_r5 mg_t5" @click="list.splice($index,1)"></em>
                    </div>
                </li>
                <!-- <li class="w200"></li> -->
            </ul>
        </div>
        <div class="alert_right">
            <p class="mg_b0 mg_t7"><span class="w80 text-right col_767676 f12">商品数量：</span><span class="f12">{{allcount[0]}}</span></p>
            <p class="mg_b0 mg_t2"><span class="w80 text-right col_767676 f12">开单总价：</span><span class="col_ed5521 f12">￥{{allcount[1]}}</span></p>
            <a href="javascript:void(0)" class="btn_red bg8 w100 h22 f12 mg_t5 mg_b5" @click="commit">确定开单</a>
            <a href="javascript:void(0)" class="saas_add mg_l30" @click="addmemo">开单备注</a>
        </div>
    </div>
</div>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap';
import buttonDocs from '../general/buttonDocs.vue'
import tabDocs from '../general/tabDocs.vue'
import textinfo from '../general/textinfo.vue'
export default {
    components: {
        tabDocs, buttonDocs, textinfo, vSelect
    },
    data() {
        return {
            tablist: [{
                val: 1,
                text: "通过供应商编码找商品"
            }, {
                val: 2,
                text: "通过车型适用性找商品"
            }],
            tab: 1,
            carlist: [],
            selectshow: false,
            yearlist: [],
            standardlist: [],
            factory: [],
            carmodel: [],
            partsyear: [],
            standardname: [],
            products: [],

            model: {},
            dealerno: "",
            nonedealerno: false,
            list: [],
            memo: ""
        }
    },
    computed: {
        numlist() {
                return [];
            },
            valid() {
                if (!this.model.SalePrice || isNaN(this.model.SalePrice) || !this.model.Quantity || isNaN(this.model.Quantity) || this.model.StockCount < this.model.Quantity) {
                    return false;
                }
                return true;
            },
            valid2: function() {
                if (!this.standardname.length || !this.carmodel.length) {
                    return false;
                }
                return true;
            },
            allcount() {
                let count = 0;
                let price = 0;
                this.list.forEach(function(item) {
                    count += item.Quantity;
                    price += (item.Quantity * item.SalePrice);
                })
                return [count, price];
            },
            //主机厂
            fac_select: function() {
                let arr = [];
                if (this.carlist.length) {
                    let s = new Set();
                    //筛选
                    this.carlist.forEach(function(item) {
                        if (!s.has(item.FactoryId)) {
                            arr.push({
                                value: item.FactoryId.toString(),
                                label: item.FactoryName
                            });
                        }
                        s.add(item.FactoryId);
                    })
                }
                return arr;
            },
            //车型
            car_select: function() {
                let arr = [];
                let _this = this;
                if (this.factory.length) {
                    //_this.carmodel=[];
                    _this.carlist.forEach(function(item) {
                            if (item.FactoryId == _this.factory) {
                                arr.push({
                                    value: item.CarModelId.toString(),
                                    label: item.CarModelName
                                });
                            }
                        })
                        //默认选择车型
                    if (arr.length) {
                        _this.carmodel = [arr[0].value];
                    }
                }
                return arr;
            }
    },
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
                if (!model.SalePrice || isNaN(model.SalePrice) || !model.Quantity || isNaN(model.Quantity) || model.StockCount < model.Quantity) {
                    layer.alert('请正确输入开单数和销售价');
                    return false;
                }
                let isexists = this.list.some(function(item) {
                    return item.StockId == model.StockId;
                })
                if (isexists) {
                    layer.alert('当前商品已在选择列表中');
                    return false;
                }
                model.SalePrice = parseInt(model.SalePrice);
                model.Quantity = parseInt(model.Quantity);
                this.list.splice(0, 0, model);
            },
            addmemo() {
                let _this = this;
                var prompt = layer.prompt({
                    title: '开单备注',
                    formType: 2,
                    value: _this.memo
                }, function(text) {
                    _this.memo = text;
                    layer.close(prompt);
                });
            },
            query2() {
                if (!this.valid2) {
                    return false;
                }
                let param = {
                    sid: this.standardname[0],
                    cid: this.carmodel[0],
                    yid: this.partsyear.length ? this.partsyear[0] : 0
                }
                let _this=this;
                Vue.http.get('/stock/GetProd', param).then(function(res) {
                    if (res.data.length) {
                        _this.products = res.data;
                    } else {
                        _this.product = [];
                    }
                })
            },
            commit() {
              let _this=this;
              Vue.http.post('/stock/SaveBills',{list:this.list,memo:this.memo}).then(function(res){
                _this.$parent.dealernoshow=false;
                _this.$parent.query();
              })
            }
    },
    events: {
        'tab': function(val) {
            this.tab = val;
        }
    },
    ready() {
        //加载车型权限信息
        let _this = this;

        // Post request
        Vue.http.get('/product/GetCarmodel').then(function(response) {
            _this.carlist = response.data;
        }, function(response) {
            console.log('没有车型信息');
        });
        //加载标准名称
        Vue.http.get('/product/GetStandards').then(function(response) {
            let result = response.data;
            let arr = [];
            result.map(x => arr.push({
                value: x.StandardId.toString(),
                label: x.StandardName
            }))
            _this.standardlist = arr;
        }, function(response) {
            console.log('没有标准名称');
        });

        layer.config({
            extend: 'extend/layer.ext.js'
        });
    },
    watch: {
        carmodel(val) {
                //查询年款
                if (val.length) {
                    let _this = this;
                    _this.partsyear = [];

                    Vue.http.get('/product/GetYear?pid=' + val).then(function(response) {
                        let arr = [];
                        response.data.forEach(function(item) {
                                arr.push({
                                    value: item.ID.toString(),
                                    label: item.YearName
                                });
                            })
                            // if(arr.length){
                            //   _this.partsyear=[arr[0].value];
                            // }
                        _this.yearlist = arr;
                    }, function(response) {
                        console.log('没有年款信息');
                    });
                }
            },
            factory(val) {
                if (val.length) {
                    //document.querySelector('#carmodel button').click()
                    this.selectshow = true;
                }
                return false;
            }
    }
}

</script>
