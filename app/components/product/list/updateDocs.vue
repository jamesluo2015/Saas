<template>
    <h3>修改商品</h3>

    <input type="button" name="sava" value="保存" @click='save'>
</template>
<script>
export default {
  components: {  },
  data(){
     return {
       param:{

       }
     }
  },
  methods: {
    save(){
      this.$dispatch('save')
    }
  }
}
</script>
