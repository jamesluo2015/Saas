

<template id="">

<modal :show.sync="show" effect="fade" width="800px" title="补充适用年款">
    <div slot="modal-body" class="modal-body " style="padding:0px">
        <ul class="saas_letter clearfix">
            <li :class="{'checked':$index==index}" v-for="letter in letters" @click="index=$index"><a href="#">{{ letter }}</a></li>
            <li :class="{'checked':index==-1}"><a href="#" class="all" @click="index=-1">全部</a></li>
        </ul>
        <div class="clearfix mg_b5">
            <div class="alert_year w170 checked">
                <h3>选择主机厂</h3>
                <ul class="alert_year_left pd_t5 pd_b10">
                    <li :class="{'checked': item.ID==fid}" v-for="item in factorylist" @click="fid=item.ID">
                      <a href="#" class="clearfix">
                        <span class="pull-left">{{item.AutoName}}</span>
                        <span class="pull-right">&gt;</span>
                      </a>
                    </li>
                </ul>
            </div>
            <div class="alert_year w170 checked">
                <h3>选择车型</h3>
                <ul class="alert_year_left pd_t5 pd_b10">
                    <li :class="{'checked': item.ID==cid}" v-for="item in clist" @click="cid=item.ID">
                      <a href="#" class="clearfix">
                        <span class="pull-left">{{item.AutoName}}</span>
                        <span class="pull-right">&gt;</span>
                      </a>
                    </li>
                </ul>
            </div>
            <div class="alert_year w430 checked">
                <h3>选择年款</h3>
                <ul class="modal_add pd_10 clearfix alert_year_right">
                    <li class="clearfix w_100" v-if="ylist.length" @click="allcheck">
                      <em :class="isallcheck ? 'saas_check' : 'saas_checkbox' "></em>
                      <em class="pull-left fS f12" >全选</em>
                    </li>
                    <li class="clearfix" v-for="item in ylist" @click="addyear(item.ID)">
                      <em :class=" exists.indexOf(item.ID)>-1? 'saas_none' : yids.indexOf(item.ID)>-1 ?'saas_check' : 'saas_checkbox' "></em>
                      <em :class=" exists.indexOf(item.ID)>-1? 'col_b5' : ''" class="pull-left fS f12">{{item.YearName}}</em>
                      <!-- <span class="pull-right alert_edi mg_r30"></span> -->
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-md-12 pd_b10 clearfix bdT_d0d0d0" style="*position:absolute;*bottom:0;*left:0;*background:#fff;">
            <a href="#" class="btn_red bg8 mg_t10 auto w120 h26" @click='save'>保存</a>
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
    props: {
        show: {
            type: Boolean,
            default: false
        },
        bmno: {
            require: true
        },
        exists:{
          type: Array,
          default(){return []}
        }
    },
    data() {
        return {
            index: 0,
            letters: ['A', 'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
            fid: 0,
            cid: 0,
            yids:[],

            flist:[],
            clist:[],
            ylist:[],

            data:[[],[]]
        }
    },
    ready(){
      let _this=this;
      Vue.http.get('/product/GetFactoryByCode').then(function(res){
        _this.flist=res.data;
      })
    },
    computed:{
      factorylist(){
        let _this=this;
        if(this.index>=0){
          return this.flist.filter(function(item){
            return item.FirCode == _this.letters[_this.index];
          })
        }else{
          return this.flist;
        }
      },
      isallcheck(){
        let yids=this.yids;
        return this.ylist.every(function(item){
          return yids.indexOf(item.ID)>-1;
        })
      }
    },
    watch:{
      index(){
        this.fid=0;
        this.cid=0;
        this.ylist=[];
      },
      fid(val){
        if(this.fid){
          this.ylist=[];
          let _this=this;
          //读取内存列表
          let arr=_this.data[0].filter(function(item){
            return item.ParentID==_this.fid;
          })
          if(arr.length){
            _this.clist = arr;
            return false;
          }
          Vue.http.get('/product/GetCarmodels?pid='+this.fid).then(function(res){
            _this.clist = res.data;
            //加到内存
            res.data.map(x=>_this.data[0].push(x));
          })
        }
      },
      cid(val){
        if(this.fid){
          let _this=this;
          //读取内存列表
          let arr=_this.data[1].filter(function(item){
            return item.ParentID==_this.cid;
          })
          if(arr.length){
            _this.ylist = arr;
            return false;
          }
          Vue.http.get('/product/GetYear?pid='+this.cid).then(function(res){
            _this.ylist = res.data;
            //加到内存
            res.data.map(x=>_this.data[1].push(x));
          })
        }
      }
    },
    methods: {
      addyear(id){
         if(this.exists.indexOf(id)>-1){
           return false;
         }
        if(this.yids.indexOf(id)>-1){
          this.yids.$remove(id);
        }else{
          this.yids.push(id);
        }
      },
      allcheck(){
        let _this=this;
        if(this.isallcheck){
          this.ylist.forEach(function(item){
            _this.yids.$remove(item.ID);
          })
        }else{
          this.ylist.forEach(function(item){
            if(_this.yids.indexOf(item.ID)==-1 && _this.exists.indexOf(item.ID)==-1){
              _this.yids.push(item.ID);
            }
          })
        }
      },
      save(){
        let _this=this;
        let arr=[];
        let flist=this.flist;
        let clist=_this.data[0];
        let ylist=_this.data[1];
        for (var i = 0; i < _this.yids.length; i++) {
          let model={
            BmNo: this.bmno,
            PartsYearId: _this.yids[i]
          };
          //获取年款
        year: for (var i = 0; i < ylist.length; i++) {
             if(ylist[i].ID == model.PartsYearId){
               model.PartsYear= ylist[i].YearName;
               //获取车型
               car: for (var j = 0; j < clist.length; j++) {
                 if(clist[j].ID == ylist[i].ParentID){
                   model.Carmodel=clist[j].AutoName;
                   model.CarmodelId=clist[j].ID;
                   //获取主机厂
                   fac: for (var k = 0; k < flist.length; k++) {
                     if(flist[k].ID == clist[j].ParentID){
                       model.FactoryId=flist[k].ID;
                       model.FactoryName=flist[k].AutoName;
                       break fac;
                     }
                   }
                   break car;
                 }
               }
               break year;
             }
          }
          arr.push(model);
        }


        Vue.http.post('/product/AddSuit',{list:arr}).then(function(res){
          _this.yids.map(x=>_this.exists.push(x));
          _this.yids=[];
        })
        this.show=false;
        layer.msg('保存成功',{icon:1,time:800});
      }
    }
}

</script>
