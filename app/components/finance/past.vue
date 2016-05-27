

<template id="">

<div class="right_contain" v-if="!showbalance">
    <div class="row">
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <div class="col-md-12 pd_l0 mg_t20 mg_b30 clearfix select_dropdown">
                <span class="pull-left mg_l10 mg_r10 f12 lineH26 mg_l20">账单时间</span>
                <div class="datepicker pull-left">
                    <datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
                    </datepicker>
                </div>
                <span class="pull-left mg_l10 mg_r10 f12 lineH26">至</span>
                <div class="datepicker pull-left">
                    <datepicker :value.sync="edate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
                    </datepicker>
                </div>
                <div class="dropdown pull-left mg_l30">
                    <v-select :value.sync="state" :options="states" :close-on-select="true" class='' placeholder="选择状态"></v-select>
                </div>
                <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
                <a href="#" class="red_btn f14 w100 h26 pull-left mg_l30">导出订单明细</a>
                <a href="#" class="btn_green f14 w70 h26 pull-left mg_l30">打&nbsp;印</a>
            </div>
            <table class="table table2 table_bg mg_t2" >
                <thead>
                    <tr>
                        <th width="15%">结算单编号</th>
                        <th width="12%">账单时间</th>
                        <th width="11%">应收金额</th>
                        <th width="11%">本期货款</th>
                        <th width="10%">佣金</th>
                        <th width="12%">结算状态</th>
                        <th width="12%">添加时间</th>
                        <th width="17%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in list">
                    <tr>
                        <td>{{item.BillCode}}</td>
                        <td>{{item.BeginDate}}至{{item.EndDate}}</td>
                        <td><em class="fS col_ee4145 f16">{{item.CurrBillAmount}}</em> </td>
                        <td><em class="fS col_ee4145 f16">{{item.ProductAmount}}</em> </td>
                        <td><em class="fS col_77b530 f16">{{item.Rebate}}</em> </td>
                        <td>{{BillStatus==9?"已结算":"待审核"}}</td>
                        <td>{{item.AddTime}}</td>
                        <td><a href="#" class="saas_add mg_l0" @click="show(item)">查看结算单</a>
                            <a href="#" class="saas_add mg_l20">查看账单</a></td>
                    </tr>
                </tbody>
            </table>
            <nothing v-if="!list.length"></nothing>
            <page-docs :count='count'></page-docs>
        </div>
    </div>
</div>
<balance :model="model" v-else></balance>

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
import {
    GetFormatDate
}
from '../utils/date'
import balance from './balance.vue'
import DateFormat from '../utils/DateFormat.js'
export default {
    components: {
        vSelect, datepicker, buttonDocs, pageDocs, nothing, balance
    },
    data() {
        return {
            sdate: GetFormatDate(1),
            edate: GetFormatDate(),
            states: [{
                value: '1',
                label: '待审核'
            }, {
                value: '2',
                label: '已结款'
            }],
            state: [],
            list: [],
            pagesize: 5,
            pageindex: 1,
            count: 0,
            model: {},
            showbalance: false
        }
    },
    ready() {
        this.query();
    },
    methods: {
        query() {
                let _this = this;
                let param = {
                    pagesize: _this.pagesize,
                    pageindex: _this.pageindex,
                    sdate: _this.sdate,
                    edate: _this.edate,
                    state: _this.state.length > 0 ? _this.state[0] : 0
                };
                Vue.http.get('/finance/GetBills', param).then(function(res) {
                    if (res.data.count) {
                        res.data.data.forEach(function(item) {
                            item.AddTime = DateFormat(item.AddTime);
                            item.BeginDate = DateFormat(item.BeginDate);
                            item.EndDate = DateFormat(item.EndDate);
                        })
                        _this.list = res.data.data;
                        _this.count = Math.ceil(res.data.count / _this.pagesize);
                    }else{
                        _this.list =[];
                        _this.count=0;
                    }

                })
            },
            show(item) {
                this.model = item;
                this.showbalance = true;
            }
    },
    events: {
        'page': function(index) {
            this.pageindex = index;
            this.query();
        }
    }
}

</script>
