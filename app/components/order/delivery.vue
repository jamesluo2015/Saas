

<template>

<template v-if="show">

    <div class="right_contain1">
        <div class="row">
            <div class="col-md-12 pd_l0 pd_r0 mg_r0">
                <div class="bdB_d0d0d0 lineH30 pd_b10 clearfix">
                    <span class="mg_l20 pull-left">来源单号：{{model.SourceOrderId}}</span>
                    <span class="mg_l110 pull-left">订单号：{{model.OrderCode}}</span>
                    <span class="mg_l110 pull-left">订单状态：{{model.OrderStatus>2?"已发货":"待发货"}}</span>
                    <img :src="'/content/images/third'+model.SourceId+'.png'" class="pull-right mg_r10">
                </div>
                <div class="mg_1">
                    <div class="bg10 h40">
                        <span class="mg_l20">收货人和物流信息</span>
                    </div>
                    <div class="bd_tD_d9 bdB_d0d0d0 mg_t2 clearfix">
                        <img :src="'/content/images/third'+model.SourceId+'.png'" class="pull-left mg_l70 mg_t20">
                        <div class="pull-left">
                            <div class="mg_t20 clearfix select_dropdown">
                                <label class="control-label pull-left mg_l15 col_010101">收货地址：</label>
                                <p class="pull-left pd_l0 mg_t2">
                                    <span>{{model.Address}}，{{model.Receiver}}，{{model.TelPhone}}</span>
                                </p>
                            </div>
                            <div class="col-md-12 clearfix select_dropdown">
                                <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w300">
                                    <label class="control-label pull-left">配送方式：</label>
                                    <v-select :value.sync="express" :options="expresslist" :close-on-select="true" placeholder="请选择快递公司"></v-select>
                                </div>
                                <div class=" pd_l0 mg_t20 clearfix pd_b20 select_dropdown pull-left w300">
                                    <label class="control-label pull-left" for="input01">运单编号：</label>
                                    <input placeholder="" v-model="expressno" class="add_input w160 form-control pull-left" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mg_1">
                    <div class="bg10 h40">
                        <span class="mg_l20">选择发货位</span>
                    </div>
                    <div class="bd_tD_d9 bd_bD_d9 pd_b20 mg_t2 clearfix">
                        <div class="col-md-12 clearfix select_dropdown" v-for="detail in model.OrderDetails">
                            <span class="pull-left mg_t20 mg_l10">{{detail.ProdName}}</span>
                            <span class="pull-left mg_t20 mg_l40">x{{detail.Quantity}}</span>
                            <em class="pull-left mg_t20 col_b5 fS mg_l40">|</em>
                            <span class="pull-left mg_t20 mg_l40">供应商编码：{{detail.DealerProdNo}}</span>
                            <em class="pull-left mg_t20 col_b5 fS mg_l40">|</em>
                            <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w250">
                                <label class="control-label pull-left f12 lineH20">选择库位：</label>
                                <v-select :value.sync="detail.slot" width="w300" placeholder="请选择库存" multiple :options="detail.selects"></v-select>
                                <!-- <span class="mg_l10">货位优先级{{detail.slot.join('>')}}</span> -->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 clearfix select_dropdown">
                        <a href="#" class="btn_red bg8 f14 w120 h30 mg_t20 mg_b20 pull-left mg-l40" :class="{'disable':!valid}" @click="commit">确认发货</a>
                        <a href="#" class="btn_green f14 w120 h30 mg_t20 mg_b20 mg_l30 pull-left" @click="show=false">返&nbsp;回</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

</template>

<script>
import vSelect from 'vue-strap/src/select'
export default {
    components: {
        vSelect
    },
    props: {
        model: {
            type: Object
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            express: [],
            expresslist: [{
                label: "顺丰",
                value: "0"
            }],
            expressno: "",
            // arealist: [],
            // houselist: [],
            slotlist: [],
            slots: []
        }
    },
    computed: {
        valid() {
            if (!this.expressno) {
                return false;
            }
            let isslot = this.model.OrderDetails.some(function(item) {
                return item.slot.length == 0;
            })
            if (isslot) {
                return false;
            }
            if(!this.express.length){
              return false;
            }
            return true;
        },
    },
    ready() {
        let _this = this;
        Vue.http.get('/config/GetExpress', {}).then(function(response) {
            let data = response.data;
            let arr = [];

            data.forEach(function(item) {
                arr.push({
                    label: item.ExpressName,
                    value: item.Id.toString()
                })
                if (item.IsDefault) {
                    _this.express = [item.Id.toString()];
                }
            })
            _this.expresslist = arr;
        });
    },
    watch: {

    },
    methods: {
        commit() {
            //确认发货
            if (!this.valid) {
                return false;
            }
            let _this = this;
            let expreesname = "";
            for (var i = 0; i < this.expresslist.length; i++) {
                let item = this.expresslist[i]
                if (item.value == _this.express[0]) {
                    expreesname = item.label;
                    break;
                }
            };
            _this.model.ExpressName= expreesname;
            _this.model.ExpressNo= this.expressno;
            let model = {
                OrderCode: this.model.OrderCode,
                SoStatus: 1,
                SourceType: this.model.SourceType,
                SourceOrderId: this.model.SourceOrderId,
                ExpressId: this.express[0],
                ExpressName: expreesname,
                ExpressNo: this.expressno,
                SourceId: this.model.SourceId
            };
            let DetailList = [];
            let LockList = [];

            for (var j = 0; j < this.model.OrderDetails.length; j++) {
              let item =  this.model.OrderDetails[j]

                let temp = {
                    StockId: item.StockId,
                    ProdName: item.ProdName,
                    SmallPic: item.SmallPic,
                    SalePrice: item.SalePrice,
                    Quantity: item.Quantity,
                    DealerProdNo: item.DealerProdNo,
                    FactoryId: item.FactoryId,
                    CarModelId: item.CarModelId,
                    CarYearId: item.CarYearId,
                    FactoryName: item.FactoryName,
                    CarModelName: item.CarModelName,
                    CarYearName: item.CarYearName
                }
                DetailList.push(temp);
                //锁定列表
                let isok=true;
                item.slot.sort(function(a,b){
                  return parseInt(b)-parseInt(a);
                })
                let length=item.slot.length;
                let prodcount=item.Quantity;
                for (var k = 0; k < length; k++) {
                  let s=item.slot[k]
                  let count = item.selects.filter(function(sel) {
                      return sel.value == s;
                  })[0].count;

                  if(count>item.Quantity && length>1){
                    layer.alert('您选择货位库存数与商品数量不符，请重新选择');
                    return false;
                  }
                  //库存数
                  let lockcount=0;
                  if(count>=prodcount){
                    lockcount=prodcount;
                    prodcount=0;

                    if(length>(k+1)){
                      layer.alert('您选择货位库存数与商品数量不符，请重新选择');
                      return false;
                    }
                  }else{
                    prodcount-=count;
                    lockcount=count;
                  }
                  let lock = {
                      MainId: s,
                      LockCount: lockcount
                  }
                  LockList.push(lock);

                  if(length==(k+1) && prodcount){
                    layer.alert('您选择的货位总库存数小于商品数量');
                    return false;
                  }

                }
            }
            model.DetailList = DetailList;
            model.LockList = LockList;
            Vue.http.post('/order/SaveOrderShip', {
                model: model
            }).then(function(res) {
                _this.show = false;
                _this.model.OrderStatus=3;
            })
        },
        getlabel(){

        }
    }
}

</script>
