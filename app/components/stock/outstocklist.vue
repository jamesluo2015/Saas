<template lang="html">
  <div class="alert_dialog" v-if="list.length">
      <div class="alert_body poR mg_b20">
          <h3><span class="mg_l15 pull-left">已选配件</span>
            <a href="#" class="pull-right mg_r10 arial" @click="list=[]"></a>
          </h3>
          <div class="w_100 ovau-x">
              <ul class="alert_list clearfix" >
                  <li class="clearfix poR" v-for="item in list" @mouseover="item.ishover=true" @mouseout="item.ishover=false">
                      <img v-if="item.SmallPic" :src="item.SmallPic" class="pull-left" />
                      <img v-else src="../../images/noimg.png" class="pull-left" />
                      <div class="pull-left mg_l10 bd_rD_d9">
                          <p><span class="w80 text-right col_767676">名称：</span><span class="w80">{{item.ProdName}}</span></p>
                          <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥{{item.SalePrice}}</span></p>
                          <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">{{item.Quantity}}</span></p>
                          <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">{{item.DealerProdNo}}</span></p>
                      </div>
                      <div class="alert_list_close" :style="{ display: item.ishover?'block':'' }">
                        <em class="pull-right mg_r5 mg_t5" @click="list.splice($index,1)"></em>
                      </div>
                  </li>
                  <!-- <li class="w200"></li> -->
              </ul>
          </div>
          <div class="alert_right">
              <p class="mg_b0 mg_t7"><span class="w80 text-right col_767676 f12">商品数量：</span><span class="f12">{{allcount[0]}}</span></p>
              <p class="mg_b0 mg_t2"><span class="w80 text-right col_767676 f12">开单总价：</span><span class="col_ed5521 f12">￥{{allcount[1]}}</span></p>
              <a href="javascript:void(0)" class="btn_red bg8 w100 h22 f12 mg_t5 mg_b5" @click="commit">确定开单</a>
              <a href="javascript:void(0)" class="saas_add mg_l30" @click="addmemo">开单备注</a>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      list: [],
      memo: ""
    }
  },
  computed: {
    allcount() {
        let count = 0;
        let price = 0;
        this.list.forEach(function(item) {
            count += item.Quantity;
            price += (item.Quantity * item.SalePrice);
        })
        return [count, price];
    },
  },
  ready: function () {
    layer.config({
        extend: 'extend/layer.ext.js'
    });
  },
  attached: function () {},
  methods: {
    add(model){
      let isexists = this.list.some(function(item) {
          return item.StockId == model.StockId;
      })
      if (isexists) {
          layer.alert('当前商品已在选择列表中');
          return false;
      }
      let icount=0;
      if(model.Slots && model.Slots.length){
        model.Slots.forEach(function(item){
          icount+=parseInt(item.OutCount);
        })
      }
      model.Quantity = icount;

      this.list.splice(0, 0, model);
    },
    commit(){
      let _this=this;
      Vue.http.post('/stock/SaveBills',{list:this.list,memo:this.memo}).then(function(res){
        _this.$parent.dealernoshow=false;
        _this.$parent.query();
      })
    },
    addmemo(){
      let _this = this;
      var prompt = layer.prompt({
          title: '开单备注',
          formType: 2,
          value: _this.memo
      }, function(text) {
          _this.memo = text;
          layer.close(prompt);
      });
    }
  },
  components: {}
}
</script>

<style lang="css">
</style>
