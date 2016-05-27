

<template id="">

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <span class="col_010101 f16 pull-left mg_l30 lineH26">库区管理</span>
            <a href="#" class="green_btn w80 h26 pull-left mg_l30">+添加库区</a>
        </div>

        <div class="col-md-12 pd_l0 pd_r0 mg_r0">

            <table class="table table2 table_bg">
                <thead>
                    <tr>
                        <th width="20%">库区名称</th>
                        <th width="60%">配送区域</th>
                        <th width="20%">操作</th>
                    </tr>
                </thead>
                <tbody v-for="item in list">
                    <tr>
                        <td>{{item.HouseName}}</td>
                        <td>{{item.Provinces}}</td>
                        <td><a href="#" class="saas_set mg_t10" @click="setAddress($index)">设置配送地区</a></td>
                    </tr>
                </tbody>

            </table>

        </div>

    </div>


</div>
<modal :show.sync="showaddress" effect="fade" width="470px">
    <div slot="modal-header" class="modal-header">
        <button type="button" class="close" @click="showaddress = false"><span>×</span></button>
        <h4 class="modal-title">选择配送区域<span class="fN mg_l5 col_767676">（可多选）</span></h4>
    </div>
    <div slot="modal-body" class="modal-body">
        <ul class="modal_add clearfix">
            <li class="clearfix w_100" @click="checkall()"><em :class="allcheck?'saas_check':'saas_checkbox'"></em><em class="pull-left fS f12">全选</em></li>
            <li class="clearfix" v-for="item in provinces" @click="item.check=!item.check">
              <em :class="item.check?'saas_check':'saas_checkbox'"></em>
              <em class="pull-left fS f12">{{item.Name}}</em>
            </li>
        </ul>
        <div class="col-md-12 mg_t10 mg_b20 clearfix">
            <a href="#" class="btn_red bg8 mg_t20 mg_l70 w80 h26 pull-left" @click="saveaddress">确&nbsp;定</a>
            <a href="#" class="gray mg_t20 mg_l30 w80 h26 pull-left" @click="showaddress=false">取&nbsp;消</a>
        </div>
    </div>
</modal>

</template>

<script>

import {
    modal
}
from 'vue-strap'
export default {
    components: {
        modal
    },
    data() {
        return {
            showaddress: false,
            provinces: [],
            list:[],
            index: 0
        }
    },
    ready() {
        let _this = this;
        //获取已配置信息
        Vue.http.get('/config/GetStockArea').then(function(res){

          _this.list=res.data;
        })
        //获取所有省份
        Vue.http.get('/account/GetAreaInfo?headId=1').then(function(res) {
            res.data.forEach(function(item) {
                item.check = false;
            })
            _this.provinces = res.data;
        })
    },
    computed:{
      allcheck(){
        return !this.provinces.some(function(item){
          return !item.check;
        })
      },
    },
    methods:{
      checkall(){
        let check=this.allcheck;
        this.provinces.forEach(function(item){
          item.check=!check;
        })
      },
      setAddress(index){
        this.index=index;
        let provinces=this.list[index].Provinces;

        this.provinces.forEach(function(item) {
          if(provinces.indexOf(item.Name)>=0){
            item.check=true;
          }else{
              item.check = false;
          }
        })
        this.showaddress=true;
      },
      saveaddress(){
        let model=this.list[this.index];

        let param=[];
        let provinces=[];
        let provinceids=[];
        this.provinces.forEach(function(item){
          if(item.check){
            let temp={
              StoreRegionId: model.Id,
              StoreRegionName: model.HouseName,
              ProvinceId: item.id,
              ProvinceName: item.Name
            };
            provinces.push(item.Name);
            provinceids.push(item.id);
            param.push(temp);
          }
        })
        if(!provinces.length){
          layer.alert('请选择省份');
          return false;
        }
        model.Provinces=provinces.join(',');
        this.showaddress=false;
        // console.log(param);
        Vue.http.post('/config/SaveStockArea',{list:param,ids:model.ProvinceIds}).then(function(res){
          model.ProvinceIds=provinceids;
        })
      }
    }
}

</script>
