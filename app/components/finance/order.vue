

<template id="">

  <div class="col-md-12 pd_l0 mg_t30 mg_b30 clearfix select_dropdown">
      <span class="pull-left mg_l10 mg_r10 f12 lineH26 mg_l20">下单时间</span>
      <div class="datepicker pull-left">
          <datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
          </datepicker>
      </div>
      <span class="pull-left mg_l10 mg_r10 f12 lineH26">至</span>
      <div class="datepicker pull-left">
          <datepicker :value.sync="edate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
          </datepicker>
      </div>
      <span class="pull-left mg_l10 f12 lineH26 mg_l30">订单号：</span>
      <input placeholder="" v-model="key" class="add_input w160 pull-left form-control" type="text">
      <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
      <a href="#" class="red_btn f14 w100 h26 pull-left mg_l30" @click="exportExcel">导出订单明细</a>
  </div>

  <table class="table table2 table_bg mg_t2" v-if="orderlist.length" v-for="(index,item) in orderlist">
      <thead>
          <tr>
              <th colspan="6" class="lineH30">
                  <span class="pull-left col_999999">{{item.AddTime}}</span>
                  <span class="mg_l40 col_010101 pull-left">来源单号：{{item.SourceOrderId}}</span>
                  <span class="mg_l40 col_010101 pull-left">订单号：{{item.OrderCode}}</span>
                  <img :src="'/content/images/third'+item.SourceId+'.png'" class="pull-right mg_r10">
              </th>
          </tr>
          <tr>
              <td width="30%">配件名称</td>
              <td width="20%">供应商编码</td>
              <td width="11%">数量</td>
              <td width="13%">销售单价</td>
              <td width="13%" v-if="item.SettleType==2">进价</td>
              <td width="13%" class="t-c">运费</td>
          </tr>
      </thead>
      <tbody >
        <template v-for="(dindex,detail) in item.OrderDetails">
          <tr v-if="!dindex">
            <tr>
                <td>{{(detail.FactoryName||"")+" "+(detail.CarModelName||"")+" "+(detail.CarYearName||"")}} {{detail.ProdName}}</td>
                <td>{{detail.DealerProdNo}}</td>
                <td>{{detail.Quantity}}</td>
                <td><em class="fS col_ee4145 f16">{{detail.SalePrice}}<span class="col_5ca50a" v-if="item.SettleType==1">(佣金比:{{(detail.DealerRatio||0.1)*100}}%)</span></em></td>
                <td v-if="item.SettleType==2">{{detail.InPrice}}</span></td>
                <td v-if="!dindex" rowspan="2" class="t-c">{{item.Freight}}</td>
            </tr>
          </tr>
        </template>
      </tbody>
  </table>
  <nothing v-if="!orderlist.length"></nothing>
  <page-docs :count='count'></page-docs>
</template>

<script>
import {
    select as vSelect
}
from 'vue-strap'
import {
    datepicker
}
from 'vue-strap'
import buttonDocs from '../general/buttonDocs.vue'
import pageDocs from '../general/pageDocs.vue'
import nothing from '../general/nothing.vue'
import DateFormat from '../utils/DateFormat.js'
import { GetFormatDate } from '../utils/date'
export default{
  components:{  vSelect, datepicker, buttonDocs,pageDocs,nothing},
  data(){
    return{
      sdate: this.$parent.model.BeginDate,
      edate: this.$parent.model.EndDate,
      key: "",
      orderlist:[],
      pagesize:3,
      pageindex:1,
      count:0,
      stype: document.getElementById('user').getAttribute('stype')
    }
  },
  ready(){
    this.query();
  },
  methods:{
    query(){
      let _this = this;
      let param = {
          pagesize: _this.pagesize,
          pageindex: _this.pageindex,
          sdate: _this.sdate,
          edate:_this.edate,
          order: _this.key,
      };
      var loading=layer.load();
      Vue.http.get('/finance/GetOrderDetails', param).then(function(res) {
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
    },
    exportExcel(){
      window.location.href=`/finance/ExportOrders?isreturn=false&sdate=${this.sdate}&edate=${this.edate}&order=${this.key}`;
    }
  },
  events:{
    'page': function(val){
      this.pageindex=val;
      this.query();
    }
  }
}

</script>
