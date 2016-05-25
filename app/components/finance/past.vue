

<template id="">

<div class="right_contain1">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 clearfix pd_b20 bdB_d0d0d0">
            <span class="mg_l30">结算单编码：123456</span>
            <span class="mg_l30">结算周期：2016-01-01&nbsp;至&nbsp;2016-01-31</span>
            <a href="#" class="saas_add">查看结算单</a>
        </div>
        <div class="col-md-12 pd_l0 mg_t30 mg_b20 clearfix pd_b20 h60 this_bill">
            <span class="mg_l30">应收款项：</span>
            <span class="f26 col_d50707">3800.00</span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">=</span>
            <span class="f26 col_d50707"><em class="fS">4500.00</em><em class="col_010101 fS fN f14">【货款】</em></span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">-</span>
            <span class="f26 col_77b530"><em class="fS">500.00</em><em class="col_010101 fS fN f14">【佣金】</em></span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">-</span>
            <span class="f26 col_77b530"><em class="fS">100.00</em><em class="col_010101 fS fN f14">【代付运费】</em></span>
            <span class="f20 fB fS col_767676 mg_l5 mg_r5">-</span>
            <span class="f26 col_77b530"><em class="fS">100.00</em><em class="col_010101 fS fN f14">【其它】</em></span>
        </div>
    </div>

</div>

<div class="right_contain1 mg_t15 mg_b20">
    <div class="row">
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <ul id="myTab" class="nav nav-tabs nav_tabs clearfix mg_t10">
                <li class=""><a href="#choice_name" data-toggle="tab">订单</a></li>
                <li class="active"><a href="#code_enter" data-toggle="tab">退货单</a></li>
            </ul>
            <div class="col-md-12 pd_l0 mg_t30 mg_b30 clearfix select_dropdown">
                <span class="pull-left mg_l10 mg_r10 f12 lineH26 mg_l20">下单时间</span>
                <div class="datepicker pull-left">
                    <input class="form-control datepicker-input w120" type="text">
                    <!--v-if-->
                    <div style="display: none;" class="datepicker-popup">
                        <div class="datepicker-inner">
                            <div class="datepicker-body">
                                <div class="datepicker-ctrl">
                                    <span class="month-btn datepicker-preBtn">&lt;</span>
                                    <span class="month-btn datepicker-nextBtn">&gt;</span>
                                    <p>一月 2015</p>
                                </div>
                                <div class="datepicker-weekRange">
                                    <!--v-for-start--><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                                    <!--v-for-end-->
                                </div>
                                <div class="datepicker-dateRange">
                                    <!--v-for-start--><span class="datepicker-item-gray">28</span><span class="datepicker-item-gray">29</span><span class="datepicker-item-gray">30</span><span class="datepicker-item-gray">31</span><span class="datepicker-dateRange-item-active">1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                                    <span
                                    class="datepicker-item-gray">1</span><span class="datepicker-item-gray">2</span><span class="datepicker-item-gray">3</span><span class="datepicker-item-gray">4</span><span class="datepicker-item-gray">5</span><span class="datepicker-item-gray">6</span>
                                        <span
                                        class="datepicker-item-gray">7</span>
                                            <!--v-for-end-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="datepicker-popup">
                        <div class="datepicker-inner">
                            <div class="datepicker-body">
                                <div class="datepicker-ctrl">
                                    <span class="month-btn datepicker-preBtn">&lt;</span>
                                    <span class="month-btn datepicker-nextBtn">&gt;</span>
                                    <p>2015</p>
                                </div>
                                <div class="datepicker-monthRange">
                                    <!--v-for-start--><span class="datepicker-dateRange-item-active">一月</span><span>二月</span><span>三月</span><span>四月</span><span>五月</span><span>六月</span><span>七月</span><span>八月</span><span>九月</span><span>十月</span><span>十一月</span><span>十二月</span>
                                    <!--v-for-end-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="datepicker-popup">
                        <div class="datepicker-inner">
                            <div class="datepicker-body">
                                <div class="datepicker-ctrl">
                                    <span class="month-btn datepicker-preBtn">&lt;</span>
                                    <span class="month-btn datepicker-nextBtn">&gt;</span>
                                    <p>2010-2020</p>
                                </div>
                                <div class="datepicker-monthRange decadeRange">
                                    <!--v-for-start--><span>2009</span><span>2010</span><span>2011</span><span>2012</span><span>2013</span><span>2014</span><span class="datepicker-dateRange-item-active">2015</span><span>2016</span><span>2017</span><span>2018</span><span>2019</span><span>2020</span>
                                    <!--v-for-end-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="pull-left mg_l10 mg_r10 f12 lineH26">至</span>
                <div class="datepicker pull-left">
                    <input class="form-control datepicker-input w120" type="text">
                    <!--v-if-->
                    <div style="display: none;" class="datepicker-popup">
                        <div class="datepicker-inner">
                            <div class="datepicker-body">
                                <div class="datepicker-ctrl">
                                    <span class="month-btn datepicker-preBtn">&lt;</span>
                                    <span class="month-btn datepicker-nextBtn">&gt;</span>
                                    <p>一月 2015</p>
                                </div>
                                <div class="datepicker-weekRange">
                                    <!--v-for-start--><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                                    <!--v-for-end-->
                                </div>
                                <div class="datepicker-dateRange">
                                    <!--v-for-start--><span class="datepicker-item-gray">28</span><span class="datepicker-item-gray">29</span><span class="datepicker-item-gray">30</span><span class="datepicker-item-gray">31</span><span class="datepicker-dateRange-item-active">1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                                    <span
                                    class="datepicker-item-gray">1</span><span class="datepicker-item-gray">2</span><span class="datepicker-item-gray">3</span><span class="datepicker-item-gray">4</span><span class="datepicker-item-gray">5</span><span class="datepicker-item-gray">6</span>
                                        <span
                                        class="datepicker-item-gray">7</span>
                                            <!--v-for-end-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="datepicker-popup">
                        <div class="datepicker-inner">
                            <div class="datepicker-body">
                                <div class="datepicker-ctrl">
                                    <span class="month-btn datepicker-preBtn">&lt;</span>
                                    <span class="month-btn datepicker-nextBtn">&gt;</span>
                                    <p>2015</p>
                                </div>
                                <div class="datepicker-monthRange">
                                    <!--v-for-start--><span class="datepicker-dateRange-item-active">一月</span><span>二月</span><span>三月</span><span>四月</span><span>五月</span><span>六月</span><span>七月</span><span>八月</span><span>九月</span><span>十月</span><span>十一月</span><span>十二月</span>
                                    <!--v-for-end-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="display: none;" class="datepicker-popup">
                        <div class="datepicker-inner">
                            <div class="datepicker-body">
                                <div class="datepicker-ctrl">
                                    <span class="month-btn datepicker-preBtn">&lt;</span>
                                    <span class="month-btn datepicker-nextBtn">&gt;</span>
                                    <p>2010-2020</p>
                                </div>
                                <div class="datepicker-monthRange decadeRange">
                                    <!--v-for-start--><span>2009</span><span>2010</span><span>2011</span><span>2012</span><span>2013</span><span>2014</span><span class="datepicker-dateRange-item-active">2015</span><span>2016</span><span>2017</span><span>2018</span><span>2019</span><span>2020</span>
                                    <!--v-for-end-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="pull-left mg_l10 f12 lineH26 mg_l30">订单号：</span>
                <input placeholder="" class="add_input w160 pull-left form-control" type="text">
                <a href="#" class="btn_red bg8 f14 w70 h26 pull-left mg_l30">查&nbsp;询</a>
                <a href="#" class="red_btn f14 w100 h26 pull-left mg_l30">导出订单明细</a>
            </div>
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th width="17%">订单号</th>
                        <th width="34%">配件名称</th>
                        <th width="10%">商品数量</th>
                        <th width="10%">商品金额</th>
                        <th width="8%">佣金</th>
                        <th width="10%">付款方式</th>
                        <th width="11%">下单时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>6102415245322156</td>
                        <td>广州本田 思迪 1.3L 五档自动（2006-2008） 空气滤芯</td>
                        <td>1</td>
                        <td><em class="fS col_ee4145 f16">200.00</em> </td>
                        <td><span class="col_5ca50a">10%<br>20.00</span></td>
                        <td>在线支付</td>
                        <td><span class="col_767676">2016-04-01<br>16:00:00</span></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>6102415245322156</td>
                        <td>广州本田 思迪 1.3L 五档自动（2006-2008） 空气滤芯</td>
                        <td>1</td>
                        <td><em class="fS col_ee4145 f16">200.00</em> </td>
                        <td><span class="col_5ca50a">10%<br>20.00</span></td>
                        <td>在线支付</td>
                        <td><span class="col_767676">2016-04-01<br>16:00:00</span></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>6102415245322156</td>
                        <td>广州本田 思迪 1.3L 五档自动（2006-2008） 空气滤芯</td>
                        <td>1</td>
                        <td><em class="fS col_ee4145 f16">200.00</em> </td>
                        <td><span class="col_5ca50a">10%<br>20.00</span></td>
                        <td>在线支付</td>
                        <td><span class="col_767676">2016-04-01<br>16:00:00</span></td>
                    </tr>
                </tbody>

            </table>
            <div class="pages mg_t20">
                <a class="inline turnPage unable" href="javascript:void(-1)">&lt;</a>
                <a class="inline checked" href="#">1</a>
                <a class="inline" href="#">2</a>
                <a class="inline" href="#">3</a>
                <span class="inline f13">...</span>
                <a class="inline" href="#">10</a>
                <a class="inline turnPage" href="#">&gt;</a>
                <span class="inline mg_l10 mg_r10">共10页</span>
                <span>去第</span>
                <input placeholder="" class="add_input w40 form-control t-c" type="text">
                <span>页</span>
                <a href="#" class="btn_red bg8 f14 w60 h22">确定</a>
            </div>
        </div>

    </div>


</div>

</template>

<script>

export default {
    components: {},
}

</script>
