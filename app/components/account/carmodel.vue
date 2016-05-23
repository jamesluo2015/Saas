

<template>

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 select_dropdown clearfix z-top">
            <filter-docs :list='fac_select' placeholder="请选择主机厂">
            </filter-docs>
        </div>
        <div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20 mg-t15">
            <div class="shop_info pd_5">
                <table class="table table2 mg_t15 table3">
                    <thead>
                        <tr>
                            <th width="20%">序号</th>
                            <th width="40%">主机厂</th>
                            <th width="40%">车型</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table_bg" v-for="(index,item) in showlist">
                            <td>{{index+1}}</td>
                            <td>{{item.FactoryName}}</td>
                            <td>{{item.CarModelName}}</td>
                    </tbody>
                </table>
                <page-docs :count='pagecount'></page-docs>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import filterDocs from '../general/filterDocs.vue'
import pageDocs from '../general/pageDocs.vue'
export default {
    components: {
        filterDocs, pageDocs
    },
    data() {
        return {
            carlist: [],
            pageindex: 1,
            pagesize: 10,
            fac: 0
        }
    },
    ready() {
        let _this = this;
        Vue.http.get('/product/GetCarmodel').then(function(response) {
            _this.carlist = response.data;
        }, function(response) {
            console.log('没有车型信息');
        });
    },
    computed: {
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
        showlist: function() {
            let st = (this.pageindex - 1) * this.pagesize;
            let end = this.pageindex * this.pagesize;
            let _this = this;
            return this.carlist.filter(function(item, index) {
                let factemp = _this.fac ? item.FactoryId == _this.fac : true;
                return index >= st && index < end && factemp;
            })
        },
        pagecount: function() {
            let _this = this;
            let list = this.carlist.filter(function(item, index) {
                let factemp = _this.fac ? item.FactoryId == _this.fac : true;
                return factemp;
            })
            return Math.ceil(list.length / this.pagesize);
        }
    },
    events: {
        'select': function(val) {
            this.fac = val[0];
        },
        'page': function(val) {
            this.pageindex = val;
        }
    },
}

</script>
