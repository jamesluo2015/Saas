<template>
  <accordion :one-at-atime="false">
        <panel v-for="(index,item) in list | orderBy 'text'" :header="item.title" :is-open="false">
            <ul class="alert_year_list clearfix pd_10 mg_b0" >
                <li><a href="javascript:void(0)" v-for="car in item.carlist">{{car.text}}</a>
                    <!--<span class="glyphicon glyphicon glyphicon-pencil cursor"></span>-->
                    <!-- <span v-if="car.desc" class="block">{{car.desc}}</span> -->
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
