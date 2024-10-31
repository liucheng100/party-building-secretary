<template>
  <div class="container">
    <div class="head">
      <el-row style="width: 100%; align-items: center">
        <el-col :span="3" class="font">文件类型</el-col
        ><el-col :span="15">
          <el-select
            v-model="typeValue"
            class="m-2"
            placeholder="Select"
            style="margin-left: 30px"
            @change="fetchAllFiles(typeValue, hasReadValue, true)"
          >
            <el-option
              class="option"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <!-- <el-button style="margin-left: 30px" color="#c7242f">筛选</el-button> -->
      </el-row>
      <el-row style="width: 100%; align-items: center">
        <el-col :span="3" class="font">处理状态</el-col>
        <el-col :span="15">
          <el-select
            v-model="hasReadValue"
            class="m-2"
            placeholder="Select"
            style="margin-left: 30px"
            @change="fetchAllFiles(typeValue, hasReadValue, true)"
          >
            <el-option
              class="option"
              v-for="item in options_2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <!-- <el-button style="margin-left: 30px" color="#c7242f">筛选</el-button> -->
      </el-row>
    </div>
    <div class="Main">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%; height: 100%"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="48" v-if="!isMobile"></el-table-column>
        <el-table-column property="userName" label="姓名" class-name="son1">
        </el-table-column>
        <el-table-column
          property="sno"
          label="学号"
          class-name="son2"
          v-if="!isMobile"
        />
        <el-table-column property="type" label="文件类型" class-name="son3">
          <template #default="scope">
            <div class="state_row">
              {{ scope.row.type <= 6 ? options[scope.row.type].label : "" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          property="title"
          label="标题"
          class-name="son4"
          v-if="!isMobile"
        />
        <el-table-column
          property="createAt"
          label="提交时间"
          class-name="son5"
          v-if="!isMobile"
        >
          <template #default="scope">
            {{
              new Date(Date.parse(scope.row.createAt)).getFullYear() +
              "-" +
              (new Date(Date.parse(scope.row.createAt)).getMonth() + 1) +
              "-" +
              new Date(Date.parse(scope.row.createAt)).getDate()
            }}
          </template>
        </el-table-column>
        <el-table-column property="status" label="状态">
          <template #default="scope">
            <div class="icon_state">
              <i
                class="dotClass"
                style="background-color: #21b339"
                v-if="scope.row.status == 1"
              ></i>
              <i
                class="dotClass"
                style="background-color: #c7242f"
                v-if="scope.row.status == 2"
              ></i>
              <i
                class="dotClass"
                style="background-color: #fca235"
                v-if="scope.row.status == 0"
              ></i>
              <div class="state_row">
                {{
                  scope.row.status == 0
                    ? "未审核"
                    : scope.row.status == 1
                    ? "已通过"
                    : "未通过"
                }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              class="button"
              style="color: #c7242f"
              link
              @click="handleCheck(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-config-provider :locale="zhCn">
      <el-pagination
        small
        class="el-pagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :style="{ margin: '20px' }"
        background
        layout="total, ->,sizes, prev, pager, next, jumper"
        :total="fileNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTable, ElMessage } from "element-plus";
import { useIsMobileStore } from "@/stores/isMobileStore";

import zhCn from "element-plus/es/locale/lang/zh-cn";
import { getAllFiles, getFileDetailContent } from "../../api/manageFile";
import { reactive } from "vue";
const $route = useRoute();
const $router = useRouter();
const typeValue = ref(-1);
const hasReadValue = ref(-1);
const input = ref("");
const isMobileStore = useIsMobileStore();
const isMobile = computed(() => isMobileStore.isMobile);
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
const options_2 = [
  {
    label: "全部",
    value: -1,
  },
  {
    label: "未处理",
    value: 0,
  },
  {
    label: "已处理",
    value: 1,
  },
];
const currentPage = ref(1);
const pageSize = ref(14);
const fileNum = ref(0);
const tableData = ref<User[]>([]);

const fetchAllFiles = async (
  type: number,
  hasRead: number,
  backToFirstPage: boolean
) => {
  if (backToFirstPage) currentPage.value = 1;
  let fileList: { code: number; data: User[]; page: Page; msg: string } =
    await getAllFiles(type, hasRead, currentPage.value, pageSize.value); //type:hasRead:0全部1已审2未审

  if (fileList.code === 0) {
    tableData.value = fileList.data;
    fileNum.value = fileList.page.itemTotalCount;
    //console.log(tableData.value);
  } else {
    ElMessage.error(fileList.msg + ":" + fileList.code);
  }
};

onMounted(async () => {
  fetchAllFiles(-1, -1, false);
});

const handleSizeChange = (val: number) => {
  //console.log(`${val} items per page`);
  fetchAllFiles(typeValue.value, hasReadValue.value, false);
};

const handleCurrentChange = (val: number) => {
  //console.log(`current page: ${val}`);
  fetchAllFiles(typeValue.value, hasReadValue.value, false);
};

const handleCheck = (index: number, row: User) => {
  getFileDetailContent(row.id).then((res: any) => {
    let content = res.data.content;
    let params = {
      userName: row.userName,
      sno: row.sno,
      createAt: row.createAt,
      type: row.type,
      file_id: row.id,
      title: row.title,
      content: content,
      attachment: row.attachment,
    };
    $router.push({ name: "f_check", state: { params } });
  });
};

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

const onSubmit = () => {
  // console.log("submit!");
};
interface Page {
  pageTotalCount: number;
  itemTotalCount: number;
}

interface User {
  userName: string;
  sno: string;
  type: number;
  title: string;
  content: string;
  createAt: string;
  status: string;
  id: number;
  attachment: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.head {
  width: 79%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Main {
  margin-top: 20px;
  flex: 1;
  overflow: auto;
}

.el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
.icon_state {
  width: 70px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  background-color: #fafafa;
  justify-content: center;
}
.dotClass {
  width: 6px;
  height: 6px;
  margin-right: 6px;
  border-radius: 50%;
}
.state_row {
  font-size: smaller;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    padding: 0px 0px;
    display: flex;
  }
  .font {
    font-size: 3rem;
  }
  .head {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Main {
    width: 100%;
  }

  .state_row {
    font-size: 4rem;
  }
  .el-table {
    table-layout: fixed;
  }
  .button {
    font-size: 4rem;
  }
  .option {
    font-size: 3rem;
  }
}
</style>

<style>
@media screen and (max-width: 768px) {
  .el-pagination__jump {
    display: none;
  }
  .el-pagination__sizes.is-first {
    display: none;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .el-pager {
    display: none;
  }
}
</style>