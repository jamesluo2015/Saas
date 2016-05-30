<template id="">
  <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w250">
      <label class="control-label pull-left f12 lineH20">选择库区：</label>
      <v-select :value.sync="area" :options="areas" :close-on-select="true"></v-select>
  </div>
  <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w250">
      <label class="control-label pull-left f12 lineH20">选择库房：</label>
      <v-select :value.sync="detail.stockhouseid" :options="houses" :close-on-select="true"></v-select>
  </div>
  <div class=" pd_l0 mg_t20 clearfix select_dropdown pull-left w250">
      <label class="control-label pull-left f12 lineH20">选择库位：</label>
      <v-select :value.sync="detail.stockmainid" :options="slots" :close-on-select="true"></v-select>
  </div>
</template>
<script>
import {
    select as vSelect
}
from 'vue-strap'
  export default{
    components: {
        vSelect
    },
    props: {
        area: {
            type: Array
        },
        house: {
            type: Array
        },
        slot:{
          type:Array
        }
    },
    data(){
      return {
        selectlist:[]
      }
    },
    computed:{
      areas(){
        let arr=[{label:"全部库区",value:"0"}];
        this.selectlist.forEach(function(item){
          if(item.level==1){
            arr.push({
              label: item.label,
              value: item.value
            })
          }
        });
        return arr;
      },
      houses(){
        let arr=[{label:"全部库房",value:"0"}];
        let _this=this;
        if(this.area.length){
          this.selectlist.forEach(function(item){
            if(item.level==2 && item.pid==_this.area[0]){
              arr.push({
                label: item.label,
                value: item.value
              })
            }
          })
        }
        return arr;
      },
      slots(){
        let arr=[{label:"全部库位",value:"0"}];
        let _this=this;
        if(this.house.length){
         this.selectlist.forEach(function(item){
            if(item.level==3 && item.pid==_this.house[0]){
              arr.push({
                label: item.label,
                value: item.value
              })
            }
          })
        }
        return arr;
      }
    },
    ready(){
      let _this=this;
      Vue.http.get('/stock/GetSelect').then(function(res){
        _this.selectlist=res.data;
      })
    }
  }
</script>
