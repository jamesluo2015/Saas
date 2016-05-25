<template id="">
  <ul id="myTab" class="nav nav-tabs nav_tabs clearfix">
      <li v-for="(index,item) in data" :class="{'active':item.val==value}" :val="item.val" @click="click(item)">
        <a href="#choice_name" data-toggle="tab">
          {{item.text}}
          <span class="mg_l10" v-if="tips&&tips.length">{{tips[index]}}</span>
        </a>
      </li>
  </ul>
</template>
<script>
  export default{
    props:{
      data:{
        type: Array
      },
      value:{
        type: Number
      },
      tips:{
        type: Array
      }
    },
    methods:{
      click(item){
        this.$dispatch('tab', item.val);
      }
    }
  }
</script>
