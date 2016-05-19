<template>
  <div>
        <select-docs></select-docs>
        <button-docs :text="isquery?'查询中':'查询'" @click='query' :class="{'unable':!valid || isquery }"></button-docs>
  </div>
  <div>
      <pulse-loader :loading="isquery" ></pulse-loader>
      <table-docs ></table-docs>
  </div>
</template>
<script>
import selectDocs from './addprodbyname/selectDocs.vue'
import tableDocs from './addprodbyname/tableDocs.vue'
import buttonDocs from '../general/buttonDocs.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import store from 'store'

export default {
  components: { selectDocs,buttonDocs,tableDocs,PulseLoader },
  data(){
    return {
      isquery: false
    }
  },
  computed:{
    valid: function(){
      let result=true;
      let selects=this.$children[0].$children;
      for(let i=0;i<3;i++){
        let val=selects[i].value[0] || 0;
        if(!val){
          result=false;
          break;
        }
      }
      return result;
    }
  },
  methods: {
      query(){
        //防止多次请求
        if(this.isquery || !this.valid){
          return false;
        }
        let _this=this;
        //valid
        let selects=_this.$children[0].$children;
        let param=[];
        for(let i=0;i<4;i++){
          let val=selects[i].value[0] || 0;
          if(!val&&i<3){
            selects[i].error=true;
            return false;
          }
          param.push(val.toString());
        }
        //querying
        _this.isquery=true;
        _this.$children[3].query(param,function(){
           _this.isquery=false;
        });
        //加入store
        store.set('param',param);
      },
  }
}
</script>
