<style scoped>

.item-move {
    /* applied to the element when moving */
    transition: transform .5s cubic-bezier(.55, 0, .1, 1);
}

</style>

<template>

<table class="table table2 mg_t20 table3">
    <tr>
        <th width="6%">序号</th>
        <th width="10%">配件名称</th>
        <th width="9%">适用年款</th>
        <th width="9%">零件编号</th>
        <th width="22%">配件说明</th>
        <th width="9%">品牌</th>
        <th width="9%">供应商编码</th>
        <th width="10%">*北迈价（元）</th>
        <th width="7%">*库存数</th>
        <th width="9%">操作</th>
    </tr>
    <tr v-for="(index, item) in products" transition="item">
        <td>{{index+1}}</td>
        <!--通用-->
        <td v-if="item.BmNo">{{item.StandardName}}</td>
        <td v-else>
            <v-select v-else :value.sync="item.standard" :search="true" :options="standardlist" :close-on-select="true" placeholder="标准名称"></v-select>
        </td>
        <!--适用性-->
        <td v-if="item.BmNo"><a class='cursor' @click="getsuitcars(index)">查看</a></td>
        <td v-else>
          <a class='cursor' >添加</a>
        </td>
        <!--零件编号-->
        <td v-if="item.BmNo">{{item.Sku}}</td>
        <td v-else>
            <input type="text" placeholder="零件编号" class="form-control" v-model="item.Sku" />
        </td>
        <!--配件说明-->
        <td v-if="item.BmNo">{{item.ContentInfo}}</td>
        <td v-else>
            <input type="text" placeholder="配件说明" class="form-control" v-model="item.ContentInfo" />
        </td>
        <!--品牌-->
        <td v-if="item.isupdate">
            <!--<input type="text" placeholder="品牌" class="form-control" bmtitle="此价格是在北迈网上显示的销售价格" v-model="item.ProdBrandName" />-->
            <v-select :value.sync="item.Brandlist" :search="true" :options="brands" :close-on-select="true" placeholder="品牌"></v-select>
        </td>
        <td v-else>{{item.ProdBrandName||"其它"}}</td>

        <!--经销商编码-->
        <td v-if="item.isupdate">
            <input type="text" placeholder="供应商编码" class="form-control" v-model="item.DealerNo" />
        </td>
        <td v-else>{{item.DealerNo}}</td>

        <!--北迈价-->
        <td v-if="item.isupdate">
            <input type="text" placeholder="北迈价" class="form-control" v-model="item.SalePrice" />
        </td>
        <td v-else>{{item.SalePrice}}</td>

        <!--库存-->
        <td v-if="item.isupdate">
            <input type="text" placeholder="库存" v-model='item.StockCount' class="form-control" />
        </td>
        <td v-else>{{item.StockCount}}</td>

        <td v-if="item.isupdate"><a class="cursor col_007aff f12 f_song" @click='save(index)'>保存</a></td>
        <td v-else><a class="cursor col_007aff f12 f_song" @click='item.isupdate=1'>修改</a></td>
    </tr>
    <tr>
        <td colspan="10" v-if="!addcount&&!first" :class="{'text-right':products.length}">
            没有找到您想要的商品？<a href="#" @click="addproduct"><span class="label label-warning">点击添加</span></a>
        </td>
        <td colspan="10" v-if="addcount" class="text-right">
            <a href="#" @click="addproduct"><span class="label label-warning">继续添加</span></a>
        </td>
    </tr>
    </tr>
</table>
<div>
    <modalcar-docs title="查看年款" :list="modalist" :showmodal.sync="modalshow"></modalcar-docs>
</div>

</template>

<script>

import vSelect from 'vue-strap/src/Select.vue'
import vOption from 'vue-strap/src/Option.vue'
    // import spinner from 'vue-strap/src/Spinner.vue'
import VueAnimatedList from 'vue-animated-list'
import modalcarDocs from '../../general/modalcarDocs.vue'
import store from 'store'
import convert from '../../utils/convert.js'
export default {
    components: {
        vSelect, vOption, VueAnimatedList, modalcarDocs
    },
    data() {
        return {
            products: [],
            standardlist: [],
            brands: [],
            modalist: [],
            modalshow: false,
            first: true
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
                        item.Brandlist = [];
                        if (item.ProdBrandId > 0) {
                            item.Brandlist.push(item.ProdBrandId.toString());
                        }
                        if (!item.Id && item.SkuList) {
                            item.Sku = item.SkuList.join(',');
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
                var addmodel = {
                    BmNo: 0,
                    isupdate: 1,
                    Brandlist: [],
                    standard: []
                };
                this.products.push(addmodel);
            }
    }
}

</script>
