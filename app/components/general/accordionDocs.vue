<template>
  <accordion :one-at-atime="false">
        <panel v-for="(index,item) in list | orderBy 'text'" :header="item.title" :is-open="false">
            <ul class="clearfix" v-for="car in item.carlist">
                <li><a href="javascript:void(0)">{{car.text}}</a>
                    <!--<span class="glyphicon glyphicon glyphicon-pencil cursor"></span>-->
                    <span v-if="car.desc" class="block">{{car.desc}}</span>
                </li>
            </ul>
        </panel>
    </accordion>
</template>
<script>
import {accordion} from 'vue-strap';
import {panel} from 'vue-strap';

export default {
  components: { accordion,panel },
  props:{
      list:{
          type: Array
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
