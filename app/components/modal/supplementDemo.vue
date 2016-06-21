

<template id="">

<modal :show.sync="show" effect="fade" width="360px" :backdrop="false" title="请输入要补充的配件说明">
    <div slot="modal-body" class="modal-body ">
      <div class="pull-left pd_l0 col_767676 f12">
          <textarea placeholder="" v-model="txtdemo" class="form-control w300"></textarea>
      </div>
      <div class="col-md-12 mg_t10 mg_b20 clearfix pull-left">
          <a href="#" class="btn_red bg8 mg_t20 mg_l40 w80 h26 pull-left" :class="{'disable':!txtdemo}" @click="commit">确&nbsp;定</a>
          <a href="#" class="gray mg_t20 mg_l30 w80 h26 pull-left" @click="show=false">取&nbsp;消</a>
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
      show:{
        type:Boolean,
        default: false
      },
      stockid:{

      },
      bmno:{
        required: true
      }
    },
    data(){
      return {
        txtdemo: ""
      }
    },
    methods: {
      commit(){
        let _this=this;
        if(this.stockid){
          Vue.http.post(`/product/AddDesc?bmno=${this.bmno}&stockid=${this.stockid}&text=${this.txtdemo}`).then(function(res){
            _this.show=false;
            layer.msg('提交成功',{icon:1,time:800});
          })
        }else{

        }
        this.show=false;
      }
    }
}

</script>
