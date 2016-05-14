<template>
<div>
   * <v-select :value.sync="standardname" :search="true" :options="standardlist" :close-on-select="true" placeholder="选择标准名称" > 
   </v-select>
</div>
<div>
  * <v-select :value.sync="factory" :search="true"  :options="fac_select" class="input_error" :close-on-select="true" placeholder="选择主机厂" > 
   </v-select>
   * <v-select :value.sync="carmodel" :search="true"  :options="car_select"  :close-on-select="true" placeholder="选择车型" > 
    </v-select>
    <v-select :value.sync="partsyear" :search="true"  :options="yearlist"  :close-on-select="true" placeholder="选择年款" > 
    </v-select>
</div>
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
import store from 'store'

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
      let _this=this;

      // Post request
      Vue.http.post( '/product/GetCarmodel').then(function (response) {
          _this.carlist=response.data;
      }, function (response) {
          console.log('没有车型信息');
      });
      //加载标准名称
      Vue.http.post( '/product/IGetStandards').then(function (response) {
          let result=response.data;
          let arr=[];
          result.map(x=>arr.push({
              value: x.StandardId.toString(),
              label: x.StandardName
          }))
            _this.standardlist=arr;
      }, function (response) {
          console.log('没有标准名称');
      });
      
        //读取store
        let param=store.get('param');
        if(param.length){
          _this.standardname=[param[0].toString()];
          _this.factory=[param[1].toString()];
          setTimeout(function(){
            _this.carmodel=[param[2].toString()];
            
            if(param[3]>0){
              setTimeout(function(){
                _this.partsyear=[param[3]];
              },500)
            }
          },500)
        }
    },
    computed: {
      //主机厂
      fac_select: function(){
        let arr=[];
        if(this.carlist.length){
          let s = new Set();
          //筛选
          this.carlist.forEach(function(item){
            if(!s.has(item.FactoryId)){
              arr.push({
                value: item.FactoryId.toString(),
                label:item.FactoryName
              });
            }
            s.add(item.FactoryId);
          })
        }
         return arr;
      },
      //车型
      car_select: function(){
        let arr=[];
        let _this=this;
        if(this.factory.length){
          //_this.carmodel=[];
          _this.carlist.forEach(function(item){
            if(item.FactoryId == _this.factory){
              arr.push({
                value: item.CarModelId.toString(),
                label:item.CarModelName
              });
            }
          })
          //默认选择车型
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
        if(val.length){
          let _this=this;
           _this.partsyear=[];
           
           Vue.http.post( '/product/GetYear?pid='+val).then(function (response) {
              let arr=[];
              response.data.forEach(function(item){
                arr.push({
                  value: item.ID.toString(),
                  label: item.YearName
                });
              })
              // if(arr.length){
              //   _this.partsyear=[arr[0].value];
              // }
              _this.yearlist=arr;
            }, function (response) {
                console.log('没有年款信息');
            });
        }
      }
    },
    methods : {
      
    }
}
</script>
