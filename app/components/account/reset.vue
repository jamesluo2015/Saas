<template id="">

<div class="right_contain">
            <div class="reset_password">
                <form action="/account/reset" method="post" >
                    <div class="col-md-12 pd_l0 clearfix select_dropdown">
                        <label class="control-label pull-left col_010101 pd_r5" for="input01">新密码</label>
                        <input placeholder="" class="add_input w160 form-control" name="pass" v-model="pass" type="password">
                    </div>
                    <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
                        <label class="control-label pull-left col_010101 pd_r5" for="input01">确认密码</label>
                        <input placeholder="" class="add_input w160 form-control" v-model="repass" type="password">
                    </div>
                    <div class="col-md-12 pd_l0 clearfix">
                        <span class="col_ee4145 f12 mg_l105">{{error}}</span>
                    </div>
                    <a href="#" class="btn_red bg8 f14 w70 h26 mg_l105 pull-left mg_t20" @click="submit" >确&nbsp;定</a>
                </form>

            </div>
        </div>
</template>


<script>
  export default{
    data(){
      return {
        pass: "",
        repass: "",
        error: ""
      }
    },
    methods:{
      submit(){
        let _this=this;
        if(_this.pass.length<6){
           _this.error="密码长度必须大于6位";
          return false;
        }
        if(_this.pass!==_this.repass){
          _this.error="两次输入密码不相等";
          return false;
        }
        document.getElementsByTagName('form')[0].submit();
      }
    }
}

</script>
