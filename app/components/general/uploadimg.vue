<template>
  <div class="pull-left mg_l30">
      <a href="#" class="saas_up_big">
          <img v-if="showimg" :src="showimg">
          <img v-else src="../../images/addimg.png">
      </a>
      <ul class="goods_img1 clearfix mg_t10">
          <li v-for="img in Imglist" @click="click(img.ImgUrl)">
              <a href="javascript:void(0)">
                  <img :src="img.ImgUrl">
              </a>
          </li>
          <li>
              <a v-if="Imglist.length<5" href="javascript:void(0)" class="imgs" :index="index">
                  <img src="../../images/saas03.png">
              </a>
          </li>
      </ul>
  </div>
  <upload upid=".imgs"</upload>
</template>
<script>
import upload from './upload.vue'
export default {
  components: { upload },
  props:{
    Imglist:{
      type: Array,
    }
  },
  events:{
    'upload':function(data){
      var index = data.CurrentBtn.attr('index');
      var url=data.url;
      this.Imglist.push({
        ImgUrl: url
      });
    }
  },
  data(){
     return {
       showimg: ""
     }
  },
  methods: {
    click(url){
      this.showimg=url;
    }
  }
}
</script>
