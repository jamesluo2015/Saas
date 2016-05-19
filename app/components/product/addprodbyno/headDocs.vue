<template>
  <div class="row pd_l0 pd_r0 mg_l0 mg_r0 mg_t20 mg_b20">
    <div class="col-md-12 pd_l0 bd_bD_d9 clearfix pd_b20 mg_b20 select_dropdown ">
        <label class="control-label pull-left" for="input01">请输入零件号：</label>
        <div class="select_dropdown">
            <div id="txtKeyWordBox" class="dropdown pull-left ">
                <input type="text" placeholder="请输入原厂配件零件号" class="dropdown-toggle dropdown_toggle form-control w450" id='txtsku' @keypress='showsku' v-model='txtsku'>
                <ul class="dropdown-menu w450"  role="menu" aria-labelledby="dropdownMenu1">
                    <li role="presentation">
                        <a role="menuitem" tabindex="-1" v-for="item in skulist" href="javascript:void(0)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <a href="javascript:void(0)" class="btn_red bg8 w120 h36 pull-left mg_l10" :class="{'unable':!txtsku}" @click='query'>确定</a>
    </div>

       <div class="col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_t20 mg_b20" v-if="isnosku" ms-controller="carinfo">
          <div class="alert alert-danger" role="alert">
              <h3>
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  找不到此零件号,请确认零件号是否正确，或者您可以<a href="/product/addprodbyname"><span class="label label-success">通过类目添加商品</span></a>
              </h3>
          </div>
      </div>
      </div>
</template>
<script>
import store from 'store'

export default {
  components: {  },
  data(){
     return {
       txtsku:"",
       err: false,
       skulist:[],
       isnosku: false,
       model:{},
       brands: []
     }
  },
  ready(){
    //读取 sku
    let sku=store.get('sku');
    if(sku){
      this.txtsku=sku;
    }
  },
  methods: {
    query(){
      let _this=this;
      if(!_this.txtsku){
        SetError('#txtsku');
        return false;
      }

      _this.isnosku=false;
      store.set('sku',_this.txtsku);
      Vue.http.get('/product/GetProdBySku?sku='+_this.txtsku).then(function(res){
        if(res.data&&res.data.BmNo>0){
          //_this.model=res.data;
          _this.$dispatch('skumodel', res.data)
        }else{
          _this.isnosku=true;
        }
      },function(){
        _this.isnosku=true;
      })
    },
    showsku(){
      let _this=this;
      if (!_this.txtsku) {
          return false;
      }
      //关键字查询
      Vue.http.get(`/product/GetSkuList?key=${_this.txtsku}`).then(function(response){
        let data=response.data;
        if(data.length){
          _this.skulist=data;
        }
      },function(){
        _this.skulist=[];
      })
    }
  }
}
</script>
