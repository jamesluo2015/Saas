<template>
  <div class="col-md-12 pd_l0  mg_b20 mg_t20 clearfix select_dropdown">
  <v-select :value.sync="value" class='pull-left mg_l30' :search="true" :options="list" :close-on-select="true" :placeholder="placeholder">
  </v-select>
  <!-- <input type="button" class="btn_red bg8 w80 h36 pull-left mg_l10" @click='select' value="查询"> -->
  <button-docs text="查&nbsp;询" @click='select' class="mg_l30"></button-docs>
</div>
</template>
<script>
import {select as vSelect} from 'vue-strap';
import {option as vOption} from 'vue-strap';
import buttonDocs from '../general/buttonDocs.vue';
export default {
  components: { vSelect,vOption,buttonDocs },
  props: {
      list: {
          type: Array,
          default: {}
      },
      placeholder:{
        type: String
      }
  },
  data(){
     return {
       value:[]
     }
  },
  methods: {
    select(){
      this.$dispatch('select', this.value);
    }
  }
}
</script>
