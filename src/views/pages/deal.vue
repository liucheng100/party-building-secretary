<template>
  <div class="head">
    <div>
      <span>当前阶段 </span
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
    <div>
      <span>欲通过的阶段 </span>
      <el-select
        v-model="value"
        class="m-2"
        placeholder="Select"
        style="margin-left: 30px"
      >
        <el-option
          v-for="item in options_little"
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
      style="width: 100%; margin-top: 20px"
      :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column label="姓名">
        <template #default="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column property="stu_number" label="学号" />
      <el-table-column property="identity" label="身份" />
      <el-table-column label="操作">
          <template #default="scope">
            <el-button
              style="color: #21b339"
              link
              @click="handleCheck(scope.$index, scope.row)"
              >通过</el-button
            >
          </template>
        </el-table-column>
    </el-table>
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
    label: "入党申请人",
    value: 2,
  },
  {
    label: "入党积极分子",
    value: 3,
  },
  {
    label: "发展对象",
    value: 4,
  },
  {
    label: "中共预备党员",
    value: 5,
  },
  {
    label: "中共党员",
    value: 6,
  },
];
const options_little = [
  {
    label: "全部",
    value: 1,
  },
  {
    label: "团推优",
    value: 2,
  },
  {
    label: "通过网上申请人培训",
    value: 3,
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

const handleCheck = (index: number, row: User) => {
  console.log(index, row);
  
};

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

const onSubmit = () => {
  console.log("submit!");
};

interface User {
  name: string;
  stu_number: string;
  identity: string;
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

const tableData: User[] = [
  {
    name: "东雪莲",
    stu_number: "3022244001",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244002",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244003",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244004",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244005",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244006",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244007",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244008",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244001",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244009",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244010",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244011",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244012",
    identity: "中共党员",
  },
  {
    name: "东雪莲",
    stu_number: "3022244011",
    identity: "中共党员",
  },
];
</script>
  
  <style scoped>
.Main {
  height: 779px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
</style>
  