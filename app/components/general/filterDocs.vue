<template>
  <v-select :value.sync="value" class='pull-left' :search="true" :options="list" :close-on-select="true" :placeholder="placeholder">
  </v-select>
  <!-- <input type="button" class="btn_red bg8 w80 h36 pull-left mg_l10" @click='select' value="查询"> -->
  <button-docs text="查&nbsp;询" @click='select' class="mg_l30"></button-docs>
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
import buttonDocs from './buttonDocs.vue';
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
