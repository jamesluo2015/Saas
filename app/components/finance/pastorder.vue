

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
      <a href="#" class="red_btn f14 w100 h26 pull-left mg_l30" @click="exportExcel">导出退货单明细</a>
  </div>

  <table class="table table2 table_bg mg_t2 table3" v-for="item in orderlist">
      <thead>
          <tr>
              <th colspan="6" class="lineH30">
                  <span class="pull-left">{{item.AddTime}}</span>
                  <span class="mg_l40 col_010101 pull-left">供应商退货单号：{{item.DealerRoCode}}</span>
              </th>
          </tr>
          <tr>
              <td width="30%">配件信息</td>
              <td width="20%">订单号</td>
              <td width="11%">数量</td>
              <td width="13%">销售单价</td>
              <td width="13%" v-if="item.Details[0].SettleType==2">进价</td>
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
              <td width="20%">{{detail.SubOrderCode?detail.OrderCode+"-"+detail.SubOrderCode:detail.OrderCode}}</td>
              <td width="10%">{{detail.ReturnQuantity}}</td>
              <td width="15%" >{{detail.SalePrice}}<span class="col_5ca50a" v-if="detail.SettleType==1">(佣金比:{{(detail.DealerRatio||0.1)*100}}%)</span></td>
              <td v-if="detail.SettleType==2">{{detail.InPrice}}</td>
              <!-- <td v-if="stype==1"><span class="col_5ca50a">{{detail.DealerRatio}}<br>{{detail.DealerRebate}}</span></td> -->
          </tr>
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
      sdate:this.$parent.model.BeginDate, //GetFormatDate(1),
      edate: this.$parent.model.EndDate,//GetFormatDate(),
      key: "",
      orderlist:[],
      pagesize:10,
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
          state: 0,
          type: 2,
          key: _this.key,
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
    },
    exportExcel(){
      window.location.href=`/finance/ExportPast?sdate=${this.sdate}&edate=${this.edate}&state=0&type=2&key=${this.key}`;
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
