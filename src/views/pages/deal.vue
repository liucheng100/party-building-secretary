<template>
  <div class="head">
    <div>
      <span>当前阶段 </span
      ><el-select
        v-model="stageValue"
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
    </div>
    <div>
      <span>欲通过的阶段 </span>
      <el-select
        v-model="subStageValue"
        class="m-2"
        placeholder="Select"   
        style="margin-left: 30px">
        <el-option
          v-for="item in options_little[stageValue]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button style="margin-left: 30px" color="#c7242f" @click="filterMember()">筛选</el-button>
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
const stageValue = ref(0);
const subStageValue = ref(0);
const input = ref("");
const options = [
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
  }
];
const options_little = [
  [
    {
      label: "参加入党申请人学习小组",
      value: 0,
      stage: 2,
    },
    {
      label: "群团组织推优",
      value: 1,
      stage: 3,
    },
    {
      label: "通过网上申请人培训",
      value: 2,
      stage: 4,
    },
    {
      label: "支委会审议并上报支部党委组织",
      value: 3,
      stage: 5,
    },
    {
      label: "入党积极分子",
      value: 4,
      stage: 6,
    }
  ],
  [
    {
      label: "通过院级积极分子培训",
      value: 0,
      stage: 7,
    },
    {
      label: "按季度递交思想汇报",
      value: 1,
      stage: 8,
    },
    {
      label: "确定培养联系人",
      value: 2,
      stage: 9,
    },
    {
      label: "支部考察",
      value: 3,
      stage: 10,
    },
    {
      label: "听取党员意见",
      value: 4,
      stage: 11,
    },
    {
      label: "征求群众意见",
      value: 5,
      stage: 12,
    },
    {
      label: "征求党小组、联系人意见",
      value: 6,
      stage: 13,
    },
    {
      label: "支部会讨论并上报上级党委备案",
      value: 7,
      stage: 14,
    },
    {
      label: "发展对象",
      value: 8,
      stage: 15,
    }
  ],
  [
    {
      label: "确定2名正式党员为介绍人",
      value: 0,
      stage: 16,
    },
    {
      label: "撰写个人自传",
      value: 1,
      stage: 17,
    },
    {
      label: "通过发展对象党校培训",
      value: 2,
      stage: 18,
    },
    {
      label: "材料齐全",
      value: 3,
      stage: 19,
    },
    {
      label: "支部综合审查",
      value: 4,
      stage: 20,
    },
    {
      label: "上级党委预审并公示",
      value: 5,
      stage: 21,
    },
    {
      label: "填写入党申请书",
      value: 6,
      stage: 22,
    },
    {
      label: "党员发展大会",
      value: 7,
      stage: 23,
    },
    {
      label: "党委谈话、审批",
      value: 8,
      stage: 24,
    },
    {
      label: "报再上一级党委组织部门备案",
      value: 9,
      stage: 25,
    },
    {
      label: "中共预备党员",
      value: 10,
      stage: 26,
    }
  ],
  [
    {
      label: "入党宣誓",
      value: 0,
      stage: 27,
    },
    {
      label: "通过预备党员培训",
      value: 1,
      stage: 28,
    },
    {
      label: "季度递交个人小结",
      value: 2,
      stage: 29,
    },
    {
      label: "参加组织生活",
      value: 3,
      stage: 30,
    },
    {
      label: "支部按季度进行考察",
      value: 4,
      stage: 31,
    },
    {
      label: "提出转正申请",
      value: 5,
      stage: 32,
    },
    {
      label: "征求党员、群众意见",
      value: 6,
      stage: 33,
    },
    {
      label: "听取党小组、介绍人意见",
      value: 7,
      stage: 34,
    },
    {
      label: "转正公示",
      value: 8,
      stage: 35,
    },
    {
      label: "转正大会",
      value: 9,
      stage: 36,
    },
    {
      label: "党委审批",
      value: 10,
      stage: 37,
    },
    {
      label: "党员书记谈话",
      value: 11,
      stage: 38,
    },
    {
      label: "中共党员",
      value: 12,
      stage: 39,
    }
  ],


];
const currentPage = ref(1);
const pageSize = ref(14);

const filterMember = () => {
  console.log(options_little[stageValue.value][subStageValue.value])
}
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
  justify-content: space-around;
}

.el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
</style>
  