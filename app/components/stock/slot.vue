<template id="">
  <div class="right_contain">
              <div class="row">
                  <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
                      <a href="#" class="green_btn w80 h26 pull-left mg_l30">+添加货位</a>
                      <div class="dropdown pull-left mg_l30" >
                          <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
                      </div>
                      <div class="dropdown pull-left mg_l30" >
                          <v-select :value.sync="house" :options="houses" :close-on-select="true" placeholder="选择库房"></v-select>
                      </div>
                      <div class="dropdown pull-left mg_l30" >
                          <v-select :value.sync="slot" :options="slots" :close-on-select="true" placeholder="选择货位"></v-select>
                      </div>
                      <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
                  </div>
                  <div class="col-md-12 pd_l0 pd_r0 mg_t10 bdT_d0d0d0">
                      <table class="table table2 table_bg mg_t2">
                          <thead>
                              <tr>
                                  <th width="25%">货位</th>
                                  <th width="25%">数量</th>
                                  <th width="25%">货位详情</th>
                                  <th width="25%">操作</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>01-01-01</td>
                                  <td>20</td>
                                  <td>北京库区-五方库房 01号货位</td>
                                  <td><a href="#" class="bianji mg_r30">编辑</a><a href="#" class="shanchu">删除</a></td>
                              </tr>
                          </tbody>
                          <tbody>
                              <tr>
                                  <td>01-01-01</td>
                                  <td>20</td>
                                  <td>北京库区-五方库房 01号货位</td>
                                  <td><a href="#" class="bianji mg_r30">编辑</a><a href="#" class="shanchu">删除</a></td>
                              </tr>
                          </tbody>

                      </table>

                  </div>

              </div>


          </div>
</template>
<script>
import {
    select as vSelect
}
from 'vue-strap'
import buttonDocs from '../general/buttonDocs.vue'
import pageDocs from '../general/pageDocs.vue'
  export default{
    components: {vSelect,buttonDocs,pageDocs},
    data(){
      return {
        areas:[],
        area:[],
        houses:[],
        house:[],
        slots:[],
        slot:[]
      }
    },
    methods:{
      query(){

      }
    }
  }
</script>
