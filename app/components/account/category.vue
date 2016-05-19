

<template>
<div class="col-md-12 pd_l0 mg_t10 select_dropdown clearfix z-top">
<filter-docs :list='root_select' placeholder="请选择一级分类">
</filter-docs>
</div>
<div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20 mg-t15">
    <div class="shop_info pd_5">
        <table class="table table2 mg_t15 table3">
            <thead>
                <tr>
                    <th width="10%">序号</th>
                    <th width="30%">一级分类</th>
                    <th width="30%">二级分类</th>
                    <th width="30%">标准名称</th>
                </tr>
            </thead>
            <tbody>
              <tr class="table_bg" v-for="(index,item) in showlist">
                    <td>{{index+1}}</td>
                    <td>{{item.RootName}}</td>
                    <td>{{item.ClassName}}</td>
                    <td>{{item.StandardName}}</td>
            </tbody>
        </table>
        <page-docs :count='pagecount'></page-docs>
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
            classlist: [],
            pageindex: 1,
            pagesize: 10,
            rootid: 0
        }
    },
    ready() {
        let _this = this;
        Vue.http.get('/product/GetStandards').then(function(response) {
            _this.classlist = response.data;
        }, function(response) {
            console.log('没有分类信息');
        });
    },
    computed: {
        root_select: function() {
            let arr = [];
            if (this.classlist.length) {
                let s = new Set();
                //筛选
                this.classlist.forEach(function(item) {
                    if (!s.has(item.RootId)) {
                        arr.push({
                            value: item.RootId.toString(),
                            label: item.RootName
                        });
                    }
                    s.add(item.RootId);
                })
            }
            return arr;
        },
        showlist: function() {
            let st = (this.pageindex - 1) * this.pagesize;
            let end = this.pageindex*this.pagesize;
            let _this=this;
            //筛选主机厂
            let list=_this.classlist.filter(function(item, index) {
              let temp=_this.rootid?item.RootId==_this.rootid:true;
                return temp;
            })
            return list.filter(function(item, index) {
                return index >= st && index < end;
            })
        },
        pagecount: function() {
          let _this=this;
           let list=_this.classlist.filter(function(item, index) {
             let temp=_this.rootid?item.RootId==_this.rootid:true;
               return temp;
           })
            return Math.ceil(list.length / this.pagesize);
        }
    },
    events: {
        'select': function(val) {
          this.rootid=val[0];
        },
        'page': function(val) {
          this.pageindex=val;
        }
    },
    methods:{

    }
}

</script>
