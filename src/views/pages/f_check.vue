<template>
  <div class="container">
    <!-- 表头部分 -->
    <el-row class="personal-info-title">
      <el-col :span="6"><div>姓名</div></el-col>
      <el-col :span="6"><div>学号</div></el-col>
      <el-col :span="6"><div>文件类型</div></el-col>
      <el-col :span="6"><div>递交时间</div></el-col>
    </el-row>

    <!-- 个人信息部分 -->
    <el-row class="personal-info">
      <el-col :span="6"
        ><div>{{ userInfo.name }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ userInfo.studentNumber }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ userInfo.fileType }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ userInfo.submissionTime }}</div></el-col
      >
    </el-row>

    <!-- 文章标题 -->
    <div class="article-title">{{ article.title }}</div>

    <!-- 正文 -->
    <div class="article-content">{{ article.content }}</div>

    <!--审批意见-->
    <el-input
      type="textarea"
      placeholder="审批意见（选填）"
      class="approval-comment"
    ></el-input>

    <!-- 底部按钮 -->
    <div class="action-buttons">
      <el-button class="custom-button" type="danger" @click="approve">通过</el-button>
      <el-button class="custom-button" @click="reject">不通过</el-button>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { ref } from "vue";

const userInfo = ref({
  name: "张三",
  studentNumber: "123456",
  fileType: "入党申请书",
  submissionTime: "2023-01-01",
});

const article = ref({
  title: "入党申请书",
  content: "这是文章的正文内容...",
});

const approve = () => {
  console.log("通过");
  // 处理通过
};

const reject = () => {
  console.log("不通过");
  // 处理不通过
};
</script>
  
  <style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: 100%;
  width: 100%;
}

.personal-info {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 50px;
  font-size: medium;
}

.personal-info-title {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 20px;
  color: grey;
  margin-top: 50px;
}

.info-item {
  flex: 1;
  text-align: center;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 50px;
  font-size:x-large;
}

.article-content {
  margin-bottom: 20px;
  height: 45%;
  background-color: #fafafa;
  width: 80%;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin-top: 20px;
}
.custom-button {
  font-size: 16px; 
  padding: 10px 20px; 
  border-radius: 20px; 
}
.approval-comment {
  margin: 20px 0;
  width: 80%;
}
</style>
  