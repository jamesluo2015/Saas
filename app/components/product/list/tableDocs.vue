<template>
    <div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20 ">
    <div class="shop_info pd_5">
        <table class="table table2 mg_t15 table3 bd_tb5 table_bg">
            <thead>
            <tr>
                <th width="8%">配件名称</th>
                <th width="8%">零件编号</th>
                <th width="8%">配件说明</th>
                <th width="6%">商品特别说明</th>
                <th width="6%">供应商编码</th>
                <th width="5%">品牌</th>
                <th width="6%">主机厂</th>
                <th width="5%">配件状态</th>
                <th width="6%">销售价（元）</th>
                <th width="8%">佣金（元）</th>
                <th width="7%">库存量</th>
                <th width="9%">添加时间</th>
                <th width="4%">适用年款</th>
                <th width="8%">操作</th>
            </tr>
            </thead>
                    <tbody>
                    <tr v-for="item in list">
                        <td>
                            {{item.StandardName}}
                        </td>
                        <td>
                            {{item.Sku}}
                        </td>
                        <td class="text-left">
                            {{item.ContentInfo}}
                        </td>
                        <td class="text-left">
                            {{item.SpecialNote}}
                        </td>
                        <td>
                            {{item.DealerNo}}
                        </td>
                        <td>
                            {{item.ProdBrandName||"其它"}}
                        </td>
                        <td>
                            {{item.FactoryId}}
                        </td>
                        <td>
                            {{item.ProdStatus}}
                        </td>
                        <td>
                            <em class="col_ec7642 fN fS">{{item.SalePrice}}</em>
                        </td>
                        <td>
                            <em class="col_ec7642 fN fS">-0.1(10%)</em>
                        </td>
                        <td>
                            {{item.StockCount}}
                        </td>
                        <td>
                            {{item.AddTime}}
                        </td>
                        <td><a href="javascript:void(0)" class="col_007aff" @click="getsuitcars(item.BmNo)">查看</a></td>
                        <td class="ws">
                            <a href="javascript:void(0)" class="col_007aff f12 f_song" @click='update(item)'>编辑</a>
                            <a href="javascript:void(0)" class="col_ec7642 mg_l10 f12 f_song" @click='remove($index)'>删除</a>
                            <a href="javascript:void(0)" class="col_007aff f12 f_song  mg_l10" >选择销售平台</a>
                        </td>
                    </tr>
                    <!--图片-->
                    <tr class="table_line">
                        <td colspan="14">
                            <ul class="goods_img imgs9 clearfix">

                            </ul>
                        </td>
                    </tr>
                </tbody>
        </table>
    </div>
</div>
 <modalcar-docs title="查看年款" :list="modalist" :showmodal.sync="modalshow"></modalcar-docs>
</template>

<script>
import modalcarDocs from '../../general/modalcarDocs.vue'
import convert from '../../utils/convert.js'

export default {
  components: { modalcarDocs },
  props:{
      list:{
          type: Array
      },
  },
  data(){
     return {
        modalist:[],
        modalshow:false
     }
  },
  ready(){

  },
  methods: {
    getsuitcars(bmno){
        let _this=this;
        Vue.http.get('/product/GetSuitByBmNo?bmno='+bmno).then(function(response){
            let suitcars=response.data;
            _this.modalist=convert(suitcars);
            _this.modalshow=true;
        },function(err){
            console.log('获取适用性失败');
        })
    },
    update(model){
      //派发事件
      this.$dispatch('update', model)
    },
    remove(index){
      let _this=this;
      let model=_this.list[index];
      //获取图片列表
      var imgIds="";
      if(model.Imglist.length){
        let imgarr=[];
        model.Imglist.map(x=>imgarr.push(x.Id));
        imgIds=imgarr.join(',');
      }

      Vue.http.post(`/product/DeletProduct?id=${model.Id}&ids=${imgIds}`).then(function(response){
        _this.list.splice(index,1);
        if(!_this.list.length){
          _this.$nextTick(function () {
            // DOM 更新了
            alert('请点击下一页');
          })
        }
      },function(response){
        alert('删除失败');
      })
    }
  }
}
</script>
