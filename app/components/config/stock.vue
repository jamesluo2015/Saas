

<template id="">

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <span class="col_010101 f16 pull-left mg_l30 lineH26">库区管理</span>
            <a href="#" class="green_btn w80 h26 pull-left mg_l30" @click="addarea=true">+添加库区</a>
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
            <li class="clearfix w_100" @click="checkall()">
              <em :class="allcheck?'saas_check':'saas_checkbox'"></em>
              <em class="pull-left fS f12">全选</em>
              <span class="pull-right f12">区域选择具有唯一性，不同库区不可重复</span>
            </li>
            <li class="clearfix" v-for="item in provinces" >

                <!-- <em v-if="list[index].Provinces.indexOf(item.Name)>=0":class="item.check?'saas_check':'saas_checkbox'"></em>
                <template v-else>
                    <em v-if="all.indexOf(item.Name)>=0" class="saas_check" disabled="true"></em>
                    <em v-else :class="item.check?'saas_check':'saas_checkbox'"></em>
                </template> -->

                <template v-if="item.cancheck" >
                      <em :class="item.check?'saas_check':'saas_checkbox'" @click="item.check=!item.check"></em>
                      <em class="pull-left fS f12" @click="item.check=!item.check">{{item.Name}}</em>
                </template>
                <template v-else>
                      <em class="saas_none"></em>
                      <em class="pull-left fS f12 col_b5">{{item.Name}}</em>
                </template>
            </li>
        </ul>
        <div class="col-md-12 mg_t10 mg_b20 clearfix">
            <a href="#" class="btn_red bg8 mg_t20 mg_l70 w80 h26 pull-left" :class="{'disable':isadd}" @click="saveaddress">确&nbsp;定</a>
            <a href="#" class="gray mg_t20 mg_l30 w80 h26 pull-left" @click="showaddress=false">取&nbsp;消</a>
        </div>
    </div>
</modal>
    <add-area :show.sync="addarea" :model="model"></add-area>
</template>

<script>

import {
    modal
}
from 'vue-strap'
import addArea from '../modal/addArea.vue'
export default {
    components: {
        modal,addArea
    },
    data() {
        return {
            showaddress: false,
            provinces: [],
            list: [],
            index: 0,
            isadd: false,
            addarea: false,
            model: {}
        }
    },
    ready() {
        let _this = this;
        //获取已配置信息
        Vue.http.get('/config/GetStockArea').then(function(res) {
                _this.list = res.data;
            })
            //获取所有省份
        Vue.http.get('/account/GetAreaInfo?headId=0').then(function(res) {
            res.data.forEach(function(item) {
                item.check = false;
                item.cancheck=true;
            })
            _this.provinces = res.data;
        })
    },
    computed: {
        allcheck() {
                let _this = this;
                return !this.provinces.some(function(item) {
                    if (item.cancheck) {
                        return !item.check;
                    }
                })
            },
            all() {
                let ids = "";
                this.list.forEach(function(item) {
                    ids += item.Provinces;
                })
                return ids;
            }
    },
    methods: {
        checkall() {
                let _this = this;
                let check = this.allcheck;
                this.provinces.forEach(function(item) {
                    if (item.cancheck) {
                      item.check = !check;
                    } else {

                    }
                })
            },
            setAddress(index) {
                let _this=this;
                this.index = index;
                let provinces = this.list[index].Provinces;

                this.provinces.forEach(function(item) {
                    item.cancheck=true;
                    if (provinces.indexOf(item.Name) >= 0) {
                        item.check = true;
                    } else {
                        item.check = false;
                        if(_this.all.indexOf(item.Name)>=0){
                          item.cancheck=false;
                        }
                    }
                })
                this.showaddress = true;
            },
            saveaddress() {
                if (this.isadd) {
                    return false;
                }
                let _this = this;
                let model = this.list[this.index];

                let param = [];
                let provinces = [];
                //let provinceids=[];
                this.provinces.forEach(function(item) {
                    if (item.check) {
                        let temp = {
                            StoreRegionId: model.Id,
                            StoreRegionName: model.HouseName,
                            ProvinceId: item.id,
                            ProvinceName: item.Name
                        };
                        provinces.push(item.Name);
                        //provinceids.push(item.id);
                        param.push(temp);
                    }
                })
                if (!provinces.length) {
                    layer.alert('请选择省份');
                    return false;
                }
                model.Provinces = provinces.join(',');
                this.isadd = true;
                // console.log(param);
                Vue.http.post('/config/SaveStockArea', {
                    list: param,
                    ids: model.ids
                }).then(function(res) {
                    //model.ProvinceIds=provinceids;
                    if (res.data) {
                        model.ids = res.data;
                    }
                    _this.showaddress = false;
                    _this.isadd = false;
                })
            }
    },
    events:{
      'addarea':function(area){
        this.list.push({
          HouseName: area.HouseName,
          Id: area.Id,
          Provinces: "",
          ids: ""
        })
        this.model={}
      }
    }
}

</script>
