<template>
    <div class="head">
      <div>
        <span>文件类型 </span
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
        <span>处理状态 </span>
        <el-select
          v-model="value"
          class="m-2"
          placeholder="Select"
          style="margin-left: 30px"
        >
          <el-option
            v-for="item in options_2"
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
        <el-table-column property="file_type" label="文件类型" />
        <el-table-column property="title" label="标题" />
        <el-table-column property="submit_time" label="提交时间" />
        <el-table-column property="state" label="状态">
            <template #default="scope">
              <div class="icon_state">
                <i
                  class="dotClass"
                  style="background-color: #21b339"
                  v-if="scope.row.state == '已处理'"
                ></i>
                <i
                  class="dotClass"
                  style="background-color: #c7242f"
                  v-if="scope.row.state == '未处理'"
                ></i>
                <div class="state_row">
                  {{ scope.row.state }}
                </div>
              </div>
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
  import zhCn from "element-plus/lib/locale/lang/zh-cn";
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
      label: "入党申请书",
      value: 2,
    },
    {
      label: "思想汇报",
      value: 3,
    },
    {
      label: "入党志愿书",
      value: 4,
    },
    {
      label: "个人小结",
      value: 5,
    },
  ];
  const options_2 = [
    {
      label: "全部",
      value: 1,
    },
    {
      label: "未处理",
      value: 2,
    },
    {
      label: "已处理",
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
  
  interface User {
    name: string;
    stu_number: string;
    file_type: string;
    title: string;
    submit_time: string;
    state: string;
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
      file_type: "入党申请书",
      title: "标题",
      submit_time: "2023-11-1",
      state: "已处理"
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
    