

<template id="">

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left mg_l30">
            </datepicker>

            <span class="pull-left mg_l10 mg_r10 f12 lineH26">至</span>

            <datepicker :value.sync="edate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
            </datepicker>

            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" class='' placeholder="选择条件"></v-select>
            </div>
            <input placeholder="请输入关键字" class="add_input w160 pull-left form-control mg_l30" type="text" v-model='key'>
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
        </div>

        <div class="col-md-12 pd_l0 pd_r0 mg_r0 bdT_d0d0d0">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th width="55%">产品信息</th>
                        <th width="15%">京东价</th>
                        <th width="15%">添加时间</th>
                        <th width="15%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in list">
                    <tr>
                        <td class="poR">
                          <img v-if="item.Imglist&&item.Imglist.length" :src="item.Imglist[0].ImgUrl" class="saas_table_img">
                          <img v-else src="../../images/noimg.png" class="saas_table_img">
                            <div class="table_detail">
                              <div class="clearfix">
                                  <span class="pull-left col_010101 fB">{{item.ProdBrandName}} {{item.StandardName}}</span>
                                  <span class="pull-right col_010101 f12">供应商编码：{{item.DealerNo}}</span>
                              </div>
                              <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                  <label class="control-label pull-left f12 poA l_l0 w60">配件说明：</label>
                                  <p class="pull-left mg_t2 f12 pd_l65 col_767676">{{item.ContentInfo}}{{item.SpecialNote}}</p>
                              </div>
                              <div class="col-md-12 pd_l0 clearfix mg_t5 select_dropdown">
                                  <label class="control-label pull-left f12 w60">零件编号：</label>
                                  <a href="#" class="saas_add pull-left f12 mg_l0">查看</a>
                                  <label class="control-label pull-left f12 w60 mg_l30">适用年款：</label>
                                  <a href="#" class="saas_add pull-left f12 mg_l0" @click="getsuitcars(item.BmNo)">查看</a>
                              </div>
                          </div>
                        </td>
                        <td><a href="#" class="saas_add mYH14 mg_l0">查看</a></td>
                        <td><span class="f12 col_010101">{{item.AddTime}}</span></td>
                        <td><a href="#" class="saas_edi mg_t10">编辑</a><a href="#" class="saas_del mg_t10">删除</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <page-docs :count='count'></page-docs>
    </div>
</div>

<modalcar-docs title="查看年款" :list="modalist" :showmodal.sync="modalshow"></modalcar-docs>

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
import pageDocs from '../general/pageDocs.vue'
import modalcarDocs from '../general/modalcarDocs.vue'
import DateFormat from '../utils/DateFormat.js'
import convert from '../utils/convert.js'
export default {
    components: {
        vSelect, vOption, datepicker, buttonDocs,pageDocs,modalcarDocs
    },
    data() {
        return {
            sdate: GetFormatDate(),
            edate: GetFormatDate(),
            typelist: [{
                value: '1',
                label: '零件编号'
            }, {
                value: '2',
                label: '供应商编码'
            }, {
                value: '3',
                label: '配件名称'
            }],
            type: [],
            key: "",
            list: [],
            pagesize: 10,
            pageindex: 1,
            count: 0,
            modalshow:false,
            modalist: []
        }
    },
    methods: {
        query() {
            let _this = this;
            let param = {
                pageindex: _this.pageindex,
                pagesize: _this.pagesize,
                sdate: _this.sdate,
                edate: _this.edate,
                state: this.state || 0,
                type: _this.type.length ? _this.type[0] : 0,
                key: _this.key,
            };
            Vue.http.get('/manage/GetProducts', param).then(function(response) {
                let result=response.data;
                result.data.forEach(function(item) {
                    item.AddTime = DateFormat(item.AddTime)
                });
                _this.list = result.data;
                _this.count = Math.ceil(result.count / _this.pagesize);
            }, function(err) {
                console.log('查询失败');
            })
        },
        getsuitcars(bmno) {
              let _this = this;
              Vue.http.get('/product/GetSuitByBmNo?bmno=' + bmno).then(function(response) {
                  let suitcars = response.data;
                  _this.modalist = convert(suitcars);
                  _this.modalshow = true;
              }, function(err) {
                  console.log('获取适用性失败');
              })
          },
    },
    events:{
      'page': function(index) {
          this.pageindex = index;
          this.query();
      },
    }
}

</script>
