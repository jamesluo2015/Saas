<template>
<div>
   * <v-select :value.sync="standardname" :search="true"  :options="standardlist" :close-on-select="true" placeholder="标准名称" > 
   </v-select>
</div>
<div>
  * <v-select :value.sync="factory" :search="true"  :options="fac_select" :close-on-select="true" placeholder="主机厂" > 
   </v-select>
   * <v-select :value.sync="carmodel" :search="true"  :options="car_select"  :close-on-select="true" placeholder="车型" > 
    </v-select>
    <v-select :value.sync="partsyear" :search="true"  :options="yearlist"  :close-on-select="true" placeholder="年款" > 
    </v-select>
</div>
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
export default {
   components: { vSelect,vOption },
   data() {
      return {
        //经销商经营车型
        carlist:[],
        
        yearlist:[],
        standardlist:[],
        
        factory: [],
        carmodel: [],
        partsyear:[],
        standardname:[]
      }
    },
    ready(){
      //加载车型权限信息
      var _this=this;
      ext.fetch('product', 'GetCarmodel', { }, function (result) {
          _this.carlist=result;
        });
      //加载标准名称
      ext.fetch('product', 'IGetStandards', { }, function (result) {
          let arr=[];
          result.map(x=>arr.push({
              value: x.StandardId.toString(),
              label: x.StandardName
          }))
            _this.standardlist=arr;
        });
    },
    computed: {
      //主机厂
      fac_select: function(){
        var arr=[];
        if(this.carlist.length){
          var s = new Set();
          this.carlist.map(x=>s.add(          
              x.FactoryName
          ))
          for (let x of s) {
            arr.push({
              value: x,
              label:x
            });
          }
        }
         return arr;
      },
      //车型
      car_select: function(){
        var arr=[];
        var _this=this;
        if(this.factory.length){
          _this.carlist.forEach(function(item){
            if(item.FactoryName == _this.factory){
              arr.push({
                value: item.CarModelId.toString(),
                label:item.CarModelName
              });
            }
          })
          if(arr.length){
             _this.carmodel=[arr[0].value];
          }
        }
         return arr;
      }
    },
    watch: {
      carmodel(val) {
        //查询年款
        if(val){
          var _this=this;
          ext.fetch('product', 'GetYear', { pid:val }, function (result) {
            var arr=[];
            result.forEach(function(item){
              arr.push({
                value: item.ID.toString(),
                label: item.YearName
              });
            })
            if(arr.length){
              _this.partsyear=[arr[0].value];
            }
            _this.yearlist=arr;
          });
        }
      }
    },
    methods : {
      
    }
}
</script>
