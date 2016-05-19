<template>
  <v-select :value.sync="value" class='pull-left' :search="true" :options="list" :close-on-select="true" :placeholder="placeholder">
  </v-select>
  <input type="button" class="btn_red bg8 w80 h36 pull-left mg_l10" @click='select' value="查询">
</template>
<script>
import vSelect from 'vue-strap/src/Select.vue';
import vOption from 'vue-strap/src/Option.vue';
export default {
  components: { vSelect,vOption },
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
