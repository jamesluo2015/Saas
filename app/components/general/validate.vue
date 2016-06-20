<template lang="html">

</template>

<script>
export default {
  props:{

  },
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {
    let tag='vlength';
    $(document).on('keyup','['+tag+']',function(){
      let maxlength=$(this).attr(tag);
      let val=$(this).val();
      if(val.length>maxlength){
        val=val.toString().substr(0,maxlength);
        $(this).val(val);
        layer.msg(`最大长度为${maxlength}位`,{icon:7,time:1200});
      }
    })
  },
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
