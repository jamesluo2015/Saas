<template>
      <div class="col-md-12 pd_l0 clearfix  select_dropdown  mg_t10 z-top">
           <datepicker
                :value.sync="sdate"
                :disabled-days-of-Week="disabled"
                format="yyyy-MM-dd"
                Width="130px">
                </datepicker>
        <label class=" mg_l5 mg_r5 mg_t8 fN">至</label>
        <datepicker
                :value.sync="edate"
                :disabled-days-of-Week="disabled"
                format="yyyy-MM-dd"
                Width="130px">
                </datepicker>
    <v-select :value.sync="state" :options="statelist" :close-on-select="true" class='mg_l5' placeholder="选择状态" ></v-select>
    <v-select :value.sync="type" :options="typelist" :close-on-select="true" class='mg_l5' placeholder="选择条件" ></v-select>
    <input placeholder="请输入关键字" class="add_input inline w240 mg_l5 form-control" type="text" v-model='key'>
    <button-docs text="查&nbsp;询" @click='query'></button-docs>
    </div>
     <pulse-loader :loading="loading" ></pulse-loader>
</template>
<script>
import {select as vSelect} from 'vue-strap'
import {option as vOption} from 'vue-strap'
import { datepicker } from 'vue-strap'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import buttonDocs from '../../general/buttonDocs.vue'

export default {
    components: { vSelect,vOption,datepicker,PulseLoader,buttonDocs },
    props:{
      pagesize:{
        type: Number
      }
    },
    data(){
        return {
            sdate:GetFormatDate(),
            edate:GetFormatDate(),
            statelist:[{
                value: '0',
                label: '选择状态'
            },{
                value: '1',
                label: '已通过'
            },{
                value: '2',
                label: '未通过'
            },{
                value: '3',
                label: '待审核'
            }],
            state: [],
            typelist: [{
                value: '1',
                label: '零件编号'
            },{
                value: '2',
                label: '供应商编码'
            },{
                value: '3',
                label: '配件名称'
            }],
            type: [],
            key: "",
            loading: false
        }
    },
    methods: {
        query(index){
            let _this=this;
            let param={
                pageindex: index,
                pagesize: this.pagesize,
                sdate: _this.sdate,
                edate: _this.edate,
                state: _this.state.length?_this.state[0]:0,
                type:  _this.type.length?_this.type[0]:0,
                key: _this.key,
            };
            _this.loading=true;
            Vue.http.get('/product/GetProducts',param).then(function(response){
                _this.$dispatch('GetProducts', response.data)
                _this.loading=false;
            },function(err){
                console.log('查询失败');
            })
        }
    }
}

</script>
<style scope>
    .inline {
        display: inline-block;
    }
</style>
