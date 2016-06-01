

<template>

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
            <label class="control-label pull-left">当前品类：</label>
            <v-select :value.sync="standardname" :options="standardlist" :close-on-select="true" placeholder="选择标准名称">
            </v-select>
        </div>

        <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20">
            <label class="control-label pull-left">适用车型：</label>
            <v-select :value.sync="factory"  class="pull-left mg_r30" :options="fac_select" :close-on-select="true" placeholder="选择主机厂">
            </v-select>
            <v-select id="carmodel" :show.sync="selectshow" :value.sync="carmodel" class="pull-left mg_r30"  :options="car_select" :close-on-select="true" placeholder="选择车型">
            </v-select>
            <v-select :value.sync="partsyear" class="pull-left mg_r30"  :options="yearlist" :close-on-select="true" placeholder="选择年款">
            </v-select>
            <button-docs :text="isquery?'查询中':'查询'" @click='query' :state="!valid || isquery"></button-docs>
        </div>

        <pulse-loader :loading="false"></pulse-loader>
        <table-docs></table-docs>
    </div>
</div>

</template>

<script>

// import selectDocs from './addprodbysuit/selectDocs.vue'
// import spinner from 'vue-strap/src/Spinner.vue';
import {select as vSelect} from 'vue-strap';

import tableDocs from './addprodbysuit/tableDocs.vue'
import buttonDocs from '../general/buttonDocs.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import store from 'store'

export default {
    components: {
        vSelect, buttonDocs, tableDocs, PulseLoader
    },
    data() {
        return {
            isquery: false,
            carlist: [],
            selectshow: false,

            yearlist: [],
            standardlist: [],

            factory: [],
            carmodel: [],
            partsyear: [],
            standardname: [],
            isstore:false
        }
    },
    ready() {
        //加载车型权限信息
        let _this = this;

        // Post request
        Vue.http.get('/product/GetCarmodel').then(function(response) {
            _this.carlist = response.data;
        }, function(response) {
            console.log('没有车型信息');
        });
        //加载标准名称
        Vue.http.get('/product/GetStandards').then(function(response) {
            let result = response.data;
            let arr = [];
            result.map(x => arr.push({
                value: x.StandardId.toString(),
                label: x.StandardName
            }))
            _this.standardlist = arr;
            _this.$children[6].standardlist = arr;
        }, function(response) {
            console.log('没有标准名称');
        });

        //读取store
        let param = store.get('param');
        if (param.length) {
            _this.standardname = [param[0]];
            _this.factory = [param[1]];

            setTimeout(function() {
                _this.carmodel = [param[2]];

                if (param[3] != "0") {
                    setTimeout(function() {
                        _this.partsyear = [param[3]];
                        //用来判断是否默认加载完成
                        _this.isstore=true;
                    }, 500)
                }else{
                  _this.isstore=true;
                }
            }, 500)
        }
    },
    computed: {
        valid: function() {
            // let selects = this.$children;
            // for (let i = 0; i < 3; i++) {
            //     let val = selects[i].value[0] || 0;
            //     if (!val) {
            //         result = false;
            //         break;
            //     }
            // }
            if(!this.standardname.length || ! this.carmodel.length){
              return false;
            }
            return true;
        },
        //主机厂
        fac_select: function() {
            let arr = [];
            if (this.carlist.length) {
                let s = new Set();
                //筛选
                this.carlist.forEach(function(item) {
                    if (!s.has(item.FactoryId)) {
                        arr.push({
                            value: item.FactoryId.toString(),
                            label: item.FactoryName
                        });
                    }
                    s.add(item.FactoryId);
                })
            }
            return arr;
        },
        //车型
        car_select: function() {
            let arr = [];
            let _this = this;
            if (this.factory.length) {
                //_this.carmodel=[];
                _this.carlist.forEach(function(item) {
                        if (item.FactoryId == _this.factory) {
                            arr.push({
                                value: item.CarModelId.toString(),
                                label: item.CarModelName
                            });
                        }
                    })
                    //默认选择车型
                if (arr.length) {
                    _this.carmodel = [arr[0].value];
                }
            }
            return arr;
        }
    },
    methods: {
        query() {
            //防止多次请求
            if (this.isquery || !this.valid) {
                return false;
            }
            let _this = this;
            //valid
            let selects = _this.$children;
            let param = [];
            for (let i = 0; i < 4; i++) {
                let val = selects[i].value[0] || 0;
                if (!val && i < 3) {
                    selects[i].error = true;
                    return false;
                }
                param.push(val.toString());
            }
            param.push(_this.$children[0].selectedItems);
            //querying
            _this.isquery = true;
            _this.$children[6].query(param, function() {
                _this.isquery = false;
            });
            //加入store
            store.set('param', param);
        },
    },
    watch: {
        carmodel(val) {
            //查询年款
            if (val.length) {
                let _this = this;
                _this.partsyear = [];

                Vue.http.get('/product/GetYear?pid=' + val).then(function(response) {
                    let arr = [];
                    response.data.forEach(function(item) {
                            arr.push({
                                value: item.ID.toString(),
                                label: item.YearName
                            });
                        })
                        // if(arr.length){
                        //   _this.partsyear=[arr[0].value];
                        // }
                    _this.yearlist = arr;
                }, function(response) {
                    console.log('没有年款信息');
                });
            }
        },
        factory(val){
          if (val.length&&this.isstore) {
            //document.querySelector('#carmodel button').click()
            this.selectshow=true;
          }
          return false;
        }
    }
}

</script>
