

<template>

<div class="right_contain">
    <div class="row">
        <div class="col-md-12 pd_l0 mg_t10 mg_b30 clearfix select_dropdown min-w1200">
            <span class="pull-left mg_l10 mg_r10 lineH26 mg_l20">开单时间</span>
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
            <div class="dropdown pull-left mg_l20" _v-0691d5dd="">
                <button class="btn dropdown-toggle dropdown_toggle bo_w1 form-control" type="button" _v-0691d5dd="">
                    <span class="btn-placeholder" _v-0691d5dd="">选择条件</span>
                    <span class="btn-content" _v-0691d5dd=""></span>
                    <span class="caret" _v-0691d5dd=""></span>
                </button>
                <ul class="dropdown-menu" _v-0691d5dd="">
                    <!--fragment-start-->
                    <!--v-if-->
                    <!--v-for-start-->
                    <li id="1" style="position:relative" _v-0691d5dd="">
                        <a style="cursor:pointer" _v-0691d5dd="">
                                      零件编号
                                      <span style="display: none;" class="glyphicon glyphicon-ok check-mark" _v-0691d5dd=""></span>
                                  </a>
                    </li>
                    <li id="2" style="position:relative" _v-0691d5dd="">
                        <a style="cursor:pointer" _v-0691d5dd="">
                                      供应商编码
                                      <span style="display: none;" class="glyphicon glyphicon-ok check-mark" _v-0691d5dd=""></span>
                                  </a>
                    </li>
                    <li id="3" style="position:relative" _v-0691d5dd="">
                        <a style="cursor:pointer" _v-0691d5dd="">
                                      配件名称
                                      <span style="display: none;" class="glyphicon glyphicon-ok check-mark" _v-0691d5dd=""></span>
                                  </a>
                    </li>
                    <!--v-for-end-->
                    <!--fragment-end-->
                    <!--v-if-->

                    <div style="display: none;" class="notify fadein-transition" _v-0691d5dd="">
                        Limit reached (1024 items max).
                    </div>
                </ul>
            </div>
            <input placeholder="" class="add_input w160 pull-left form-control mg_l20" type="text">
            <a href="#" class="btn_red bg8 f14 w70 h26 pull-left mg_l30">查&nbsp;询</a>
            <a href="#" class="btn_green f14 w70 h26 pull-left mg_l30">开&nbsp;单</a>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_r0 bdT_d0d0d0">
            <table class="table table2 table_bg mg_t2 mg_b0">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="pull-left">2016-01-01&nbsp;19:00:00</span>
                            <span class="mg_l40 col_010101 pull-left">单号：1234567890</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="poR" width="40%">
                            <img src="../../images/logo.png" class="saas_table_img">
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">迈氏 后刹车盘</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：6QD615601A</p>
                                    <p class="col_767676">供应商编码：86637-B8000</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x1</td>
                        <td width="15%">单价：29.00</td>
                        <td width="15%" rowspan="2" class="bd_lD_d9 t-c">
                            <span>总金额</span>
                            <br>
                            <span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">20.00</em>
                        </td>
                        <td width="15%" rowspan="2" class="bd_lD_d9 t-c"><a href="#" class="saas_add mg_l0">查看备注</a></td>
                    </tr>
                    <tr>
                        <td class="poR" width="40%">
                            <img src="../../images/logo.png" class="saas_table_img">
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">迈氏 后刹车盘</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：6QD615601A</p>
                                    <p class="col_767676">供应商编码：86637-B8000</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x1</td>
                        <td width="15%">单价：29.00</td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div class="col-md-12 pd_l0 pd_r0 mg_r0">
            <table class="table table2 table_bg mg_t2">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="pull-left">2016-01-01&nbsp;19:00:00</span>
                            <span class="mg_l40 col_010101 pull-left">单号：1234567890</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="poR" width="40%">
                            <img src="../../images/logo.png" class="saas_table_img">
                            <div class="table_detail">
                                <div class="clearfix">
                                    <span class="pull-left col_010101">迈氏 后刹车盘</span>
                                </div>
                                <div class="col-md-12 pd_l0 mg_t10 clearfix select_dropdown poR">
                                    <p class="col_767676 mg_b0">实物ID：6QD615601A</p>
                                    <p class="col_767676">供应商编码：86637-B8000</p>
                                </div>
                            </div>
                        </td>
                        <td width="15%">x1</td>
                        <td width="15%">单价：29.00</td>
                        <td width="15%" class="bd_lD_d9 t-c">
                            <span>总金额</span>
                            <br>
                            <span class="col_ed5521">￥</span><em class="fB fS col_ed5521 f18">20.00</em>
                        </td>
                        <td width="15%" class="bd_lD_d9 t-c"><a href="#" class="saas_add mg_l0">查看备注</a></td>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</div>

</template>

<script>

export default {
    components: {},
    data() {
        return {
            param: {}
        }
    },
    methods: {
        query() {

        }
    }
}

</script>
