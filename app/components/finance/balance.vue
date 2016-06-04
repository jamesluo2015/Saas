

<template id="">

<div class="right_contain1">
    <div class="row">
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <div class="mg_1">
                <div class="poR w620 h150 auto">
                    <ul class="saas_step_tip clearfix">
                        <li>新生成</li>
                        <li>待财务核算</li>
                        <li>待商家确定</li>
                        <li>{{step==4?"已付款":"待付款"}}</li>
                    </ul>
                    <div class="saas_step " :class="'saas_green_step'+step"></div>
                    <ul class="saas_step_time clearfix">
                        <li v-if="step">【{{model.AddTime}}】</li>
                        <li v-else></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div class="clearfix bdD_d9 w600 pd_5 auto mg_b30" v-if="step<4">
                    <span class="pull-left lineH26 f12 col_767676">
                      提示 ：
                    <span v-if="!step">结算单核算中…</span>
                    <span v-if="step==1">财务审核中</span>
                    <span v-if="step==2">请确认结账单</span>
                    <span v-if="step==3">待付款</span>
                    </span>
                    <a href="#" v-if="step==2" class="redbtn f12 w130 h26 pull-right" @click="audit">确认无误，申请结款</a>
                </div>
            </div>
        </div>

    </div>
</div>

<div class="right_contain1 mg_t15 mg_b20">
    <div class="row">
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <img src="../../images/logo.png" class="pull-left mg_l70" width="170">
            <div class="pull-left mg_l105 w500 mg_t20" id="printsingle">
                <div class="f16 bdB_474747 w240 t-c h40 mg_l70">供应商结算单</div>
                <div class="col-md-12 pd_l0 mg_t30 clearfix">
                    <label class="control-label pull-left fN">供应商名称：</label>
                    <p class="pull-left pd_l0 mg_t2">{{model.SourceName}}</p>
                </div>
                <div class="col-md-12 pd_l0 clearfix" v-if="step">
                    <label class="control-label pull-left fN">结算单编号：</label>
                    <p class="pull-left pd_l0 mg_t2">{{model.BillCode}}</p>
                </div>
                <div class="col-md-12 pd_l0 clearfix">
                    <label class="control-label pull-left fN">结算时间：</label>
                    <p class="pull-left pd_l0 mg_t2">{{model.BeginDate}}&nbsp;至&nbsp;{{model.EndDate}}</p>
                </div>
                <div class="col-md-12 jiesuan_bill">
                    <div class="w200">
                        <h3 class="f14 text-right pd_r40">结算金额</h3>
                        <div class="jiesuan_list clearfix pd_b20 pd_t10">
                            <span class="t-c col_ee4145">货款</span>
                            <span class="col_ee4145">{{model.ProductAmount}}</span>
                            <span class="t-c col_5ca50a">佣金</span>
                            <span class="col_5ca50a">-{{model.Rebate}}</span>
                        </div>
                        <div class="bdT_d0d0d0 f20 lineH40 text-right pd_t10">
                            <span class="mg_r30">{{model.BillAmount}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" class="btn_green f14 w70 h26 poA" @click="print" style="right:15px;top:7px;*right:100px;">打&nbsp;印</a>
        </div>
    </div>
</div>

</template>

<script>
export default {
    props: {
        model: {
            type: Object
        }
    },
    computed: {
        step() {
            switch (this.model.BillStatus) {
                case 1:
                    return 1;
                    break;
                case 2:
                    return 2;
                    break;
                case 3:
                    return 3;
                    break;
                case 9:
                    return 4;
                    break;
                default:
                    return 0;
            }
        }
    },
    methods:{
      audit(){
        this.model.BillStatus=3;
        let id=this.model.Id;
        Vue.http.post(`/finance/UpdateStatus?id=${id}&status=3`).then(function(res){

        })
      },
      print(){
        $('#printsingle').printArea();
      }
    },
    ready(){
      var s =document.createElement("span");
      s.textContent="查看结算单";
      var e =document.createElement("em");
      e.textContent=">";
      document.querySelector('.breadLine').appendChild(e);
      document.querySelector('.breadLine').appendChild(s);
    }
}

</script>
