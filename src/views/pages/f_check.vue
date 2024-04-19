<template>
  <div class="container">
    <el-icon
      @click="$router.back()"
      style="height: 50px; margin: 20px 5% 0 auto; font-size: 50px"
      ><Close
    /></el-icon>
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
        ><div>{{ fileInfo.userName }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ fileInfo.sno }}</div></el-col
      >
      <el-col :span="6"
        ><div>{{ fileName }}</div></el-col
      >
      <el-col :span="6"
        ><div>
          {{
            new Date(Date.parse(fileInfo.createAt)).getFullYear() +
            "-" +
            (new Date(Date.parse(fileInfo.createAt)).getMonth() + 1) +
            "-" +
            new Date(Date.parse(fileInfo.createAt)).getDate()
          }}
        </div></el-col
      >
    </el-row>

    <!-- 文章标题 -->
    <div class="article-title">{{ fileInfo.title }}</div>

    <!-- 正文 -->
    <div class="article-content" v-html="fileInfo.content"></div>
    <!-- 附件 -->
    <div style="width: 80%" v-if="fileInfo.attachment">
      <div class="file_name">
        {{ fileInfo.attachment }}
      </div>
    </div>
    <!-- 下载附件 -->
    <div style="width: 80%">
      <el-button class="downloadBtn" color="#C7242F" @click="download"
        >下载附件</el-button
      >
    </div>

    <!--审批意见-->
    <el-input
      type="textarea"
      placeholder="审批意见（选填）"
      class="approval-comment"
      v-model="approvalComment"
    ></el-input>

    <!-- 处理时间 -->
    <div style="width: 80%">
      <div style="color: #c7242f">*该节点需要记录时间，请选择状态变更时间</div>
    </div>
    <div style="width: 80%">
      <el-date-picker
        type="datetime"
        size="small"
        style="align-self: flex-start; margin-top: 10px"
        v-model="changeTime"
        format="YYYY-MM-DD-HH:mm"
        value-format="YYYY-MM-DDTHH:mm:ss.sss"
      ></el-date-picker>
    </div>
    <!-- 底部按钮 -->
    <div class="action-buttons">
      <el-button class="custom-button" color="#C7242F" @click="approve"
        >通过</el-button
      >
      <el-button class="custom-button" @click="reject">不通过</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { approvalFile } from "../../api/manageFile";
import { downloadFile } from "../../api/file";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const $router = useRouter();

interface File {
  userName: string;
  sno: string;
  type: number;
  title: string;
  content: string;
  createAt: string;
  status: string;
  id: number;
  file_id: string;
  attachment: string;
}

const fileInfo = ref<File>({
  userName: "",
  sno: "",
  type: 0,
  title: "",
  content: "",
  createAt: "",
  status: "",
  id: 0,
  file_id: "",
  attachment: "",
});

const options = [
  {
    label: "全部",
    value: -1,
  },
  {
    label: "入党申请书",
    value: 1,
  },
  {
    label: "思想汇报",
    value: 2,
  },
  {
    label: "个人自传",
    value: 3,
  },
  {
    label: "入党志愿书",
    value: 4,
  },
  {
    label: "转正申请书",
    value: 5,
  },

  {
    label: "个人小结",
    value: 6,
  },
];

const changeTime = ref("");
let approvalComment = ref("");
const fileName = computed(() => {
  if (fileInfo.value.type <= 6) {
    return options[fileInfo.value.type].label;
  }
});
onMounted(async () => {
  fileInfo.value = history.state.params;
  fileInfo.value.content = fileInfo.value.content.replace(/\\r\\n|\\n|\\r/g, '<br>');
  //console.log(fileInfo.value);
});

const article = ref({
  title: "入党申请书",
  content: "这是文章的正文内容...",
});

const download = async () => {
  //console.log(fileInfo.value.attachment);
  if (!fileInfo.value.attachment) {
    ElMessage.warning("无附件");
    return;
  }
  await downloadFile(fileInfo.value.attachment)
    .then((res: any) => {
      //console.log(res);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      let tmp = fileInfo.value.attachment.split("/");
      link.setAttribute("download", tmp[tmp.length - 1]);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};

const approve = async () => {
  if (!changeTime.value) {
    ElMessage.warning("请填写时间");
    return;
  }
  await approvalFile(
    1,
    fileInfo.value.file_id,
    approvalComment.value,
    changeTime.value
  )
    .then(() => {
      ElMessage.success("处理成功");
      $router.back();
      // 处理通过
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};

const reject = async () => {
  if (!changeTime.value) {
    ElMessage.warning("请填写时间");
    return;
  }
  await approvalFile(
    2,
    fileInfo.value.file_id,
    approvalComment.value,
    changeTime.value
  )
    .then(() => {
      ElMessage.success("处理成功");
      $router.back();
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  height: auto;
  width: 100%;
}

.personal-info {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 20px;
  font-size: medium;
}

.personal-info-title {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 20px;
  color: grey;
}

.info-item {
  flex: 1;
  text-align: center;
}

.article-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  font-size: x-large;
}

.article-content {
  margin-bottom: 10px;
  background-color: #fafafa;
  width: 80%;
}

.article-content :deep(p){
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin-top: 20px;
}
.file_name {
  font-size: 14px;
  padding: 8px 0;
  align-items: flex-start;
}
.downloadBtn {
  font-size: 14px;
  padding: 8px 15px;
  border-radius: 8px;
  align-self: flex-start;
}
.custom-button {
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 8px;
}
.approval-comment {
  margin: 10px 0;
  width: 80%;
}
</style>
