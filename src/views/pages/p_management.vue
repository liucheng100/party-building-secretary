<template>
  <div class="container">
    <div class="head">
      <div style="width: 200px; display: flex; justify-content: space-between; align-items: center;">
        <span style="flex: 1; font-size: 16px;">身份 </span
        ><el-select
          v-model="filterValue"
          class="m-2"
          placeholder="Select"
          style="margin-left: 30px; flex: 4"
          @change="filterUser()"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-button style="margin-left: 30px" color="#c7242f" @click="filterUser()">筛选</el-button>
      疑似反人类按钮 我先给扣了 用上面的@change="filterMember" -->
      </div>
      <div>
        <span>学号 </span>
        <el-input
          style="display: inline; margin-left: 30px"
          placeholder="输入需要查找的学号"
          v-model="snoInput"
          @change="searchBySno()"
        ></el-input>
        <el-button
          style="margin-left: 30px"
          color="#c7242f"
          @click="searchBySno()"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="Main">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%; height: 100%"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
      >
        <el-table-column width="48"></el-table-column>
        <el-table-column property="userName" label="姓名"> </el-table-column>
        <el-table-column property="sno" label="学号" />
        <el-table-column property="type" label="身份">
          <template #default="scope">
            {{ types[scope.row.type + 1] }}
            <!--后端的身份type从-1开始的-->
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
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
        v-model:current-page="PageNum"
        v-model:page-size="pageSize"
        :style="{ margin: '20px' }"
        background
        layout="total, ->,sizes, prev, pager, next, jumper"
        :total="UserNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTable, ElMessage } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { reactive } from "vue";
import { getMemberList, searchByNum } from "../../api/p_management";
import { getBranchInfo } from "@/api/branch";
// import { getBranchId } from "@/utils/auth";

const $route = useRoute();
const $router = useRouter();
const filterValue = ref(0);
const snoInput = ref("");
const options = [
  {
    label: "全部",
    value: -1,
  },
  {
    label: "入党申请人",
    value: 0,
  },
  {
    label: "入党积极分子",
    value: 1,
  },
  {
    label: "发展对象",
    value: 2,
  },
  {
    label: "中共预备党员",
    value: 3,
  },
  {
    label: "中共党员",
    value: 4,
  },
];
const types = [
  "未提交入党申请书",
  "入党申请人",
  "入党积极分子",
  "发展对象",
  "中共预备党员",
  "中共党员",
];
const tableData = ref<User[]>([]);
const pageSize = ref(<number>15); //每页显示学生数量
let UserRawData = ref(<User[]>[]);
let UserNum = ref(0); //总长度
let PageNum = ref(1); //当前页码

interface User {
  userName: string;
  sno: string;
  type: number;
  id: number;
}

const filterUser = async () => {
  let MemberList: { code: number; data: User[]; msg: string } =
    await getMemberList(filterValue.value);
  if (MemberList.code === 0) {
    UserRawData.value = MemberList.data;
    tableData.value = UserRawData.value.slice(
      (PageNum.value - 1) * pageSize.value,
      PageNum.value * pageSize.value
    );
    UserNum.value = MemberList.data.length;
  } else {
    ElMessage.error(MemberList.msg + ":" + MemberList.code);
  }
};

const searchBySno = async () => {
  tableData.value = [];
  filterValue.value = 0;
  let MemberList: { code: number; data: User; msg: string } = await searchByNum(
    snoInput.value
  );
  if (MemberList.code === 0) {
    if (MemberList.data) {
      UserRawData.value = [MemberList.data];
      tableData.value = UserRawData.value;
      UserNum.value = 1;
    }
  } else {
    ElMessage.error(MemberList.msg + ":" + MemberList.code);
  }
};

const handleSizeChange = () => {
  tableData.value = UserRawData.value.slice(
    (PageNum.value - 1) * pageSize.value,
    PageNum.value * pageSize.value
  );
};

const handleCurrentChange = () => {
  tableData.value = UserRawData.value.slice(
    (PageNum.value - 1) * pageSize.value,
    PageNum.value * pageSize.value
  );
};

onMounted(async () => {
  filterUser();
});

const handleCheck = (index: number, row: User) => {
  let params = {
    name: row.userName,
    stu_id: row.sno,
    identity: types[row.type + 1],
    user_id: row.id,
  }; //后端的身份type从-1开始的
  $router.push({ name: "p_info_check", state: { params } });
};

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

const onSubmit = () => {
  //console.log("submit!");
};

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

<style>
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
</style>
