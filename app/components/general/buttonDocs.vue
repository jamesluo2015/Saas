<template>
   <a href="#" class="btn_red bg8 f14 w70 h26 pull-left" :class="{'disable':state}" @click="click">{{text}}</a>
</template>
<script>
    export default {
        props: {
            text: {
                type: String
            },
            state:{
              type: Boolean,
              default: false
            }
        },
        methods:{
          click(){
            this.state=true;
            let _this=this;
            setTimeout(function(){
              _this.state=false;
            },300)
          }
        }
    }
</script>
