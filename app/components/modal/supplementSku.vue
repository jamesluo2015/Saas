

<template id="">

<modal :show.sync="show" effect="fade" width="360px" title="配件编号列表">
    <div slot="modal-body" class="modal-body ">
      <div class="bd_bD_d9 modal-list clearfix pd_r20 pd_b20">
          <ul class="clearfix" >
              <li v-for="item in list">{{item}}</li>
          </ul>
          <a href="#" class="pull-right red_link" @click="supplement=true">我有更好的补充</a>
      </div>
      <div class="mg_t20" v-show="supplement">
          <p class="f12 col_767676">输入要补充的SKU，多个用逗号分隔</p>
          <div class="pull-left pd_l0 col_767676 f12">
              <textarea placeholder="" v-model="skus" class="form-control w300"></textarea>
          </div>
          <div class="col-md-12 mg_t10 mg_b20 clearfix pull-left">
              <a href="#" class="btn_red bg8 mg_t20 mg_l40 w80 h26 pull-left" @class="{'disable':!skus}" @click="commit">确&nbsp;定</a>
              <a href="#" class="gray mg_t20 mg_l30 w80 h26 pull-left" @click="show=false">取&nbsp;消</a>
          </div>
      </div>
    </div>
</modal>

</template>

<script>

import {
    modal
}
from 'vue-strap'
export default {
    components: {
        modal
    },
    props:{
      show: {
        type:Boolean,
        default: false
      },
      list: {
        type: Array
      },
      bmno:{
        required: true
      },
      supplement:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return {
        // supplement: false,
        skus: ""
      }
    },
    methods: {
      commit(){
        if(!this.skus){
          return false;
        }
        let _this=this;
        //判断
        let isexists= this.list.some(function(item){
          return _this.skus.indexOf(item)>-1;
        })
        if(isexists){
          layer.alert('不允许与现有零件编号重复');
          return false;
        }


        Vue.http.post(`/product/AddSkus?bmno=${this.bmno}&skus=${this.skus}`).then(function(res){
          _this.show=false;
          layer.msg('提交成功',{icon:1,time:800});
        })
      }
    },
    watch:{
      show(val){
        if(!val){
          //this.supplement=false;
        }
      }
    }
}

</script>
