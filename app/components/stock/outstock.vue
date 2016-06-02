<style media="screen" scope>
  .content{
    margin: 20px;
    word-wrap: break-woard;
  }
</style>

<template>
<outbydealerno v-if="dealernoshow"></outbydealerno>
<div class="right_contain" v-if="!dealernoshow">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown min-w1200">
            <span class="pull-left mg_l10 mg_r10 lineH26 mg_l20">开单时间</span>
            <datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
            </datepicker>
            <span class="pull-left mg_l10 mg_r10 f12 lineH26">至</span>
            <datepicker :value.sync="edate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
            </datepicker>
            <div class="dropdown pull-left mg_l20">
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" class='' placeholder="选择条件"></v-select>
            </div>
            <input placeholder="" v-model="key" class="add_input w160 pull-left form-control mg_l20" type="text">
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
            <a href="#" class="btn_green f14 w70 h26 pull-left mg_l30" @click="dealernoshow=true">开&nbsp;单</a>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_r0" v-for="(index,item) in list">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="pull-left">{{item.AddTime}}</span>
                            <span class="mg_l40 col_010101 pull-left">单号：{{item.BillCode}}</span>
                        </th>
                    </tr>
                </thead>
                <tbody >
                    <tr v-for="(index,detail) in item.DetailList">
                        <td class="poR" width="40%">
                          <img v-if='detail.SmallPic' :src="detail.SmallPic" class="saas_table_img">
                          <img v-else src="../../images/noimg.png" class="saas_table_img"/>
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">{{(detail.ProdBrandName || "") +" "+detail.ProdName}}</span>
                                </div>
                                <div class="col-md-12 pd_l0  clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：{{detail.StockId}}</p>
                                    <p class="col_767676 mg_b0">供应商编码：{{detail.DealerProdNo}}</p>
                                    <p class="col_767676 mg_b0">开单说明：{{detail.Memo}}</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x{{detail.Quantity}}</td>
                        <td width="15%">单价：{{detail.SalePrice}}</td>
                        <td width="15%" class="bd_lD_d9 t-c" v-if="!index" :rowspan="item.DetailList.length">
                            <span>总金额</span>
                            <br>
                            <span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">{{item.Total}}</em>
                        </td>
                        <td v-if="!index" :rowspan="item.DetailList.length" width="15%" class="bd_lD_d9 t-c">
                          <a href="#" class="saas_add mg_l0" @click="showcontent(item.Memo)">查看备注</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <page-docs :count="count"></page-docs>

        <modal :show.sync="showmodal" effect="fade" width="400px" title="开单备注">
          <div slot="modal-body" class="modal-body">
            <p class="content">
              {{content}}
            </p>
          </div>
        </modal>
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
import { GetFormatDate } from '../utils/date'
import DateFormat from '../utils/DateFormat.js'
import pageDocs from '../general/pageDocs.vue'
import {modal} from 'vue-strap'
import outbydealerno from './outbydealerno.vue'
export default {
    components: {vSelect,vOption,datepicker,buttonDocs,pageDocs,modal,outbydealerno,},
    data() {
        return {
          sdate: GetFormatDate(1),
          edate: GetFormatDate(),
          typelist: [{
              value: '1',
              label: '商品名称'
          }, {
              value: '2',
              label: '供应商编码'
          }],
          type: [],
          key : "",
          list:[],
          pageindex: 1,
          pagesize: 3,
          count: 0,
          showmodal: false,
          content: "",
          dealernoshow: false,
        }
    },
    ready(){
      this.query();
    },
    methods: {
        query() {
          let _this=this;
          let param={
            pageindex: this.pageindex,
            pagesize: this.pagesize,
            sdate: this.sdate,
            edate: this.edate,
            type: this.type.length?this.type[0]:0,
            key: this.key
          }
          Vue.http.get('/stock/GetStockBill',param).then(function(res){
            if(res.data.ok){
              res.data.data.forEach(function(item){
                item.AddTime=DateFormat(item.AddTime);
              })
              _this.list=res.data.data;
              setTimeout(function(){
                _this.count=Math.ceil( res.data.count / _this.pagesize );
              },0)
            }else{
              _this.list=[];
              _this.count=0;
            }
          })
        },
        showcontent(memo){
          this.content=memo;
          this.showmodal=true;
        }
    },
    events:{
      'page':function(index){
        this.pageindex=index;
        this.query();
      },
    }
}

</script>
