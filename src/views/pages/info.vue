<template>
    <div class="main">
        <div class="info">
            <div class="font1">{{BRANCH_INFO.partybranchName}}</div>
            <div class="font2">所属</div>
            <div class="font1">{{BRANCH_INFO.collegeName}}</div>
            <div class="font2">支部编号</div>
            <div class="font1">{{BRANCH_INFO.partybranchId}}</div>
            <div class="font2">支部书记</div>
            <div class="font1">{{BRANCH_INFO.partybranchSecretary?.username}}</div>
            <div class="font2">支部委员</div>
            <div class="font1">{{BRANCH_INFO.partybranchOrganizer?.username}}、{{BRANCH_INFO.partybranchPropagator?.username}}</div>

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
    import { watchEffect } from 'vue';
    import { ref, reactive, onMounted, inject} from 'vue';
    import * as echarts from 'echarts';
    function getIconPath(iconName) {
        return new URL(`../../assets/info/${iconName}.svg`, import.meta.url).href;
    }
    let BRANCH_INFO = inject("BRANCH_INFO")
    let list = ref([
        {name:"入党申请人",num:0,icon:"icon1"},
        {name:"积极分子",num:0,icon:"icon2"},
        {name:"发展对象",num:0,icon:"icon3"},
        {name:"预备党员",num:0,icon:"icon4"},
        {name:"申请人考试合格",num:0,icon:"icon5"},
        {name:"团推优",num:0,icon:"icon6"}])
    const chart = ref(null);


    onMounted(() => {  
        watchEffect(() => {
            if(BRANCH_INFO){
                console.log(BRANCH_INFO)
                list.value = [
                    {name:"入党申请人",num:BRANCH_INFO.applicantCount,icon:"icon1"},
                    {name:"积极分子",num:BRANCH_INFO.activeCount,icon:"icon2"},
                    {name:"发展对象",num:BRANCH_INFO.developCount,icon:"icon3"},
                    {name:"预备党员",num:BRANCH_INFO.prepareCount,icon:"icon4"},
                    {name:"正式党员",num:BRANCH_INFO.regularCount,icon:"icon5"},
                    {name:"团推优",num:BRANCH_INFO.greatCount,icon:"icon6"}]
            }
            initChart(BRANCH_INFO.regularCount, BRANCH_INFO.prepareCount, BRANCH_INFO.developCount, BRANCH_INFO.activeCount, BRANCH_INFO.applicantCount, BRANCH_INFO.greatCount, BRANCH_INFO.totalCount)
        });
    });
    function initChart(a,b,c,d,e,f,t) {
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
                        { value: a, name: '正式党员', itemStyle: { color: '#21B339' } },
                        { value: b, name: '预备党员', itemStyle: { color: '#FFC346' } },
                        { value: c, name: '发展对象', itemStyle: { color: '#FA734A' } },
                        { value: d, name: '积极分子', itemStyle: { color: '#FF8B8E' } },
                        { value: e, name: '入党申请人', itemStyle: { color: '#FF416C' } },
                        { value: f, name: '团推优', itemStyle: { color: '#FF6AB2' } },
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
            formatter: '{total|' + t + '}\n{label|总数}',
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
        width: 700px;
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