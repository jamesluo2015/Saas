

<template>

<div class="col-md-12 pd_l0 pd_r0 mg_r0" >
    <tab :data="tablist" :value="0" ></tab>
    <table class="table table2 table_bg mg_t2" v-if="list.length">
        <thead>
            <tr>
                <th width="45%">产品信息</th>
                <th width="10%">{{stype==1?"销售价":"进货价"}}</th>
                <th width="12%">电商销售价格</th>
                <th width="10%">状态</th>
                <th width="10%">添加时间</th>
                <th width="13%">操作</th>
            </tr>
        </thead>
        <tbody v-for="item in list">
            <tr>
                <td class="poR">
                    <img v-if="item.Imglist&&item.Imglist.length" :src="item.Imglist[0].ImgUrl" class="saas_table_img">
                    <img v-else src="../../../images/noimg.png" class="saas_table_img">
                    <div class="table_detail">
                        <div class="clearfix">
                            <span class="pull-left col_010101 fB">{{item.ProdBrandName}} {{item.StandardName}}</span>
                            <span class="pull-right col_010101 f12">供应商编码：{{item.DealerNo}}</span>
                        </div>
                        <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                            <label class="control-label pull-left f12 poA l_l0 w60">配件说明：</label>
                            <p class="pull-left mg_t2 f12 pd_l65 col_767676">{{item.ContentInfo}}{{item.SpecialNote}}</p>
                        </div>
                        <div class="col-md-12 pd_l0 clearfix mg_t5 select_dropdown">
                            <label class="control-label pull-left f12 w60">零件编号：</label>
                            <a href="#" class="saas_add pull-left f12 mg_l0">查看</a>
                            <label class="control-label pull-left f12 w60 mg_l30">适用年款：</label>
                            <a href="#" class="saas_add pull-left f12 mg_l0" @click="getsuitcars(item.BmNo)">查看</a>
                        </div>
                    </div>
                </td>
                <td><span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">{{item.SalePrice}}</em> </td>
                <td><a href="#" class="saas_add mYH14 mg_l0">查看</a></td>
                <td>
                  <span v-if="item.ProdStatus<=1" class="col_000">待审核</span>
                  <span v-if="item.ProdStatus==2" class="col_ed5521">未通过</span>
                  <span class="col_5ca50a" v-if="item.ProdStatus==3">已通过</span>
                  <span class="col_5ca50a" v-if="item.ProdStatus==4">销售中</span>
                </td>
                <td><span class="f12 col_010101">{{item.AddTime}}</span></td>
                <td>
                    <a href="#" class="saas_edi mg_t10" @click='update(item)'>编辑</a>
                    <a href="#" class="saas_del mg_t10" @click='remove($index)'>删除</a>
                    <a href="#" class="saas_cho mg_t10" v-if="item.ProdStatus==3">选择销售平台</a>
                    <a href="#" class="saas_res mg_t10" v-if="item.ProdStatus==2" >查看原因</a>
                </td>
            </tr>
        </tbody>

    <nothing v-if="!list.length"></nothing>
</div>
<modalcar-docs title="查看年款" :list="modalist" :showmodal.sync="modalshow"></modalcar-docs>

</template>

<script>
import tab from '../../general/tabDocs.vue'
import modalcarDocs from '../../general/modalcarDocs.vue'
import nothing from '../../general/nothing.vue'
import convert from '../../utils/convert.js'
export default {
    components: {
        modalcarDocs,tab,nothing
    },
    props: {
        list: {
            type: Array
        },
    },
    data() {
        return {
            modalist: [],
            modalshow: false,
            tablist:[{val: 0,text:"全部"},{val: 1,text:"待审核"},{val: 2,text:"未通过"},{val: 3,text:"已通过"}],
            first: true,
            stype: document.getElementById('user').getAttribute('stype')
        }
    },
    ready() {

    },
    methods: {
        getsuitcars(bmno) {
              let _this = this;
              Vue.http.get('/product/GetSuitByBmNo?bmno=' + bmno).then(function(response) {
                  let suitcars = response.data;
                  _this.modalist = convert(suitcars);
                  _this.modalshow = true;
              }, function(err) {
                  console.log('获取适用性失败');
              })
          },
          update(model) {
              //派发事件
              this.$dispatch('update', model)
          },
          remove(index) {
              let _this = this;
              let model = _this.list[index];
              layer.confirm('确认删除吗', {
                  btn: ['删除', '取消'] //按钮
              }, function() {
                  //获取图片列表
                  var imgIds = "";
                  if (model.Imglist.length) {
                      let imgarr = [];
                      model.Imglist.map(x => imgarr.push(x.Id));
                      imgIds = imgarr.join(',');
                  }
                  Vue.http.post(`/product/DeletProduct?id=${model.Id}&ids=${imgIds}&stockid=${model.StockId}`).then(function(response) {
                      layer.msg('删除成功', {
                          icon: 1,
                          time: 800
                      });
                      _this.list.splice(index, 1);
                      if (!_this.list.length) {
                          _this.$nextTick(function() {
                              // DOM 更新了
                              //layer.alert('请点击下一页');
                          })
                      }
                  }, function(response) {
                      layer.msg('删除失败', {
                          icon: 5,
                          time: 800
                      });
                  })
              }, function() {

              })
          }
    }
}

</script>
