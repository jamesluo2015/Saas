

<template id="">

<div class="right_contain1">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 clearfix pd_b20 bdB_d0d0d0">
            <span class="mg_l30">结算单编码：123456</span>
            <span class="mg_l30">结算周期：2016-01-01&nbsp;至&nbsp;2016-01-31</span>
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
                        <th width="10%">付款方式</th>
                        <th width="11%">下单时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>6102415245322156</td>
                        <td>广州本田 思迪 1.3L 五档自动（2006-2008） 空气滤芯</td>
                        <td>1</td>
                        <td><em class="fS col_ee4145 f16">200.00</em> </td>
                        <td><span class="col_5ca50a">10%<br>20.00</span></td>
                        <td>在线支付</td>
                        <td><span class="col_767676">2016-04-01<br>16:00:00</span></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>6102415245322156</td>
                        <td>广州本田 思迪 1.3L 五档自动（2006-2008） 空气滤芯</td>
                        <td>1</td>
                        <td><em class="fS col_ee4145 f16">200.00</em> </td>
                        <td><span class="col_5ca50a">10%<br>20.00</span></td>
                        <td>在线支付</td>
                        <td><span class="col_767676">2016-04-01<br>16:00:00</span></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>6102415245322156</td>
                        <td>广州本田 思迪 1.3L 五档自动（2006-2008） 空气滤芯</td>
                        <td>1</td>
                        <td><em class="fS col_ee4145 f16">200.00</em> </td>
                        <td><span class="col_5ca50a">10%<br>20.00</span></td>
                        <td>在线支付</td>
                        <td><span class="col_767676">2016-04-01<br>16:00:00</span></td>
                    </tr>
                </tbody>

            </table>
            <page-docs :count='count'></page-docs>
        </div>
    </div>

</div>

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
import tab from '../general/tabDocs.vue'
import pageDocs from '../general/pageDocs.vue'
export default {
    components: {
        vSelect, datepicker, buttonDocs,tab
    },
    data() {
        return {
            sdate: GetFormatDate(),
            edate: GetFormatDate(),
            key: "",
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
        'page': function(index) {
          this.pageindex=index;
          this.query();
        },
        'tab':function(val){

          this.tab=ind
        }
    }
}

</script>
