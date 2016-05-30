

<template id="">

<div class="right_contain1">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <div class="dropdown pull-left mg_l30" _v-0691d5dd="">
                <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30" _v-0691d5dd="">
                <v-select :value.sync="house" :options="houses" :close-on-select="true" placeholder="选择库房"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30" _v-0691d5dd="">
                <v-select :value.sync="slot" :options="slots" :close-on-select="true" placeholder="选择货位"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30" _v-0691d5dd="">
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" placeholder="选择条件"></v-select>
            </div>
            <input placeholder="" v-model="key" class="add_input w140 pull-left form-control mg_l30" type="text">
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
        </div>
        <div class="col-md-12 pd_l0 bg10 h40 bdT_d0d0d0">
            <ul class="clearfix">
                <li class="t-c w_33 pull-left">商品总数量</li>
                <li class="t-c w_33 pull-left">正品数量</li>
                <li class="t-c w_33 pull-left">残品数量</li>
            </ul>
        </div>
        <ul class="col-md-12 pd_l0 clearfix mg_t30">
            <li class="t-c w_33 pull-left f26">{{countlist[0]}}</li>
            <li class="t-c w_33 pull-left f26">{{countlist[1]}}</li>
            <li class="t-c w_33 pull-left f26">{{countlist[2]}}</li>
        </ul>
        <div class="col-md-12 pd_l0">
            <a href="#" class="btn_green f14 w160 h30 auto mg_t20 mg_b20">入&nbsp;库</a>
        </div>
    </div>
</div>

<div class="right_contain1 mg_t15 mg_b20 pd_t0" v-if="list.length">
    <div class="row">
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th width="15%">商品名称</th>
                        <th width="12%">实物ID</th>
                        <th width="11%">数量</th>
                        <th width="11%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in list">
                    <tr>
                        <td>{{item.ProdName}}</td>
                        <td>{{item.StockId}}</td>
                        <td>{{item.StockCount}}</td>
                        <td><a href="#" class="saas_add mg_l0">查看</a></td>
                    </tr>
                </tbody>
            </table>
            <page-docs :count="count"></page-docs>
        </div>
    </div>
</div>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
import buttonDocs from '../general/buttonDocs.vue'
import pageDocs from '../general/pageDocs.vue'
export default {
    components: {
        vSelect, buttonDocs, pageDocs
    },
    data() {
        return {
            areas: [],
            area: [],
            houses: [],
            house: [],
            slots: [],
            slot: [],
            typelist: [{
                value: '1',
                label: '商品名称'
            }, {
                value: '2',
                label: '实物ID'
            }],
            type: [],
            list: [],
            countlist: [0,0,0],
            pagesize: 3,
            pageindex: 1,
            count: 0
        }
    },
    ready() {
        this.query();
        let _this = this;
        Vue.http.get('/stock/GetStockCount').then(function(res) {
            _this.countlist = res.data;
        })
    },
    methods: {
        query() {
            let _this = this;
            let param = {
                pagesize: _this.pagesize,
                pageindex: _this.pageindex,
            }
            Vue.http.get('/stock/GetStockMain', param).then(function(res) {
                if (res.data.ok) {
                    _this.list = res.data.data;
                    _this.count = Math.ceil(res.data.count / _this.pagesize);
                } else {
                    layer.alert(res.data.mes);
                }
            })
        }
    },
    events: {
        'page': function(index) {
          this.pageindex=index;
          this.query();
        }
    }
}

</script>
