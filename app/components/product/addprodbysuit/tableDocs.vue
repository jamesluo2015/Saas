``

<template>

<div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20" v-for="(index, item) in products">
    <div class="pull-left mg_l30">
        <a href="#" class="saas_up_big">
            <img v-if="item.showimg" :src="item.showimg">
            <img v-else src="../../../images/addimg.png" class="imgs" :index="index">
        </a>

        <ul class="goods_img1 clearfix mg_t10">
            <li v-for="(imgindex,img) in item.Imglist" @click="item.showimg=img.ImgUrl">
                <a href="javascript:void(0)" @mouseover="img.showdel=true" @mouseout="img.showdel=false">
                    <img :src="img.ImgUrl">
                    <em v-show="img.showdel" @click="delimg(item,img,imgindex)"></em>
                </a>
            </li>
            <li>
                <a v-if="item.Imglist.length<5" href="javascript:void(0)" class="imgs" :index="index">
                    <img src="../../../images/saas03.png">
                </a>
            </li>
        </ul>

    </div>
    <div class="col-md-8">
        <div class="bd_bd9 h40 lineH40 clearfix">
            <span class="f16 col_77b530 pull-left mg_l30">{{item.StandardName}}</span>
            <span class="col_767676 pull-right">适用年款：
              <a v-if="item.BmNo" href="javascript:void(0)" class="saas_add mg_l0" @click="showModal(index,3)" >查看</a>
              <a v-else href="javascript:void(0)" class="saas_add mg_l0" @click="showModal(index,4)" >+添加</a>
            </span>
            <span class="col_767676 pull-right mg_r70">零件编号：
              <a v-if="item.BmNo" href="javascript:void(0)" class="saas_add mg_l0" @click="showModal(index,1)">查看</a>
              <input v-else placeholder="" v-model="item.Sku" type="text" class="add_input w160 ">
            </span>
        </div>
        <div class="row">
            <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                <label class="control-label pull-left">配件说明：</label>
                <div v-if="item.BmNo" class="pull-left pd_l0 mg_t5 col_767676 f12">
                    {{item.ContentInfo}}
                    <a href="#" class="saas_add" @click="showModal(index,2)">+更好的补充</a>
                </div>
                <div v-else class="pull-left pd_l0 mg_t5 col_767676 f12">
                    <textarea placeholder="备注" v-model="item.ContentInfo" class="form-control w500"></textarea>
                </div>
            </div>
            <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w300">
                <label class="control-label pull-left">品牌：</label>
                <v-select v-if="item.isupdate" :value.sync="item.Brandlist" class="pull-left" :options="brands" :close-on-select="true" placeholder="选择品牌"></v-select>
                <span v-else class="pull-left fN mg_t2 mg_l5">{{item.ProdBrandName||"其它"}}</span>
            </div>
            <div class=" pd_l0 mg_t20 clearfix pd_b20 select_dropdown pull-left w300">
                <label class="control-label pull-left" for="input01"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>供应商编码：</label>
                <input v-if="item.isupdate" placeholder="" v-model="item.DealerNo" type="text" class="add_input w160 form-control pull-left">
                <span v-else class="pull-left fN mg_t2 mg_l5">{{item.DealerNo}}</span>
            </div>
            <div class="pd_l0 mg_t20 clearfix select_dropdown pull-left w300 poR" v-if='stype==1'>
                <label class="control-label pull-left"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>进货价：</label>
                <input vlength=7 v-if="item.isupdate" placeholder="" @focus="showtips(index,0)" type="text" v-model="item.InPrice" :class="'inprice'+index" class="add_input w160 pull-left form-control">
                <label v-if="item.isupdate" class="pull-left fN mg_t2 mg_l5">元</label>
                <label v-else class="pull-left fN mg_t2 mg_l5">{{item.InPrice}}元</label>
                <!-- <div class="price_tip">
                    此价格是给北迈网批量采购的价格
                </div> -->
            </div>
            <div class="cl"></div>
            <!--1、返利  2、差价-->
            <div class="pd_l0 mg_t10 clearfix select_dropdown pull-left w300" v-if='stype==1'>
                <label class="control-label pull-left"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>销售价：</label>
                <input vlength=7 v-if="item.isupdate" @focus="showtips(index,1)" :class="'saleprice'+index" placeholder="" type="text" v-model="item.SalePrice" class="add_input w160 pull-left form-control">
                <label v-if="item.isupdate" class="pull-left fN mg_t2 mg_l5">元</label>
                <label v-else class="pull-left fN mg_t2 mg_l5">{{item.SalePrice}}元</label>
            </div>
            <div class="pd_l0 mg_t10 clearfix select_dropdown pull-left w300" v-else>
                <label class="control-label pull-left"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>进货价：</label>
                <input vlength=7 v-if="item.isupdate" placeholder="" @focus="showtips(index,0)" type="text" v-model="item.InPrice"  :class="'inprice'+index"  class="add_input w160 pull-left form-control">
                <label v-if="item.isupdate" class="pull-left fN mg_t2 mg_l5">元</label>
                <label v-else class="pull-left fN mg_t2 mg_l5">{{item.InPrice}}元</label>
            </div>
            <div class="pd_l0 mg_t10 clearfix select_dropdown pull-left w300">
                <label class="control-label pull-left" for="input01"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>库存数：</label>
                <input vlength=7 v-if="item.isupdate" placeholder="" type="text" v-model='item.StockCount' class="add_input w160 pull-left form-control pull-left">
                <span v-else class="pull-left fN mg_t2 mg_l5">{{item.StockCount}}</span>
            </div>
        </div>
        <div class="col-md-12 mg_t30">
            <a href="#" v-if="item.isupdate" class="btn_red bg8 auto f16 w200 h40"
            :class="{'disable':valid(item)}"
            @click='save(index)'>保&nbsp;存</a>
            <a href="#" v-else class="btn_red bg8 auto f16 w200 h40" @click='item.isupdate=1'>修&nbsp;改</a>
        </div>
    </div>
</div>
<div class="col-md-12 clearfix mg_t20" v-if="!addcount&&!first&&products.length">
    <a href="javascript:void(0)" @click="addproduct" class="green_btn w80 h26 pull-right">+点击添加</a>
    <span class="pull-right h26 f12 mg_r10 col_767676">没找到您想要的商品？</span>
</div>
<div class="col-md-12 clearfix mg_t20" v-if="addcount" v-if="!addcount&&!first">
    <a href="javascript:void(0)" @click="addproduct" class="green_btn w80 h26 pull-right">+继续添加</a>
</div>
<div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20" v-if="!addcount&&!first&&!products.length">
    <img src="../../../images/saas04.png" class="block auto mg_t20">
    <div class="w240 clearfix mg_t30 mg_b30 auto">
        <a href="#" class="green_btn w80 h26 pull-right" @click="addproduct">+点击添加</a>
        <span class="pull-right h26 f12 mg_r10 col_767676">没找到您想要的商品？</span>
    </div>
</div>


<upload upid=".imgs"> </upload>
<supplement-sku :show.sync="showsku" :list="model.SkuList" :bmno="model.BmNo"></supplement-sku>
<supplement-demo :show.sync="showdemo" :bmno="model.BmNo" :stockid="model.StockId"></supplement-demo>
<supplement-year v-ref:year :isadd="isadd" :show.sync="showyear" :bmno="model.BmNo" :exists="exists"></supplement-year>
<partsyearlist :show.sync="showyears" :list="model.SuitCarList" :bmno="model.BmNo"></partsyearlist>
<validate></validate>
</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
import {
    option as vOption
}
from 'vue-strap'
import upload from '../../general/upload.vue'
import nothing from '../../general/upload.vue'
import convert from '../../utils/convert.js'
import store from 'store'
import supplementSku from '../../modal/supplementSku.vue';
import supplementDemo from '../../modal/supplementDemo.vue';
import supplementYear from '../../modal/supplementYear.vue';
import partsyearlist from '../../modal/partsyearlist.vue';
import validate from '../../general/validate.vue'
import DateFormat from '../../utils/DateFormat.js'
export default {
    components: {
        vSelect, vOption, upload, nothing, supplementSku, supplementDemo, supplementYear, partsyearlist,validate
    },
    data() {
        return {
            products: [],
            standardlist: [],
            brands: [],
            first: true,
            stype: document.getElementById('user').getAttribute('stype'),
            showsku: false,
            skuList: [],
            bmno: "",
            stockid: "",
            showdemo: false,
            showyears: false,
            showyear: false,
            pindex: 0,

        }
    },
    ready() {
        //this.query();
        //获取经销商品牌
        var _this = this;
        Vue.http.get('/product/GetBrands', {}).then(function(response) {
            let arr = [];
            response.data.map(x => arr.push({
                value: x.BrandId.toString(),
                label: x.BrandName
            }));
            arr.push({
                value: "0",
                label: "其它"
            });
            _this.brands = arr;
        });
    },
    computed: {
        model() {
                if (!this.products.length) {
                    return {};
                }
                return this.products[this.pindex];
            },
            exists() {
                if (!this.products.length) {
                    return [];
                }
                let arr = [];
                let model = this.products[this.pindex];
                if(this.model.SuitCarList && this.model.SuitCarList.length){
                  model.SuitCarList.map(x => arr.push(x.PartsYearId));
                  if (model.SupplementSuitcar && model.SupplementSuitcar.length) {
                      model.SupplementSuitcar.map(x => arr.push(x));
                  }
                }

                return arr;
            },
            isadd(){
              if (!this.products.length) {
                  return false;
              }
              return !this.products[this.pindex].Id;
            },
            addcount() {
                let _this = this;
                let count = 0;
                if (_this.products.length) {
                    _this.products.forEach(function(item) {
                        if (!item.BmNo) {
                            count++;
                        }
                    })
                }
                return count;
            }
    },
    events: {
        'upload': function(data) {
            let index = data.CurrentBtn.attr('index');
            let url = data.url;
            let model = this.products[index];
            //如果是已添加商品则直接插入数据库
            if (!model.isupdate && model.StockId) {
                Vue.http.post(`/product/AddImg?url=${url}&stockid=${model.StockId}`).then(function(res) {
                    res.data.showdel = false;
                    model.Imglist.push(res.data);
                })
            } else {
                model.Imglist.push({
                    Id: 0,
                    StockId: 0,
                    ImgUrl: url,
                    showdel: false
                });
            }
            model.showimg = url;
        },
        'addyear': function(arr){
          let sid=this.products[this.pindex].StandardId;
          let sname=this.products[this.pindex].StandardName;
          arr.forEach(function(item){
            item.StandardNameId=sid;
            item.StandardName=sname;
          })
          this.products[this.pindex].SuitCarList=arr;
        }
    },
    methods: {
        query(param, callback) {
                //获取数据
                let _this = this;
                Vue.http.get('/product/GetParts', {
                    pid: param[0],
                    cid: param[2],
                    yid: param[3]
                }).then(function(response) {
                    //扩充字段
                    if (_this.first) {
                        _this.first = false;
                    }

                    let data = response.data;
                    data.forEach(function(item) {
                      item.AddTime=DateFormat(item.AddTime,1);
                        //获取商品图片
                        let temp = item;
                        if (item.StockId) {
                            Vue.http.get('/product/GetImgList?Stockid=' + item.StockId).then(function(res) {
                                if (res.data.length) {
                                    res.data.forEach(function(item) {
                                        item.showdel = false;
                                    })
                                    temp.Imglist = res.data;
                                    temp.showimg = res.data[0].ImgUrl;
                                }
                            })
                        }
                        //获取适用性和SKU列表
                        if(item.Id){
                          Vue.http.get('/product/GetSuitCar?bmno=' + item.BmNo).then(function(response) {
                            item.SuitCarList = response.data;
                          })
                          if(item.Sku){
                            item.SkuList=item.Sku.split(',');
                          }
                        }else{
                          Vue.http.get('/product/GetSuitCarAndSku?bmno=' + item.BmNo).then(function(response) {
                                  if (response.data.ok) {
                                      item.SuitCarList = response.data.data;
                                      item.SkuList = response.data.data2;
                                      item.Sku=item.SkuList.join(',');
                                  }
                              }, function(err) {
                                  console.log('获取适用性失败');
                              })
                        }

                            //获取已补充年款
                        Vue.http.get('/product/GetSuit?bmno=' + item.BmNo).then(function(res) {
                            if (res.data && res.data.length) {
                                item.SupplementSuitcar = res.data;
                            }
                        });

                        item.Brandlist = [_this.brands[0].value];
                        item.Imglist = [];
                        item.showimg = "";
                        if (item.ProdBrandId > 0) {
                            item.Brandlist.push(item.ProdBrandId.toString());
                        }
                        if (!item.Id && item.SkuList) {
                            item.Sku = item.SkuList.join(',');
                        }
                        if (!item.Id) {
                            item.StockCount = "";
                            item.SalePrice = "";
                            item.InPrice = "";
                        }
                        //0待修改 1 待保存 2待添加
                        item.isupdate = item.Id ? 0 : 1;
                    })
                    _this.products = data;
                    callback();
                }, function(response) {
                    console.log('查询无数据');
                });
            },
            valid(item){
              return  !item.DealerNo || !item.SuitCarList.length ||(this.stype==1?!item.SalePrice:!item.InPrice)||!item.StockCount
              || isNaN(parseInt(item.StockCount)) ||(this.stype==1&&isNaN(parseInt(item.SalePrice))) || isNaN(parseInt(item.InPrice)) ||!item.Sku
              || item.SalePrice.length>7 || item.InPrice.length>7 || item.StockCount.length>7;
            },
            save(index) {
                let _this = this;
                let model = this.products[index];
                //valid
                if (this.valid(model)) {
                    return false;
                }
                if(!model.Id && !model.SuitCarList){
                  layer.alert('请添加年款');
                  return false;
                }
                //主机厂id
                let param = store.get('param');
                model.FactoryId = param[1];
                //品牌处理
                model.ProdBrandId = model.Brandlist[0];
                if (parseInt(model.ProdBrandId) > 0) {
                    model.ProdBrandName = _this.brands.filter(function(item) {
                        return item.value == model.ProdBrandId;
                    })[0].label;
                }
                //保存
                model.isupdate = 0;
                if(!model.Id){
                  model.SkuList=model.Sku.split(',');
                }

                Vue.http.post('/product/SaveProduct', {model: model}).then(function(response) {
                    if (response.data.ok) {
                      let data=response.data.data;
                      model.Id = data.Id;
                      model.BmNo = data.BmNo;
                      model.Imglist.forEach(function(item,index){
                        item.Id=data.Imglist[index].Id;
                      })
                        //_this.products[index]=response.data.data;
                    }else{
                      model.isupdate = 1;
                      layer.alert(response.data.mes);
                    }
                }, function(response) {
                    model.isupdate = 1;
                    console.log('保存失败');
                });
            },
            addproduct() {
                let param = store.get('param');
                var addmodel = {
                    Id: 0,
                    BmNo: 0,
                    isupdate: 1,
                    Brandlist: [this.brands[0].value],
                    StandardId: param[0],
                    StandardName: param[param.length - 1],
                    ProdName: param[param.length - 1],
                    Imglist: [],
                    showimg: "",
                    SuitCarList: [],
                };
                this.products.push(addmodel);
                Vue.nextTick(function() {
                    // DOM 更新了
                    $('.container-fluid').animate({
                        scrollTop: $('.row').height()
                    });
                })
            },
            delimg(item, img, index) {
                layer.confirm('确认删除吗', {
                    btn: ['删除', '取消'] //按钮
                }, function() {
                    if (img.Id) {
                        Vue.http.post('/product/DeleteImg?id=' + img.Id).then(function(response) {
                            if (response.data) {
                                item.Imglist.splice(index, 1);
                                item.showimg = item.Imglist.length ? item.Imglist[0].ImgUrl : "";
                                layer.msg('删除成功', {
                                    icon: 1,
                                    time: 800
                                });
                            }
                        }, function() {
                            layer.msg('删除失败', {
                                icon: 5,
                                time: 800
                            });
                        });
                    } else {
                        item.showimg = "";
                        item.Imglist.splice(index, 1);
                        layer.msg('删除成功', {
                            icon: 1,
                            time: 800
                        });
                    }

                }, function() {

                });
            },
            showModal(index, type) {
                this.pindex = index;
                switch (type) {
                    case 1:
                        this.showsku = true;
                        break;
                    case 2:
                        this.showdemo = true;
                        break;
                    case 3:
                        this.showyears = true;
                        break;
                    case 4:
                        this.showyear = true;
                        break;
                }
            },
            showtips(index,type){
              let arr=[{class:'.inprice',info:'此价格是给北迈网采购的价格'},{class:'.saleprice',info:'此价格是在销售平台上显示的销售价格'}];
              let dom= arr[type].class+index;
              let tips = layer.tips(arr[type].info,dom , {
                tips: [1, '#3595CC'],
                time: 3000
              });
              $(dom).blur(function(){
                layer.close(tips);
              })
            }
    }
}

</script>
