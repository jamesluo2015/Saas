

<template id="">

<div class="right_contain1">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="house" :options="houses" :close-on-select="true" placeholder="选择库房"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="slot" :options="slots" :close-on-select="true" placeholder="选择货位"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" placeholder="选择条件"></v-select>
            </div>
            <input placeholder="" v-model="key" class="add_input w140 pull-left form-control mg_l30" type="text">
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
        </div>
        <div class="col-md-12 pd_l0 bg10 h40 bdT_d0d0d0">
            <ul class="clearfix">
                <li class="t-c w_33 pull-left">商品总数量</li>
                <li class="t-c w_33 pull-left">正品数量</li>
                <li class="t-c w_33 pull-left">残品数量</li>
            </ul>
        </div>
        <ul class="col-md-12 pd_l0 clearfix mg_t30">
            <li class="t-c w_33 pull-left f26">{{countlist[0]}}</li>
            <li class="t-c w_33 pull-left f26">{{countlist[1]}}</li>
            <li class="t-c w_33 pull-left f26">{{countlist[2]}}</li>
        </ul>
        <div class="col-md-12 pd_l0">
            <a href="#" class="btn_green f14 w160 h30 auto mg_t20 mg_b20" @click="showin=true">入&nbsp;库</a>
        </div>
    </div>
</div>

<div class="right_contain1 mg_t15 mg_b20 pd_t0" v-if="list.length">
    <div class="row">
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th width="15%">商品名称</th>
                        <th width="12%">实物ID</th>
                        <th width="11%">品相</th>
                        <th width="11%">数量</th>
                        <th width="11%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in list">
                    <tr>
                        <td>{{item.ProdName}}</td>
                        <td>{{item.StockId}}</td>
                        <td>{{item.ProdType?"残品":"正品"}}</td>
                        <td>{{item.StockCount}}</td>
                        <td><a href="#" class="saas_add mg_l0" @click="slotmanage($index)">货位管理</a></td>
                    </tr>
                </tbody>
            </table>
            <page-docs :count="count"></page-docs>
        </div>
    </div>
</div>
<!--入库-->
<modal :show.sync="showin" effect="fade" width="360px">
    <div slot="modal-header" class="modal-header">
        <button type="button" class="close" @click='showin = false'><span>×</span></button>
        <h4 class="modal-title">商品入库</h4>
    </div>
    <div slot="modal-body" class="modal-body">
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">标准名称：</label>
            <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="标准名称"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">供应商编码：</label>
            <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="供应商"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">选择库区：</label>
            <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">选择库房：</label>
            <v-select :value.sync="house" :options="houses" :close-on-select="true" placeholder="选择库房"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">选择货位：</label>
            <v-select :value.sync="slot" :options="slots" :close-on-select="true" placeholder="选择货位"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">入库数量：</label>
            <input placeholder="" v-model="quantity" class="add_input w170 pull-left form-control" type="text">
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">品相：</label>
            <radio :value.sync="model.GroupID" :options="radios" left="mg_l20"></radio>
        </div>
        <div class="col-md-12 mg_t20 mg_b20 clearfix">
            <a href="#" class="btn_red bg8 mg_t20 auto w120 h26" @click="instore">确&nbsp;定</a>
        </div>
    </div>
</modal>
<!--货位管理-->
<modal :show.sync="showslot" effect="fade" width="520px">
    <div slot="modal-header" class="modal-header">
        <button type="button" class="close" @click='showslot = false'><span>×</span></button>
        <h4 class="modal-title">货位管理</h4>
    </div>
    <div slot="modal-body" class="modal-body">
        <table class="table table2 table_bg mg_t10 mg_b30">
            <thead>
                <tr>
                    <th width="25%">实物ID</th>
                    <th width="25%">商品名称</th>
                    <th width="20%">货位</th>
                    <th width="15%">品相</th>
                    <th width="15%">数量</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{model.StockId}}</td>
                    <td>{{model.ProdName}}</td>
                    <td>{{model.AreaCode}}-{{model.StoreCode}}-{{model.SlotCode}}</td>
                    <td>{{model.ProdType?"残品":"正品"}}</td>
                    <td>{{model.StockCount}}</td>
                </tr>
            </tbody>
        </table>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15 " style="margin-left: 65px;">
            <label class="control-label pull-left f12 lineH20">新货位：</label>
            <div class="dropdown pull-left">
                <v-select :value.sync="slotcode" :options="slotcodelist" :close-on-select="true" placeholder="选择货位"></select>
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15 "  style="margin-left: 65px;">
            <label class="control-label pull-left f12 lineH20">数量：</label>
            <input placeholder="" v-model="slotcount" class="add_input w170 pull-left form-control" type="text">
        </div>
        <div class="col-md-12 mg_t20  clearfix">
            <a href="#" class="btn_red bg8 mg_t20 auto w120 h26" :class="{'disable':!slotvalid}" @click="changeslot">确&nbsp;定</a>
        </div>
    </div>
</modal>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
import {
    modal
}
from 'vue-strap'
import pageDocs from '../general/pageDocs.vue'
import radio from '../general/radioDocs.vue'
import buttonDocs from '../general/buttonDocs.vue'
export default {
    components: {
        vSelect, buttonDocs, pageDocs, modal, radio
    },
    data() {
        return {
            //areas: [],
            area: [],
            //houses: [],
            house: [],
            //slots: [],
            slot: [],
            typelist: [{
                value: '1',
                label: '商品名称'
            }, {
                value: '2',
                label: '实物ID'
            }],
            type: [],
            key: "",
            selectlist: [],
            list: [],
            countlist: [0, 0, 0],
            pagesize: 5,
            pageindex: 1,
            count: 0,
            showin: false,
            radios: [{
                text: '正品',
                val: 1
            }, {
                text: '残品',
                val: 2
            }],
            showslot: false,
            slotcode: "",
            clotcount: 0,
            model: {},

        }
    },
    computed: {
        areas() {
                let arr = [{
                    label: "全部库区",
                    value: "0"
                }];
                this.selectlist.forEach(function(item) {
                    if (item.level == 1) {
                        arr.push({
                            label: item.label,
                            value: item.value
                        })
                    }
                });
                return arr;
            },
            houses() {
                let arr = [{
                    label: "全部库房",
                    value: "0"
                }];
                let _this = this;
                if (this.area.length) {
                    this.selectlist.forEach(function(item) {
                        if (item.level == 2 && item.pid == _this.area[0]) {
                            arr.push({
                                label: item.label,
                                value: item.value
                            })
                        }
                    })
                }
                return arr;
            },
            slots() {
                let arr = [{
                    label: "全部库位",
                    value: "0"
                }];
                let _this = this;
                if (this.house.length) {
                    this.selectlist.forEach(function(item) {
                        if (item.level == 3 && item.pid == _this.house[0]) {
                            arr.push({
                                label: item.label,
                                value: item.value
                            })
                        }
                    })
                }
                return arr;
            },
            slotcodelist(){
              let arr = [];
              let _this = this;
              this.selectlist.forEach(function(item) {
                  if (item.level == 3 ) {
                      arr.push({
                          label: item.code,
                          value: item.value
                      })
                  }
              })
              return arr;
            },
            slotvalid(){
              if(!this.slotcount || isNaN(this.slotcount)){
                return false;
              }else if(this.slotcount>this.model.StockCount){
                return false
              }
              if(!this.slotcode.length){
                return false;
              }
              return true;
            }
    },
    ready() {
        this.query();
        let _this = this;
        Vue.http.get('/stock/GetStockCount').then(function(res) {
            _this.countlist = res.data;
        })
        Vue.http.get('/stock/GetSelect').then(function(res) {
            _this.selectlist = res.data;
        })
    },
    methods: {
        query() {
                let _this = this;
                let param = {
                    pagesize: _this.pagesize,
                    pageindex: _this.pageindex,
                    type: _this.type.length ? _this.type[0] : 0,
                    key: _this.key,
                    areaid: _this.area.length ? _this.area[0] : 0,
                    houseid: _this.house.length ? _this.house[0] : 0,
                    slotcode: _this.slot.length ? _this.slot[0] : 0
                }
                Vue.http.get('/stock/GetStockMain', param).then(function(res) {
                    if (res.data.ok) {
                        _this.list = res.data.data;
                        setTimeout(function() {
                            _this.count = Math.ceil(res.data.count / _this.pagesize);
                        }, 0)
                    } else {
                        _this.list = [];
                        _this.count = 1;
                        //layer.alert(res.data.mes);
                    }
                })
            },
            instore() {
                this.showin = false;
            },
            slotmanage(index){
              this.model=this.list[index];
              this.showslot=true;
            },
            changeslot(){
              if(slotvalid){
                return false;
              }
              let model=JSON.parse(JSON.stringify(this.model));
              model.StockCount-=this.slotcount;
              //变更后的
              this.model.StockCount=this.slotcount;
              //获取库区、库房
              this.showslot=false;
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
