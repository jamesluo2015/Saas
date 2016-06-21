

<template id="">

<modal :show.sync="show" effect="fade" width="500px" :backdrop="false"  title="开单货位选择">
    <div slot="modal-body" class="modal-body ">
        <table class="table table2 table4 table_bg mg_t10">
            <thead>
                <tr>
                    <th width="8%">货位</th>
                    <th width="9%">库存数</th>
                    <th width="9%">开单数量</th>
                </tr>
            </thead>
            <tbody v-for="item in list">
                <tr>
                    <td>{{item.SlotCode}}</td>
                    <td>{{item.StockCount}}</td>
                    <td>
                        <input placeholder="" v-model="item.OutCount" class="add_input w100 form-control auto" type="text">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="col-md-12 mg_b20">
            <a href="#" class="btn_red bg8 f14 w70 h26 auto" :class="{'disable':!valid}" @click="add">添&nbsp;加</a>
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
    props: {
        show: {
            type: Boolean,
            default: false
        },
        list:{
          type: Array
        },
        callback:{
          type: Function
        }
    },
    computed:{
      valid(){
        let icount=0;
        if(this.list && this.list.length){
          for (var i = 0; i < this.list.length; i++) {
            let item=this.list[i];
            if(isNaN(parseInt(item.OutCount||0))){
              return false;
            }
            if(item.OutCount>item.StockCount){
              layer.msg('开单数量不允许大于当前货位的库存数', {
                  icon: 7,
                  time: 2000
              });
              return false;
            }
            icount += parseInt(item.OutCount||0)
          }
        }
        return !!icount;
      }
    },
    methods: {
      add(){
        if(!this.valid){
          return false;
        }
        this.show=false;
        this.callback();
      }
    }
}

</script>
