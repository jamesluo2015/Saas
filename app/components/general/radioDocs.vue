<template id="">
  <a href="#" v-for="(index,item) in options"
  @click="value=item.val" +
  :class="{'saas_moren':item.val==value,'saas_moren_gray':item.val!=value,left:!index,'mg_l20':index}"
  class=" col_767676 mg_t10 pull-left text-none ">{{item.text}}</a>
</template>
<script>
  export default{
    components:{},
    props:{
      value:{
        type: Number
      },
      options:{
        type: Array
      },
      left:{
        type: String
      }
    },
  }
</script>
