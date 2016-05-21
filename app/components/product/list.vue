

<template>

<div class="right_contain">
    <div class="row">
        <head-docs v-if="!isupdate" :pagesize="pagesize"></head-docs>
        <table-docs :list='list' v-if="!isupdate"></table-docs>
        <update-docs v-if="isupdate" :model="model"></update-docs>
        <page-docs v-show="!isupdate" :count='count'></page-docs>
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
            model: {},
            count: 0,
            pagesize: 10,
            model: {}
        }
    },
    methods: {

    },
    events: {
        //编辑
        'update': function(model) {
            this.model = model;
            this.isupdate = true;
        },
        //修改模版保存事件
        'save': function() {
            this.isupdate = false;
        },
        //查询商品 返回分页数据、总数
        'GetProducts': function(result) {
            result.data.forEach(function(item){
              item.AddTime=DateFormat(item.AddTime)
            })
            this.list = result.data;
            this.count = Math.ceil(result.count / this.pagesize);
        },
        //分页
        'page': function(index) {
            this.$children[0].query(index);
        }
    },
    computed: {

    }
}

</script>
