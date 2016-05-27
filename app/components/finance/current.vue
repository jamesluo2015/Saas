

<template id="">

<div class="right_contain1">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 clearfix pd_b20 bdB_d0d0d0">
            <span class="mg_l30">结算单编码：123456</span>
            <span class="mg_l30">结算周期：{{sdate}}&nbsp;至&nbsp;{{edate}}</span>
            <a href="#" class="saas_add">查看结算单</a>
        </div>
        <div class="col-md-12 pd_l0 mg_t30 mg_b20 clearfix pd_b20 h60 this_bill">
            <span class="mg_l30">应收款项：</span>
            <span class="f26 col_d50707">3800.00</span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">=</span>
            <span class="f26 col_d50707"><em class="fS">4500.00</em><em class="col_010101 fS fN f14">【货款】</em></span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">-</span>
            <span class="f26 col_77b530"><em class="fS">500.00</em><em class="col_010101 fS fN f14">【佣金】</em></span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">-</span>
            <span class="f26 col_77b530"><em class="fS">100.00</em><em class="col_010101 fS fN f14">【代付运费】</em></span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">-</span>
            <span class="f26 col_77b530"><em class="fS">100.00</em><em class="col_010101 fS fN f14">【其它】</em></span>
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

<script>
import tab from '../general/tabDocs.vue'
import order from './order.vue'
import pastorder from './pastorder.vue'
export default {
    components: {
        tab,order,pastorder
    },
    data() {
        return {
          sdate: GetFormatDate(1),
          edate: GetFormatDate(),
            tablist:[{
                text: "订单",
                val: 0
            }, {
                text: "退货单",
                val: 1
            }],
            tab:0
        }
    },
    methods: {
        query() {

        }
    },
    events: {
        'tab':function(val){
          this.tab=val;
        }
    }
}

</script>
