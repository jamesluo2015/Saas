

<template>

<div class="right_contain">
    <div class="row">

        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix">
            <span class="col_010101 f16 pull-left mg_l30 lineH26">快递公司管理</span>
            <a href="#" class="green_btn w100 h26 pull-left mg_l30" @click="addBrand=true">+添加快递公司</a>
        </div>

        <div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20">
            <div class="shop_info pd_5">
                <table class="table table2 mg_t15 table6 bd_tb5">
                    <thead>
                        <tr>
                            <th width="25%">快递公司名称</th>
                            <th width="25%">联系人</th>
                            <th width="25%">联系方式</th>
                            <th width="25%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index,item) in list">
                            <td class="poR">
                                <em class="moren_tip" v-if="item.IsDefault"></em>
                                <div class="pd_l50">
                                    <p class="col_010101 mg_b5">{{item.ExpressName}}</p>
                                    <!-- <img src="../images/saas09.png"> -->
                                </div>
                            </td>
                            <td>{{item.Tel}}</td>
                            <td>{{item.Tel}}</td>
                            <td>
                                <a href="#" class="saas_del mg_t10 pull-left mg_l20" @click="remove(index,item.Id)">删除</a>
                                <a href="#" class="saas_moren_gray mg_t10 pull-left mg_l2 mg_l20" v-if="!item.IsDefault" @click="setdefault(index,item.Id)">设为默认</a>
                                <a href="#" class="saas_moren mg_t10 pull-left mg_l20" v-else>设为默认</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import {
    modal
}
from 'vue-strap'
export default {
    companents: {
        modal
    },
    data() {
        return {
            list: []
        }
    },
    ready() {
        //获取经销商品牌
        let _this = this;
        Vue.http.get('/config/GetExpress', {}).then(function(response) {
            _this.list = response.data;
        });
    },
    methods: {
        remove(index, id) {
                let _this = this;
                Vue.http.post('/config/RemoveExpress?id=' + id).then(function(res) {
                    _this.list.splice(index, 1);
                }, function() {
                    layer.alert('删除失败', 5);
                })
            },
            setdefault(index, id) {
                let _this = this;
                Vue.http.post('/config/SetDefault?id=' + id).then(function(res) {
                    _this.list.map(x => x.IsDefault = false);
                    _this.list[index].IsDefault = true;
                }, function() {

                })
            }
    }
}

</script>
