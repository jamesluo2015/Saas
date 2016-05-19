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
        <tr v-for="(index, item) in products" transition="item" >
                <td>{{index+1}}</td>
                <!--通用-->
                <td v-if="item.BmNo>0">{{item.StandardName}}</td>
                <td v-if="item.BmNo>0"><a class='cursor' @click="getsuitcars(index)">查看</a></td>
                <td v-if="item.BmNo>0">{{item.Sku}}</td>
                <td v-if="item.BmNo>0">{{item.ContentInfo}}</td>
                <!--品牌-->
                <td v-if="item.isupdate">
                    <!--<input type="text" placeholder="品牌" class="form-control" bmtitle="此价格是在北迈网上显示的销售价格" v-model="item.ProdBrandName" />-->
                     <v-select :value.sync="item.Brandlist" :search="true"  :options="brands"  :close-on-select="true" placeholder="品牌" ></v-select>
                </td>
                <td v-else>{{item.ProdBrandName||"其它"}}</td>

                <!--经销商编码-->
                <td v-if="item.isupdate">
                    <input type="text" placeholder="供应商编码" class="form-control"  v-model="item.DealerNo" />
                </td>
                <td v-else>{{item.DealerNo}}</td>

                <!--北迈价-->
                <td v-if="item.isupdate">
                    <input type="text" placeholder="北迈价库存" class="form-control" v-model="item.SalePrice"/>
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
        </tr>
    </table>
  <div>
  <modalcar-docs title="查看年款" :list="modalist" :showmodal.sync="modalshow"></modalcar-docs>
  </div>
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue'
import vOption from 'vue-strap/src/Option.vue'
import VueAnimatedList from 'vue-animated-list'
import modalcarDocs from '../general/modalcarDocs.vue'
import store from 'store'
import convert from '../../utils/convert.js'

export default {
   components: { vSelect,vOption,VueAnimatedList,modalcarDocs },
   data() {
      return {
        products:[],
        brands: [],
        modalist:[],
        modalshow:false
      }
    },
    ready(){
      //this.query();
      //获取经销商品牌
      var _this=this;
      Vue.http.get( '/product/GetBrands',{}).then(function (response) {
          let arr=[];
          response.data.map(x=>arr.push({
              value: x.BrandId.toString(),
              label: x.BrandName
          }));
          arr.push({
            value: "0",
            label: "其它"
          });
          _this.brands=arr;
        });
    },
    computed: {

    },
    methods : {
      query(param,callback){
        //获取数据
        let _this=this;
        Vue.http.get( '/product/GetParts',{ pid: param[0],cid:param[2],yid:param[3]}).then(function (response) {
        //扩充字段
            let data=response.data;
            data.forEach(function(item){
                 item.Brandlist=[];
                 if(item.ProdBrandId>0){
                     item.Brandlist.push(item.ProdBrandId.toString());
                 }
                 if(!item.Id&&item.SkuList){
                     item.Sku=item.SkuList.join(',');
                 }
                 //0待修改 1 待保存 2待添加
                 item.isupdate=item.Id?0:1;
            })
            _this.products=data;
            callback();
        }, function (response) {
            console.log('查询无数据');
        });
      },
      save(index){
        let _this=this;
        let model=this.products[index];
        //主机厂id
        let param=store.get('param');
        model.FactoryId=param[1];
        //品牌处理
        model.ProdBrandId=model.Brandlist[0];
        if(parseInt(model.ProdBrandId)>0){
          model.ProdBrandName= _this.brands.filter(function(item){
              return item.value==model.ProdBrandId;
          })[0].label;
        }
        //保存
        model.isupdate=0;
        Vue.http.post( '/product/SaveProduct',JSON.stringify(model)).then(function (response) {
          if(!response.data.ok){
            alert(response.data.mes);
          }
        }, function (response) {
            console.log('保存失败');
        });
      },
      getsuitcars(index){
          let item=this.products[index];
          //根据年款id分组
          let suitcars=item.SuitCarList;
          this.modalist=convert(suitcars);
          this.modalshow=true;
      }
    }
}
</script>
<style scoped>
    .item-move {
    /* applied to the element when moving */
    transition: transform .5s cubic-bezier(.55,0,.1,1);
    }
</style>
