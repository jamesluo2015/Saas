<template>
  <div id='paging' v-if="count>0">

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
        let first=true;
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
              if(!first){
                _this.$dispatch('page',obj.curr)
              }else{
                first=false;
              }
            }
        })
      }else{

      }
    },

  },
  data(){
     return {

     }
  },
  methods: {

  }
}
</script>
