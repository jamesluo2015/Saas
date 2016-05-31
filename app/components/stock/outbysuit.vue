<template>
  <div class="right_contain">
             <div class="row">
                 <tab-docs :data="tablist" :value="2"></tab-docs>

                 <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown">
                     <label class="control-label pull-left">开单品类：</label>
                     <div class="dropdown pull-left" _v-0691d5dd="">
                         <button class="btn dropdown-toggle dropdown_toggle w120 bo_w1 form-control" type="button" _v-0691d5dd="">
                             <span class="btn-placeholder" _v-0691d5dd="">选择条件</span>
                             <span class="btn-content" _v-0691d5dd=""></span>
                             <span class="caret" _v-0691d5dd=""></span>
                         </button>

                     </div>
                 </div>
                 <div class="col-md-12 pd_l0 mg_t20 clearfix select_dropdown bd_bD_d9 pd_b20">
                     <label class="control-label pull-left">开单车型：</label>
                     <div class="dropdown pull-left mg_r30" _v-0691d5dd="">
                         <button class="btn dropdown-toggle dropdown_toggle bo_w1 form-control" type="button" _v-0691d5dd="">
                             <span class="btn-placeholder" _v-0691d5dd="">选择条件</span>
                             <span class="btn-content" _v-0691d5dd=""></span>
                             <span class="caret" _v-0691d5dd=""></span>
                         </button>

                     </div>
                     <div class="dropdown pull-left mg_r30" _v-0691d5dd="">
                         <button class="btn dropdown-toggle dropdown_toggle bo_w1 form-control" type="button" _v-0691d5dd="">
                             <span class="btn-placeholder" _v-0691d5dd="">选择条件</span>
                             <span class="btn-content" _v-0691d5dd=""></span>
                             <span class="caret" _v-0691d5dd=""></span>
                         </button>

                     </div>
                     <div class="dropdown pull-left mg_r30" _v-0691d5dd="">
                         <button class="btn dropdown-toggle dropdown_toggle bo_w1 form-control" type="button" _v-0691d5dd="">
                             <span class="btn-placeholder" _v-0691d5dd="">选择条件</span>
                             <span class="btn-content" _v-0691d5dd=""></span>
                             <span class="caret" _v-0691d5dd=""></span>
                         </button>

                     </div>
                     <a href="#" class="btn_red bg8 f14 w70 h26 pull-left">查&nbsp;询</a>
                 </div>
                 <table class="table table2 table_bg mg_t2">
                     <thead>
                         <tr>
                             <th width="11%">名称</th>
                             <th width="12%">供应商码</th>
                             <th width="20%">车型</th>
                             <th width="10%">库存数</th>
                             <th width="10%">货位</th>
                             <th width="13%">开单数</th>
                             <th width="13%">销售单价</th>
                             <th width="11%">操作</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                             <td>火花塞</td>
                             <td>K6RIU</td>
                             <td>奇瑞瑞虎5 1，6L 2006-2012</td>
                             <td>100</td>
                             <td>01-01-01</td>
                             <td><input placeholder="" class="add_input w100 form-control" type="text"></td>
                             <td><input placeholder="" class="add_input w100 form-control" type="text"></td>
                             <td><a href="#" class="saas_add mg_l0">选择</a></td>
                         </tr>
                     </tbody>

                 </table>

             </div>
         </div>

         <div class="alert_dialog">
      <div class="alert_body poR mg_b20">
          <h3><span class="mg_l15 pull-left">已选配件</span><a href="#" class="pull-right mg_r10 arial"></a></h3>
          <div class="w_100 ovau-x">
              <ul class="alert_list clearfix">
                  <li class="clearfix poR">
                      <img src="../../images/logo.png" class="pull-left" />
                      <div class="pull-left mg_l10 bd_rD_d9">
                          <p><span class="w80 text-right col_767676">名称：</span><span class="w80">火花塞</span></p>
                          <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥26</span></p>
                          <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">5</span></p>
                          <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">K6RIU</span></p>
                      </div>
                      <div class="alert_list_close"><em class="pull-right mg_r5 mg_t5"></em></div>
                  </li>
              </ul>
          </div>
          <div class="alert_right">
              <p class="mg_b0 mg_t7"><span class="w80 text-right col_767676 f12">商品数量：</span><span class="f12">15</span></p>
              <p class="mg_b0 mg_t2"><span class="w80 text-right col_767676 f12">开单总价：</span><span class="col_ed5521 f12">￥150</span></p>
              <a href="#" class="btn_red bg8 w100 h22 f12 mg_t5 mg_b5">确定开单</a>
              <a href="#" class="saas_add mg_l30">开单备注</a>
          </div>
      </div>
      <div class="alert_body poR">
          <h3><span class="mg_l15 pull-left">已选配件</span><a href="#" class="pull-right mg_r10 arial"></a></h3>
          <div class="w_100 ovau-x">
              <ul class="alert_list clearfix">
                  <li class="clearfix poR">
                      <img src="../../images/logo.png" class="pull-left" />
                      <div class="pull-left mg_l10 bd_rD_d9">
                          <p><span class="w80 text-right col_767676">名称：</span><span class="w80">火花塞</span></p>
                          <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥26</span></p>
                          <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">5</span></p>
                          <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">K6RIU</span></p>
                      </div>
                      <div class="alert_list_close" style="display:block;"><em class="pull-right mg_r5 mg_t5"></em></div>
                  </li>
                  <li class="clearfix poR">
                      <img src="../../images/logo.png" class="pull-left" />
                      <div class="pull-left mg_l10 bd_rD_d9">
                          <p><span class="w80 text-right col_767676">名称：</span><span class="w80">火花塞</span></p>
                          <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥26</span></p>
                          <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">5</span></p>
                          <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">K6RIU</span></p>
                      </div>
                      <div class="alert_list_close"><em class="pull-right mg_r5 mg_t5"></em></div>
                  </li>
                  <li class="clearfix poR">
                      <img src="../../images/logo.png" class="pull-left" />
                      <div class="pull-left mg_l10 bd_rD_d9">
                          <p><span class="w80 text-right col_767676">名称：</span><span class="w80">火花塞</span></p>
                          <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥26</span></p>
                          <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">5</span></p>
                          <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">K6RIU</span></p>
                      </div>
                      <div class="alert_list_close"><em class="pull-right mg_r5 mg_t5"></em></div>
                  </li>
                  <li class="clearfix poR">
                      <img src="../../images/logo.png" class="pull-left" />
                      <div class="pull-left mg_l10 bd_rD_d9">
                          <p><span class="w80 text-right col_767676">名称：</span><span class="w80">火花塞</span></p>
                          <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥26</span></p>
                          <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">5</span></p>
                          <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">K6RIU</span></p>
                      </div>
                      <div class="alert_list_close"><em class="pull-right mg_r5 mg_t5"></em></div>
                  </li>
                  <li class="clearfix poR">
                      <img src="../../images/logo.png" class="pull-left" />
                      <div class="pull-left mg_l10 bd_rD_d9">
                          <p><span class="w80 text-right col_767676">名称：</span><span class="w80">火花塞</span></p>
                          <p><span class="w80 text-right col_767676">销售价：</span><span class="col_ed5521 w80">￥26</span></p>
                          <p><span class="w80 text-right col_767676">开单数：</span><span class="w80">5</span></p>
                          <p><span class="w80 text-right col_767676">供应商编号：</span><span class="w80">K6RIU</span></p>
                      </div>
                      <div class="alert_list_close"><em class="pull-right mg_r5 mg_t5"></em></div>
                  </li>
                  <li class="w200"></li>
              </ul>
          </div>
          <div class="alert_right">
              <p class="mg_b0 mg_t7"><span class="w80 text-right col_767676 f12">商品数量：</span><span class="f12">15</span></p>
              <p class="mg_b0 mg_t2"><span class="w80 text-right col_767676 f12">开单总价：</span><span class="col_ed5521 f12">￥150</span></p>
              <a href="#" class="btn_red bg8 w100 h22 f12 mg_t5 mg_b5">确定开单</a>
              <a href="#" class="saas_add mg_l30">开单备注</a>
          </div>
      </div>
  </div>
</template>
<script>
import tabDocs from '../general/tabDocs.vue'
export default{
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
        }]
      }
  }
}
</script>
