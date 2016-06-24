

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

        <tab :data="tablist" :value="0"></tab>

        <div class="col-md-12 pd_l0 pd_r0 mg_r0 ">
            <table class="table table2 table_bg mg_t2" ms-if="list.length">
                <thead>
                    <tr>
                        <th width="48%">产品信息</th>
                        <th width="13%">北迈价</th>
                        <th width="13%">状态</th>
                        <th width="13%">添加时间</th>
                        <th width="13%">操作</th>
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
                                    <span class="pull-right col_010101 f12 h26">供应商编码：{{item.DealerNo}}</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <label class="control-label pull-left f12 poA l_l0 w60">配件说明：</label>
                                    <p class="pull-left mg_t2 f12 pd_l65 col_767676 ">{{item.ContentInfo}}{{item.SpecialNote}}</p>
                                </div>
                                <div class="col-md-12 pd_l0 clearfix mg_t5 select_dropdown">
                                    <label class="control-label pull-left f12 w60">零件编号：</label>
                                    <a href="#" class="saas_add pull-left f12 mg_l0" @click="skushow($index,1)">查看</a>
                                    <label class="control-label pull-left f12 w60 mg_l30">适用年款：</label>
                                    <a href="#" class="saas_add pull-left f12 mg_l0" @click="skushow($index,2)">查看</a>
                                </div>
                            </div>
                        </td>
                        <td><a href="#" class="saas_add mYH14 mg_l0" @click="skushow($index,3)">查看</a></td>
                        <td>
                            <span v-if="item.ProdStatus==1" class="col_000">待审核</span>
                            <span v-if="item.ProdStatus==2" class="col_ed5521">未通过</span>
                            <span v-if="item.ProdStatus==3" class="col_5ca50a">已通过</span>
                        </td>
                        <td><span class="f12 col_010101">{{item.AddTime}}</span></td>
                        <td>
                            <!-- <a href="#" class="saas_edi mg_t10">编辑</a> -->
                            <a href="#" class="saas_del mg_t10" @click="del($index)">删除</a>
                            <a href="#" class="saas_res mg_t10"  v-if="item.ProdStatus==2" @click="skushow($index,4)">查看原因</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nothing v-if="!list.length"></nothing>
        </div>
        <page-docs :count='count'></page-docs>
    </div>
</div>
<modalcar-docs title="查看年款" :list="modalist" :showmodal.sync="modalshow"></modalcar-docs>

<supplement-sku :show.sync="showsku" :list="model.SkuList" :bmno="model.BmNo"></supplement-sku>
<partsyearlist :show.sync="showyears" :list="model.SuitCarList" :bmno="model.BmNo" :showsupple="false"></partsyearlist>
<thirdpriceshow :show.sync="showthirdprices" :stockid="model.StockId" :thirdid="1001"></thirdpriceshow>
<content :show.sync="showcontent" title="审核未通过原因" :text="model.Remark"></content>
</template>

<script>

import vSelect from 'vue-strap/src/select'
import datepicker from 'vue-strap/src/datepicker'
import buttonDocs from '../general/buttonDocs.vue'
import pageDocs from '../general/pageDocs.vue'
import modalcarDocs from '../general/modalcarDocs.vue'
import tab from '../general/tabDocs.vue'
import nothing from '../general/nothing.vue'
import DateFormat from '../utils/DateFormat.js'
import {
    GetFormatDate
}
from '../utils/date'
import supplementSku from '../modal/supplementSku.vue';
import partsyearlist from '../modal/partsyearlist.vue';
import thirdpriceshow from '../modal/thirdpriceshow.vue';

import content from '../modal/content.vue'
export default {
    components: {
        vSelect, datepicker, buttonDocs, pageDocs, modalcarDocs, tab, nothing, supplementSku,partsyearlist,thirdpriceshow,content
    },
    data() {
        return {
            sdate: GetFormatDate(1),
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
            tablist: [{
                val: 0,
                text: "全部"
            }, {
                val: 1,
                text: "待审核"
            }, {
                val: 2,
                text: "未通过"
            }, {
                val: 3,
                text: "已通过"
            }],
            tab: 0,
            list: [],
            pagesize: 10,
            pageindex: 1,
            count: 0,
            modalshow: false,
            modalist: [],
            showsku: false,
            showyears: false,
            showthirdprices: false,
            showcontent: false,
            // skuList:[],
            // bmno: "",
            pindex: -1
        }
    },
    ready() {
        this.query();
    },
    computed: {
        model() {
            if ((!this.list.length) || this.pindex == -1) {
                return {};
            }
            return this.list[this.pindex];
        },
    },
    methods: {
        query() {
                let _this = this;
                let param = {
                    pageindex: _this.pageindex,
                    pagesize: _this.pagesize,
                    sdate: _this.sdate,
                    edate: _this.edate,
                    state: this.tab || 0,
                    type: _this.type.length ? _this.type[0] : 0,
                    key: _this.key,
                };
                Vue.http.get('/manage/GetProducts', param).then(function(response) {
                    let result = response.data;
                    if(result.ok){
                      result.data.forEach(function(item) {
                          item.AddTime = DateFormat(item.AddTime)
                              //异步获取年款和sku
                          Vue.http.get('/product/GetSuitCarAndSku?bmno=' + item.BmNo).then(function(response) {
                              if (response.data.ok) {
                                  item.SuitCarList = response.data.data;
                                  item.SkuList = response.data.data2;
                              }
                          }, function(err) {
                              console.log('获取适用性失败');
                          })
                      });
                      _this.list = result.data;
                      _this.count = Math.ceil(result.count / _this.pagesize);
                    }else{
                      _this.list=[];
                      _this.count=0;
                    }
                }, function(err) {
                    console.log('查询失败');
                })
            },
            del(index) {
                let _this = this;
                layer.confirm('确认删除吗', {
                    btn: ['确认', '取消'] //按钮
                }, function() {
                    Vue.http.post('/manage/Del?tid=1001&stockid=' + _this.list[index].StockId).then(function() {
                        _this.list.splice(index, 1);
                        layer.msg('删除成功', {
                            icon: 1,
                            time: 800
                        });
                    })
                }, function() {

                });
            },
            skushow(index, type) {
                this.pindex = index;
                switch (type) {
                    case 1:
                        this.showsku = true;
                        break;
                    case 2:
                        this.showyears = true;
                        break;
                    case 3:
                        this.showthirdprices=true;
                        break;
                    case 4:
                        this.showcontent=true;
                        break;
                    default:
                        break;
                }
            },
    },
    events: {
        'page': function(index) {
            this.pageindex = index;
            this.pindex=-1;
            this.query();
        },
        'tab': function(val) {
            this.tab = val;
            this.pageindex = 1;
            this.pindex=-1;
            this.query();
        }
    }
}

</script>
