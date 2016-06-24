

<template id="">

<modal :show.sync="show" effect="fade" :backdrop="false" width="540px" :title="model.Id?'编辑库区':'添加库区'">
    <div slot="modal-body" class="modal-body ">
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01"><em class="col_fb2727 mg_r5">*</em>库区名称：</label>
                <input placeholder="" v-model="model.HouseName" class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01"><em class="col_fb2727 mg_r5">*</em>库区编号：</label>
                <input placeholder="" v-model="model.HouseCode" class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01">负责人：</label>
                <input placeholder="" v-model="model.Manager"  class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <div class="pull-left">
                <label class="control-label pull-left f12 lineH20" for="input01">联系方式：</label>
                <input placeholder="" v-model="model.Phone"  class="add_input w170 pull-left form-control" type="text">
            </div>
        </div>
        <div class="col-md-12 pd_l0 clearfix select_dropdown mg_t15">
            <label class="control-label pull-left f12 lineH20"><em class="col_fb2727 mg_r5">*</em>库区地址：</label>
            <v-select :value.sync="province" :search="true" :options="provinces" :close-on-select="true" placeholder="城市">
            </v-select>
            <v-select :value.sync="city" :search="true" :options="citys" :close-on-select="true" placeholder="区域">
            </v-select>
            <input placeholder="请输入地址" v-model="model.Address" class="add_input w325 pull-left form-control mg_t15" type="text">
        </div>
        <div class="col-md-12 mg_t20 mg_b20 clearfix">
            <a href="#"class="btn_red bg8 mg_t20 auto w120 h26" :class="{'disable':!valid}" @click="add" > {{model.Id?"保&nbsp;存":"添&nbsp;加"}}</a>
        </div>
    </div>
</modal>

</template>

<script>

import modal from 'vue-strap/src/modal'
import vSelect from 'vue-strap/src/select'
import getlabel from '../utils/getlabel.js'
export default {
    components: {
        vSelect, modal
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        model:{
          type: Object
        }
    },
    data() {
        return {
            provinces: [],
            province: [],
            citys: [],
            city: []
        }
    },
    watch: {
        province(val) {
          this.getcitys(val, true);
        },
        show(val){
          if(val && this.model.CityId){
            this.province=[this.model.ProvinceId.toString()];
            this.city=[this.model.CityId.toString()];
          }
        }
    },
    computed:{
      valid(){
        if(!this.province.length||!this.city.length||!this.model.HouseName||!this.model.HouseCode){
          return false;
        }
        return true;
      }
    },
    methods:{
      convert(list) {
              let arr = [];
              list.map(x => arr.push({
                  label: x.Name,
                  value: x.id.toString()
              }));
              return arr;
          },
          getcitys(headid, isdefault) {
              let _this = this;
              Vue.http.get('/account/GetAreaInfo?headId=' + headid).then(function(res) {
                  _this.citys = _this.convert(res.data);
                  if (isdefault) {
                      _this.city = [_this.citys[0].value];
                  }
              })
          },
          add(){
            if(!this.valid){
              return false;
            }
            this.model.ProvinceId=this.province[0];
            this.model.CityId=this.city[0];
            this.model.ProvinceName = getlabel(this.province[0],this.provinces);
            this.model.CityName = getlabel(this.city[0],this.citys);

            let _this=this;
            Vue.http.post('/stock/SaveHouse',  this.model).then(function(res){
              if(!_this.model.Id){
                _this.model.Id=res.data;
                _this.$dispatch('addarea', _this.model)
              }
              _this.model.Id=res.data;
              _this.model.HouseStatus=0;
              _this.show=false;
            })
          }
    },
    ready() {
        let _this = this;
        //获取地区信息
        Vue.http.get('/account/GetAreaInfo?headId=0').then(function(res) {
            _this.provinces = _this.convert(res.data);
        })
    }
}

</script>
