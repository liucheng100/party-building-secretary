<template>
  <teleport to="body">
    <div
      class="main"
      @dragenter="dragenter = true"
      @dragleave.stop="dragleaveFn"
      @dragover.prevent.stop
      @drop.prevent="dropFn"
    >
      <div class="Popbox">
        <div @click="$emit('destroy')" class="closeBtn">
          <el-icon><Close /></el-icon>
        </div>
        <div class="title">批量导入成员</div>
        <div class="Top-progress-bar">
          <div class="Top-progress-box">
            <div
              :class="{
                'progress-title': true,
                'progress-title-active': progressStep == 0,
              }"
            >
              ①上传文件
            </div>
            <div class="progress-line"></div>
            <div
              :class="{
                'progress-title': true,
                'progress-title-active': progressStep == 1,
              }"
            >
              ②校验数据
            </div>
            <div class="progress-line"></div>
            <div
              :class="{
                'progress-title': true,
                'progress-title-active': progressStep == 2,
              }"
            >
              ③上传成功
            </div>
          </div>
        </div>
        <div class="Mid-main-box">
          <div v-if="progressStep == 0" class="step1-box">
            <div
              @click="chooseFile"
              :class="{ 'upload-btn': true, 'upload-btn-drag': dragenter }"
            >
              <div class="icon_upload">
                <el-icon><Upload /></el-icon>
              </div>
              <div class="FileLoad">
                <div v-if="!dragenter">上传文件</div>
                <div v-else>释放上传文件</div>
                <div class="tip">请拖拽或点击此处上传excel文件</div>
              </div>
            </div>
            <a
              @click="toExport"
              href="javascript:void(0);"
              class="modelDownload"
              >下载模板</a
            >
          </div>
          <div v-if="progressStep == 1" class="step2-box">
            <div class="tableBox">
              <el-table
                :data="file_data"
                border
                ref="multipleTableRef"
                empty-text="暂无数据"
                style="width: 100%"
              >
                <el-table-column label="行号" type="index" width="50" />
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="学号" prop="sno"></el-table-column>
                <!-- <el-table-column label="专业" prop="major"></el-table-column> -->
                <el-table-column label="论文"
                  ><template #default="scope">{{
                    scope.row.detailScore.split(",")[0].slice(1)
                  }}</template></el-table-column
                >
                <el-table-column label="实践"
                  ><template #default="scope">{{
                    scope.row.detailScore.split(",")[1].slice(1).split("]")[0]
                  }}</template></el-table-column
                >
                <el-table-column label="状态">
                  <template #default="scope">{{
                    scope.row.status === 1 ? "合格" : "不合格"
                  }}</template>
                </el-table-column>
                <el-table-column label="考试状态"
                  ><template #default="scope">{{
                    statueList[scope.row.status] +
                    (scope.row.comments ? "（" + scope.row.comments + "）" : "")
                  }}</template></el-table-column
                >
              </el-table>
            </div>
            <transition name="aniScroll">
              <div class="errorInfo" v-if="errorData.length">
                <div
                  class="my-el-message el-message--error"
                  v-for="(item, i) in errorData"
                  :key="i"
                >
                  <i class="el-icon el-message__icon el-message-icon--error"
                    ><svg
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                      ></path>
                    </svg>
                  </i>
                  <p class="el-message__content">{{ item }}</p>
                </div>
              </div>
            </transition>
          </div>
          <div v-if="progressStep == 2" class="step3-box">
            <div class="info">成功录入以下成绩到{{ examTitle }}</div>
            <div class="tableBox">
              <el-table
                :data="file_data"
                border
                ref="multipleTableRef"
                empty-text="暂无数据"
                style="width: 100%"
              >
                <el-table-column label="行号" type="index" width="50" />
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="学号" prop="sno"></el-table-column>
                <!-- <el-table-column label="专业" prop="major"></el-table-column> -->
                <el-table-column label="论文"
                  ><template #default="scope">{{
                    scope.row.detailScore.split(",")[0].slice(1)
                  }}</template></el-table-column
                >
                <el-table-column label="实践"
                  ><template #default="scope">{{
                    scope.row.detailScore.split(",")[1].slice(1).split("]")[0]
                  }}</template></el-table-column
                >
                <el-table-column label="状态">
                  <template #default="scope">{{
                    scope.row.status === 1 ? "合格" : "不合格"
                  }}</template>
                </el-table-column>
                <el-table-column label="考试状态"
                  ><template #default="scope">{{
                    statueList[scope.row.status] +
                    (scope.row.comments ? "（" + scope.row.comments + "）" : "")
                  }}</template></el-table-column
                >
              </el-table>
            </div>
          </div>
        </div>
        <div class="Bot-btn-bar">
          <div
            v-if="progressStep == 1"
            @click="progressStep = 0"
            :class="{ 'back-btn': true, 'next-btn-forbid': false }"
            tabindex="0"
          >
            上一步
          </div>
          <div
            v-if="progressStep == 0"
            @click="progressStep = !!file_data.length ? 1 : 0"
            :class="{ 'next-btn': true, 'next-btn-forbid': !file_data.length }"
            tabindex="0"
          >
            下一步
          </div>
          <div
            v-if="progressStep == 1"
            @click="upload"
            :class="{ 'next-btn': true, 'next-btn-forbid': errorData.length }"
            tabindex="0"
          >
            下一步
          </div>
          <div
            @click="$emit('destroy')"
            v-if="progressStep == 2"
            :class="{ 'next-btn': true, 'next-btn-forbid': false }"
            tabindex="0"
          >
            完成
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<!-- 父元素要有relative -->
<script>
import getAssetsFile from "@/utils/pub-use";
import { loadFile, pushArray } from "@/api/branch.ts";
import {
  uploadExcelProbationary,
  submitExcel,
} from "@/api/examinationAndClass.ts";
import { downloadFile } from "@/api/file.ts";
export default {
  name: "importFileDialog",
  emits: ["destroy", "submit"],
  props: {
    examTitle: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      progressStep: 0,
      file_data: [],
      multipleSelection: [],
      statueList: ["未通过", "通过", "缺考", "作弊", "缺考且作弊"],
      errorText: "",
      loadOX: false,
      tipOX: false,
      dragenter: false,
      submitLoading: false,
      importId: "",
      errorData: [],
    };
  },
  methods: {
    toExport() {
      let a = document.createElement("a");
      a.href = "./static/preparative.xlsx";
      a.download = this.examTitle + " - 成绩录入模板.xlsx";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    upload() {
      if (this.importId) {
        this.submitLoading = true;
        submitExcel(this.$route.params.id, this.importId)
          .then(({ code: code, msg: msg }) => {
            if (code === 0) {
              ElMessage.success(`提交成功！`);
              this.progressStep = 2;
              this.$emit("submit");
            } else {
              ElMessage.error(msg);
            }
          })
          .finally(() => {
            this.submitLoading = false;
          });
      } else {
        ElMessage.warning("请先导入成绩数据哦~");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    dragleaveFn(e) {
      // console.log(e.target.className)
      if (e.target.className == "main" && !e.relatedTarget) {
        this.dragenter = false;
        // console.log(e)
      }
    },
    dropFn(e) {
      this.dragenter = false;
      if (this.progressStep != 0) return;
      let formData = new FormData();
      formData.append("file", e.dataTransfer.files[0]);
      // console.log(formData, newFile)
      this.errorText = "";
      uploadExcelProbationary(formData).then((v) => {
        console.log(v);
        if (v.data) {
          this.file_data = v.data.list;
          this.errorData = v.data.error;
          this.importId = v.data.importId;
          if (v.data.error?.length) {
            ElMessage.warning(`导入成功！但存在${v.data.error.length}个问题`);
          } else {
            ElMessage.success(`导入成功！`);
          }
          this.progressStep = 1;
          this.$nextTick(() => {
            this.$refs.multipleTableRef.toggleAllSelection();
          });
        } else {
          ElMessage.error(v.msg);
        }
      });
    },
    chooseFile() {
      let input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute(
        "accept",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      );
      input.click();
      input.onchange = (e) => {
        console.log("e.target:  ", e.target);
        let file = e.target.files[0];
        let formData = new FormData();
        // let newFile = new window.File([file], file.name.slice(0,9), {type: file.type})
        formData.append("file", file);
        // console.log(formData, newFile)
        this.errorText = "";
        uploadExcelProbationary(formData).then((v) => {
          if (v.data) {
            this.file_data = v.data.list;
            this.errorData = v.data.error;
            this.importId = v.data.importId;
            if (v.data.error?.length) {
              ElMessage.warning(`导入成功！但存在${v.data.error.length}个问题`);
            } else {
              ElMessage.success(`导入成功！`);
            }
            this.progressStep = 1;
            this.$nextTick(() => {
              this.$refs.multipleTableRef.toggleAllSelection();
            });
          } else {
            ElMessage.error(v.msg);
          }
        });
      };
    },
  },
  mounted() {
    if (this.src_from) {
      this.ani1 = {
        r: 0,
        alph: 0,
        alph1: 1,
      };
      let per = this.$refs.img.naturalWidth / this.$refs.img.naturalHeight;
      this.ani1.height = 23;
      this.ani1.width = this.ani1.height * per;
    }
  },
};
</script>

<style scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: overlay;
}
.Popbox {
  border-radius: 8px;
  margin-top: 60px;
  margin-bottom: 60px;
  min-height: 80%;
  width: 74%;
  background-color: white;
  position: relative;
  padding: 20px;
}
.closeBtn {
  padding: 6px;
  top: 26px;
  right: 30px;
  position: absolute;
  z-index: 9;
  font-size: 36px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.4);
}
.title {
  font-size: 20px;
  margin: 20px 0 0 20px;
}
.Top-progress-bar {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.Top-progress-box {
  display: flex;
  align-items: center;
}
.progress-title {
  font-size: 20px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.42);
}
.progress-title-active {
  color: rgba(242, 64, 76);
}
.progress-line {
  margin: 0 20px;
  width: 40px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.14);
}
.Mid-main-box {
}
.Bot-btn-bar {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.next-btn,
.back-btn {
  padding: 10px 30px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  background-color: rgb(242, 64, 76);
  user-select: none;
}
.back-btn {
  margin-right: 140px;
}
.next-btn:hover {
  background-color: rgba(242, 64, 76, 0.92);
}
.next-btn:active {
  background-color: rgba(242, 64, 76, 0.8);
}
.next-btn-forbid {
  padding: 10px 30px;
  color: white;
  cursor: not-allowed;
  border-radius: 6px;
  background-color: rgb(242, 64, 76);
  opacity: 0.55;
  user-select: none;
}
.step1-box {
  height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.upload-btn {
  display: flex;
  align-items: center;
  border: dashed 3px rgb(248, 150, 157);
  cursor: pointer;
  padding: 13px 54px;
  user-select: none;
  transition: color 0.14s, transform 0.3s;
}
.upload-btn:hover {
  color: rgb(229, 78, 86);
  background-color: #fffcfc;
  border: solid 3px rgb(255, 127, 140, 0.2);
}

.upload-btn-drag {
  color: rgb(229, 78, 86);
  background-color: #fffcfc;
  border: solid 3px rgb(255, 127, 140, 0.2);
}
.modelDownload {
  position: absolute;
  bottom: 60px;
  right: 70px;
  color: rgb(242, 64, 76);
  font-size: 20px;
  /* cursor: pointer; */
  /* user-select: none; */
}
.icon_upload {
  font-size: 56px;
  opacity: 0.35;
  margin-right: 12px;
  transform: translateY(7px);
}
.FileLoad {
  position: relative;
  font-size: 22px;
  /* transition: .4s; */
  overflow: hidden;
}
.tip {
  font-size: 17px;
  opacity: 0.55;
}
.step2-box {
  min-height: 560px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;
}
.tableBox {
  padding: 0 32px;
  width: 100%;
  max-height: 550px;
  overflow: overlay;
}
.errorText {
  margin-top: 20px;
  overflow: hidden;
}
.errorText > div {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  background-color: rgb(234, 29, 43);
}
.closelit {
  transform: translateY(2px);
  margin-left: 12px;
  cursor: pointer;
}
.aniScroll-enter-active,
.aniScroll-leave-active {
  transition: all 0.4s;
}

.aniScroll-enter-from,
.aniScroll-leave-to {
  opacity: 0;
  height: 0;
  margin-top: 0px;
  /* transform: rotate3d(0,0,1,60deg); */
}

.aniScroll-enter-to,
.aniScroll-leave-from {
  opacity: 1;
  height: 44px;
  margin-top: 20px;
  /* transform: rotate3d(0,0,0,0deg); */
}
.step3-box {
  height: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info {
  margin-top: 30px;
  margin-bottom: 10px;
  color: rgba(100, 206, 100, 1);
  font-size: 20px;
}
.errorInfo {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.my-el-message {
  --el-message-padding: 11.25px 14.25px;
  width: fit-content;
  max-width: calc(100% - 2rem);
  box-sizing: border-box;
  border-radius: var(--el-border-radius-base);
  border-width: var(--el-border-width);
  border-style: var(--el-border-style);
  border-color: var(--el-message-border-color);
  background-color: var(--el-message-bg-color);
  transition: opacity var(--el-transition-duration), transform 0.4s, top 0.4s;
  padding: var(--el-message-padding);
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.my-el-message .el-message-icon--error {
  color: var(--el-message-text-color);
}
</style>