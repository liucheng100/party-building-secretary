<template>
  <div class="Main">
    <div class="TableContainer">
      <!-- 左边的表格 -->
      <el-table
        :data="tableDataLeft"
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
      >
        <el-table-column label="组号" width="50">
          <template #default="scope">
            <span style="color:#c7242f;font-weight: bold;">{{ scope.row.groupid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" property="name">
          <template #default="scope">
            <div class="red-dot-container">
              <span>{{ scope.row.name }}</span>
              <span v-if="scope.row.groupid" class="red-dot"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学号" property="stu_number" />
        <el-table-column label="专业" property="major" show-overflow-tooltip />
      </el-table>
    </div>

    <div class="TableContainer">
      <!-- 右边的表格 -->
      <el-table
        :data="tableDataRight"
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
      >
        <el-table-column label="组号" width="50">
          <template #default="scope">
            <span style="color:#c7242f;font-weight: bold;">{{ scope.row.groupid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" property="name">
          <template #default="scope">
            <div class="red-dot-container">
              <span>{{ scope.row.name }}</span>
              <span v-if="scope.row.groupid" class="red-dot"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学号" property="stu_number" />
        <el-table-column label="专业" property="major" show-overflow-tooltip />
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
import zhCn from "element-plus/lib/locale/lang/zh-cn";

import { getGroup } from "@/api/learngroup";

const currentPage = ref(1);
const pageSize = ref(14);

interface Member {
  name: string;
  stu_number: string;
  major: string;
}

interface GroupedUser {
  groupid: number;
  members: Member[];
}

interface GroupedMember extends Member {
  groupid?: number;
}

onMounted(async () => {
  const groupData = await getGroup();
  console.log(groupData);
})

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

// 假数据
const groups: GroupedUser[] = [
  {
    groupid: 1,
    members: [
      { name: "张三", stu_number: "1001", major: "专业A" },
      { name: "李四", stu_number: "1002", major: "专业B" },
      { name: "王五", stu_number: "1003", major: "专业C" },
    ],
  },
  {
    groupid: 2,
    members: [
      { name: "张三三", stu_number: "2001", major: "专业A" },
      { name: "李四四", stu_number: "2002", major: "专业B" },
      { name: "王五五", stu_number: "2003", major: "专业C" },
    ],
  },
  // more...
];

const processGroupData = (groups: GroupedUser[]): GroupedMember[] => {
  let tableData: GroupedMember[] = [];

  groups.forEach((group) => {
    group.members.forEach((member, index) => {
      let row: GroupedMember = { ...member };
      if (index === 0) {
        row.groupid = group.groupid; // 只有每组的第一个成员有组号
      }
      tableData.push(row);
    });
  });

  return tableData;
};

const processedData = processGroupData(groups);

const totalRows = processedData.length;
const half = Math.floor(totalRows / 2);

const tableDataLeft =
  totalRows % 2 === 0
    ? processedData.slice(0, half)
    : processedData.slice(0, half + 1);
const tableDataRight = processedData.slice(
  half + (totalRows % 2 === 0 ? 0 : 1)
);
</script>

<style scoped>
.Main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.TableContainer {
  width: 50%; /* 每个表格占一半 */
  padding: 0 10px; /* 内边距 */
}
.el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
.red-dot-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-right: 30px;
}

.red-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #c7242f;
}
</style>
