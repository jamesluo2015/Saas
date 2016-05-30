

<template>

<div class="right_contain">
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
            <a href="#" class="btn_green f14 w70 h26 pull-left mg_l30">开&nbsp;单</a>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_r0 bdT_d0d0d0">
            <table class="table table2 table_bg mg_t2 mg_b0">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="pull-left">2016-01-01&nbsp;19:00:00</span>
                            <span class="mg_l40 col_010101 pull-left">单号：1234567890</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="poR" width="40%">
                            <img src="../../images/logo.png" class="saas_table_img">
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">迈氏 后刹车盘</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：6QD615601A</p>
                                    <p class="col_767676">供应商编码：86637-B8000</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x1</td>
                        <td width="15%">单价：29.00</td>
                        <td width="15%" rowspan="2" class="bd_lD_d9 t-c">
                            <span>总金额</span>
                            <br>
                            <span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">20.00</em>
                        </td>
                        <td width="15%" rowspan="2" class="bd_lD_d9 t-c"><a href="#" class="saas_add mg_l0">查看备注</a></td>
                    </tr>
                    <tr>
                        <td class="poR" width="40%">
                            <img src="../../images/logo.png" class="saas_table_img">
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">迈氏 后刹车盘</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：6QD615601A</p>
                                    <p class="col_767676">供应商编码：86637-B8000</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x1</td>
                        <td width="15%">单价：29.00</td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="pull-left">2016-01-01&nbsp;19:00:00</span>
                            <span class="mg_l40 col_010101 pull-left">单号：1234567890</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="poR" width="40%">
                            <img src="../../images/logo.png" class="saas_table_img">
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">迈氏 后刹车盘</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：6QD615601A</p>
                                    <p class="col_767676">供应商编码：86637-B8000</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x1</td>
                        <td width="15%">单价：29.00</td>
                        <td width="15%" class="bd_lD_d9 t-c">
                            <span>总金额</span>
                            <br>
                            <span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">20.00</em>
                        </td>
                        <td width="15%" class="bd_lD_d9 t-c"><a href="#" class="saas_add mg_l0">查看备注</a></td>
                    </tr>
                </tbody>

            </table>
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
    option as vOption
}
from 'vue-strap'
import {
    datepicker
}
from 'vue-strap'
import buttonDocs from '../general/buttonDocs.vue'
import { GetFormatDate } from '../utils/date'
export default {
    components: {vSelect,vOption,datepicker,buttonDocs},
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
        }
    },
    methods: {
        query() {

        }
    }
}

</script>
