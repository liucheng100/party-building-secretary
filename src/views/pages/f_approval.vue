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
        <el-table-column property="userName" label="姓名">
        </el-table-column>
        <el-table-column property="sno" label="学号" />
        <el-table-column property="type" label="文件类型">
          <template #default="scope">
            <div class="state_row">
              {{(scope.row.type<100)?(scope.row.type == 0?'入党申请书':'个人自传'):(scope.row.type<200?'思想报告':'个人总结')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column property="title" label="标题" />
        <el-table-column property="createAt" label="提交时间">
          <template #default="scope">
          {{ new Date(Date.parse(scope.row.createAt)).getFullYear()+'-'+
            (new Date(Date.parse(scope.row.createAt)).getMonth()+1) + '-'+
            new Date(Date.parse(scope.row.createAt)).getDate()}}
          </template>
        </el-table-column>
        <el-table-column property="status" label="状态">
            <template #default="scope">
              <div class="icon_state">
                <i
                  class="dotClass"
                  style="background-color: #21b339"
                  v-if="scope.row.status > 0"
                ></i>
                <i
                  class="dotClass"
                  style="background-color: #c7242f"
                  v-if="scope.row.status == 0"
                ></i>
                <div class="state_row">
                  {{ (scope.row.status == 0) ? '未处理' : '已处理'}}
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
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { ElTable } from "element-plus";
  import zhCn from "element-plus/es/locale/lang/zh-cn";
  import { getAllFiles } from "../../api/manageFile";
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
  
  const tableData = ref<User[]>([]);
  const fileRawData = ref<User[]>([]);

  onMounted(async () => {
    let fileList:{code:number,data:User[]}= await getAllFiles(0) //0全部1已审2未审
    fileRawData.value = fileList.data
    tableData.value = fileList.data
  })

  const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`);
  };
  
  const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`);
  };
  
  const handleCheck = (index: number, row: User) => {
    let params = {
      userName:row.userName,
      sno:row.sno,
      createAt:row.createAt,
      type:row.type,
      file_id:row.id,
      title:row.title,
      content:row.content
    }
    $router.push({name:'f_check',state: { params }});
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
    userName: string;
    sno: string;
    type: string;
    title: string;
    content: string;
    createAt: string;
    status: string;
    id: number;
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
  justify-content: center;
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
    