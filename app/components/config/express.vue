<template>  
<div class="right_contain">
    <div class="row">
            <div class="col-md-12 pd_l0 mg_t10 select_dropdown clearfix z-top">
            <a href="javascript:void(0)" @click="addBrand=true" class="btn_red bg1 w120 h36 pull-left mg_l10 cursor">添加快递公司</a>
        </div>
        <div class="row col-md-12 pd_l0 pd_r0 mg_l0 mg_r0 mg_b20">
            <div class="shop_info pd_5">
                <table class="table table2 mg_t15 table6 bd_tb5">
                    <thead>
                        <tr>
                            <th width="8%">序号</th>
                            <th width="25%">快递公司名称</th>
                            <th width="20%">联系人</th>
                            <th width="15%">联系方式</th>
                            <th width="20%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(index,item) in list">
                            <td>
                                {{index+1}}
                            </td>
                            <td>
                                {{item.ExpressName}}
                            </td>
                            <td>
                                暂无
                            </td>
                            <td>
                                {{item.Tel}}
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="col_ec7642 mg_l10 f12 f_song" @click="remove(index,item.Id)">删除</a>
                                <a href="javascript:void(0)" class="col_007aff f12 f_song" v-if="!item.IsDefault" @click="setdefault(index,item.Id)">设为默认</a>
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
    import { modal }  from 'vue-strap'
    export default{
        companents:{
             modal
        },
        data(){
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
        methods:{
            remove(index,id){
                let _this = this;
                Vue.http.post('/config/RemoveExpress?id='+id).then(function(res){
                    _this.list.splice(index,1);
                },function(){
                    layer.alert('删除失败',5);
                })
            },
            setdefault(index,id){
                let _this = this;
                Vue.http.post('/config/SetDefault?id='+id).then(function(res){
                    _this.list.map(x=>x.IsDefault=false);
                    _this.list[index].IsDefault=true;
                },function(){
                    
                })
            }
        }
    }

</script>