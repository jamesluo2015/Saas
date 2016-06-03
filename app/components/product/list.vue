

<template>

<div class="right_contain">
    <div class="row">
        <head-docs v-if="!isupdate"  :pagesize="pagesize"></head-docs>
        <table-docs :list='list' v-if="!isupdate"></table-docs>
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
            model: {},
            count: 0,
            pagesize: 10,
            pageindex: 1,
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
        'save': function(model) {
            this.isupdate = false;
            //保存到数据库
            Vue.http.post('/product/SaveProduct', JSON.stringify(model)).then(function(response) {
                if (!response.data.ok) {
                    layer.alert(response.data.mes);
                }
            }, function(response) {
                console.log('保存失败');
            });
        },
        'cancel': function(){
          this.isupdate = false;
        },
        //查询商品 返回分页数据、总数
        'GetProducts': function(result) {
          if(result.count){

            result.data.forEach(function(item) {
                item.AddTime = DateFormat(item.AddTime)
                //异步获取年款和sku
                Vue.http.get('/product/GetSuitCarAndSku?bmno=' + item.BmNo).then(function(response) {
                  if(response.data.ok){
                      item.SuitCarList = response.data.data;
                      item.SkuList = response.data.data2;
                  }
                }, function(err) {
                    console.log('获取适用性失败');
                })
            })
            this.list = result.data;
            this.count = Math.ceil(result.count / this.pagesize);
          }else{
            this.list=[];
            this.count =0;
            //layer.alert('查询无数据');
          }
        },
        //分页
        'page': function(index) {
            this.pageindex = index;
            this.$children[0].query(index);
        },
        'tab': function(val) {
            this.$children[0].state = val;
            this.$children[0].query(1);
        }
    },
    computed: {

    }
}

</script>
