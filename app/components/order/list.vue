

<template id="">

<div class="right_contain" v-show="!detailshow&&!deshow">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown min-w1200">
            <span class="pull-left mg_l10 mg_r10 f12 lineH26 mg_l20">下单时间</span>
            <datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
            </datepicker>

            <span class="pull-left mg_l10 mg_r10 f12 lineH26">至</span>

            <datepicker :value.sync="edate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
            </datepicker>
            <div class="dropdown pull-left mg_l20">
                <v-select :value.sync="source" :options="sourcelist" :close-on-select="true" class='' placeholder="选择来源"></v-select>
            </div>
            <!-- <div class="dropdown pull-left mg_l20">
                <v-select :value.sync="state" :options="statelist" :close-on-select="true" class='' placeholder="选择状态"></v-select>
            </div> -->
            <div class="dropdown pull-left mg_l20">
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" class='' placeholder="选择条件"></v-select>
            </div>
            <input placeholder="请输入关键字" class="add_input w160 pull-left form-control mg_l30" type="text" v-model='key'>
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
        </div>

        <tab :data="tablist" :value.sync="state" :tips="tips"></tab>

        <moon-loader :loading="loading" size="50px"></moon-loader>

        <table class="table table2 table_bg mg_t2" v-if="orderlist.length" v-for="(index,item) in orderlist">
            <thead>
                <tr>
                    <th colspan="5" class="lineH30">
                        <span class="pull-left col_999999">{{item.AddTime}}</span>
                        <span class="mg_l40 col_010101 pull-left">来源单号：{{item.SourceOrderId}}</span>
                        <span class="mg_l40 col_010101 pull-left">订单号：{{item.OrderCode}}</span>
                        <img :src="'/content/images/third'+item.SourceId+'.png'" class="pull-right mg_r10">
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(dindex,detail) in item.OrderDetails">

                    <tr v-if="!dindex">
                        <td colspan="3" style="padding-top:5px!important; padding-bottom:5px!important;">
                            <img src="../../images/saas15.png" height="30">
                            <span class="lineH30">车型：{{(detail.FactoryName || "") +" "+(detail.CarModelName || "") +" "+(detail.CarYearName || "")}}</span>
                        </td>
                        <td></td>
                        <td></td>
                        <!--状态-->
                    </tr>
                    <tr>
                        <td class="poR" width="40%">
                            <img v-if='detail.SmallPic' :src="detail.SmallPic" class="saas_table_img">
                            <img v-else src="../../images/noimg.png" class="saas_table_img" />
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">{{detail.ProdBrandName+" "+detail.ProdName}}</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：{{detail.StockId}}</p>
                                    <p class="col_767676">供应商编码：{{detail.DealerProdNo}}</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x{{detail.Quantity}}</td>
                        <td width="15%">单价：{{detail.SalePrice}}</td>

                        <td width="15%" v-if="(item.OrderStatus==3)&&!dindex" :rowspan="item.OrderDetails.length*2">
                            <em class="waiting_t pull-left mg_l30"></em>
                            <span class="col_f8a504 pull-left">待收货</span>
                        </td>
                        <td width="15%" v-if="(item.OrderStatus>=4)&&!dindex" :rowspan="item.OrderDetails.length*2">
                            <em class="already pull-left mg_l30"></em>
                            <span class="col_11c3a4 pull-left">已收货</span>
                        </td>
                        <td width="15%" v-if="item.OrderStatus<=2&&item.OrderStatus>=0&&!dindex" :rowspan="item.OrderDetails.length*2">
                            <em class="waiting_s pull-left mg_l30" :rowspan="item.OrderDetails.length*2"></em>
                            <span class="col_ec7642 pull-left">待发货</span>
                        </td>
                        <td width="15%" v-if="item.OrderStatus==-1&&!dindex" :rowspan="item.OrderDetails.length*2">
                            <em class="cancel pull-left mg_l30"></em>
                            <span class="col_b5 pull-left">已取消</span>
                        </td>
                        <!--操作-->
                        <td width="15%" v-if="(item.OrderStatus>2||item.OrderStatus==-1)&&!dindex" class="t-c" :rowspan="item.OrderDetails.length*2">
                            <a href="#" class="saas_add mg_l0" @click="showdetail(index)">查看详情</a>
                        </td>
                        <td width="15%" class="t-c" v-if="item.OrderStatus<=2&&item.OrderStatus>=0&&!dindex" :rowspan="item.OrderDetails.length*2">
                            <span class="f12 col_999999">{{item.Remaintime}}</span>
                            <a href="#" class="btn_red bg8 f14 w100 h26 auto mg_b10" @click="delivery(index)">去发货</a>
                            <a href="#" class="saas_add mg_l0" @click="showdetail(index)">查看详情</a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <nothing v-if="!orderlist.length"></nothing>
        <page-docs :count='count'></page-docs>
    </div>
</div>
<detail :show.sync="detailshow" :model="model"></detail>
<delivery :show.sync="deshow" :model="model"></delivery>

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
import buttonDocs from '../general/buttonDocs.vue'
import tab from '../general/tabDocs.vue'
import pageDocs from '../general/pageDocs.vue'
import nothing from '../general/nothing.vue'
import DateFormat from '../utils/DateFormat.js'
import {
    GetFormatDate
}
from '../utils/date'
import QueryString from '../utils/QueryString'
import detail from './detail.vue'
import delivery from './delivery.vue'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
export default {
    components: {
        vSelect, vOption, datepicker, buttonDocs, tab, pageDocs, detail, delivery, MoonLoader, nothing
    },
    data() {
        return {
            sdate: GetFormatDate(1),
            edate: GetFormatDate(),
            sourcelist: [{
                value: '1',
                label: '淘宝'
            }, {
                value: '2',
                label: '京东'
            }],
            source: [],
            third: [],
            state: 0,
            typelist: [{
                value: '1',
                label: '来源单号'
            }, {
                value: '2',
                label: '订单号'
            }],
            type: [],
            key: "",
            tablist: [{
                val: 0,
                text: "全部订单"
            }, {
                val: 1,
                text: "已发货订单"
            }, {
                val: 2,
                text: "待发货订单"
            }, {
                val: 3,
                text: "急需发货"
            }, {
                val: 4,
                text: "已取消订单"
            }],
            tips: [],
            orderlist: [],
            pagesize: 5,
            pageindex: 1,
            count: 0,
            detailshow: false,
            // model: {},
            deshow: false,
            loading: false,
            pindex: -1,
        }
    },
    methods: {
        query() {
                let _this = this;
                let param = {
                    pagesize: _this.pagesize,
                    pageindex: _this.pageindex,
                    sdate: _this.sdate,
                    edate: _this.edate,
                    state: _this.state,
                    type: _this.type.length ? _this.type[0] : 0,
                    key: _this.key,
                    source: _this.source.length ? _this.source[0] : 0
                };
                var loading = layer.load();
                Vue.http.get('/order/GetOrders', param).then(function(res) {
                        _this.orderlist = [];
                        // _this.tips=[];
                        _this.count = 1;
                        layer.close(loading);
                        if (res.data.ok) {
                            res.data.data.forEach(function(item) {
                                //时间转换
                                item.AddTime = DateFormat(item.AddTime);

                                //获取发货单信息
                                if(item.OrderStatus>2){
                                  Vue.http.get('/order/GetOrderShip?ordercode='+item.OrderCode).then(function(res){
                                     if(res.data){
                                       item.ExpressName=res.data.ExpressName;
                                       item.ExpressNo=res.data.ExpressNo;
                                     }
                                  })
                                }else{
                                  item.ExpressName="";
                                  item.ExpressNo="";
                                }
                                if (item.OrderStatus <= 2) {
                                    //发货库区
                                    //let ids = [];
                                    item.OrderDetails.forEach(function(detail) {
                                        detail.slot = [];
                                        detail.selects = [];
                                        //ids.push(detail.StockId);
                                        //获取对应库存
                                        if (item.OrderStatus <= 2 && item.OrderStatus >= 0) {

                                        }

                                    })
                                }
                            })
                            _this.orderlist = res.data.data;
                            _this.count = Math.ceil(res.data.count / _this.pagesize);
                            // _this.tips=res.data.data2;
                        } else {
                            //layer.alert(res.data.mes);
                        }
                    },
                    function() {
                        //error
                        console.log('查询订单信息错误');
                        layer.close(loading);
                    })
            },
            showdetail(index) {
              this.pindex=index;
                //this.model = this.orderlist[index];
                this.detailshow = true;
            },
            delivery(index) {
                this.pindex=index;
                let model = this.orderlist[index];
                let _this=this;
                model.OrderDetails.forEach(function(detail) {
                  Vue.http.get('/stock/GetStocksByIds?ids=' + detail.StockId+"&ordercode="+detail.OrderCode).then(function(res) {
                      if (res.data.data.length) {
                          let arr = [];
                          res.data.data.forEach(function(item) {
                              if (item.SlotCode && item.AreaCode && item.StoreCode) {
                                  let count = item.StockCount - item.LockCount;
                                  if (count) {
                                      arr.push({
                                          label: item.AreaCode + "-" + item.StoreCode + "-" + item.SlotCode + "  库存数:" + count,
                                          value: item.Id.toString(),
                                          count: count
                                      })
                                  }
                              }
                          });
                          detail.selects = arr;
                      }
                      if (res.data.data2) {
                          detail.slot = res.data.data2;
                      }
                      //_this.model=model;
                  })
                })

                this.deshow = true;
            }
    },
    ready() {
        let tab = QueryString('tab');
        //根据参数默认tab
        if (tab) {
            this.state = parseInt(tab);
        }
        this.query();
        //获取订单数
        let _this = this;
        Vue.http.get('/order/GetTips').then(function(res) {
                if (res.ok) {
                    _this.tips = res.data;
                }
            })
            //获取第三方平台(来源)
        Vue.http.get('/order/GetSource').then(function(res) {
            _this.third = res.data;
            let arr = [{
                label: "全部",
                value: "0"
            }];
            res.data.forEach(function(item) {
                arr.push({
                    label: item.CompanyName,
                    value: item.Id.toString()
                })
            })
            _this.sourcelist = arr;
        })
    },
    events: {
        'page': function(index) {
            this.pageindex = index;
            this.query();
            $('.container-fluid').animate({
                scrollTop: '0px'
            });
        },
        'tab': function(val) {
            this.pageindex = 1;
            this.query();
        },
        'todelivery': function(){
          this.delivery(this.pindex);
        }
    },
    computed:{
      model(){
        if(this.pindex>=0){
          return this.orderlist[this.pindex];
        }
        return {};
      }
    }
}

</script>
