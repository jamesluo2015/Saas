<template>
  <div>
        <select-docs></select-docs>
        <button-docs :text="isquery?'查询中':'查询'" @click='query' :class="{'unable':isquery}"></button-docs>
  </div>
  <div>
       <table-docs ></table-docs>
       <pulse-loader :loading="isquery" ></pulse-loader>
  </div>
</template>
<script>
import selectDocs from './app/selectDocs.vue'
import tableDocs from './app/tableDocs.vue'
import buttonDocs from './general/buttonDocs.vue'
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
    
  },
  methods: {
      query(){
        //防止多次请求
        if(this.isquery){
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
        _this.$children[2].query(param,function(){
           _this.isquery=false;
        });
        //加入store
        store.set('param',param);
      },
  }
}
</script>
