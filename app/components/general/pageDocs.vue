<template>
  <div id='paging'>

  </div>
</template>
<script>

export default {
  components: {  },
  props:{
      count:{
          type: Number
      }
  },
  watch:{
    count(size){
      if(size){
        let _this=this;
        laypage({
            cont: 'paging',
            pages: size,//总页数
            skin: 'bm',
            skip: true,//是否开启跳页
            first: false,
            last: size,
            prev: "<",
            next: ">",
            groups: 3,
            //total: data.length,
            jump: function (obj) {
              _this.$dispatch('page',obj.curr)
            }
        })
      }
    }
  },
  data(){
     return {

     }
  },
  methods: {

  }
}
</script>
