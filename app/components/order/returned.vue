
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
            <div class="dropdown pull-left mg_l20">
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" class='' placeholder="选择条件"></v-select>
            </div>
            <input placeholder="请输入关键字" class="add_input w160 pull-left form-control mg_l30" type="text" v-model='key'>
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
        </div>

        <tab :data="tablist" :value="0"></tab>

        <table class="table table2 table_bg mg_t2" v-for="item in orderlist">
            <thead>
                <tr>
                    <th colspan="4" class="lineH30">
                        <span class="pull-left">{{item.AddTime}}</span>
                        <span class="mg_l40 col_010101 pull-left">来源单号：{{item.SourceOrderId}}</span>
                        <span class="mg_l40 col_010101 pull-left">订单号：{{item.OrderCode}}</span>
                        <span class="mg_l40 col_010101 pull-left">退货单号：{{item.RoCode}}</span>
                        <img src="../../images/saas12.png" class="pull-right mg_r10">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="poR" width="40%">
                        <img src="../../images/logo.png" class="saas_table_img">
                        <div class="table_detail">
                          <div class="clearfix">
                              <span class="pull-left col_010101">{{item.ProdName}}</span>
                          </div>
                          <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                              <p class="col_767676 mg_b0">实物ID：{{item.StockId}}</p>
                              <p class="col_767676">供应商编码：{{item.DealerProdNo}}</p>
                          </div>
                        </div>
                    </td>
                    <td width="15%">x{{item.ReturnQuantity}}</td>
                    <td width="15%">单价：{{item.SalePrice}}</td>
                    <td width="30%">
                      <span v-if="item.RoStatus>=1">已入库</span>
                      <span v-else class="col_d50707">待入库</span>
                    </td>
                </tr>
            </tbody>

        </table>
        <nothing v-if="!orderlist.length"></nothing>
        <page-docs :count='count'></page-docs>
    </div>
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
import buttonDocs from '../general/buttonDocs.vue'
import tab from '../general/tabDocs.vue'
import pageDocs from '../general/pageDocs.vue'
import nothing from '../general/nothing.vue'
import DateFormat from '../utils/DateFormat.js'
import { GetFormatDate } from '../utils/date'
export default {
    components: {
        vSelect, vOption, datepicker, buttonDocs, tab, pageDocs,nothing
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
            state: 0,
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
            type: [],
            tablist: [{
                val: 0,
                text: "全部订单"
            }, {
                val: 1,
                text: "已入库"
            }, {
                val: 2,
                text: "待入库"
            }],
            orderlist: [],
            pagesize: 5,
            pageindex: 1,
            count: 0,
        }
    },
    ready(){
      this.query();
    },
    methods: {
        query() {
          let _this = this;
          let param = {
              pagesize: _this.pagesize,
              pageindex: _this.pageindex,
              state: _this.state
          };
          var loading=layer.load();
          Vue.http.get('/order/GetReturnOrders', param).then(function(res) {
            _this.orderlist=[];
            _this.count=1;
            layer.close(loading);
              if (res.data.ok) {
                  res.data.data.forEach(function(item) {
                      //时间转换
                      item.AddTime = DateFormat(item.AddTime);
                  })
                  _this.orderlist = res.data.data;
                  _this.count = Math.ceil(res.data.count / _this.pagesize);
              } else {
                  //layer.alert(res.data.mes);
              }
          }, function() {
              //error
              console.log('查询订单信息错误');
              layer.close(loading);
          })
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
