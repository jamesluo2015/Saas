

<template id="">

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown">
            <a href="#" class="green_btn w80 h26 pull-left mg_l30">+添加库区</a>
            <a href="#" class="green_btn w80 h26 pull-left mg_l30">+添加库房</a>
            <div class="dropdown pull-left mg_l30">
                <v-select :value.sync="area" :options="areas" :close-on-select="true" placeholder="选择库区"></v-select>
            </div>
            <div class="dropdown pull-left mg_l30" >
                <v-select :value.sync="type" :options="typelist" :close-on-select="true" placeholder="选择条件"></v-select>
            </div>
            <input placeholder="" class="add_input w160 pull-left form-control mg_l30" v-model="key" type="text">
            <button-docs text="查&nbsp;询" @click='query' class='pull-left mg_l30'></button-docs>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_t10 bdT_d0d0d0">
            <table class="table table2 table_bg mg_t2" v-for="(index,item) in list">
                <thead>
                    <tr>
                        <th width="10%">库房名称</th>
                        <th width="8%">库房编号</th>
                        <th width="25%">地址</th>
                        <th width="12%">状态</th>
                        <th width="10%">负责人</th>
                        <th width="15%">联系方式</th>
                        <th width="20%">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="7">
                            <em class="flag"></em>
                            <span class="pull-left">{{item.HouseName}}</span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-for="(hindex,house) in item.StockHouses">
                    <tr>
                        <td>{{house.HouseName}}</td>
                        <td>{{house.HouseCode}}</td>
                        <td>{{house.Address}}</td>
                        <td v-if="house.HouseStatus==2">
                          <span class="col_d50707">已停用</span>
                          <a href="javascript:void(0)" class="saas_add mg_l10" @click="enable(house.Id,true,house)">开启</a>
                        </td>
                        <td v-if="house.HouseStatus==0">
                          <span class="col_5ca50a">已通过</span>
                          <a href="javascript:void(0)" class="saas_add mg_l10"@click="enable(house.Id,false,house)">停用</a>
                        </td>
                        <td>{{house.Manager}}</td>
                        <td>{{house.Phone}}</td>
                        <td>
                            <a href="#" class="saas_edi mg_t10 pull-left">编辑</a>
                            <a href="#" class="saas_del mg_t10 pull-left mg_l20" @click="del(house.Id,index,hindex)">删除</a>
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

    </div>


</div>

</template>

<script>

import {
    select as vSelect
}
from 'vue-strap'
import buttonDocs from '../general/buttonDocs.vue'
import pageDocs from '../general/pageDocs.vue'
export default {
    components: {vSelect,buttonDocs,pageDocs},
    data() {
        return {
          areas: [],
          area: [],
          typelist: [{
              value: '1',
              label: '库房名称'
          }, {
              value: '2',
              label: '库房编码'
          }],
          type:[],
          key:"",
          list:[],
          pagesize: 5,
          pageindex: 1,
          count: 0,
        }
    },
    methods:{
      query(){
        let _this = this;
        let param = {
            pagesize: _this.pagesize,
            pageindex: _this.pageindex,
            houseid: _this.area.length?_this.area[0]:0,
            type: _this.type.length?_this.type[0]:0,
            key: _this.key
        };
        var loading=layer.load();
        Vue.http.get('/stock/GetHouse', param).then(function(res) {
          _this.list=[];
          _this.count=1;
          layer.close(loading);
            if (res.data.ok) {
                _this.list = res.data.data;
                _this.count = Math.ceil(res.data.count / _this.pagesize);
            } else {
                layer.alert(res.data.mes);
            }
        }, function() {
            //error
            console.log('查询订单信息错误');
            layer.close(loading);
        })
      },
      del(id,index,hindex){
        let _this=this;
        layer.confirm('确认删除吗', {
            btn: ['删除', '取消'] //按钮
        }, function() {
          Vue.http.post('/stock/DelHosue?id='+id).then(function(res){
            if(res.data.ok){
              _this.list[index].StockHouses.splice(hindex,1);
              layer.msg('删除成功',{
                  icon: 1,
                  time: 800
              });
            }else{
              layer.alert(res.data.mes);
            }
          })
        },function(){

        })
      },
      enable(id,isenable,item){
        let _this=this;
        let state=isenable?0:2;
        Vue.http.post(`/stock/EnableHouse?id=${id}&houseStatus=${state}`).then(function(res){
            item.HouseStatus=state;
        })
      }
    },
    ready(){
      this.query();
      let _this=this;
      Vue.http.get('/stock/GetAreas').then(function(res){
        let arr=[{label:"全部",value: "0"}];
        res.data.map(x=>arr.push({
          label: x.HouseName,
          value: x.Id.toString()
        }));
        _this.areas=arr;
      })
    }
}

</script>
