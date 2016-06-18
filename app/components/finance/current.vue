

<template id="">

<template v-if="!showbalance">

    <div class="right_contain1">
        <div class="row">
            <div class="col-md-12 pd_l0 mg_t10 clearfix pd_b20 bdB_d0d0d0">
                <!-- <span class="mg_l30">结算单编码：123456</span> -->
                <span class="mg_l30">结算周期：{{model.BeginDate}}&nbsp;至&nbsp;{{model.EndDate}}</span>
                <a href="#" class="saas_add" @click="showbalance=true">查看结算单</a>
            </div>
            <div class="col-md-12 pd_l0 mg_t30 mg_b20 clearfix pd_b20 h60 this_bill">
                <span class="mg_l30">应收款项：</span>
                <template v-if="model.Id">
                  <span class="f26 col_d50707">{{ model.BillAmount }}</span>
                    <span class="f20 fB fS col_767676 mg_l5 mg_r5">=</span>
                    <span class="f26 col_d50707" ><em class="fS">{{ model.CurrBillAmount }}</em><em class="col_010101 fS fN f14">【本期金额】</em></span>
                    <span class="f20 fB fS col_767676 mg_l5 mg_r5">+</span>
                    <span class="f26 col_d50707" ><em class="fS">{{ model.PrevBillAmount }}</em><em class="col_010101 fS fN f14">【上期结余】</em></span>
                </template>
                <template v-else>
                  <span class="f26 col_d50707">{{ model.BillAmount }}</span>
                  <template v-if="model.BillAmount">
                    <span class="f20 fB fS col_767676 mg_l5 mg_r5">=</span>
                    <span class="f26 col_d50707" v-if="model.ProductAmount"><em class="fS">{{ model.ProductAmount }}</em><em class="col_010101 fS fN f14">【货款】</em></span>
                    <span class="f20 fB fS col_767676 mg_l5 mg_r5" v-if="model.Rebate">-</span>
                    <span class="f26 col_77b530" v-if="model.Rebate"><em class="fS">{{ model.Rebate }}</em><em class="col_010101 fS fN f14">【佣金】</em></span>
                    <span class="f20 fB fS col_767676 mg_l5 mg_r5" v-if="model.Freight">-</span>
                    <span class="f26 col_77b530" v-if="model.Freight"><em class="fS">{{ model.Freight }}</em><em class="col_010101 fS fN f14">【代付运费】</em></span>
                    <span class="f20 fB fS col_767676 mg_l5 mg_r5" v-if="model.AdjustmentAmount">-</span>
                    <span class="f26 col_77b530" v-if="model.AdjustmentAmount"><em class="fS">{{ model.AdjustmentAmount }}</em><em class="col_010101 fS fN f14">【退款】</em></span>
                  </template>
                </template>



            </div>
        </div>
    </div>

    <div class="right_contain1 mg_t15 mg_b20">
        <div class="row">
            <div class="col-md-12 pd_l0 pd_r0 mg_r0">
                <tab :data="tablist" :value="0"></tab>
                <order v-if="!tab"></order>
                <pastorder v-else></pastorder>
            </div>
        </div>

    </div>

</template>
<balance :model="model" v-else></balance>

</template>

<script>

import tab from '../general/tabDocs.vue'
import order from './order.vue'
import pastorder from './pastorder.vue'
import date from '../utils/date'
import balance from './balance.vue'
import DateFormat from '../utils/DateFormat.js'
export default {
    components: {
        tab, order, pastorder, balance
    },
    props:{
      model:{
        type:Object,
        default()  {
         return  {
            BeginDate: date.getCurrentMonthFirst(),
            EndDate:  date.getCurrentMonthLast(),
          }
        }
      }
    },
    data() {
        return {
            sdate: date.GetFormatDate(1),
            edate: date.GetFormatDate(),
            tablist: [{
                text: "订单",
                val: 0
            }, {
                text: "退货单",
                val: 1
            }],
            tab: 0,
            list: [],
            //model: {},
            showbalance: false
        }
    },
    ready() {
        let _this = this;
        if (!this.model.BillStatus) {
            Vue.http.get('/finance/GetCurrent').then(function(res) {
                _this.list = res.data;
                _this.model = {
                    BillStatus: 0,
                    BeginDate: date.getCurrentMonthFirst(),
                    EndDate: date.getCurrentMonthLast(),
                    BillAmount: _this.list[0],
                    ProductAmount: _this.list[1],
                    Rebate: _this.list[2],
                    Freight: _this.list[3],
                    AdjustmentAmount: _this.list[4],
                    SourceName: document.getElementById('dealername').textContent
                }
            })
        }else{
          this.sdate=this.model.BeginDate;
          this.edate=this.model.EndDate;
          // this.$children[0].sdate=this.sdate;
          // this.$children[0].edate=this.edate;
          // this.$children[0].query();
        }
    },
    computed: {

    },
    methods: {
        query() {

        }
    },
    events: {
        'tab': function(val) {
            this.tab = val;
        }
    }
}

</script>
