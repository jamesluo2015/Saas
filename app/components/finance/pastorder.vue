

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
      <a href="#" class="red_btn f14 w100 h26 pull-left mg_l30">导出订单明细</a>
  </div>
  <table class="table table2 table_bg mg_t2">
      <thead>
          <tr>
              <th width="17%">订单号</th>
              <th width="34%">配件名称</th>
              <th width="10%">商品数量</th>
              <th width="10%">商品金额</th>
              <th width="8%">佣金</th>
              <!-- <th width="10%">付款方式</th> -->
              <th width="11%">下单时间</th>
          </tr>
      </thead>

      <tbody v-for="item in orderlist">
          <tr>
              <td>{{item.OrderCode}}</td>
              <td>{{(item.FactoryName||"")+" "+(item.CarModelName||"")+" "+(CarYearName||"")}} {{item.ProdName}}</td>
              <td>{{item.ReturnQuantity}}</td>
              <td><em class="fS col_ee4145 f16">{{item.SalePrice}}</em> </td>
              <td><span class="col_5ca50a">{{(item.DealerRatio||0.1)*100}}%<br>{{item.DealerRebate}}</span></td>
              <!-- <td>{{item.Memo}}</td> -->
              <td><span class="col_767676">{{item.AddTime}}</span></td>
          </tr>
      </tbody>
  </table>
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
import DateFormat from '../utils/DateFormat.js'
export default{
  components:{  vSelect, datepicker, buttonDocs,pageDocs},
  data(){
    return{
      sdate: GetFormatDate(1),
      edate: GetFormatDate(),
      key: "",
      orderlist:[],
      pagesize:10,
      pageindex:1,
      count:0
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
      Vue.http.get('/finance/GetPastOrders', param).then(function(res) {
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
  events:{
    'page': function(val){
      this.pageindex=val;
      this.query();
    }
  }
}

</script>
