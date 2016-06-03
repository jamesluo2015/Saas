

<template >

<div class="col-md-12 pull-right">
    <div class="row pd_l0 pd_r0 mg_l0 mg_r0 mg_b20">
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left">配件名称：</label>
            <p class="pull-left pd_l0 mg_t2">{{model.StandardName}}</p>
        </div>
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left">零件编号：</label>
            <p class="pull-left pd_l0 mg_t2">{{model.Sku}}</p>
            <a href="#" class="saas_add" @click="supplementsku">+补充零件编号</a>
        </div>
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left">配件说明：</label>
            <div class="col-md-10 pull-left pd_l0 mg_t2">
                {{model.ContentInfo}}
                <a href="#" class="saas_add" @click="showdemo=true">+补充配件说明</a>
            </div>
        </div>

        <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
            <label class="control-label pull-left">适用年款：</label>
            <a href="#" class="mg_l10" @click="showyears=true">查看年款</a>
            <a href="#" class="saas_add" @click="showyear=true">+补充年款</a>
        </div>

        <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
            <label class="control-label pull-left">品牌：</label>
            <v-select :value.sync="Brandlist" :options="brands" class='pull-left' :close-on-select="true" placeholder="品牌"></v-select>
        </div>
        <div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown">
            <label class="control-label pull-left" for="input01"><em class="col_fb2727 mg_r5">*</em>供应商编码：</label>
            <input placeholder="" v-model='model.DealerNo' type="text" class="add_input w160 form-control">
        </div>
        <div class="col-md-12 pd_l0 clearfix pd_b20 select_dropdown" v-if="stype==1">
            <div class="pull-left">
                <label class="control-label pull-left"><em class="col_fb2727 mg_r5">*</em>销售价</label>
                <input placeholder="" type="text" v-model='model.SalePrice' class="add_input w160 pull-left form-control">
                <label class="pull-left fN mg_t2 mg_l5">元</label>
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix pd_b20 select_dropdown" v-else>
            <div class="pull-left">
                <label class="control-label pull-left"><em class="col_fb2727 mg_r5">*</em>进货价</label>
                <input placeholder="" type="text" v-model='model.InPrice' class="add_input w160 pull-left form-control">
                <label class="pull-left fN mg_t2 mg_l5">元</label>
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix pd_b20 select_dropdown">
            <div class="pull-left">
                <label class="control-label pull-left" for="input01"><em class="col_fb2727 mg_r5">*</em>库存数：</label>
                <input placeholder="" type="text" v-model='model.StockCount' class="add_input w160 pull-left form-control">
            </div>
        </div>

        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <div class="col-md-12 pd_l0 pull-left">
                <label class="control-label pull-left">产品图片：</label>
                <p class="pull-left pd_l0 mg_t4 f12 col_767676">（图片格式：jpg、png，最多五张）</p>
            </div>
            <div class="col-md-12 pull-left pd_l0 mg_t30 clearfix">
                <ul class="goods_img clearfix mg_l110 mg_t10">
                    <li v-for="(imgindex,img) in model.Imglist">
                        <a href="javascript:void(0)">
                            <img :src="img.ImgUrl">
                            <em @click="model.Imglist.splice(imgindex,1)"></em>
                        </a>
                    </li>
                    <li v-if="!model.Imglist||model.Imglist.length<5">
                        <a href="javascript:void(0)" class="imgs">
                            <img src="../../../images/saas03.png">
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-md-12">
            <a href="javascript:void(0)" class="btn_red bg8 auto f16 mg_t20 w300" :class="{'disable':!valid||iscommit}" @click='commit'>{{iscommit?"提交中":"提交"}}</a>
        </div>
    </div>
</div>

<upload upid=".imgs"></upload>
<supplement-sku :show.sync="showsku" :list="model.SkuList" :bmno="model.BmNo"></supplement-sku>
<supplement-demo :show.sync="showdemo" :bmno="model.BmNo"></supplement-demo>
<supplement-year v-ref:year :show.sync="showyear" :bmno="model.BmNo" :exists="exists"></supplement-year>
<partsyearlist :show.sync="showyears" :list="model.SuitCarList" :bmno="model.BmNo"></partsyearlist>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap';
import {
    option as vOption
}
from 'vue-strap';
import upload from '../../general/upload.vue';
import supplementSku from '../../modal/supplementSku.vue';
import supplementDemo from '../../modal/supplementDemo.vue';
import supplementYear from '../../modal/supplementYear.vue';
import partsyearlist from '../../modal/partsyearlist.vue';
export default {
    components: {
        vSelect, vOption, upload, supplementSku, supplementDemo, partsyearlist, supplementYear
    },
    props: {
        model: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            brands: [],
            Brandlist: [],
            iscommit: false,
            stype: document.getElementById('user').getAttribute('stype'),
            showsku: false,
            showdemo: false,
            showyear: false,
            showyears: false,
        }
    },
    events: {
        'upload': function(ret) {
            let url = ret.url;
            if (!this.model.Imglist) {
                this.model.Imglist = [];
            }
            this.model.Imglist.push({
                ImgUrl: url
            })
        }
    },
    ready() {
        //获取经销商品牌
        var _this = this;
        Vue.http.get('/product/GetBrands', {}).then(function(response) {
            let arr = [];
            response.data.map(x => arr.push({
                value: x.BrandId.toString(),
                label: x.BrandName
            }))
            arr.push({
                value: "0",
                label: "其它"
            });
            _this.brands = arr;
            _this.Brandlist = [arr[0].value]
        });
    },
    methods: {
        commit() {
                //防止多次点击
                if (this.iscommit || !this.valid) {
                    return false;
                }

                let _this = this;
                let model = _this.model;
                //品牌处理
                model.ProdBrandId = this.Brandlist[0];
                if (parseInt(model.ProdBrandId) > 0) {
                    model.ProdBrandName = this.brands.filter(function(item) {
                        return item.value == model.ProdBrandId;
                    })[0].label;
                }
                _this.iscommit = true;
                Vue.http.post('/product/SaveProduct', JSON.stringify(model)).then(function(response) {
                    if (response.data.ok) {
                        window.location.reload();
                    } else {
                        _this.iscommit = false;
                        layer.alert(response.data.mes);
                    }
                }, function(response) {
                    console.log('保存失败');
                });
            },
            supplementsku() {
                this.showsku = true;
            }
    },
    computed: {
        exists: function() {
          let arr=[];
          this.model.SuitCarList.map(x=>arr.push(x.PartsYearId));
          if(model.SupplementSuitcar&&this.model.SupplementSuitcar.length){
            this.model.SupplementSuitcar.map(x=>arr.push(x));
          }
          return arr;
        },
        valid: function() {
            let result = true;
            let price = this.stype == 1 ? this.model.SalePrice : this.model.InPrice;
            if (!isNaN(price)) {
                let temp = parseInt(price);
                if (!temp) {
                    return false;
                }
            } else {
                return false;
            }
            if (!isNaN(this.model.StockCount)) {
                let temp = parseInt(this.model.StockCount);
                if (!temp) {
                    return false;
                }
            } else {
                return false;
            }
            if (!this.model.DealerNo) {
                return false;
            }
            return result;
        }
    }
}

</script>
