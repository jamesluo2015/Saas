<template>
  <accordion :one-at-atime="one">
        <panel v-for="(index,item) in list | orderBy 'text'" :header="item.title" :is-open="false">
            <ul class="alert_year_list clearfix pd_10 mg_b0" >
                <li v-for="car in item.carlist" class="clearfix mg_t5 mg_b5">
                    <span href="javascript:void(0)" class="pull-left f12 mg_l10">{{car.text}}</span>
                    <span class="pull-right alert_edi mg_r30 cursor" @click="supple(car)"></span>
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
      },
      one:{
        type:Boolean,
        default: false
      },
      bmno: {
        require: true
      }
  },
  ready(){
    layer.config({
       extend: 'extend/layer.ext.js'
   });
 },
  data(){
     return {

     }
  },
  methods: {
    supple(car){
      let _this=this;
      layer.prompt({title: '请输入补充年款备注', formType: 2}, function(text){
        layer.msg("提交成功",{icon:1,time:800});
        let param = {
                  BmNo: _this.bmno,
                  FactoryId: car.factoryid,
                  FactoryName: car.factoryname,
                  CarmodelId: car.carid,
                  Carmodel: car.carmodel,
                  PartsYearId: car.id,
                  PartsYear: car.text,
                  Description: text
              };
        Vue.http.post('/product/AddSuitInfo',param).then(function(res){

        })
      });
    }
  }
}
</script>
