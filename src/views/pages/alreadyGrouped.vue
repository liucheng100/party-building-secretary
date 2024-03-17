<template>
  <div class="Main">
    <div class="TableContainer">
      <!-- 左边的表格 -->
      <el-table
        :data="tableDataLeft"
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
      >
        <el-table-column label="组号" width="60">
          <template #default="scope">
            <span style="color: #c7242f; font-weight: bold">{{
              scope.row.id
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" property="name">
          <template #default="scope">
            <div class="red-dot-container">
              <span>{{ scope.row.name }}</span>
              <span v-if="scope.row.isLeader" class="red-dot"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学号" property="sno" />
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
        <el-table-column label="组号" width="60">
          <template #default="scope">
            <span style="color: #c7242f; font-weight: bold">{{
              scope.row.id
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" property="name">
          <template #default="scope">
            <div class="red-dot-container">
              <span>{{ scope.row.name }}</span>
              <span v-if="scope.row.isLeader" class="red-dot"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="学号" property="sno" />
        <el-table-column label="专业" property="major" show-overflow-tooltip />
      </el-table>
    </div>
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
      :total="GroupNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import { getGroup } from "@/api/learngroup";

const pageSize = ref(<number>10); //每页组别
let GroupsData = ref(<GroupedUser[]>[]);
let GroupNum = ref(0); //总长度
let PageNum = ref(1); //当前页码

let tableDataLeft = ref(<GroupedMember[]>[]);
let tableDataRight = ref(<GroupedMember[]>[]);

interface Member {
  name: string;
  sno: string;
  major: string;
  isLeader: boolean;
  userId: number;
}

interface GroupedUser {
  id: number; //组别Id
  members: Member[];
  userId: number; //每个学生都有对应的userId
}

interface GroupedMember extends Member {
  id?: number; //组别Id
}

onMounted(async () => {
  let GroupsRawData: { code: number; data: [] } = await getGroup();
  if (GroupsRawData.code == 0) {
    GroupsData.value = GroupsRawData.data;
    processGroupData(GroupsData.value);
  }
});

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  processGroupData(GroupsData.value);
};

const handleCurrentChange = (val: number) => {
  processGroupData(GroupsData.value);
};

const processGroupData = (groups: GroupedUser[]) => {
  tableDataLeft.value = [];
  tableDataRight.value = [];
  let nowGroups = groups.slice(
    (PageNum.value - 1) * pageSize.value,
    PageNum.value * pageSize.value
  );
  GroupNum.value = groups.length;
  nowGroups.forEach((group, Groupindex) => {
    if (group.members != null)
      //判断下是不是空组别
      group.members.forEach((member) => {
        let row: GroupedMember = { ...member };
        if (member != null) {
          if (member.isLeader === true) {
            row.id = group.id; // 只有每组的第一个成员有组号
          }
          if (Groupindex < nowGroups.length / 2) tableDataLeft.value.push(row);
          else tableDataRight.value.push(row);
        } else GroupNum.value = GroupNum.value - 1;
      });
  });
};
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
