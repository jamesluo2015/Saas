

<template>

<div class="right_contain">
    <div class="row">
        <head-docs v-ref:head v-show="!isupdate" :pagesize="pagesize"></head-docs>
        <table-docs v-ref:table v-ref:table :list='list' v-if="!isupdate"></table-docs>
        <update-docs v-if="isupdate" :model="model"></update-docs>
        <page-docs v-if="!isupdate" :count='count'></page-docs>
    </div>
</div>

</template>

<script>

import headDocs from './list/headDocs.vue'
import tableDocs from './list/tableDocs.vue'
import updateDocs from './list/updateDocs.vue'
import pageDocs from '../general/pageDocs.vue'
import DateFormat from '../utils/DateFormat.js'

export default {
    components: {
        headDocs, tableDocs, updateDocs, pageDocs
    },
    data() {
        return {
            list: [],
            isupdate: false,
            //model: {},
            count: 0,
            pagesize: 10,
            pageindex: 1,
            model: {},
            index:0
        }
    },
    methods: {

    },
    events: {
        //编辑
        'update': function(index) {
            this.model = this.list[index];
            this.index = index;
            this.isupdate = true;
        },
        //修改模版保存事件
        'save': function(model) {
            let _this=this;
            //保存到数据库
            Vue.http.post('/product/SaveProduct', {model:model}).then(function(response) {
                if (!response.data.ok) {
                    layer.alert(response.data.mes);
                }
                layer.msg('保存成功',{icon:1,time:800});
                _this.isupdate = false;
            }, function(response) {
                console.log('保存失败');
            });
        },
        'cancel': function() {
            this.isupdate = false;
        },
        //查询商品 返回分页数据、总数
        'GetProducts': function(result) {
            if (result.count) {

                result.data.forEach(function(item) {
                    item.AddTime = DateFormat(item.AddTime)
                    
                    //改为通过数据库查询
                     Vue.http.get('/product/GetSuitCar?bmno=' + item.BmNo).then(function(response) {
                       item.SuitCarList = response.data;
                     })
                     if(item.Sku){
                       item.SkuList=item.Sku.split(',');
                     }
                        //获取已补充年款
                        item.SupplementSuitcar=[];
                    // Vue.http.get('/product/GetSuit?bmno=' + item.BmNo).then(function(res) {
                    //     if (res.data && res.data.length) {
                    //         item.SupplementSuitcar = res.data;
                    //     }
                    // });
                })
                this.list = result.data;
                this.count = Math.ceil(result.count / this.pagesize);
            } else {
                this.list = [];
                this.count = 0;
                //layer.alert('查询无数据');
            }
        },
        //分页
        'page': function(index) {
            // this.$refs.head.pindex=-1;
            this.pageindex = index;
            this.$refs.head.query(index);
        },
        'tab': function(val) {
            // this.$refs.head.pindex=-1;
            this.$refs.head.state = val;
            this.$refs.head.query(1);
        }
    },
    computed: {

    }
}

</script>
