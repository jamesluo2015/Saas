

<template>

<modal :show.sync="show" effect="fade" width="520px" title="查看销售价格">
    <div slot="modal-body" class="modal-body pd_0 clearfix" style="overflow-y:hidden">
        <p class="text-left col_ed5521 mg_l20">适用车型：</p>
        <div class="col-md-12 h370  mg_t5 mg_b5 ovsc-y clearfix select_dropdown">
            <accordion :one-at-atime="false">
                <panel v-for="(index,item) in list | orderBy 'fac'" :header="item.FactoryName" :is-open="false">
                    <ul class="mg_b0" style="*width: 408px;">
                        <li class="clearfix mg_t5 mg_b5" v-for="car in item.carlist" class="clearfix mg_t5 mg_b5">
                            <span class="pull-left lineH26 f12 mg_l10 mg_b10 w120">{{car.Carmodel}}</span>
                            <label class="control-label pull-left lineH20 f10">销售价：<span class="col_ed5521 ">{{car.Price}}</span></label>
                            <!-- <input placeholder="" v-model="car.Price" class="add_input w70 pull-left form-control" type="text"> -->
                            <span class="pull-right lineH26 col_b5 mg_r10 f10">（整车市场参考价：9.8万-15.6万）</span>
                        </li>
                    </ul>
                </panel>
            </accordion>
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
import {
    accordion
}
from 'vue-strap';
import {
    panel
}
from 'vue-strap';
import buttonTab from '../general/buttonTab.vue'
export default {
    components: {
        modal, accordion, panel
    },
    props: {
        show: {
            type: Boolean
        },
        stockid: {
            require: true
        },
        thirdid: {
        }
    },
    data() {
        return {
            list: []
        }
    },
    watch: {
        stockid(val) {
          if(!val){
            return false;
          }
            let _this = this;
            let arr = [];
            Vue.http.get('/product/GetThirdsCarmodel', {
                stockid: this.stockid,
                thirdid: this.thirdid
            }).then(function(res) {
                    if (res.data && res.data.length ) {
                      let cids=[];
                        res.data.forEach(function(car) {
                                cids.push(car.CarModelId);
                                let temp = arr.filter(function(item) {
                                    return item.FactoryId == car.FactoryId;
                                });
                                if (!temp.length) {
                                    arr.push({
                                        FactoryName: car.FactoryName,
                                        FactoryId: car.FactoryId,
                                        carlist: [{
                                            Carmodel: car.CarModelName,
                                            CarmodelId: car.CarModelId,
                                            Level: 1,
                                            Price: car.SalePrice,
                                            ThirdId: car.ThirdId
                                        }]
                                    });
                                } else {
                                    let isexists = temp[0].carlist.some(function(carmodel) {
                                        return carmodel.CarModelId == car.CarModelId;
                                    })
                                    if (!isexists) {
                                        temp[0].carlist.push({
                                            Carmodel: car.CarModelName,
                                            CarmodelId: car.CarModelId,
                                            Level: 1,
                                            Price: car.SalePrice,
                                            ThirdId: car.ThirdId
                                        })
                                    }
                                }
                        })
                      }
                    })
                    _this.list = arr;
            }
        }
    }

</script>
