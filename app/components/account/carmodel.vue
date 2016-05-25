

<template>

<!-- <tab :data="tablist" :value="2"></tab> -->
<div class="col-md-12 pd_l0 mg_t10 select_dropdown clearfix z-top">
    <filter-docs :list='fac_select' placeholder="请选择主机厂">
    </filter-docs>
</div>
<div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20 mg-t15">
    <table class="table table2 table_bg table_center">
        <thead>
            <tr>
                <th width="30%">序号</th>
                <th width="40%">主机厂</th>
                <th width="30%">车型</th>
            </tr>
        </thead>
        <tbody v-for="(index,item) in showlist">
            <tr>
                <td>{{index+1}}</td>
                <td>{{item.FactoryName}}</td>
                <td>{{item.CarModelName}}</td>
            </tr>
        </tbody>

    </table>
    <page-docs :count='pagecount'></page-docs>
</div>

</template>

<script>

import filterDocs from './filterDocs.vue'
import pageDocs from '../general/pageDocs.vue'
import tab from '../general/tabDocs.vue'
export default {
    components: {
        filterDocs, pageDocs, tab
    },
    data() {
        return {
            carlist: [],
            pageindex: 1,
            pagesize: 10,
            fac: 0,
            // tablist: [{
            //     val: 1,
            //     text: "允许经营品类"
            // }, {
            //     val: 2,
            //     text: "允许经营车型"
            // }],
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
        },
        // 'tab':function(val){
        //   if(val==1){
        //     window.location.href="/account/category";
        //   }
        // }
    },
}

</script>
