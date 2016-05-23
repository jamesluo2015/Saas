

<template>

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 select_dropdown clearfix z-top">
            <a href="javascript:void(0)" @click="addBrand=true" class="btn_red bg1 w120 h36 pull-left mg_l10 cursor">添加新品牌</a>
        </div>
        <div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20">
            <div class="shop_info pd_5">
                <table class="table table2 mg_t15 table6 bd_tb5">
                    <thead>
                        <tr>
                            <th width="8%">序号</th>
                            <th width="10%">图片</th>
                            <th width="10%">品牌名称</th>
                            <th width="10%">品牌地区</th>
                            <th width="40%">品牌描述</th>
                            <th width="12%">审核状态</th>
                            <th width="10%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index,item) in brandlist">
                            <td>
                                {{index+1}}
                            </td>
                            <td><img :src="item.Logo" width="72 " height="54" /></td>
                            <td>
                                {{item.BrandName}}
                            </td>
                            <td>
                                <span>{{item.GroupID==1?"国内":"国外"}}</span>
                            </td>
                            <td class="text-left">
                                {{item.Description}}
                            </td>
                            <td>
                                <span>{{IsAuditing?"已审核":"待审核"}}</span>
                            </td>
                            <td>
                                <a href="javascript:void(0);" v-if="item.UserId==userid" @click="update(index)" class="col_007aff f12 f_song">编辑</a>
                                <a href="javascript:void(0)" class="col_ec7642 mg_l10 f12 f_song" @click="remove(index,item.id)">删除</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <modal :show.sync="addBrand" effect="fade">
            <div slot="modal-header" class="modal-header">
                <button type="button" class="close" @click="addBrand = false"><span>×</span></button>
                <h4 class="modal-title">添加品牌</h4>
            </div>
            <div slot="modal-body" class="modal-body">
                <input type="hidden" value="0" name="txtIsType" id="txtIsType" />
                <div class="modal-body">
                    <div class="col-md-12 pd_l30 clearfix pd_b10 select_dropdown">

                        <label class="control-label pull-left" for="input01">品牌名称：</label>
                        <input placeholder="" class="add_input w300" v-model="model.BrandName" type="text" id="txtBrandName" name="txtBrandName">
                    </div>
                    <div class="col-md-12 pd_l30 clearfix pd_b10 select_dropdown">
                        <label class="control-label pull-left">品牌所属地区：</label>
                        <label class="radio pull-left fN poR">
                            <input type="radio" name="rdBrandArea" v-model="model.GroupID" value="1" id="gnType"> 国内品牌
                        </label>
                        <label class="radio pull-left fN mg_t10 mg_l30 poR">
                            <input type="radio" name="rdBrandArea" v-model="model.GroupID" value="2" id="gwType"> 国外品牌
                        </label>
                    </div>
                    <div class="col-md-12 pd_l30 clearfix pd_b10 select_dropdown">
                        <label class="control-label pull-left">品牌描述：</label>
                        <textarea class="pull-left w300 h100 bd_d9" v-model="model.Description" name="txtDescribe" id="txtDescribe"></textarea>
                    </div>
                    <div class="col-md-12 pd_l30 clearfix select_dropdown">
                        <div class="col-md-12 pd_l0 pull-left">
                            <label class="control-label pull-left">品牌标识：</label>
                            <p class="pull-left pd_l0 mg_t7 col_5b5d61">（上传品牌logo图片，图片尺寸：143*108像素）</p>
                        </div>
                        <div class="col-md-12 pd_l0 mg_t10 clearfix">
                            <ul class="goods_img clearfix mg_l110 mg_t10">
                                <li>
                                    <a href="javascript:void(0)" class="filter-btn">
                                        <img v-if="model.Logo" :src="model.Logo" height="108" width="143" name="brandImg">
                                        <img v-else src="../../images/add.png" height="108" width="143" name="brandImg">
                                        <input type="hidden" id="brandImgSrc" name="brandImgSrc" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-12 pd_l0 mg_t10">
                        <a href="javascript:void(0);" class="btn_red bg8 w200 h36 auto" id="btnSave" @click="save">保&nbsp;&nbsp;存</a>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</div>
<upload upid=".filter-btn"></upload>
</template>

<script>

import {
    modal
}
from 'vue-strap'
import upload from '../general/upload.vue'
export default {
    components: {
        modal, upload
    },
    data() {
        return {
            brandlist: {},
            addBrand: false,
            model: {
                Logo: ""
            },
            userid: document.getElementById('user').getAttribute('uid')
        }
    },
    ready() {
        //获取经销商品牌
        let _this = this;
        Vue.http.get('/config/GetBrands', {}).then(function(response) {
            _this.brandlist = response.data;
        });
    },
    methods: {
        remove(index, id) {
              let _this = this;

              layer.confirm('确认删除吗', {
                  btn: ['删除', '取消'] //按钮
              }, function() {
                  Vue.http.post('/config/DeletBrand?brandid=' + id).then(function(response) {
                      if (response.data.ok) {
                          _this.brandlist.splice(index, 1);
                          layer.msg('删除成功', {
                              icon: 1,
                              time: 800
                          });
                      } else {
                          layer.alert(response.data.mes, 5);
                      }
                  }, function() {
                      layer.msg('删除失败', {
                          icon: 5,
                          time: 800
                      });
                  });
              }, function() {

              });
          },
          update(index) {
              let _this = this;
              _this.addBrand = true;
              _this.model = _this.brandlist[index];
          },
          save() {
              let _this = this;
              Vue.http.post('/config/SaveBrand', {
                  model: _this.model
              }).then(function(res) {
                  if (res.data.ok) {
                      _this.addBrand = false;
                      _this.model.UserId = _this.userid;
                      _this.brandlist.push(_this.model);
                      _this.model = {};
                  } else {
                      layer.alert(res.data.mes);
                  }
              }, function() {
                  layer.alert('保存失败');
              })
          }
    },
    events: {
        'upload': function(ret) {
            let url = ret.url;
            this.model.Logo = url;
        }
    }
}

</script>
