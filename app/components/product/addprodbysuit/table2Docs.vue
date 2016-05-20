
<table class="table table2 mg_t20 table3">
    <tr>
        <th width="6%">序号</th>
        <th width="10%">配件名称</th>
        <th width="9%">适用年款</th>
        <th width="9%">零件编号</th>
        <th width="22%">配件说明</th>
        <th width="9%">品牌</th>
        <th width="9%">供应商编码</th>
        <th width="10%">*北迈价（元）</th>
        <th width="7%">*库存数</th>
        <th width="9%">操作</th>
    </tr>
    <tr v-for="(index, item) in products" transition="item">
        <td>{{index+1}}</td>
        <!--通用-->
        <td v-if="item.BmNo">{{item.StandardName}}</td>
        <td v-else>
            <v-select v-else :value.sync="item.standard" :search="true" :options="standardlist" :close-on-select="true" placeholder="标准名称"></v-select>
        </td>
        <!--适用性-->
        <td v-if="item.BmNo"><a class='cursor' @click="getsuitcars(index)">查看</a></td>
        <td v-else>
          <a class='cursor' >添加</a>
        </td>
        <!--零件编号-->
        <td v-if="item.BmNo">{{item.Sku}}</td>
        <td v-else>
            <input type="text" placeholder="零件编号" class="form-control" v-model="item.Sku" />
        </td>
        <!--配件说明-->
        <td v-if="item.BmNo">{{item.ContentInfo}}</td>
        <td v-else>
            <input type="text" placeholder="配件说明" class="form-control" v-model="item.ContentInfo" />
        </td>
        <!--品牌-->
        <td v-if="item.isupdate">
            <!--<input type="text" placeholder="品牌" class="form-control" bmtitle="此价格是在北迈网上显示的销售价格" v-model="item.ProdBrandName" />-->
            <v-select :value.sync="item.Brandlist" :search="true" :options="brands" :close-on-select="true" placeholder="品牌"></v-select>
        </td>
        <td v-else>{{item.ProdBrandName||"其它"}}</td>

        <!--经销商编码-->
        <td v-if="item.isupdate">
            <input type="text" placeholder="供应商编码" class="form-control" v-model="item.DealerNo" />
        </td>
        <td v-else>{{item.DealerNo}}</td>

        <!--北迈价-->
        <td v-if="item.isupdate">
            <input type="text" placeholder="北迈价" class="form-control" v-model="item.SalePrice" />
        </td>
        <td v-else>{{item.SalePrice}}</td>

        <!--库存-->
        <td v-if="item.isupdate">
            <input type="text" placeholder="库存" v-model='item.StockCount' class="form-control" />
        </td>
        <td v-else>{{item.StockCount}}</td>

        <td v-if="item.isupdate"><a class="cursor col_007aff f12 f_song" @click='save(index)'>保存</a></td>
        <td v-else><a class="cursor col_007aff f12 f_song" @click='item.isupdate=1'>修改</a></td>
    </tr>
    <tr>
        <td colspan="10" v-if="!addcount&&!first" :class="{'text-right':products.length}">
            没有找到您想要的商品？<a href="#" @click="addproduct"><span class="label label-warning">点击添加</span></a>
        </td>
        <td colspan="10" v-if="addcount" class="text-right">
            <a href="#" @click="addproduct"><span class="label label-warning">继续添加</span></a>
        </td>
    </tr>
    </tr>
</table>
