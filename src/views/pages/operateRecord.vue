<template>
  <div class="container">
    <div class="head">
      <div>
        <span>操作类型 </span
        ><el-select
          v-model="value"
          class="m-2"
          placeholder="Select"
          style="margin-left: 30px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button style="margin-left: 30px" color="#c7242f">筛选</el-button>
      </div>
    </div>
    <div class="Main">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%; height: 100%"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column width="48"></el-table-column>
        <el-table-column label="操作人">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="stu_number" label="学工号" />
        <el-table-column property="identity" label="身份" />
        <el-table-column property="operate_time" label="操作时间" />
        <el-table-column property="operate_p" label="被操作人" />
        <el-table-column property="operate_stu_number" label="学号" />
        <el-table-column property="operate_type" label="操作类型" />
      </el-table>
    </div>
    <el-config-provider :locale="zhCn">
      <el-pagination
        small
        class="el-pagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[14]"
        :style="{ margin: '20px' }"
        background
        layout="total, ->,sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTable } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { reactive } from "vue";
const $route = useRoute();
const $router = useRouter();
const value = ref(1);
const input = ref("");
const options = [
  {
    label: "全部",
    value: 1,
  },
  {
    label: "状态变更",
    value: 2,
  },
  {
    label: "文件审批",
    value: 3,
  },
  {
    label: "分配学习小组",
    value: 4,
  },
];
const currentPage = ref(1);
const pageSize = ref(14);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

const handleCheck = (index: number, row: Record) => {
  console.log(index, row);
  $router.push("/deal/fileApproval/fileCheck");
};

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

const onSubmit = () => {
  console.log("submit!");
};

interface Record {
  name: string;
  stu_number: string;
  identity: string;
  operate_time: string;
  operate_p: string;
  operate_stu_number: string;
  operate_type: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Record[]>([]);
const toggleSelection = (rows?: Record[]) => {
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

const handleSelectionChange = (val: Record[]) => {
  multipleSelection.value = val;
};

const tableData: Record[] = [
  {
    name: "东雪莲",
    stu_number: "3022244001",
    identity: "入党申请人",
    operate_time: "2023-11-1",
    operate_p: "西门",
    operate_stu_number: "2203455",
    operate_type: "状态变更",
  },
];
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
</style>
