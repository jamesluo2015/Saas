技术栈

vuejs webpack babel npm es6 vue-strap vue-resourc vue-spinner

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
import { select as vSelect } from 'vue-strap'

<v-select :value.sync="standardname" :search="true" :options="standardlist" :close-on-select="true" placeholder="选择标准名称">
</v-select>
//选择时间
import { datepicker } from 'vue-strap'
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
import { modal } from 'vue-strap'
<modal :show.sync="showModel" effect="fade" width="360px">
  <div slot="modal-header" class="modal-header ">
      <button type="button" class="close " @click="showModel=false"><span>×</span></button>
      <h4 class="modal-title">{{title}}</h4>
  </div>
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
