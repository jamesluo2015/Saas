

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
            <!-- <div class="dropdown pull-left mg_l20">
                <v-select :value.sync="source" :options="sourcelist" :close-on-select="true" class='' placeholder="选择来源"></v-select>
            </div> -->
            <div class="dropdown pull-left mg_l20">
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" class='' placeholder="选择条件"></v-select>
            </div>
            <input placeholder="请输入关键字" class="add_input w160 pull-left form-control mg_l30" type="text" v-model='key'>
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
            <!-- <a href="/stock/main" class="btn_red bg8 f14 w100 h26 auto mg_b10 pull-left mg_l30">去入库</a> -->
        </div>

        <tab :data="tablist" :value.sync="state"></tab>

        <table class="table table2 table_bg mg_t2 table3" v-for="item in orderlist">
            <thead>
                <tr>
                    <th colspan="6" class="lineH30">
                        <span class="pull-left">{{item.AddTime}}</span>
                        <span class="mg_l40 col_010101 pull-left">制造商退货单号：{{item.DealerRoCode}}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index,detail) in item.Details">
                    <td class="poR" width="30%">
                        <img v-if="detail.SmallPic" :src="detail.SmallPic" class="saas_table_img">
                        <img v-else src="../../images/noimg.png" class="saas_table_img">

                        <div class="table_detail">
                            <div class="clearfix">
                                <span class="pull-left col_010101">{{detail.ProdBrandName}} {{detail.ProdName}}</span>
                            </div>
                            <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                <p class="col_767676 mg_b0">实物ID：{{detail.StockId}}</p>
                                <p class="col_767676">供应商编码：{{detail.DealerProdNo}}</p>
                            </div>
                        </div>
                    </td>
                    <td width="20%">订单号：{{detail.SubOrderCode?detail.OrderCode+"-"+detail.SubOrderCode:detail.OrderCode}}</td>
                    <td width="10%">x{{detail.ReturnQuantity}}</td>
                    <td width="15%">单价：{{detail.SalePrice}}</td>

                    <td width="13%" :rowspan="item.Details.length" class="t-c" v-if="!index">
                      <span class="col_d50707"  v-if="item.RoStatus==1">待收货</span>
                      <span class="col_d50707"  v-if="item.RoStatus==2">待入库</span>
                      <span class="col_d50707"  v-if="item.RoStatus>2">已入库</span>
                    </td>
                    <td width="12%" :rowspan="item.Details.length" class="t-c" v-if="!index">
                      <a v-if="item.RoStatus==2" href="#" class="underline col_4583e9" @click="instore(item)">去入库</a>
                      <a v-if="item.RoStatus==1" href="#" class="underline col_4583e9" @click="receiving(item)">确认收货</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <nothing v-if="!orderlist.length"></nothing>
        <page-docs :count='count'></page-docs>
    </div>
</div>
<instore-return :show.sync="instoreshow" :model="model"></instore-return>
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
import QueryString from '../utils/QueryString.js'
import instoreReturn from '../modal/instoreReturn.vue'
export default {
    components: {
        vSelect, vOption, datepicker, buttonDocs, tab, pageDocs, nothing,instoreReturn
    },
    data() {
        return {
            sdate: GetFormatDate(1),
            edate: GetFormatDate(),
            // sourcelist: [{
            //     value: '1',
            //     label: '淘宝'
            // }, {
            //     value: '2',
            //     label: '京东'
            // }],
            // source: [],
            //third:[],
            state: 0,
            typelist: [{
                value: '1',
                label: '制造商退货单号'
            }, {
                value: '2',
                label: '订单号'
            }],
            type: [],
            tablist: [{
                val: 0,
                text: "全部退货单"
            },{
                val: 1,
                text: "待收货"
            }, {
                val: 2,
                text: "待入库"
            }, {
                val: 3,
                text: "已入库"
            }],
            key: "",
            orderlist: [],
            pagesize: 5,
            pageindex: 1,
            count: 0,
            instoreshow: false,
            model: { Details:[] }
        }
    },
    ready() {
        let tab = QueryString('tab');
        //根据参数默认tab
        if (tab) {
            this.state = parseInt(tab);
        }
        this.query();
        //获取第三方平台(来源)
        //let _this=this;
        // Vue.http.get('/order/GetSource').then(function(res){
        //   _this.third=res.data;
        //   let arr=[{label:"全部",value:"0"}];
        //   res.data.forEach(function(item){
        //     arr.push({
        //       label: item.CompanyName,
        //       value:item.Id.toString()
        //     })
        //   })
        //   _this.sourcelist=arr;
        // })
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
                //source: _this.source.length ? _this.source[0] : 0
            };
            var loading = layer.load();
            Vue.http.get('/order/GetReturnOrders', param).then(function(res) {

                layer.close(loading);
                if (res.data.ok) {
                    res.data.data.forEach(function(item) {
                        //时间转换
                        item.AddTime = DateFormat(item.AddTime,1);
                        item.Details.forEach(function(d){
                          d.SlotCode=[];
                          d.ProdType= 0;
                          d.Quantity= 0;
                        })
                    })
                    _this.orderlist = res.data.data;
                    _this.count = Math.ceil(res.data.count / _this.pagesize);
                } else {
                  _this.orderlist = [];
                  _this.count = 0;
                    //layer.alert(res.data.mes);
                }
            }, function() {
                //error
                console.log('查询订单信息错误');
                layer.close(loading);
            })
        },
        receiving(model){
          model.RoStatus=2;
          Vue.http.post('/order/Receiving',{model:model}).then(function(res){
            if(res.data){
              layer.msg('确认收货完成',{icon:1,time:800});
            }
          })
        },
        instore(model){
          this.model = model;
          //model.RoStatus=3;
          this.instoreshow=true;
        }
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
            this.state = val;
            this.pageindex = 1;
            this.query();
        }
    }
}

</script>
