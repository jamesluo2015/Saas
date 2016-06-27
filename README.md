## Start

安装依赖包
```bash
npm i
```
开发 /build/
```bash
npm run dev
```
部署 /dist/
```bash
npm run build
```
### 技术栈

vuejs webpack es6

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
import vSelect from 'vue-strap/src/select'

<v-select :value.sync="standardname" :search="true" :options="standardlist" :close-on-select="true" placeholder="选择标准名称">
</v-select>
//选择时间
import datepicker from 'vue-strap/src/datepicker'
<datepicker :value.sync="sdate" :disabled-days-of-Week="disabled" format="yyyy-MM-dd" Width="120px" class="pull-left ">
</datepicker>

//分页
import pageDocs from '../general/pageDocs.vue'
<page-docs :count='count'></page-docs>

//tab切换
import tab from '../general/tab.vue'
<tab :data="tablist" :value="0" :tips="tips"></tab>

//单选
import radio from '../general/radioDocs.vue'
<radio :value.sync="model.GroupID" :options="radios" left="mg_l20"></radio>

//输入框提示
import textinfo from '../general/textinfo.vue'
<textinfo :value.sync="model.ExpressName" :list="showlist" width="170px" class=" pull-left"></textinfo>

//上传控件
import upload from '../general/upload.vue'
<upload upid=".filter-btn"></upload>

//模态框
import modal from 'vue-strap/src/modal'
<modal :show.sync="showModel" effect="fade" width="360px" :title="title">
  <div slot="modal-body" class="modal-body ">

  </div>
</modal>
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

  },
  'model.text': function(val){

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
        type: Number,
        default: 0
    }
},
```
