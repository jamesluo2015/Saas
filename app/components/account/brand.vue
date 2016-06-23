<template lang="html">
  <div class="col-md-12 pd_l0 pd_r0 mg_r0 bdT_d0d0d0">
      <table class="table table2 table_bg mg_t2">
          <thead>
              <tr>
                  <th width="12%">图片</th>
                  <th width="13%">品牌名称</th>
                  <th width="10%">品牌地区</th>
                  <th width="36%">品牌描述</th>
                  <th width="19%">状态</th>
                  <!-- <th width="15%">操作</th> -->
              </tr>
          </thead>
          <tbody v-for="(index,item) in brandlist">
              <tr >
                  <td><img :src="item.Logo" class="pinpai_img" /></td>
                  <td> {{item.BrandName}}</td>
                  <td>{{item.GroupID==1?"国内":"国外"}}</td>
                  <td class="col_767676">{{item.Description}}</td>
                  <td>{{item.IsAuditing?"已通过":"待审核"}}</td>
                  <!-- <td>
                      <a href="#" class="saas_edi mg_t10 pull-left" v-if="item.UserId==userid" @click="update(index)">编辑</a>
                      <a href="#" class="saas_del mg_t10 pull-left mg_l20" @click="remove(index,item.id)">删除</a>
                  </td> -->
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      brandlist:[]
    }
  },
  computed: {},
  ready: function () {
    //获取经销商品牌
    let _this = this;
    Vue.http.get('/config/GetBrands', {}).then(function(response) {
        _this.brandlist = response.data;
    });
  },
  attached: function () {},
  methods: {},
  components: {}
}
</script>

<style lang="css">
</style>
