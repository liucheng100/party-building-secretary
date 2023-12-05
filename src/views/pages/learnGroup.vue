<template>
  <div class="head">
    <el-radio-group
      v-model="tabPosition"
      @change="handleTabChange"
      style="margin-bottom: 30px"
    >
      <el-radio-button label="已分组"></el-radio-button>
      <el-radio-button label="未分组人员"></el-radio-button>
    </el-radio-group>
    <div>
      <el-button v-if="tabPosition !== '已分组'" class="custom-button"
        >将所选加入小组</el-button
      >
      <el-button v-if="tabPosition !== '已分组'" class="custom-button"
        >导出当前分组名单</el-button
      >
      <el-button class="custom-button">创建学习小组</el-button>
      <el-button class="custom-button">管理小组</el-button>
    </div>
  </div>
  <router-view></router-view>
</template>
  
  
  <script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const tabPosition = ref("已分组");

// 根据路由初始化选项卡位置
const initTabPosition = () => {
  if (route.path.includes("/p_management/learnGroup/ungrouped")) {
    tabPosition.value = "未分组人员";
  } else {
    tabPosition.value = "已分组";
  }
};

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    initTabPosition();
  }
);

// 组件初始化时执行
initTabPosition();

// 处理选项卡变化
const handleTabChange = (value) => {
  if (value === "已分组") {
    router.push("/p_management/learnGroup/grouped");
  } else {
    router.push("/p_management/learnGroup/ungrouped");
  }
};
</script>
  
  <style scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-button {
  margin-left: 30px;
  color: #c7242f;
  border-color: #c7242f;
  background-color: white;
}
</style>
  