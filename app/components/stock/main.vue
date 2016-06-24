

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
                        <th width="15%">供应商编码</th>
                        <th width="12%">实物ID</th>
                        <th width="12%">货位编码</th>
                        <th width="11%">品相</th>
                        <th width="11%">数量</th>
                        <th width="11%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in list">
                    <tr :class="{'red_bg':warns.indexOf(item.StockId)>-1}">
                        <td>{{item.ProdName}}</td>
                        <td>{{item.DealerNo}}</td>
                        <td>{{item.StockId}}</td>
                        <td>{{item.AreaCode}}-{{item.StoreCode}}-{{item.SlotCode}}</td>
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

<!--货位管理-->
<modal :show.sync="showslot" effect="fade" width="580px" title="货位管理">
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
                <v-select :value.sync="slotcode" :search="true" :options="slotcodelist" :close-on-select="true" placeholder="选择货位"></select>
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15 "  style="margin-left: 65px;">
            <label class="control-label pull-left f12 lineH20">数量：</label>
            <input placeholder="" v-model="slotcount" class="add_input w170 pull-left form-control" type="text">
        </div>
        <div class="col-md-12 mg_t20  clearfix">
            <a href="#" class="btn_red bg8 mg_b20 mg_t20 auto w120 h26" :class="{'disable':!slotvalid}" @click="changeslot">确&nbsp;定</a>
        </div>
    </div>
</modal>

<instore :showin.sync="showin" :selectlist="selectlist"></instore>

</template>

<script>

import vSelect from 'vue-strap/src/select'
import modal from 'vue-strap/src/modal'
import pageDocs from '../general/pageDocs.vue'
import buttonDocs from '../general/buttonDocs.vue'
import instore from '../modal/instore.vue'
export default {
    components: {
        vSelect, buttonDocs, pageDocs, modal,instore
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
            warns: [],
            countlist: [0, 0, 0],
            pagesize: 5,
            pageindex: 1,
            count: 0,
            showin: false,
            showslot: false,
            slotcode: "",
            slotcount: "",
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
                  if (item.level == 3 && item.code!=_this.model.AreaCode+"-"+_this.model.StoreCode+"-"+_this.model.SlotCode) {
                      arr.push({
                          label: item.code,
                          value: item.value
                      })
                  }
              })
              return arr;
            },
            slotvalid(){
              if(!this.slotcount || isNaN(parseInt(this.slotcount))){
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
                let slotcode="";
                for (var i = 0; i < this.selectlist.length; i++) {
                  let item =  this.selectlist[i]
                  if(item.value==_this.slot[0]&&item.level==3){
                    slotcode=item.label;
                    break;
                  }
                }

                let param = {
                    pagesize: _this.pagesize,
                    pageindex: _this.pageindex,
                    type: _this.type.length ? _this.type[0] : 0,
                    key: _this.key,
                    areaid: _this.area.length ? _this.area[0] : 0,
                    houseid: _this.house.length ? _this.house[0] : 0,
                    slotcode: slotcode //_this.slot.length ? _this.slot[0] : 0
                }
                Vue.http.get('/stock/GetStockMain', param).then(function(res) {
                    if (res.data.ok) {
                        _this.list = res.data.data;
                        _this.warns=res.data.data2;
                        setTimeout(function() {
                            _this.count = Math.ceil(res.data.count / _this.pagesize);
                        }, 0)
                    } else {
                        _this.list = [];
                        _this.warns=[];
                        _this.count = 1;
                    }
                })
            },
            slotmanage(index){
              this.model=this.list[index];
              this.showslot=true;
            },
            changeslot(){
              if(!this.slotvalid){
                return false;
              }
              this.model.StockCount-=this.slotcount;
              //变更后的
              let model=JSON.parse(JSON.stringify(this.model));
              model.StockCount=this.slotcount;
              //获取库区、库房
              let slot=this.slotcode[0];

              for (var i = 0; i < this.selectlist.length; i++) {
                let item =  this.selectlist[i]
                if(item.value==slot&&item.level==3){
                  model.SlotCode=item.label;
                  model.StoreId=item.pid;

                  for (var i = 0; i < this.selectlist.length; i++) {
                    let item2 =  this.selectlist[i]
                    if(item2.value==model.StoreId&&item2.level==2){
                      model.StoreCode=item2.code;
                      model.StoreName=item2.label;
                      model.AreaId=item2.pid;

                      for (var i = 0; i < this.selectlist.length; i++) {
                        let item3 =  this.selectlist[i]
                        if(item3.value==model.AreaId&&item3.level==1){
                          model.AreaCode=item3.code;
                          model.AreaName=item3.label;
                          break;
                        }
                      }
                      break;
                    }
                  }
                  break;
                }
              }
              let _this=this;
              Vue.http.post('/stock/ChangeSlot',{newmodel: model,model:this.model}).then(function(res){
                if(model.StockCount>0){
                  _this.list.splice(0,0,model);
                }else{
                  model.Id=_this.model.Id;
                  _this.model=model;
                }
                _this.query();
              })
              this.showslot=false;
            }
    },
    events: {
        'page': function(index) {
            this.pageindex = index;
            this.query();
        },
        'instore': function(model){
          // let arr=this.list.filter(function(item){
          //   return item.StockId==model.StockId;
          // })
          // if(arr.length){
          //   arr[0].StockCount=model.StockCount;
          // }else{
          //   this.list.splice(0,0,model);
          // }
          this.query();
          let _this=this;
          Vue.http.get('/stock/GetStockCount').then(function(res) {
              _this.countlist = res.data;
          })

        }
    }
}

</script>
