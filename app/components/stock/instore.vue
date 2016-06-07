

<template id="">

<!--入库-->
<modal :show.sync="showin" effect="fade" width="360px" title="商品入库">
    <div slot="modal-body" class="modal-body">
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">标准名称：</label>
            <v-select :value.sync="stand" :options="standards" :close-on-select="true" placeholder="标准名称"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">供应商编码：</label>
            <v-select :value.sync="dealerno" :options="dealernos" :close-on-select="true" placeholder="供应商"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">选择库区：</label>
            <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">选择库房：</label>
            <v-select :value.sync="house" :options="houses" :close-on-select="true" placeholder="选择库房"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">选择货位：</label>
            <v-select :value.sync="slot" :options="slots" :close-on-select="true" placeholder="选择货位"></v-select>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">入库数量：</label>
            <input placeholder="" v-model="quantity" class="add_input w160 pull-left form-control" type="text">
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">品相：</label>
            <radio :value.sync="type" :options="radios" left="mg_l20"></radio>
        </div>
        <div class="col-md-12 mg_t20 mg_b20 clearfix">
            <a href="javascript:void(0)" class="btn_red bg8 mg_t20 auto w120 h26" :class="{'disable':!valid}" @click="instore">确&nbsp;定</a>
        </div>
    </div>
</modal>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
import {
    modal
}
from 'vue-strap'
import radio from '../general/radioDocs.vue'
export default {
    components: {
        vSelect, modal, radio
    },
    props: {
        showin: {
            type: Boolean,
            default: false
        },
        selectlist: {
            type: Array
        }
    },
    data() {
        return {
            standards: [],
            stand: [],
            dealernos: [],
            dealerno: [],
            area: [],
            house: [],
            slot: [],
            type: 0,
            radios: [{
                text: '正品',
                val: 0
            }, {
                text: '残品',
                val: 1
            }],
            quantity: ""
        }
    },
    ready() {
        let _this = this;
        Vue.http.get('/stock/GetStandardNames').then(function(res) {
            if (res.data.length) {
                res.data.forEach(function(item) {
                    item.value = item.value.toString();
                })
                _this.standards = res.data;
            } else {
                // layer.alert('请添加商品后再进行入库操作!');
            }
        })
    },
    methods: {
        instore() {
            if (!this.valid) {
                return false;
            }
            let model = {
                    StockCount: this.quantity,
                    StockId: this.dealerno[0],
                    ProdType: this.type,
                    AreaId: this.area[0],
                    StoreId: this.house[0],
                    //SlotCode: this.slot[0]
                }
                //获取库区名称和code
                let slotid=this.slot[0];
            this.selectlist.forEach(function(item) {
                if (item.value == model.AreaId) {
                    model.AreaCode = item.code;
                    model.AreaName = item.label;
                } else if (item.value == model.StoreId) {
                    model.StoreCode = item.code;
                    model.StoreName = item.label;
                } else if(item.value==slotid){
                  model.SlotCode=item.label;
                }
            })
            let _this=this;
            Vue.http.post('/stock/SaveStockMain', JSON.stringify(model)).then(function(res) {
              _this.$dispatch('instore', res.data)
              _this.showin=false;
              //clear
              _this.quantity=0;
            })
        }
    },
    watch: {
        stand(val) {
            let _this = this;
            if (_this.stand.length) {
                let stand = _this.stand[0];
                Vue.http.get('/stock/GetDealerNoByStandard?sid=' + stand).then(function(res) {
                    if (res.data.length) {
                        res.data.forEach(function(item) {
                            item.value = item.value.toString();
                        })
                        _this.dealernos = res.data;
                        _this.dealerno = [res.data[0].value]
                    }
                })
            }
        }
    },
    computed: {
        valid() {
                if (!this.quantity || !this.stand.length || !this.dealerno.length || !this.slot.length || isNaN(parseInt(this.quantity)) ) {
                    return false;
                }
                return true;
            },
            areas() {
                let arr = [];
                this.selectlist.forEach(function(item) {
                    if (item.level == 1) {
                        arr.push({
                            label: item.label,
                            value: item.value
                        })
                    }
                });
                return arr;
            },
            houses() {
                let arr = [];
                let _this = this;
                if (this.area.length) {
                    this.selectlist.forEach(function(item) {
                        if (item.level == 2 && item.pid == _this.area[0]) {
                            arr.push({
                                label: item.label,
                                value: item.value
                            })
                        }
                    })
                }
                return arr;
            },
            slots() {
                let arr = [];
                let _this = this;
                if (this.house.length) {
                    this.selectlist.forEach(function(item) {
                        if (item.level == 3 && item.pid == _this.house[0]) {
                            arr.push({
                                label: item.label,
                                value: item.value
                            })
                        }
                    })
                }
                return arr;
            },
    },

}

</script>
