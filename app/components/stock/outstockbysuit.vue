<template lang="html">
<head-docs v-ref:head storename="param2" :callback='query'></head-docs>
<table class="table table2 table_bg mg_t2">
    <thead>
        <tr>
            <th width="11%">名称</th>
            <th width="12%">供应商码</th>
            <th width="20%">车型</th>
            <th width="10%">库存数</th>
            <th width="13%">销售单价</th>
            <th width="11%">操作</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in products">
            <td>{{item.ProdName}}</td>
            <td>{{item.DealerProdNo}}</td>
            <td>奇瑞瑞虎5 1，6L 2006-2012</td>
            <td>{{item.StockCount}}</td>
            <td>
                <input placeholder="" v-model="item.SalePrice" class="add_input w100 form-control" type="text">
            </td>
            <td><a href="#" class="saas_add mg_l0" @click="show($index)">选择货位</a></td>
        </tr>
    </tbody>
</table>
<nothing v-if="!products.length"></nothing>
<stockbill :show.sync="showModal" :list="model.Slots" :callback='add'></stockbill>
</template>

<script>
import headDocs from '../product/addprodbysuit/headDocs.vue'
import nothing from '../general/nothing.vue'
import stockbill from '../modal/stockbill.vue'
export default {
  data: function () {
    return {
      products: [],
      pindex: -1,
      showModal: false,
    }
  },
  computed: {
    model(){
      if(this.pindex>=0){
        return this.products[this.pindex];
      }
      return {};
    }
  },
  ready: function () {},
  attached: function () {},
  methods: {
    query(param){
      let parameter = {
          sid: param[0],
          cid: param[2],
          yid: param[3]
      }
      let _this=this;
      Vue.http.get('/stock/GetProd', parameter).then(function(res) {
        _this.$refs.head.isquery=false;
          if (res.data.length) {
              _this.products = res.data;
          } else {
              _this.product = [];
          }
      })
    },
    add() {
        // if (!this.valid) {
        //     return false;
        // }
        let model=this.model
        model.SalePrice = parseInt(model.SalePrice);
        this.$dispatch('add', model)
    },
    show(index){
      let saleprice=this.products[index].SalePrice;
      if(!saleprice || isNaN(parseInt(saleprice))){
        // layer.alert('请输入正确的销售价');
        layer.msg('请输入正确的销售价', {
            icon: 7,
            time: 2000
        });
        return false;
      }
      this.showModal= true;
      this.pindex= index;
    }
  },
  components: { headDocs, nothing, stockbill }
}
</script>

<style lang="css">
</style>
