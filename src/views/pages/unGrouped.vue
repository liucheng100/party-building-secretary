<template>
  <div class="Main">
    <div class="TableContainer">
      <!-- 左边的表格 -->
      <el-table
        ref="multipleTableRefLeft"
        :data="tableDataLeft"
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="姓名">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="stu_number" label="学号" />
        <el-table-column property="major" label="专业" show-overflow-tooltip />
      </el-table>
    </div>

    <div class="TableContainer">
      <!-- 右边的表格 -->
      <el-table
        ref="multipleTableRefRight"
        :data="tableDataRight"
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="姓名">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="stu_number" label="学号" />
        <el-table-column property="major" label="专业" show-overflow-tooltip />
      </el-table>
    </div>
  </div>
  <el-config-provider :locale="zhCn">
    <el-pagination
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const currentPage = ref(1);
const pageSize = ref(14);

interface learnUser {
  name: string;
  stu_number: string;
  major: string;
}

// onMounted(async () => {
//   const groupData = await getGroup();
//   console.log(groupData);
// })

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

const multipleSelection = ref<learnUser[]>([]);
const handleSelectionChange = (val: learnUser[]) => {
  multipleSelection.value = val;
};

// 假数据
const tableData: learnUser[] = [
  {
    name: "东雪莲",
    stu_number: "3022244001",
    major: "马克思主义学院",
  },
  {
    name: "东雪莲",
    stu_number: "3022244002",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244003",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244004",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244005",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244006",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244007",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244008",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244001",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244009",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244010",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244011",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244012",
    major: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244011",
    major: "中共党员",
  },
];

// 将数据分割为左右两部分
const half = Math.ceil(tableData.length / 2);
const tableDataLeft = tableData.slice(0, half);
const tableDataRight = tableData.slice(half);
</script>

<style scoped>
.Main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80%;
}
.TableContainer {
  width: 50%; /* 每个表格占一半 */
  padding: 0 10px; /* 内边距 */
}
.el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
</style>
