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
<v-select :value.sync="standardname" :search="true" :options="standardlist" :close-on-select="true" placeholder="选择标准名称">
</v-select>
```

### 计算属性

```js
computed:{
  attr(){
    return this.text;
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
