

<template>

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix">
            <span class="col_010101 f16 pull-left mg_l30 lineH26">品牌管理</span>
            <a href="#" class="green_btn w80 h26 pull-left mg_l30" @click="showadd">+添加品牌</a>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_r0 bdT_d0d0d0">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th width="10%">序号</th>
                        <th width="12%">图片</th>
                        <th width="13%">品牌名称</th>
                        <th width="10%">品牌地区</th>
                        <th width="26%">品牌描述</th>
                        <th width="14%">状态</th>
                        <th width="15%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="(index,item) in brandlist">
                    <tr >
                        <td> {{index+1}}</td>
                        <td><img :src="item.Logo" class="pinpai_img" /></td>
                        <td> {{item.BrandName}}</td>
                        <td>{{item.GroupID==1?"国内":"国外"}}</td>
                        <td class="col_767676">{{item.Description}}</td>
                        <td>{{item.IsAuditing?"已通过":"待审核"}}</td>
                        <td>
                            <a href="#" class="saas_edi mg_t10 pull-left" v-if="item.UserId==userid" @click="update(index)">编辑</a>
                            <a href="#" class="saas_del mg_t10 pull-left mg_l20" @click="remove(index,item.id)">删除</a>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>


        <modal :show.sync="addBrand" effect="fade" width="450px">
            <div slot="modal-header" class="modal-header">
                <button type="button" class="close" @click="addBrand = false"><span>×</span></button>
                <h4 class="modal-title">{{title}}</h4>
            </div>
            <div slot="modal-body" class="modal-body">

                    <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
                        <div class="pull-left">
                            <label class="control-label pull-left f12 lineH20" for="input01"><em class="col_fb2727 mg_r5">*</em>品牌名称：</label>
                            <input placeholder="" v-model="model.BrandName" class="add_input w200 pull-left form-control" type="text">
                        </div>
                    </div>
                    <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
                        <div class="pull-left">
                            <label class="control-label pull-left f12 lineH20" for="input01">品牌描述：</label>
                            <textarea placeholder="" v-model="model.Description" class="form-control w200 pull-left"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
                        <div class="pull-left">
                            <label class="control-label pull-left f12 lineH20" for="input01"><em class="col_fb2727 mg_r5">*</em>品牌所属区域：</label>
                            <!-- <a href="#" class="saas_moren mg_t5 col_767676 pull-left text-none">国内品牌</a>
                            <a href="#" class="saas_moren_gray mg_t5 col_767676 pull-left mg_l20 text-none">国外品牌</a> -->
                            <!-- <label class="radio pull-left fN poR">
                                <input type="radio" name="rdBrandArea" v-model="model.GroupID" value="1" id="gnType"> 国内品牌
                            </label>
                            <label class="radio pull-left fN mg_t10 mg_l30 poR">
                                <input type="radio" name="rdBrandArea" v-model="model.GroupID" value="2" id="gwType"> 国外品牌
                            </label> -->
                            <radio :value.sync="model.GroupID" :options="radios" left="mg_l20"></radio>
                        </div>
                    </div>
                    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                        <label class="control-label pull-left f12 lineH20">产品图片：</label>
                        <p class="pull-left pd_l0 mg_t4 f10 col_b5">（上传品牌LOGO图片，尺寸：143*108像素）</p>
                    </div>
                    <ul class="col-md-12 goods_img1 clearfix mg_t10 mg_l95">
                        <li>
                            <a href="javascript:void(0)"  class="filter-btn">
                                <img v-if="model.Logo" :src="model.Logo" height="108" width="143" name="brandImg">
                                <img v-else src="../../images/saas03.png" height="108" width="143" name="brandImg">
                            </a>
                        </li>
                    </ul>
                    <div class="col-md-12 mg_t10 mg_b20 clearfix">
                        <a href="#" class="btn_red bg8 mg_t20 mg_l70 w80 h26 pull-left" :class="{'disable':!model.BrandName}" @click="save">确&nbsp;定</a>
                        <a href="#" class="gray mg_t20 mg_l30 w80 h26 pull-left" @click="addBrand = false">取&nbsp;消</a>
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
import radio from '../general/radioDocs.vue'
import upload from '../general/upload.vue'
export default {
    components: {
        modal, upload,radio
    },
    data() {
        return {
            brandlist: {},
            addBrand: false,
            model: {
                Logo: ""
            },
            title:"添加品牌",
            userid: document.getElementById('user').getAttribute('uid'),
            radios: [{text:'国内品牌',val:1},{text:'国外品牌',val:2}]
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
                _this.title="编辑品牌";
            },
            save() {
                let _this = this;
                if(!_this.model.BrandName){
                  return false;
                }

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
            },
            showadd(){
              this.model = {Logo:"",GroupID:1};
              this.addBrand=true;
              this.title="添加品牌";
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
