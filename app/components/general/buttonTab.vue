<template>
  <ul class="modal_sell clearfix ">
      <li v-for="item in list" :class="{'checked':index==$index}" @click="index=$index">
        <a href="javascript:void(0)">{{item.text||item}}</a>
      </li>
  </ul>
</template>
<script>
export default {
  components: {  },
  props:{
    list:{
      type:Array
    },
    index:{
      type:Number
    }
  },
  data(){
     return {

     }
  },
  ready(){

  },
  methods: {
  }
}
</script>
