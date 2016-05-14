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
                <td v-if="item.BmNo>0">{{item.SkuList.join(',')}}</td>
                <td v-if="item.BmNo>0">{{item.ContentInfo}}</td>
                <!--品牌-->
                <td v-if="item.Id">{{item.ProdBrandName}}</td>
                <td v-else>
                    <!--<input type="text" placeholder="品牌" class="form-control" bmtitle="此价格是在北迈网上显示的销售价格" v-model="item.ProdBrandName" />-->
                     <v-select :value.sync="item.Brandlist" :search="true"  :options="brands"  :close-on-select="true" placeholder="品牌" ></v-select>
                </td>
                <!--经销商编码-->
                <td v-if="item.Id">{{item.DealerNo}}</td>
                 <td v-else>
                    <input type="text" placeholder="供应商编码" class="form-control"  v-model="item.DealerNo" />
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
                
                <td v-if="item.Id"><a class="cursor col_007aff f12 f_song" @click='update(index)'>修改</a></td>
                <td v-else><a class="cursor col_007aff f12 f_song" @click='save(index)'>保存</a></td>
            </tr>
        </tr>
    </table>
  <div>
  <modalcar-docs title="查看年款" ></modalcar-docs>
  </div>
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
import VueAnimatedList from 'vue-animated-list';
import modalcarDocs from './modalcarDocs.vue'

export default {
   components: { vSelect,vOption,VueAnimatedList,modalcarDocs },
   data() {
      return {
        products:[],
        brands: [],
      }
    },
    ready(){
      //this.query();
      //获取经销商品牌
      var _this=this;
      Vue.http.post( '/product/IGetBrands',{}).then(function (response) {
          let arr=[];
          response.data.map(x=>arr.push({
              value: x.BrandId.toString(),
              label: x.BrandName
          }))
            _this.brands=arr;
        });
    },
    computed: {
      
    },
    methods : {
      query(param,callback){
        //获取数据
        let _this=this;
        Vue.http.post( '/product/IGetParts',{ pid: param[0],cid:param[1],yid:param[2]}).then(function (response) {
        //扩充字段
            let data=response.data;
            data.forEach(function(item){
                 item.Brandlist=[]
            })
            _this.products=data;
            callback();
        }, function (response) {
            console.log('查询无数据');
        });
      },
      save(index){
        let model=this.products[index];
        Vue.http.post( '/product/SaveProduct',JSON.stringify(model)).then(function (response) {
            model.Id=1;
        }, function (response) {
            console.log('保存失败');
        });
      },
      update(index){
          let model=this.products[index];
          model.Id=0;
      },
      getsuitcars(index){
          let item=this.products[index];
          this.$children[0].showmodal=true;
          this.$children[0].list=[
              {
                  title:"一汽大众-迈腾",
                  carlist: [{
                      text:"新迈腾 2.0TSI 六档自动 (2012-)",
                      desc: "aa"
                  },
                  {
                      text:"新迈腾 2.0TSI 六档自动 (2012-)",
                  }]
              }
          ];
      }
    }
}
</script>
<style scoped>
    
</style>