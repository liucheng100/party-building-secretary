<template>
  <div class="all">
    <div class="background">
      <img src="../../assets/info/emblem.svg" alt="" />
    </div>
    <div class="main">
      <div class="info">
        <div class="title">{{ BRANCH_INFO.partybranchName }}</div>

        <div class="info-item">
          <div class="font2">所属</div>
          <div class="font1">{{ BRANCH_INFO.collegeName }}</div>
        </div>
        <div class="info-item">
          <div class="font2">支部编号</div>
          <div class="font1">{{ BRANCH_INFO.partybranchId }}</div>
        </div>
        <div class="info-item">
          <div class="font2">支部书记</div>
          <div class="font1">
            {{ BRANCH_INFO.partybranchSecretary?.username }}
          </div>
        </div>

        <div class="info-item">
          <div class="font2">支部委员</div>
          <div class="font1">
            {{ BRANCH_INFO.partybranchOrganizer?.username }}
            {{ BRANCH_INFO.partybranchOrganizer ? "&nbsp;&nbsp;&nbsp;" : "" }}
            {{ BRANCH_INFO.partybranchPropagator?.username }}
          </div>
        </div>
      </div>
      <div class="detail">
        <div
          class="chart"
          style="width: calc(100%); padding-right: calc(10%)"
          ref="chart"
        ></div>
        <div class="list">
          <div v-for="item in list" class="list-item" :key="item">
            <div class="m">
              <img :src="getIconPath(item.icon)" />
              <div class="font1">{{ item.name }}</div>
              <div class="font2">{{ item.num }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
import { ref, reactive, onMounted, inject, onBeforeUnmount } from "vue";
import { getStatistics2 } from "@/api/info";
import * as echarts from "echarts";
function getIconPath(iconName) {
  return new URL(`../../assets/info/${iconName}.svg`, import.meta.url).href;
}
let BRANCH_INFO = inject("BRANCH_INFO");
let list = ref([
  { name: "入党申请人", num: 0, icon: "icon1" },
  { name: "积极分子", num: 0, icon: "icon2" },
  { name: "发展对象", num: 0, icon: "icon3" },
  { name: "预备党员", num: 0, icon: "icon4" },
  { name: "申请人考试合格", num: 0, icon: "icon5" },
  { name: "团推优", num: 0, icon: "icon6" },
]);
const chart = ref(null);

onMounted(() => {
  getStatistics2().then((res) => {
    if (res && res.data) {
      BRANCH_INFO = {
        ...BRANCH_INFO,
        ...res.data,
      };

      list.value = [
        { name: "入党申请人", num: BRANCH_INFO.applicant, icon: "icon1" },
        { name: "积极分子", num: BRANCH_INFO.activistTotal, icon: "icon2" },
        { name: "发展对象", num: BRANCH_INFO.developTotal, icon: "icon3" },
        { name: "预备党员", num: BRANCH_INFO.probationary, icon: "icon4" },
        { name: "正式党员", num: BRANCH_INFO.partyMember, icon: "icon5" },
        { name: "非申请人", num: BRANCH_INFO.notApplicant, icon: "icon6" },
      ];

      initChart(
        BRANCH_INFO.partyMember,
        BRANCH_INFO.probationary,
        BRANCH_INFO.developTotal,
        BRANCH_INFO.activistTotal,
        BRANCH_INFO.applicant,
        BRANCH_INFO.notApplicant,
        BRANCH_INFO.total
      );
    }
  });

  watchEffect(() => {
    if (BRANCH_INFO) {
      initChart(
        BRANCH_INFO.partyMember,
        BRANCH_INFO.probationary,
        BRANCH_INFO.developTotal,
        BRANCH_INFO.activistTotal,
        BRANCH_INFO.applicant,
        BRANCH_INFO.notApplicant,
        BRANCH_INFO.total
      );
    }
  });
});

function initChart(a, b, c, d, e, f, t) {
  var myChart = echarts.init(chart.value);
  var option;
  option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      // left: "63%",
      right: "0px",
      top: "middle",
      itemWidth: 10,
      itemHeight: 10,
      icon: "circle",
    },
    series: [
      {
        type: "pie",
        radius: ["45%", "65%"],
        center: ["33%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 20,
          borderColor: "#fff",
          borderWidth: 10,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: a, name: "正式党员", itemStyle: { color: "#21B339" } },
          { value: b, name: "预备党员", itemStyle: { color: "#FFC346" } },
          { value: c, name: "发展对象", itemStyle: { color: "#FA734A" } },
          { value: d, name: "积极分子", itemStyle: { color: "#FF8B8E" } },
          { value: e, name: "入党申请人", itemStyle: { color: "#FF416C" } },
          { value: f, name: "非申请人", itemStyle: { color: "#FF6AB2" } },
        ],
      },
    ],
  };
  var total = 0;
  option.series[0].data.forEach(function (dataItem) {
    total += dataItem.value;
  });
  // 在饼图中心显示总和
  option.series[0].label = {
    show: true,
    position: "center",
    formatter: "{total|" + t + "}\n{label|总数}",
    rich: {
      total: {
        fontSize: 30,
        fontWeight: "bold",
      },
      label: {
        fontSize: 14,
        color: "#777",
      },
    },
  };
  option && myChart.setOption(option);
  // 在窗口大小变化时重置图表尺寸
  window.addEventListener("resize", myChart.resize);

  // 在组件卸载时移除事件监听器
  onBeforeUnmount(() => {
    window.removeEventListener("resize", myChart.resize);
  });
}
</script>

<style scoped>
.all {
  flex-grow: 1;
}
@media screen and (max-width=765px) {
  .chart {
    padding-left: 100px !important;
  }
}
.main {
  transition: all 0.25s ease-in-out;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;
  flex-wrap: wrap;
}

.info {
  z-index: 1;
  flex: 1;
  min-width: 300px;
}

.info-item {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: space-between;
}

.title {
  font-size: 26px !important;
}

.font1 {
  min-width: 300px;
  color: #2f2f2f;
}

.info .font1 {
  font-size: 20px;
}

.info .font2 {
  min-width: 200px;
  color: #9f9f9f;
  font-size: 24px;
  margin-top: 15px;
}

.background {
  position: absolute;
  top: 30%;
  left: 45%;
}

.background img {
  width: 80%;
  height: 80%;
  filter: blur(40px);
}

.chart {
  margin: 0 30px;
  height: 250px;
}

.detail {
  min-width: 300px;
  transition: all 0.25s ease-in-out;
  z-index: 1;
  right: 0;
  flex: 2;
  padding-bottom: 30px;
  box-shadow: 0px 4px 16px 0px #00000014;
  border-radius: 5px;
  background-color: #ffffff;
  overflow: hidden;
}

.list {
  width: 100%;
  height: 50%;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 0 30px;
}

.list-item {
  flex: 1 1 calc(30% - 30px);
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.m {
  width: 90%;
  height: 90%;
  background-color: #fafafa;
  padding: 20px;
  padding-bottom: 0px;
  border-radius: 12px;
}

.m img {
  height: 40%;
}

.m .font1 {
  font-size: 16px;
  color: #505050;
}

.m .font2 {
  font-size: 24px;
  color: #c7242f;
}

@media screen and (max-width: 768px) {
  .chart {
    padding-left: 10px !important;
    margin: 0;
  }

  .info .font1,
  .info .font2,
  .title {
    font-size: 18px;
  }

  .list {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .list-item {
    margin-left: 5px;
    margin-right: 5px;
  }

  .m {
    padding: 5px;
  }
}
</style>
