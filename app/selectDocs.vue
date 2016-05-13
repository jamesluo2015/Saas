<template>
  <v-select :value.sync="arr" :search="true"  :options="fruitOptions" :close-on-select="true" placeholder="一级分类" > 
      
   </v-select>
   <v-select :value.sync="arr2" :search="true"  :close-on-select="true" :options="fruitOptions2" placeholder="二级分类" > 
       
   </v-select>
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
export default {
   components: { vSelect,vOption },
   data() {
      return {
        fruitOptions: [{}],
        fruitOptions2:[{}],
        search: false,
        arr: [],
        arr2: []
      }
    },
    ready(){
      //加载一级分类
      var _this=this;
      ext.fetch('product', 'GetCarmodel', { pid: "0" }, function (datatemp) {
           //_this.fruitOptions = datatemp;
           var arrtemp=[];
          for(var i=0;i<datatemp.length;i++){
            arrtemp.push({
              value:datatemp[i].ID.toString(), 
              label:datatemp[i].ClassName
            });
          }
          _this.fruitOptions=arrtemp;
          _this.search=true;
        });
    },
    watch: {
      arr(val) {
        if(!val){
          return false;
        }
         var _this=this;
         ext.fetch('product', 'GetCarmodel', { pid:val }, function (datatemp) {
           //_this.fruitOptions = datatemp;
           var arrtemp=[];
          for(var i=0;i<datatemp.length;i++){
            arrtemp.push({
              value:datatemp[i].ID.toString(), 
              label:datatemp[i].ClassName
            });
          }
          _this.fruitOptions2=arrtemp;
          _this.arr2=arrtemp[0].value.toString();
        });
      }
    },
    methods : {
      
    }
}
</script>
