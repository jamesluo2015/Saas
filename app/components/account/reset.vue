<template id="">

<div class="right_contain">
    <div class="row">
      <form action="/account/reset" method="post" >
      <div class="row mg_l0 mg_r0 bd_bb5 pd_b5 ">
          <span class="pull-left f16 fB mg_t10">重置密码</span>
      </div>
      <div class="col-md-12 pd_l0 clearfix pd_b20 mg-t20 select_dropdown pd_t10 ">
          <label class="control-label pull-left" for="input01">新密码：</label>
          <input type="text" class="add_input form-control w160" value="" v-model="pass"   name="pass">
      </div>
      <div class="col-md-12 pd_l0 clearfix pd_b20 mg-t20 select_dropdown">
          <label class="control-label pull-left" for="input01">确认密码</label>
          <input type="text" class="add_input form-control w160" value="" v-model="repass"   name="pass">
      </div>
      
      <div class="col-md-12 pd_l0 clearfix pd_b20 mg-t20 select_dropdown">
          {{error}}
      </div>
      <div >
        <a href="javascript:void(0)" class="btn_red bg8 w120 h30 h5 pull-left mg_l70" @click="submit" onclick="btnSave()">确定</a>
      </div>
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