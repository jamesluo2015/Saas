

<template id="">

<div class="right_contain">
    <div class="row">
        <tab-docs :data="tablist" :value="1"></tab-docs>
        <div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown bd_bD_d9">
            <label class="control-label pull-left f16 col_000 w140 mg_l20" for="input01">输入供应商编码：</label>
            <input placeholder="" type="text" class="add_input w160 form-control pull-left">
            <a href="#" class="btn_red bg8 f14 w70 h26 mg_l30 pull-left">查&nbsp;询</a>
        </div>
        <div class="col-md-12 pull-right">
            <div class="row pd_l0 pd_r0 mg_l0 mg_r0 mg_b20">
                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                    <label class="control-label pull-left">名称：</label>
                    <p class="pull-left pd_l0 mg_t2">前刹车片</p>
                </div>
                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                    <label class="control-label pull-left">库位数：</label>
                    <p class="pull-left pd_l0 mg_t2">100</p>
                </div>
                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                    <label class="control-label pull-left">配件说明：</label>
                    <div class="col-md-10 pull-left pd_l0 mg_t2">
                        用量：一套四片，内含四片
                    </div>
                </div>
                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown">
                    <label class="control-label pull-left">货位：</label>
                    <div class="col-md-10 pull-left pd_l0 mg_t2">
                        01-01-01
                    </div>
                </div>
                <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">开单年款：</label>
                      <input placeholder="" type="text" class="add_input w160 form-control">
                </div>
                <div class="col-md-12 pd_l0 mg_t20 clearfix pd_b20 select_dropdown">
                    <label class="control-label pull-left" for="input01">开单数：</label>
                    <input placeholder="" type="text" class="add_input w160 form-control">
                </div>
                <div class="col-md-12 pd_l0 clearfix pd_b20 select_dropdown">
                    <div class="pull-left">
                        <label class="control-label pull-left">销售单价：</label>
                        <input placeholder="" type="text" class="add_input w160 pull-left form-control">
                        <label class="pull-left fN mg_t2 mg_l5">元</label>
                    </div>
                </div>
                <div class="col-md-12">
                    <a href="#" class="btn_red bg8 f16 mg_t20 mg_l120 w200 h40">选&nbsp;择</a>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import tabDocs from '../general/tabDocs.vue'
export default {
    components: {
        tabDocs
    },
    data() {
        return {
          tablist:[{
              val: 1,
              text: "通过供应商编码找商品"
          }, {
              val: 2,
              text: "通过车型适用性找商品"
          }],
          model:{}
        }
    }
}

</script>
