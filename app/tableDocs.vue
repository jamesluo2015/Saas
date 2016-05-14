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
                <td v-if="item.BmNo>0"><a class='cursor'>查看</a></td>
                <td v-if="item.BmNo>0">{{item.SkuList.join(',')}}</td>
                <td v-if="item.BmNo>0">{{item.ContentInfo}}</td>
                <!--品牌-->
                <td v-if="item.Id">{{item.ProdBrandName}}</td>
                <td v-else>
                    <!--<input type="text" placeholder="品牌" class="form-control" bmtitle="此价格是在北迈网上显示的销售价格" v-model="item.ProdBrandName" />-->
                     <v-select :value.sync="item.brandlist" :search="true"  :options="brands"  :close-on-select="true" placeholder="品牌" ></v-select>
                </td>
                <!--经销商编码-->
                <td v-if="item.Id">{{item.DealerNo}}</td>
                 <td v-else>
                    <input type="text" placeholder="经销商编码" class="form-control"  v-model="item.DealerNo" />
                </td>
                <!--北迈价-->
                <td v-if="item.Id">{{item.SalePrice}}</td>
                <td v-else>
                    <input type="text" placeholder="北迈价库存" class="form-control" v-model="item.SalePrice"/>
                </td>
                <!--库存-->
                <td v-if="item.Id"></td>
                <td v-else>
                    <input type="text" placeholder="库存" class="form-control" />
                </td>
                
                <td v-if="item.Id"><a class="cursor col_007aff f12 f_song">修改</a></td>
                <td v-else><a class="cursor col_007aff f12 f_song" @click='save(index)'>保存</a></td>
            </tr>
        </tr>
    </table>
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
import VueAnimatedList from 'vue-animated-list'
export default {
   components: { vSelect,vOption,VueAnimatedList },
   data() {
      return {
        products:[],
        brands: [],
        brandname: []
      }
    },
    ready(){
      this.query();
      //获取经销商品牌
      var _this=this;
      ext.fetch('product', 'IGetBrands', {}, function (data) {
          let arr=[];
          data.map(x=>arr.push({
              value: x.BrandId.toString(),
              label: x.BrandName
          }))
            _this.brands=arr;
        });
    },
    computed: {
      
    },
    watch: {
      
    },
    methods : {
      query(){
        //获取数据
        var _this=this;
        ext.fetch('product', 'IGetParts', { cid: 81,yid:0,pid:687}, function (data) {
            //扩充字段
            data.forEach(function(item){
                item.brandlist=[]
            })
            _this.products=data;
        });
      },
      save(index){
          let item=this.products[index];
          
          console.log(item);
      }
    }
}
</script>
<style scoped>
    
</style>