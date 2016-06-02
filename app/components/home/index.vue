

<template>

<div>
<div class="saas_index">
    <div class="row">
        <div class="col-md-12 saas_order_tip">
            <div class="header1 clearfix">
                <em></em><span>订单提醒</span>
            </div>
            <ul class="clearfix">
                <li class="num1">
                    <a href="/order/list?tab=2">
                        <div>
                            {{ list[0] || "0" }}
                        </div>
                        <span>待发货订单</span>
                    </a>
                </li>
                <li class="num2">
                    <a href="/order/list?tab=3">
                        <div>{{ list[1] || "0" }}</div>
                        <span>急需发货订单</span>
                    </a>
                </li>
                <li class="num3">
                    <a href="/order/returned?tab=2">
                        <div>{{ list[2] || "0" }}</div>
                        <span>退货中订单</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="saas_index1">
    <div class="row">
        <div class="col-md-12 saas_order_tip">
            <div class="header1 clearfix">
                <em></em><span>库存预警</span>
            </div>
            <ul>
                <li class="num1 clearfix">
                    <a href="/stock/main">
                        <div class="f32">{{ list[3] || "0" }}</div>
                        <span>需补库存商品</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>
<div class="saas_index2">
    <div class="row">
        <div class="col-md-12 saas_order_tip">
            <div class="header1 clearfix">
                <em></em><span>违规</span>
            </div>
            <ul>
                <li class="num1 clearfix cursor" @click="breakshow">
                    <div class="f32">{{ list[4] || "0" }}</div>
                    <span>违规次数</span>
                </li>
            </ul>
        </div>
    </div>
</div>
<breakrule :show.sync="showbreak"></breakrule>
</div>

</template>

<script>

import breakrule from './breakrule.vue'
export default {
    components: {
        breakrule
    },
    data() {
        return {
            list: [],
            showbreak: false
        }
    },
    ready() {
        let _this = this;
        Vue.http.get('/home/GetCount').then(function(res) {
            _this.list = res.data;
        })
    },
    methods: {
        breakshow() {
            if (this.list.length && this.list[4]) {
                this.showbreak = true;
            }
        }
    }
}

</script>
