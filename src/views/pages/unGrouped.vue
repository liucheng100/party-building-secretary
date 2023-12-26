<template>
  <div class="Main">
    <div class="TableContainer">
      <!-- 左边的表格 -->
      <el-table
        ref="multipleTableRefLeft"
        row-key = "sno"
        :data="tableDataLeft"
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :reserve-selection= "true"
        />
        <el-table-column label="姓名">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="sno" label="学号" />
        <el-table-column property="major" label="专业" show-overflow-tooltip />
      </el-table>
    </div>

    <div class="TableContainer">
      <!-- 右边的表格 -->
      <el-table
        ref="multipleTableRefRight"
        row-key = "sno"
        :data="tableDataRight"
        style="width: 100%; margin-top: 20px"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :reserve-selection= "true"
        />
        <el-table-column label="姓名">
          <template #default="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column property="sno" label="学号" />
        <el-table-column property="major" label="专业" show-overflow-tooltip />
      </el-table>
    </div>
  </div>
  <el-config-provider :locale="zhCn">
    <el-pagination
      class="el-pagination"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[UserNum / pageSize + 1]"
      :style="{ margin: '20px' }"
      background
      layout="total, ->,sizes, prev, pager, next, jumper"
      :total="UserNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getUnGroup } from "@/api/learngroup";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const currentPage = ref(1);
const pageSize = ref(<number>30);

interface learnUser {
  name: string;
  sno: string;
  major: string;
  isSelected: false;
}

let tableDataLeft = ref(<learnUser[]>[])
let tableDataRight = ref(<learnUser[]>[])
let UserRawData = ref(<learnUser[]>[])
let UserNum = ref(0)
let PageNum = ref(1)
onMounted(async () => {
  let RawData:{code:number,data:[]} = await getUnGroup();
  if(RawData.code == 0){
    // 将数据分割为左右两部分
    UserRawData.value = RawData.data
    UserNum.value = RawData.data.length
    tableDataLeft.value = RawData.data.slice((PageNum.value - 1) * pageSize.value, (- 0.5 + PageNum.value) * pageSize.value);
    tableDataRight.value = RawData.data.slice((- 0.5 + PageNum.value) * pageSize.value,PageNum.value * pageSize.value);
  }
})

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};

const handleCurrentChange = (val: number) => {
  PageNum.value = val
    tableDataLeft.value = UserRawData.value.slice((PageNum.value - 1) * pageSize.value, (- 0.5 + PageNum.value) * pageSize.value);
    tableDataRight.value = UserRawData.value.slice((- 0.5 + PageNum.value) * pageSize.value,PageNum.value * pageSize.value);
  // console.log(`current page: ${val}`);
};

const multipleSelection = ref<learnUser[]>([]);
const handleSelectionChange = (val: learnUser[]) => {
  console.log(val)
  multipleSelection.value = val;
};

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
</style>
