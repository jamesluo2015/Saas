

<template id="">

<modal :show.sync="show" effect="fade" width="750px" title="违规记录">
    <div slot="modal-body" class="modal-body ">
        <div class="col_d50707 f12 pd_t20 pd_b20 mg_t20 mg_b20 t-c">显示关于违规告示</div>
        <table class="table table2 table_bg">
            <thead>
                <tr>
                    <th width="8%">违规平台</th>
                    <th width="9%">违规平台单号</th>
                    <th width="9%">订单</th>
                    <th width="11%">下单时间</th>
                    <th width="15%">违规行为</th>
                    <th width="10%">发货时间</th>
                    <th width="9%">状态</th>
                    <th width="10%">生成时间</th>
                </tr>
            </thead>
            <tbody v-for="item in list">
                <tr>
                    <td>{{item.SourceName}}</td>
                    <td>{{item.SourceOrderId}}</td>
                    <td>{{item.OrderCode}}</td>
                    <td><span class="col_767676">{{item.AddOrderTime}}</span></td>
                    <td>{{ item.BreakType }}</td>
                    <td><span class="col_767676">{{item.SendTime}}</span></td>
                    <td>{{item.OrderState}}</td>
                    <td><span class="col_767676">{{item.AddTime}}</span></td>
                </tr>
            </tbody>
        </table>
        <page-docs :count="count"></page-docs>
    </div>
</modal>

</template>

<script>

import  {modal} from 'vue-strap'
import pageDocs from '../general/pageDocs.vue'
import DateFormat from '../utils/DateFormat.js'
export default {
    components: {
        pageDocs,modal
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            list: [],
            pageindex: 1,
            pagesize: 5,
            count: 0
        }
    },
    ready(){
      this.query();
    },
    methods:{
      query(){
        let _this=this;
        let param={
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
        Vue.http.get('/home/GetBreakList',param).then(function(res){
          if(res.data.ok){
            //时间转换
            res.data.data.forEach(function(item){
              item.AddOrderTime=DateFormat(item.AddOrderTime);
              item.SendTime=DateFormat(item.SendTime);
              item.AddTime=DateFormat(item.AddTime);
            })
            _this.list=res.data.data;
            _this.count=Math.ceil( res.data.count / _this.pagesize );
          }
        })
      }
    },
    events:{
      'page':function(val){
        this.pageindex=val;
        this.query();
      }
    }
}

</script>
