<style media="screen" scope>

.content {
    margin: 20px;
    word-wrap: break-woard;
}

</style>

<template>
<outstocklist v-ref:list v-if="dealernoshow"></outstocklist>
<div class="right_contain">
    <div class="row">
        <template v-if="dealernoshow">
            <tab-docs :data="tablist" :value="tab"></tab-docs>
            <outstockbyno v-if="tab==1"></outstockbyno>
            <outstockbysuit v-else></outstockbysuit>
        </template>
        <template v-else>
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
                    <tbody>
                        <tr v-for="(index,detail) in item.DetailList">
                            <td class="poR" width="40%">
                                <img v-if='detail.SmallPic' :src="detail.SmallPic" class="saas_table_img">
                                <img v-else src="../../images/noimg.png" class="saas_table_img" />
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
            <nothing v-if="!list.length"></nothing>
            <content :show.sync="showmodal" title="开单备注" :text="content"></content>
        </template>
    </div>
</div>

</template>

<script>

import vSelect from 'vue-strap/src/select'
import datepicker from 'vue-strap/src/datepicker'
import buttonDocs from '../general/buttonDocs.vue'
import {
    GetFormatDate
}
from '../utils/date'
import DateFormat from '../utils/DateFormat.js'
import pageDocs from '../general/pageDocs.vue'
import nothing from '../general/nothing.vue'
import modal from 'vue-strap/src/modal'
import content from '../modal/content.vue'
import tabDocs from '../general/tabDocs.vue'
import outstockbyno from './outstockbyno.vue'
import outstockbysuit from './outstockbysuit.vue'
import outstocklist from './outstocklist.vue'
export default {
    components: {
        vSelect, datepicker, buttonDocs, pageDocs, modal, nothing, content, tabDocs, outstockbyno, outstockbysuit, outstocklist
    },
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
            tablist: [{
                val: 1,
                text: "通过供应商编码找商品"
            }, {
                val: 2,
                text: "通过车型适用性找商品"
            }],
            tab: 1,
            type: [],
            key: "",
            list: [],
            pageindex: 1,
            pagesize: 5,
            count: 0,
            showmodal: false,
            content: "",
            dealernoshow: false,

        }
    },
    ready() {
        this.query();
    },
    methods: {
        query() {
                let _this = this;
                let param = {
                    pageindex: this.pageindex,
                    pagesize: this.pagesize,
                    sdate: this.sdate,
                    edate: this.edate,
                    type: this.type.length ? this.type[0] : 0,
                    key: this.key
                }
                Vue.http.get('/stock/GetStockBill', param).then(function(res) {
                    if (res.data.ok && res.data.count) {
                        res.data.data.forEach(function(item) {
                            item.AddTime = DateFormat(item.AddTime);
                        })
                        _this.list = res.data.data;
                        setTimeout(function() {
                            _this.count = Math.ceil(res.data.count / _this.pagesize);
                        }, 0)
                    } else {
                        _this.list = [];
                        _this.count = 0;
                    }
                })
            },
            showcontent(memo) {
                this.content = memo;
                this.showmodal = true;
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
            this.tab = val;
        },
        'add': function(model){
          this.$refs.list.add(model);
        }
    }
}

</script>
