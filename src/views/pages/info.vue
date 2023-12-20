<template>
    <div class="main">
        <div class="info">
            <div class="font1">{{branchName}}</div>
            <div class="font2">所属</div>
            <div class="font1">{{department}}</div>
            <div class="font2">支部编号</div>
            <div class="font1">{{branchID}}</div>
            <div class="font2">支部书记</div>
            <div class="font1">{{secretary}}</div>
            <div class="font2">支部委员</div>
            <div class="font1">{{committee}}</div>

        </div>
        <div class="background">
            <img src="../../assets/info/emblem.svg" alt="">
        </div>
        <div class="detail">
            <div ref="chart" style="width: 100%;height: 50%;"></div>
            <div class="list">
                <div v-for="item in list" class="list-item">
                    <div class="m">
                        <img :src="getIconPath(item.icon)">
                        <div class="font1">{{item.name}}</div>
                        <div class="font2">{{item.num}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted, inject} from 'vue';
    import * as echarts from 'echarts';
    function getIconPath(iconName) {
        return new URL(`../../assets/info/${iconName}.svg`, import.meta.url).href;
    }
    let BRANCH_INFO = inject("BRANCH_INFO")
    let branchName = "哈哈哈支部";
    let department = "经济与管理学部";
    let branchID = "099281";
    let secretary = "张三三";
    let committee = "李老四";
    let list = [
        {name:"入党申请人",num:"10",icon:"icon1"},
        {name:"积极分子",num:"10",icon:"icon2"},
        {name:"发展对象",num:"10",icon:"icon3"},
        {name:"预备党员",num:"10",icon:"icon4"},
        {name:"申请人考试合格",num:"10",icon:"icon5"},
        {name:"团推优",num:"10",icon:"icon6"}]
    const chart = ref(null);
    onMounted(() => {
        initChart()
    });
    function initChart() {
        var myChart = echarts.init(chart.value);

        var option;
        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: '63%',
                top: 'middle',
                itemWidth: 10,
                itemHeight: 10,
                icon: 'circle',
            },
            series: [
                {
                    type: 'pie',
                    radius: ['45%', '65%'],
                    center: ['33%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 20,
                        borderColor: '#fff',
                        borderWidth: 10,
                    },
                    label: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 4, name: '预备党员', itemStyle: { color: '#FFC346' } },
                        { value: 8, name: '发展对象', itemStyle: { color: '#FA734A' } },
                        { value: 5, name: '积极分子', itemStyle: { color: '#FF8B8E' } },
                        { value: 18, name: '入党申请人', itemStyle: { color: '#FF416C' } },
                    ]
                }
            ]
        };
        var total = 0;
        option.series[0].data.forEach(function (dataItem) {
            total += dataItem.value;
        });
        // 在饼图中心显示总和
        option.series[0].label = {
            show: true,
            position: 'center',
            formatter: '{total|' + total + '}\n{label|总数}',
            rich: {
                total: {
                    fontSize: 30,
                    fontWeight: 'bold'
                },
                label: {
                    fontSize: 14,
                    color: '#777'
                }
            }
        };
        option && myChart.setOption(option);
    }




</script>

<style scoped>
    .main {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .info {
        z-index: 1;
        position: absolute;
        width: 252px;
        height: 552px;
    }

    .info .font1 {
        color: #2F2F2F;
        font-size: 36px;
    }

    .info .font2 {
        color: #9F9F9F;
        font-size: 24px;
        margin-top: 15px;
    }

    .background {
        position: absolute;
        top: 150px;
        width: 683px;
        left: 350px;
    }

    .background img {
        width: 100%;
        height: 100%;
        filter: blur(40px);
    }

    .detail {
        z-index: 1;
        position: absolute;
        right: 0;
        width: 775px;
        height: 100%;
        box-shadow: 0px 4px 16px 0px #00000014;
        border-radius: 5px;
        background-color: #ffffff;
    }
    .list {
        width: 100%;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        padding-left: 30px;
        padding-right: 30px
    }
    .list-item {
        flex: 1 1 calc(30% - 30px); 
        margin-left: 10px;
        margin-right: 10px;
        height: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .m {
        width: 70%;
    }
    .m img{
        height: 50%;
    }
    .m .font1{
        font-size: 16px;
        color: #505050;
    }
    .m .font2{
        font-size: 24px;
        color: #C7242F;
    }
</style>