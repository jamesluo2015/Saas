

<template>

<div class="right_contain">
    <div class="row">

        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix">
            <span class="col_010101 f16 pull-left mg_l30 lineH26">快递公司管理</span>
            <a href="#" class="green_btn w100 h26 pull-left mg_l30" @click="addExpress=true">+添加快递公司</a>
        </div>

        <div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20">
            <div class="shop_info pd_5">
                <table class="table table2 mg_t15 table6 bd_tb5">
                    <thead>
                        <tr>
                            <th width="33%">快递公司名称</th>
                            <th width="33%">联系方式</th>
                            <th width="33%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index,item) in list">
                            <td class="poR">
                                <em class="moren_tip" v-if="item.IsDefault"></em>
                                <div class="pd_l50">
                                    <p class="col_010101 mg_b5">{{item.ExpressName}}</p>
                                    <!-- <img src="../images/saas09.png"> -->
                                </div>
                            </td>
                            <td>{{item.Tel}}</td>
                            <td>
                                <a href="#" class="saas_del mg_t10 pull-left mg_l20" @click="remove(index,item.Id)">删除</a>
                                <a href="#" class="saas_moren_gray mg_t10 pull-left mg_l2 mg_l20" v-if="!item.IsDefault" @click="setdefault(index,item.Id)">设为默认</a>
                                <a href="#" class="saas_moren mg_t10 pull-left mg_l20" v-else>设为默认</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <modal :show.sync="addExpress" effect="fade" width="360px">
          <div slot="modal-header" class="modal-header ">
              <button type="button" class="close " @click="addExpress=false"><span>×</span></button>
              <h4 class="modal-title">添加快递公司</h4>
          </div>
          <div slot="modal-body" class="modal-body ">
                    <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15 ">
                        <div class="pull-left ">
                            <label class="control-label pull-left f12 lineH20" for="input01 "><em class="col_fb2727 mg_r5 ">*</em>快递公司名称：</label>
                            <textinfo :value.sync="model.ExpressName" :list="showlist" width="170px" class=" pull-left"></textinfo>
                        </div>
                    </div>
                    <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15 ">
                        <div class="pull-left ">
                            <label class="control-label pull-left f12 lineH20 " for="input01 ">联系方式：</label>
                            <input :disabled="disabled" placeholder=" " v-model="model.Tel" class="w170 dropdown-toggle dropdown_toggle form-control " type="text ">
                        </div>
                    </div>
                    <div class="col-md-12 mg_t10 mg_b20 clearfix ">
                        <a href="javascript:void(0)" :class="{'disable':!model.ExpressName||!isNaN(model.ExpressName)}" @click="Save"  class="btn_red bg8 mg_t20 mg_l40 w80 h26 pull-left "  >确&nbsp;定</a>
                        <a href="javascript:void(0)" class="gray mg_t20 mg_l30 w80 h26 pull-left " @click="addExpress=false">取&nbsp;消</a>
                    </div>
          </div>
        </modal>

    </div>
</div>

</template>

<script>

import {
    modal
}
from 'vue-strap'
import textinfo from '../general/textinfo.vue'
export default {
    components: {
        modal,textinfo
    },
    data() {
        return {
            list: [],
            model:{ExpressName:"",Tel:"",IsDefault:false,Id:0},
            addExpress: false,
            showlist:[],
            allist:[],
            expresslist:[],
            disabled:false
        }
    },
    ready() {
        //获取经销商品牌
        let _this = this;
        Vue.http.get('/config/GetExpress', {}).then(function(response) {
            _this.list = response.data;
        });
        Vue.http.get('/config/GetAllExpress').then(function(res){
          let arr=[];
          res.data.forEach(function(item){
            arr.push(item.ExpressName);
          })
          _this.expresslist=res.data;
          _this.allist=arr;
        });
    },
    computed:{
      showlist(){
        let _this=this;
        if(!_this.model.ExpressName){
          return [];
        }
        let arr=_this.allist.filter(function(item){
          return item.indexOf(_this.model.ExpressName.toString())>-1&&_this.model.ExpressName!=item;
        });
        if(!arr.length){
          arr=[];
        }
        return arr;
      }
    },
    watch:{
      'model.ExpressName':function(val){
        let _this=this;
        for (var i = 0; i < _this.expresslist.length; i++) {
          if(_this.expresslist[i].ExpressName==val){
            _this.disabled=true;
            _this.model.Tel=_this.expresslist[i].Tel;
            return false;
          }
        }
        _this.disabled=false;
      }
    },
    methods: {
        remove(index, id) {
                let _this = this;
                Vue.http.post('/config/RemoveExpress?id=' + id).then(function(res) {
                  let isdefault=_this.list[index].IsDefault;
                    _this.list.splice(index, 1);
                    if(isdefault&&_this.list.length){
                      _this.setdefault(0,_this.list[0].Id);
                    }else{
                      _this.checkone();
                    }
                }, function() {
                    layer.alert('删除失败', 5);
                })
            },
            setdefault(index, id) {
                let _this = this;
                Vue.http.post('/config/SetDefault?id=' + id).then(function(res) {
                    _this.list.map(x => x.IsDefault = false);
                    _this.list[index].IsDefault = true;
                }, function() {

                })
            },
            checkone(){
              if(this.list.length==1){
                this.setdefault(0,this.list[0].Id);
              }
            },
            Save(){
              let _this = this;
              //valid
              if(!this.model.ExpressName||!isNaN(this.model.ExpressName)){
                return false;
              }
              //判断是否存在
             let exist=  _this.list.some(function(item){
                return item.ExpressName===_this.model.ExpressName;
              })
              if(exist){
                layer.alert('该快递公司已存在');
                return false;
              }
              //判断快递总表
              let arr = _this.expresslist.filter(function(item){
                return item.ExpressName===_this.model.ExpressName;
              })
              let id=0;
              if(arr.length){
                id=arr[0].ID;
              }
              Vue.http.post('/config/Save',{model:_this.model,id:id}).then(function(res) {
                  _this.model.Id=res.data;
                  _this.model.IsDefault=false;
                  _this.list.push(JSON.parse(JSON.stringify(_this.model)));
                  _this.addExpress=false;
                  _this.model={};
                  _this.checkone();
              }, function() {

              })
            }
    }
}

</script>
