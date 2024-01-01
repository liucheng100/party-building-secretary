<template>
  <div class="head">
    <div>
      <span>身份 </span
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
      <span>学号 </span>
      <el-input
        style="display: inline; margin-left: 30px"
        placeholder="输入需要查找的学号"
        v-model="input"
      ></el-input>
      <el-button style="margin-left: 30px" color="#c7242f">搜索</el-button>
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
        <template #default="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column property="usernumb" label="学号" />
      <el-table-column property="politicalface" label="身份" />
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
    <el-config-provider :locale="zhCn">
      <el-pagination
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
import { ref, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElTable } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { reactive } from "vue";
import { getMemberList } from "../../api/p_management";
import { getBranchInfo } from "@/api/branch";
import { getBranchId } from "@/utils/auth";

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
const tableData = ref<User[]>([]);
const pageSize = ref(<number>15); //每页显示学生数量
let UserRawData = ref(<User[]>[])
let UserNum = ref(0)  //总长度
let PageNum = ref(1)  //当前页码

interface User {
  username: string;
  usernumb: string;
  politicalface: string;
  id: number;
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
  tableData.value = UserRawData.value.slice((PageNum.value - 1) * pageSize.value, PageNum.value * pageSize.value);
};

const handleCurrentChange = (val: number) => {
  PageNum.value = val //每次换页 修改显示范围
  tableData.value = UserRawData.value.slice((PageNum.value - 1) * pageSize.value, PageNum.value * pageSize.value);
};

onMounted(async () => {
  let MemberList:{code:number,data:User[]} = await getMemberList(getBranchId())
  UserRawData.value = MemberList.data
  tableData.value = UserRawData.value.slice((PageNum.value - 1) * pageSize.value, PageNum.value * pageSize.value);
  UserNum.value = MemberList.data.length
})


const handleCheck = (index: number, row: User) => {
  let params = {name:row.username,stu_id:row.usernumb,identity:row.politicalface,user_id:row.id}
  $router.push({name:'p_info_check',state: { params }});
}

const formInline = reactive({
  user: "",
  region: "",
  date: "",
});

const onSubmit = () => {
  console.log("submit!");
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
.Main {
  height: auto;
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
