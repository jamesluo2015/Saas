<template>
  <div>
        <select-docs></select-docs>
        <button-docs :text="isquery?'查询中':'查询'" @click='query' :class="{'unable':isquery}"></button-docs>
  </div>
  <div>
       <table-docs ></table-docs>
  </div>
</template>
<script>
import selectDocs from './selectDocs.vue'
import buttonDocs from './buttonDocs.vue'
import tableDocs from './tableDocs.vue'
import store from 'store'

export default {
  components: { selectDocs,buttonDocs,tableDocs },
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
          param.push(val);
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
