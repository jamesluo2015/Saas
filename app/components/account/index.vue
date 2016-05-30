

<template id="">

<div class="right_contain">
    <div class="row">
        <div class="col-md-6 saas_bill mg_t10 pull-left">
            <template id="" v-if="model.Id">
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">企业信息：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.DealerName}}</p>
                    <input placeholder="" v-else v-model="model.DealerName" type="text" class="add_input w160 form-control pull-left pd_l0 mg_t2 mg_l95">
                </div>
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">所在区域：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.ProvinceName+" "+model.CityName+" "+model.AreaName}}</p>
                    <template v-else>
                        <v-select :value.sync="province" class='pull-left mg_l95' :options="provinces" :close-on-select="true" placeholder="选择省份"></v-select>
                        <v-select :value.sync="city" class='pull-left mg_l30'  :options="citys" :close-on-select="true" placeholder="选择城市"></v-select>
                        <v-select :value.sync="area" class='pull-left mg_l30' :options="areas" :close-on-select="true" placeholder="选择区域"></v-select>
                    </template>
                </div>
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">企业地址：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.Address}}</p>
                    <input placeholder="" v-else v-model="model.Address" type="text" class="add_input w160 form-control pull-left pd_l0 mg_t2 mg_l95">
                </div>
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">项目联系人：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.Contact}}</p>
                    <input placeholder="" v-else v-model="model.Contact" type="text" class="add_input w160 form-control pull-left pd_l0 mg_t2 mg_l95">
                </div>
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">联系方式：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.Phone}}</p>
                    <input placeholder="" v-else v-model="model.Phone" type="text" class="add_input w160 form-control pull-left pd_l0 mg_t2 mg_l95">
                </div>
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">开户名称：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.AccountName}}</p>
                    <input placeholder="" v-else v-model="model.AccountName" type="text" class="add_input w160 form-control pull-left pd_l0 mg_t2 mg_l95">
                </div>
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">开户行：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.BankAccount||"无"}}</p>
                    <input placeholder="" v-else v-model="model.BankAccount" type="text" class="add_input w160 form-control pull-left pd_l0 mg_t2 mg_l95">
                </div>
                <div class="col-md-12 mg_t20 clearfix select_dropdown">
                    <label class="control-label pull-left">账号：</label>
                    <p class="pull-left pd_l0 mg_t2" v-if="!isupdate">{{model.AccountNumber||"无"}}</p>
                    <input placeholder="" v-else v-model="model.AccountNumber" type="text" class="add_input w160 form-control pull-left pd_l0 mg_t2 mg_l95">
                </div>
                <div class="col-md-12">
                    <a href="javascript:void(0)" v-if="!isupdate" class="btn_red bg8 auto f16 mg_t20 w200 h40" @click="isupdate=true">编&nbsp;辑</a>
                    <a href="javascript:void(0)" v-else class="btn_red bg8 auto f16 mg_t20 w200 h40" @click="submit" :class="{'disable':!valid}">保&nbsp;存</a>
                </div>
            </template>
        </div>
        <div class="company_bg pull-left"></div>
    </div>
</div>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap';
export default {
    components: {
        vSelect
    },
    data() {
        return {
            model: {},
            isupdate: false,
            provinces: [],
            province: [],
            citys: [],
            city: [],
            areas: [],
            area: []
        }
    },
    methods: {
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
            getareas(headid, isdefault) {
                let _this = this;
                Vue.http.get('/account/GetAreaInfo?headId=' + headid).then(function(res) {
                    _this.areas = _this.convert(res.data);
                    if (isdefault) {
                        _this.area = [_this.areas[0].value];
                    }
                })
            },
            getlabel(list, val) {
                for (var i = 0; i < list.length; i++) {
                    let item = list[i];
                    if (item.value == val) {
                        return item.label;
                    }
                }
            },
            submit() {
                let _this = this;
                this.model.ProvinceId = this.province[0];
                this.model.ProvinceName = this.getlabel(this.provinces, this.province[0]);
                this.model.CityId = this.city[0];
                this.model.CityName = this.getlabel(this.citys, this.city[0]);
                this.model.AreaId = this.area[0];
                this.model.AreaName = this.getlabel(this.areas, this.area[0]);
                Vue.http.post('/account/save',this.model).then(function(res){
                  layer.msg('保存成功',{icon:1,time:1000});
                })

                this.isupdate = false;
            }
    },
    watch: {
        province(val) {
                this.getcitys(val, true);
            },
            city(val) {
                this.getareas(val, true);
            }
    },
    computed: {
        valid() {
            let model = this.model;
            if (!model.DealerName || !model.Address || !model.Phone || !model.Contact) {
                return false;
            }

            return true;
        }
    },
    ready() {
        let _this = this;
        //获取经销商信息
        Vue.http.get('/account/GetDealerInfo').then(function(response) {
            _this.model = response.data;
            //获取地区信息
            Vue.http.get('/account/GetAreaInfo?headId=1').then(function(res) {
                _this.provinces = _this.convert(res.data);
            })
            _this.getcitys(response.data.ProvinceId);
            _this.getareas(response.data.CityId);

            _this.province = [_this.model.ProvinceId.toString()];
            _this.city = [_this.model.CityId.toString()];
            _this.area = [_this.model.AreaId.toString()];
        })
    }
}

</script>
