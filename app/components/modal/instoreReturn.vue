

<template id="">

<modal :show.sync="show" effect="fade" :backdrop="false" width="800px" title="退货单入库">
    <div slot="modal-body" class="modal-body ">
        <table class="table table2 table_bg mg_t10 pd_b20">
            <thead>
                <tr>
                    <th width="15%">配件名称</th>
                    <th width="8%">供应商编码</th>
                    <th width="13%">订单号</th>
                    <th width="12%">退货数量</th>
                    <th width="8%">入库数量</th>
                    <th width="19%">品相</th>
                    <th width="21%">货位</th>
                </tr>
            </thead>
            <tbody v-for="item in model.Details" v-if="model && model.Details.length && item.InCount < item.ReturnQuantity">
                <tr>
                    <td>{{item.ProdName}}</td>
                    <td>{{item.DealerProdNo}}</td>
                    <td>{{item.RoCode}}</td>
                    <td>
                        {{item.ReturnQuantity}}(已入库{{item.InCount}})
                    </td>
                    <td>
                        <input type="text" v-model="item.Quantity" class="add_input w40 pull-left form-control" />
                    </td>
                    <td>
                        <radio :value.sync="item.ProdType" :options="radios" left="mg_l20"></radio>
                    </td>
                    <td>
                        <div class="clearfix select_dropdown">
                            <div class="dropdown pull-left">
                                <v-select :value.sync="item.SlotCode" :search="true" :options="slotcodelist" :close-on-select="true" placeholder="选择货位">
                                    </select>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <a href="#" class="btn_red bg8 mg_t50 mg_b30 auto w120 h26" :class='{disable: valid}' @click="commit">确定入库</a>
    </div>
</modal>

</template>

<script>

import {
    modal
}
from 'vue-strap'
import {
    select as vSelect
}
from 'vue-strap'
import radio from '../general/radioDocs.vue'
export default {
    components: {
        modal, radio, vSelect
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        model: {
            type: Object
        }
    },
    data() {
        return {
            radios: [{
                text: '正品',
                val: 0
            }, {
                text: '残品',
                val: 1
            }],
            selectlist: []
        }
    },
    methods: {
        commit() {
          if(this.valid){
            return false;
          }
            let _this = this;
            let arr = [];
            let details=[];
            for (var n = 0; n < this.model.Details.length; n++) {
                let item = this.model.Details[n];
                if (!item.Quantity || !item.SlotCode.length) {
                    // layer.alert('请正确添加数量和货位信息', {
                    //     icon: 5
                    // });
                    // return false;
                    continue;
                }
                item.InCount+=parseInt(item.Quantity);
                _this.model.InCount+=parseInt(item.Quantity);
                details.push(item);
                let model = {
                        StockCount: item.Quantity,
                        StockId: item.StockId,
                        ProdType: item.ProdType,
                        ProdBrandId: item.ProdBrandId || 0,
                        InCount: item.Quantity

                        //SlotCode: this.slot[0]
                    }

                    //获取库区名称和code
                let slot = item.SlotCode[0];
                for (var i = 0; i < this.selectlist.length; i++) {
                    let item = this.selectlist[i]
                    if (item.value == slot && item.level == 3) {
                        model.SlotCode = item.label;
                        model.SlotId=item.value;
                        model.StoreId = item.pid;

                        for (var i = 0; i < this.selectlist.length; i++) {
                            let item2 = this.selectlist[i]
                            if (item2.value == model.StoreId && item2.level == 2) {
                                model.StoreCode = item2.code;
                                model.StoreName = item2.label;
                                model.AreaId = item2.pid;

                                for (var i = 0; i < this.selectlist.length; i++) {
                                    let item3 = this.selectlist[i]
                                    if (item3.value == model.AreaId && item3.level == 1) {
                                        model.AreaCode = item3.code;
                                        model.AreaName = item3.label;
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                arr.push(model);
            }
            Vue.http.post('/stock/SaveStockMainList', {
                list: arr
            }).then(function(res) {
                // _this.$dispatch('instoreReturn', res.data)
                _this.show = false;
                // if (res.data.length) {
                //     layer.alert("入库失败,以下实物ID的商品不存在:<br/>" + res.data.join(','));
                // } else {
                  if(_this.model.InCount>=_this.model.Quantity){
                    _this.model.RoStatus = 3;
                  }
                  Vue.http.post('/order/SaveReturnDetails',{list:details}).then(function(res){

                  })
                  Vue.http.post('/order/Receiving', {
                      model: _this.model
                  }).then(function(res) {
                      if (res.data.length) {
                          layer.msg('入库成功', {
                              icon: 1,
                              time: 800
                          });
                      }
                  })
                // }
            })
        }
    },
    ready() {
        let _this = this;
        Vue.http.get('/stock/GetSelect').then(function(res) {
            _this.selectlist = res.data;
        })
    },
    computed: {
      valid(){
        let result=false;
        let count=0;
         this.model.Details.forEach(function(item){
           if(item.ReturnQuantity>item.InCount){
             if(item.Quantity>0){
               count+=item.Quantity;
               if(item.Quantity>(item.ReturnQuantity-item.InCount) || isNaN(parseInt(item.Quantity)) || !item.SlotCode.length){
                 result=true;
               }
             }
           }
        })
        if(!count){
          result=true;
        }
        return result;
      },
        slotcodelist() {
            let arr = [];
            let _this = this;
            this.selectlist.forEach(function(item) {
                if (item.level == 3) {
                    arr.push({
                        label: item.code,
                        value: item.value
                    })
                }
            })
            return arr;
        },
    }
}

</script>
