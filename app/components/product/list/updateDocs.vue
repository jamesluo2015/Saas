<template>
    <h3>修改商品</h3>

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
            <a href="javascript:void(0)" class="btn_red bg8 auto f16 mg_t20 w300"  @click='commit'>提交</a>
        </div>
</template>
<script>
import {select as vSelect} from 'vue-strap';
export default {
  components: { vSelect },
  props:{
    model: {
      type: Object
    }
  },
  data(){
     return {
       brands:[]
     }
  },
  ready(){
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
  computed:{
    Brandlist(){
      return [this.model.ProdBrandId.toString()];
    }
  },
  methods: {
    commit(){
      this.$dispatch('save')
    }
  }
}
</script>
