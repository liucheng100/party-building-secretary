<!--
 * @Author: Langjc
 * @Date: 2023-12-26 20:40:50
 * @LastEditTime: 2023-12-27 16:49:29
 * @LastEditors: Langjc
 * @Description: 
-->
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
      <el-button v-if="tabPosition == '已分组'" class="custom-button"
        >导出当前分组名单</el-button
      >
      <el-button class="custom-button" @click="dialogVisible = true">创建学习小组</el-button>
      <el-button class="custom-button">管理小组</el-button>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="创建学习小组" width="30%">
    <div class = "PopUp">
      <div class="bar">
        <span class="title">组长学号</span>
        <el-input class="input" v-model="createGroupLeader" placeholder="请输入组长学号"></el-input>
      </div>
      <div class="bar">
        <span class="title">所属支部</span>
        <el-input class="input" v-model="BRANCH_INFO.partybranchName" :disabled="true"></el-input>
      </div>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createGroup()">确 定</el-button>
      </span>
    </div>
  </el-dialog>
  <router-view></router-view>
</template>

<script setup>
import { ref, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { addGroup } from "@/api/learngroup";

const BRANCH_INFO = inject('BRANCH_INFO')
const router = useRouter();
const route = useRoute();
const tabPosition = ref("已分组");
let dialogVisible = ref(false);
let createGroupLeader = ref('');
// 根据路由初始化选项卡位置
const initTabPosition = () => {
  if (route.path.includes("/p_management/learnGroup/ungrouped")) {
    tabPosition.value = "未分组人员";
  } else {
    tabPosition.value = "已分组";
  }
};
const createGroup = async () =>{
  await addGroup(createGroupLeader.value)
}
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
const changePopUp = (flag) => {
  if(falg == 0)
    dialogVisible = !dialogVisible
}
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
.PopUp{
  width: 100%;
  height: 100%;
}
.PopUp .bar{
  display: flex;
  margin: auto;
  margin-bottom: 30px;
  justify-content: center;
}
.PopUp .bar .title{
  font-size:18px;
  line-height: 50px;
  margin-right:10px;
}
.PopUp .bar .input{
  width:60%;
  height:50px;
}
</style>
