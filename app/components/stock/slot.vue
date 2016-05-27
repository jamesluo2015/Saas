

<template id="">

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <a href="#" class="green_btn w80 h26 pull-left mg_l30" @click="ModalShow=true">+添加货位</a>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="house" :options="houses" :close-on-select="true" placeholder="选择库房"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="slot" :options="slots" :close-on-select="true" placeholder="选择货位"></v-select>
            </div>
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_t10 bdT_d0d0d0">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th width="25%">货位</th>
                        <th width="25%">数量</th>
                        <th width="25%">货位详情</th>
                        <th width="25%">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01-01-01</td>
                        <td>20</td>
                        <td>北京库区-五方库房 01号货位</td>
                        <td><a href="#" class="bianji mg_r30">编辑</a><a href="#" class="shanchu">删除</a></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>01-01-01</td>
                        <td>20</td>
                        <td>北京库区-五方库房 01号货位</td>
                        <td><a href="#" class="bianji mg_r30">编辑</a><a href="#" class="shanchu">删除</a></td>
                    </tr>
                </tbody>

            </table>

        </div>

    </div>


</div>
<modal :show.sync="ModalShow" effect="fade" width="520px">
    <div slot="modal-header" class="modal-header">
        <button type="button" class="close" @click="ModalShow = false"><span>×</span></button>
        <h4 class="modal-title">添加货位</h4>
    </div>
    <div slot="modal-body" class="modal-body">
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">库区地址：</label>
            <div class="dropdown pull-left ">
                <v-select :value.sync="model.area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
            </div>
            <div class="dropdown pull-left mg_l10  ">
                <v-select :value.sync="model.house" :options="houses2" :close-on-select="true" placeholder="选择库房"></v-select>
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01">货位编码：</label>
                <input placeholder="" class="add_input w170 pull-left form-control" v-model="model.SlotCode" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left f12 lineH20">货位：</label>
            <p class="pull-left pd_l0 mg_t2">{{allcode}}</p>
        </div>
        <div class="col-md-12 mg_t10 mg_b20 clearfix">
            <a href="javascript:void(0)" class="btn_red bg8 mg_t20 auto w120 h26" :class="{'disable':!valid}" @click="save">添&nbsp;加</a>
        </div>
    </div>
</modal>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
import buttonDocs from '../general/buttonDocs.vue'
import pageDocs from '../general/pageDocs.vue'
import {
    modal
}
from 'vue-strap'
export default {
    components: {
        vSelect, buttonDocs, pageDocs, modal
    },
    data() {
        return {
            allhouse: [],
            area: [],
            house: [],
            slots: [],
            slot: [],
            list:[],
            model:{
              area: [],
              house: [],
              SlotCode:""
            },
            ModalShow: false
        }
    },
    ready() {
        this.query();
        let _this = this;
        Vue.http.get('/stock/GetStockHouse').then(function(res) {
            _this.allhouse = res.data;
        })
    },
    computed: {
        areas() {
                let arr = [];
                let _this = this;
                _this.allhouse.forEach(function(item) {
                    if (item.TreeLevel == 1) {
                        arr.push({
                            label: item.HouseName,
                            value: item.Id.toString()
                        });
                    }
                })
                return arr;
            },
            houses() {
                let _this = this;
                let arr = [];
                if (_this.area.length) {
                    let pid = _this.area[0];
                    _this.allhouse.forEach(function(item) {
                        if (item.ParentId == pid) {
                            arr.push({
                                label: item.HouseName,
                                value: item.Id.toString()
                            });
                        }
                    })
                }
                return arr;
            },
            houses2() {
                let _this = this;
                let arr = [];
                if (_this.model.area.length) {
                    let pid = _this.model.area[0];
                    _this.allhouse.forEach(function(item) {
                        if (item.ParentId == pid) {
                            arr.push({
                                label: item.HouseName,
                                value: item.Id.toString()
                            });
                        }
                    })
                }
                return arr;
            },
            valid(){
                return this.model.SlotCode && this.model.house.length;
            },
            allcode(){
              let _this=this;
              let arr=['01','01','01'];
              if(_this.model.area.length){
                for (var i = 0; i < _this.allhouse.length; i++) {
                  if(_this.allhouse[i].Id==_this.model.area[0]){
                    let code=_this.allhouse[i].HouseCode;
                    if(code){
                      arr[0]=code;
                    }
                    break;
                  }
                }
              }
              if(_this.model.house.length){
                for (var i = 0; i < _this.allhouse.length; i++) {
                  if(_this.allhouse[i].Id==_this.model.house[0]){
                    let code=_this.allhouse[i].HouseCode;
                    if(code){
                      arr[1]=code;
                    }
                    break;
                  }
                }
              }
              if(_this.model.SlotCode){
                arr[2]=_this.model.SlotCode;
              }
              return arr.join('-');
            }
    },
    methods: {
        query() {

        },
        save(){
          if(!this.valid){
            return false;
          }
          let _this=this;
          //获取库房名称和id
          for (var i = 0; i < _this.allhouse.length; i++) {
            if(_this.allhouse[i].Id==_this.model.area[0]){
              _this.model.HouseName=_this.allhouse[i].HouseName;
              _this.model.StoreId=_this.allhouse[i].Id;
              break;
            }
          }
          Vue.http.post('/stock/SaveSlot',_this.model).then(function(res){
            if(res.data){
              _this.ModalShow=false;
              _this.model.Id=res.data;
              this.list.push(_this.model);
              _this.model={};
            }
          })
        }
    }
}

</script>
