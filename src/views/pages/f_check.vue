<template>
  <div class="container">
    <el-icon @click="$router.back()" style="height:50px;margin:20px 5% 0 auto;font-size: 50px;"><Close /></el-icon>
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
        ><div>{{ userInfo.userName }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ userInfo.sno }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ userInfo.type }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ 
          new Date(Date.parse(userInfo.createAt)).getFullYear()+'-'+
          (new Date(Date.parse(userInfo.createAt)).getMonth()+1) + '-'+
          new Date(Date.parse(userInfo.createAt)).getDate()}}</div></el-col
      >
    </el-row>

    <!-- 文章标题 -->
    <div class="article-title">{{ userInfo.title }}</div>

    <!-- 正文 -->
    <div class="article-content">{{ userInfo.content }}</div>

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
import { ref, onMounted } from "vue";

interface User {
  userName: string;
  sno: string;
  type: string;
  title: string;
  content: string;
  createAt: string;
  status: string;
  id: number;
}

const userInfo = ref<User>({
  userName: '',
  sno: '',
  type: '',
  title: '',
  content: '',
  createAt: '',
  status: '',
  id: 0
});

onMounted(async () =>{
  userInfo.value = history.state.params
  console.log(userInfo.value)
})


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
  