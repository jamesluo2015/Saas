

<template id="">

<modal :show.sync="showModel" effect="fade" width="360px">
    <div slot="modal-header" class="modal-header ">
        <button type="button" class="close " @click="showModel=false"><span>×</span></button>
        <h4 class="modal-title">添加库区</h4>
    </div>
    <div slot="modal-body" class="modal-body ">
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01"><em class="col_fb2727 mg_r5">*</em>选择库区：</label>
                <input placeholder="" class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01"><em class="col_fb2727 mg_r5">*</em>库存名称：</label>
                <input placeholder="" class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01"><em class="col_fb2727 mg_r5">*</em>库区编号：</label>
                <input placeholder="" class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01">负责人：</label>
                <input placeholder="" class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01">联系方式：</label>
                <input placeholder="" class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20">库区地址：</label>
            <input placeholder="" class="add_input w170 pull-left form-control mg_t15" type="text">
        </div>
        <div class="col-md-12 mg_t20 mg_b20 clearfix">
            <a href="#" class="btn_red bg8 mg_t20 auto w120 h26">添&nbsp;加</a>
        </div>
    </div>
</modal>

</template>

<script>



</script>
