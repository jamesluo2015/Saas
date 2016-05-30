<template>
  <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20" >
      <img src="../../images/saas04.png" class="block auto mg_t20">
      <div class="w240 clearfix mg_t30 mg_b30 auto " style="text-align:center">
          <span class=" h26 f12 mg_r10 col_767676">{{text || "暂无数据"}}</span>
      </div>
  </div>
</template>
<script>
  export default{
    props:{
      text:{
        type: String,
      }
    }
  }
</script>
