<template>

<div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20" v-for="(index, item) in products">
    <div class="pull-left mg_l30">
        <a href="#" class="saas_up_big">
            <img v-if="item.showimg" :src="item.showimg">
            <img v-else src="../../../images/addimg.png">
        </a>

        <ul class="goods_img1 clearfix mg_t10">
            <li v-for="(imgindex,img) in item.Imglist" @click="item.showimg=img.ImgUrl">
                <a href="javascript:void(0)" @mouseover="img.showdel=true" @mouseout="img.showdel=false">
                    <img :src="img.ImgUrl" >
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
            <span class="col_767676 pull-left mg-l40">零件编号：
              <a v-if="item.BmNo" href="javascript:void(0)" class="saas_add mg_l0">查看</a>
              <input v-else placeholder="" v-model="item.Sku" type="text" class="add_input w160 ">
            </span>
            <span class="col_767676 pull-right mg_r70">适用年款：
              <a v-if="item.BmNo" href="javascript:void(0)" class="saas_add mg_l0" @click="getsuitcars(index)">查看</a>
              <a v-else href="javascript:void(0)" class="saas_add mg_l0" >+添加</a>
            </span>
        </div>
        <div class="row">
            <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                <label class="control-label pull-left">配件说明：</label>
                <div v-if="item.BmNo" class="pull-left pd_l0 mg_t5 col_767676 f12">
                    {{item.ContentInfo}}
                    <a href="#" class="saas_add">+更好的补充</a>
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
            <div class="cl"></div>
            <!--1、返利  2、差价-->
            <div class="pd_l0 mg_t10 clearfix select_dropdown pull-left w300" v-if='stype==1'>
                <label class="control-label pull-left"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>销售价：</label>
                <input v-if="item.isupdate" placeholder="" type="text" v-model="item.SalePrice" number class="add_input w160 pull-left form-control">
                <label v-if="item.isupdate" class="pull-left fN mg_t2 mg_l5">元</label>
                <label v-else class="pull-left fN mg_t2 mg_l5">{{item.SalePrice}}元</label>
            </div>
            <div class="pd_l0 mg_t10 clearfix select_dropdown pull-left w300" v-else>
                <label class="control-label pull-left"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>进货价：</label>
                <input v-if="item.isupdate" placeholder="" type="text" v-model="item.InPrice" number class="add_input w160 pull-left form-control">
                <label v-if="item.isupdate" class="pull-left fN mg_t2 mg_l5">元</label>
                <label v-else class="pull-left fN mg_t2 mg_l5">{{item.InPrice}}元</label>
            </div>
            <div class="pd_l0 mg_t10 clearfix select_dropdown pull-left w300">
                <label class="control-label pull-left" for="input01"><em v-if="item.isupdate" class="col_fb2727 mg_r5">*</em>库存数：</label>
                <input v-if="item.isupdate" placeholder="" type="text" v-model='item.StockCount' number class="add_input w160 pull-left form-control pull-left">
                <span v-else class="pull-left fN mg_t2 mg_l5">{{item.StockCount}}</span>
            </div>
        </div>
        <div class="col-md-12 mg_t30">
            <a href="#" v-if="item.isupdate" class="btn_red bg8 auto f16 w200 h40" :class="{'disable':!item.DealerNo||!item.SalePrice||!item.StockCount}" @click='save(index)'>保&nbsp;存</a>
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

<div>
    <modalcar-docs title="查看年款" :list="modalist" :showmodal.sync="modalshow"></modalcar-docs>
</div>
<upload upid=".imgs"> </upload>

</template>

<script>
import {select as vSelect} from 'vue-strap'
import {option as vOption} from 'vue-strap'
import modalcarDocs from '../../general/modalcarDocs.vue'
import upload from '../../general/upload.vue'
import nothing from '../../general/upload.vue'
import convert from '../../utils/convert.js'
import store from 'store'

export default {
    components: {
        vSelect, vOption, modalcarDocs, upload,nothing
    },
    data() {
        return {
            products: [],
            standardlist: [],
            brands: [],
            modalist: [],
            modalshow: false,
            first: true,
            stype: document.getElementById('user').getAttribute('stype')
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
            if(!model.isupdate&&model.StockId){
              Vue.http.post(`/product/AddImg?url=${url}&stockid=${model.StockId}`).then(function(res){
                res.data.showdel=false;
                model.Imglist.push(res.data);
              })
            }else{
              model.Imglist.push({
                  ImgUrl: url,
                  showdel: false
              });
            }
            model.showimg = url;
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
                        //获取商品图片
                        let temp = item;
                        if (item.StockId) {
                            Vue.http.get('/product/GetImgList?Stockid=' + item.StockId).then(function(res) {
                                if (res.data.length) {
                                  res.data.forEach(function(item){
                                    item.showdel=false;
                                  })
                                    temp.Imglist = res.data;
                                    temp.showimg = res.data[0].ImgUrl;
                                }
                            })
                        }
                        Vue.http.get('/product/GetSuitCarAndSku?bmno=' + item.BmNo).then(function(response) {
                          if(response.data.ok){
                              item.SuitCarList = response.data.data;
                              item.SkuList = response.data.data2;
                          }
                        }, function(err) {
                            console.log('获取适用性失败');
                        })

                        item.Brandlist = [_this.brands[0].value];
                        item.Imglist = [];
                        item.showimg = "";
                        if (item.ProdBrandId > 0) {
                            item.Brandlist.push(item.ProdBrandId.toString());
                        }
                        if (!item.Id && item.SkuList) {
                            item.Sku = item.SkuList.join(',');
                        }
                        if(!item.Id){
                          item.StockCount="";
                          item.SalePrice="";
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
            save(index) {
                let _this = this;
                let model = this.products[index];
                //valid
                if(!model.DealerNo||!model.SalePrice||!model.StockCount){
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
                Vue.http.post('/product/SaveProduct', JSON.stringify(model)).then(function(response) {
                    if (!response.data.ok) {
                        layer.alert(response.data.mes);
                    }
                }, function(response) {
                    console.log('保存失败');
                });
            },
            getsuitcars(index) {
                let item = this.products[index];
                //根据年款id分组
                let suitcars = item.SuitCarList;
                this.modalist = convert(suitcars);
                this.modalshow = true;
            },
            addproduct() {
                let param = store.get('param');
                var addmodel = {
                    BmNo: 0,
                    isupdate: 1,
                    Brandlist: [this.brands[0].value],
                    StandardId: param[0],
                    StandardName: param[param.length - 1],
                    Imglist: [],
                    showimg: ""
                };
                this.products.push(addmodel);
                Vue.nextTick(function () {
                  // DOM 更新了
                  $('.container-fluid').animate({scrollTop: $('.row').height()});
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
                                item.showimg = item.Imglist.length?item.Imglist[0].ImgUrl:"";
                                layer.msg('删除成功', {
                                    icon: 1,
                                    time:800
                                });
                            }
                        }, function() {
                            layer.msg('删除失败', {
                                icon: 5,
                                time:800
                            });
                        });
                    } else {
                        item.showimg = "";
                        item.Imglist.splice(index, 1);
                        layer.msg('删除成功', {
                            icon: 1,
                            time:800
                        });
                    }

                }, function() {

                });
            }
    }
}

</script>
