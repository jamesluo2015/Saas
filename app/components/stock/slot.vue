

<template id="">

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <a href="#" class="green_btn w80 h26 pull-left mg_l30" @click="show">+添加货位</a>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="house" :options="houses" :show.sync="selectshow" :close-on-select="true" placeholder="选择库房"></v-select>
            </div>
            <!-- <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="slot" :options="slots" :close-on-select="true" placeholder="选择货位"></v-select>
            </div> -->
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
                <tbody v-for="(index,item) in list">
                    <tr>
                        <td>{{item.SlotCode}}</td>
                        <td>{{countlist[index]}}</td>
                        <td>{{item.AreaCode}}-{{item.StoreCode}}-{{item.SlotCode}}号货位</td>
                        <td>
                            <a href="javascript:void(0)" class="bianji mg_r30" @click="edit(index)">编辑</a>
                            <a href="javascript:void(0)" class="shanchu" @click="del(index)">删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <page-docs :count="count"></page-docs>
            <nothing v-if="!list.length"></nothing>
        </div>

    </div>


</div>
<modal :show.sync="ModalShow" effect="fade" width="520px" :title="model.Id?'编辑货位':'添加货位'">
    <div slot="modal-body" class="modal-body">
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">库区地址：</label>
            <div class="dropdown pull-left ">
                <v-select :value.sync="area2" :options="areas2" :close-on-select="true" placeholder="选择库区"></v-select>
            </div>
            <div class="dropdown pull-left mg_l10  ">
                <v-select :value.sync="house2" :options="houses2" :close-on-select="true" placeholder="选择库房"></v-select>
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
            <a href="javascript:void(0)" class="btn_red bg8 mg_t20 auto w120 h26" :class="{'disable':!valid}" @click="save">{{model.Id?"保&nbsp;存":"添&nbsp;加"}}</a>
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
import nothing from '../general/nothing.vue'
export default {
    components: {
        vSelect, buttonDocs, pageDocs, modal,nothing
    },
    data() {
        return {
            allhouse: [],
            area: [],
            area2: [],
            house: [],
            house2: [],
            // slots: [],
            // slot: [],
            list: [],
            countlist: [],
            model: {},
            ModalShow: false,
            pageindex: 1,
            pagesize: 10,
            count: 0,
            selectshow: false
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
                let arr = [{
                    label: "全部",
                    value: "0"
                }];
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
            areas2(){
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
                let arr = [{
                    label: "全部",
                    value: "0"
                }];
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
                if (_this.area2.length) {
                    let pid = _this.area2[0];
                    if(parseInt(pid)>0){
                      _this.allhouse.forEach(function(item) {
                          if (item.ParentId == pid) {
                              arr.push({
                                  label: item.HouseName,
                                  value: item.Id.toString()
                              });
                          }
                      })
                    }
                }
                //if(arr.length){
                  //this.house2=[arr[0].value];
                //}
                return arr;
            },
            valid() {
                return this.model.SlotCode && (this.house2.length?parseInt(this.house2[0]):false);
            },
            allcode() {
                let _this = this;
                let arr = ['', '', ''];
                if (_this.area2.length) {
                    for (var i = 0; i < _this.allhouse.length; i++) {
                        if (_this.allhouse[i].Id == _this.area2[0]) {
                            let code = _this.allhouse[i].HouseCode;
                            if (code) {
                                arr[0] = code;
                            }
                            break;
                        }
                    }
                }
                if (_this.house2.length) {
                    for (var i = 0; i < _this.allhouse.length; i++) {
                        if (_this.allhouse[i].Id == _this.house2[0]) {
                            let code = _this.allhouse[i].HouseCode;
                            if (code) {
                                arr[1] = code;
                            }
                            break;
                        }
                    }
                }
                if (_this.model.SlotCode) {
                    arr[2] = _this.model.SlotCode;
                }
                return arr.join('-');
            }
    },
    methods: {
        query() {
                let param = {
                    pageindex: this.pageindex,
                    pagesize: this.pagesize,
                    areaid: this.area.length ? this.area[0] : 0,
                    houseid: this.house.length ? this.house[0] : 0
                };
                let _this = this;

                Vue.http.get('/stock/GetSlot', param).then(function(res) {
                    if (res.data.ok) {
                        _this.list = res.data.data;
                        _this.countlist= res.data.data2;
                        _this.count = Math.ceil(res.data.count / _this.pagesize);
                    } else {
                        _this.list = [];
                        _this.countlist=[];
                        _this.count = 0;
                    }
                })
            },
            save() {
                if (!this.valid) {
                    return false;
                }
                let _this = this;
                //获取库房名称和id
                for (var i = 0; i < _this.allhouse.length; i++) {
                    if (_this.allhouse[i].Id == _this.area2[0]) {
                        _this.model.AreaName = _this.allhouse[i].HouseName;
                        _this.model.AreaId = _this.allhouse[i].Id;
                        _this.model.AreaCode = _this.allhouse[i].HouseCode;
                    }
                    if (_this.allhouse[i].Id == _this.house2[0]) {
                        _this.model.HouseName = _this.allhouse[i].HouseName;
                        _this.model.StoreCode = _this.allhouse[i].HouseCode;
                    }
                }
                // _this.model.SlotCode = _this.allcode;
                this.model.StoreId=this.house2[0];
                this.model.AreaId=this.area2[0];
                Vue.http.post('/stock/SaveSlot', _this.model).then(function(res) {
                    if (res.data.ok) {
                      if(!_this.model.Id){
                        _this.model.Id = res.data.data;
                        _this.list.splice(0,0,_this.model);
                      }
                        _this.ModalShow = false;
                        _this.model = {};
                    }else{
                        layer.alert(res.data.mes)
                    }
                })
            },
            del(index) {
                let _this = this;
                layer.confirm('确认删除吗', {
                    btn: ['删除', '取消'] //按钮
                }, function() {
                    let id = _this.list[index].Id;
                    let slotcode = _this.list[index].SlotCode;

                    Vue.http.post(`/stock/DelSlot?id=${id}&slotcode=${slotcode}`).then(function(res) {
                        if (res.data.ok) {
                            _this.list.splice(index, 1);
                        } else {
                            layer.alert(res.data.mes);
                        }
                    })
                    layer.msg('删除成功', {
                        icon: 1,
                        time: 800
                    });
                }, function() {

                });
            },
            show(){
              this.ModalShow=true;
              this.model={};
              this.area2=[];
              this.house2=[];
            },
            edit(index){
              let model=this.list[index];
              this.model=model;
              this.area2=[model.AreaId.toString()]
              this.house2=[model.StoreId.toString()];

              this.ModalShow=true;
            }
    },
    watch:{
      area(val){
        if(val){
          this.selectshow=true;
        }
        return false;
      }
    }
}

</script>
