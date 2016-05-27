# [VueJS](http://cn.vuejs.org/)

### 模版

```js
<template>

</template>
<script>
import headDocs from './app2/headDocs.vue'
export default {
  components: { headDocs },
  data(){
     return {
       param:{}
     }
  },
  methods: {
    query(){

    }
  }
}
</script>
```

### 组件列表

```js
//下拉框
<v-select :value.sync="standardname" :search="true" :options="standardlist" :close-on-select="true" placeholder="选择标准名称">
</v-select>
//选择时间
<datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
</datepicker>
//分页
<page-docs :count='count'></page-docs>
//tab切换
<tab :data="tablist" :value="0" :tips="tips"></tab>
//单选
<radio :value.sync="model.GroupID" :options="radios" left="mg_l20"></radio>
//输入框提示
<textinfo :value.sync="model.ExpressName" :list="showlist" width="170px" class=" pull-left"></textinfo>
//上传控件
<upload upid=".filter-btn"></upload>
```

### 计算属性

```js
computed:{
  attr(){
    return this.text;
  }
}
```

### 监控属性
```js
watch:{
  value(val){

  }
}
```

### 派发事件
```js
//广播
this.$dispatch('event', data)
//接收
events:{
  'event':function(model){
    this.model=model;
  }
},
```

### props
```js
props: {
    model: {
        type: Object,
        default: {}
    }
},
```
