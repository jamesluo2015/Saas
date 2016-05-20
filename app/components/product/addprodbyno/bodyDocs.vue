

<template >

<div>
    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
        <label class="control-label pull-left">配件名称：</label>
        <p class="pull-left pd_l0 mg_t7">{{model.StandardName}}</p>
    </div>
    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
        <label class="control-label pull-left">零件编号：</label>
        <p class="pull-left pd_l0 mg_t7">{{model.Sku}}</p>
        <a class="col_007aff cursor mg_l10 mg_t5" data-toggle="modal" data-target="#SkuList" sku="2200100U8130">
            <span class="label label-warning">查看</span>
        </a>

    </div>
    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
        <label class="control-label pull-left">配件说明：</label>
        <div class="col-md-10 pull-left pd_l0 mg_t7">
            {{model.ContentInfo}}
            <a href="#" class="mg_l10 mg_t5"><span class="label label-warning">我有更好的补充</span></a>
        </div>
    </div>
    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
        <label class="control-label pull-left">适用年款：</label>

    </div>
    <div class="col-md-12 pd_l0 clearfix pd_b20 mg-t20 select_dropdown">
        <div class="pull-left">
            <label class="control-label pull-left" for="input01">*品牌：</label>
            <v-select :value.sync="Brandlist" :options="brands" class='min_w160' :close-on-select="true" placeholder="品牌"></v-select>
        </div>
        <div class="pull-left mg_l20">
            <label class="control-label pull-left" for="input01">供应商编码：</label>
            <input bmtitle="这是您自己的商品编码" placeholder="" type="text" id="dealerno" v-model='model.DealerNo' class="w160 add_input form-control">
        </div>
    </div>
    <div class="col-md-12 pd_l0 clearfix pd_b20 select_dropdown" style="position: relative;">
        <div class="pull-left">
            <label class="control-label pull-left">*销售价：</label>
            <input placeholder="" id="SalePrice" type="text" bmtitle="此价格是在北迈网上显示的销售价格" v-model='model.SalePrice' class="add_input w160 pull-left form-control">
            <label class="pull-left fN mg_t7 mg_l5">元</label>
            <!--ms-if-->
        </div>
        <div class="pull-left mg_l5">
            <label class="control-label pull-left" for="input01">*库存量：</label>
            <input placeholder="" id="stockcount" type="text" bmtitle="当您的库存量发生变化的时候记得及时更新此值哦" v-model='model.StockCount' class="add_input w160 pull-left form-control">
        </div>
    </div>

    <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
        <div class="col-md-12 pd_l0 pull-left">
            <label class="control-label pull-left">产品图片：</label>
            <p class="pull-left pd_l0 mg_t7">（上传图片格式：JPG、JPEG、PNG;最多可上传5张）</p>
        </div>
        <div class="col-md-12 pd_l0 mg_t10 clearfix">
            <ul class="goods_img clearfix mg_l110 mg_t10">
                <li v-for="img in model.Imglist">
                    <a href="javascript:void(0)">
                        <img :src="img.ImgUrl" height="54" width="72 ">
                    </a>
                </li>
                <li v-if="!model.Imglist||model.Imglist.length<5">
                    <a href="javascript:void(0)" class="imgs">
                        <img src="../../../images/add.png" height="54" width="72 ">
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="col-md-12">
        <a href="javascript:void(0)" class="btn_red bg8 auto f16 mg_t20 w300" :class="{'unable':!valid||iscommit}" @click='commit'>{{iscommit?"提交中":"提交"}}</a>
    </div>
</div>
<upload upid=".imgs"></upload>

</template>

<script>

import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
import upload from '../../general/upload.vue';

export default {
    components: {
        vSelect, vOption, upload
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
            iscommit: false
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
        });
    },
    methods: {
        commit() {
            //防止多次点击
            if (this.iscommit) {
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
                    alert(response.data.mes);
                }
            }, function(response) {
                console.log('保存失败');
            });
        }
    },
    computed: {
        valid: function() {
            let result = true;
            if (!this.model.SalePrice) {
                result = false;
            }
            if (!this.model.StockCount) {
                result = false;
            }
            return result;
        }
    }
}

</script>
