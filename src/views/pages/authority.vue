<template>
  <div class="container">
    <div class="font-1">
      说明：支部管理员除“权限管理”以外，有与支部书记有相同的权限
    </div>
    <div class="head">
      <div class="font-2">当前支部管理员</div>
      <el-button class="add" color="#c7242f" @click="showAdd = true"
        >添加支部管理员</el-button
      >
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%; height: 95%"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
      >
        <el-table-column prop="name" label="姓名" width="160" />
        <el-table-column prop="uid" label="学工号" width="160" />
        <el-table-column prop="position" label="职位" width="220" />
        <el-table-column label="管理">
          <template #default="scope">
            <el-button class="cancel" style="color: #c7242f" link
              >撤销</el-button
            >
          </template>
        </el-table-column>
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
  <el-dialog v-model="showAdd" title="" width="500">
    <div class="dialog">
      <div class="dialog_head">
        <el-input
          placeholder="输入需要查找的学工号"
          v-model="snoInput"
          clearable
          @change="searchBySno()"
        ></el-input>
        <el-button
          @click="searchBySno()"
          color="#c7242f"
          style="margin-left: 10px"
          >搜索</el-button
        >
      </div>
      <div class="name" v-if="name">
        <img
          src="../../assets/ljc/kuangjia/zhi_.svg"
          style="width: 30px; height: 30px"
        />
        <div class="font-3">
          {{ name }}
        </div>
      </div>
      <el-select
        v-model="position"
        placeholder="选择职位"
        style="width: 50%; margin-top: 20px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="showAdd = false"> 添加 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getInfoBySno } from "@/api/authority";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ElMessage } from "element-plus";

const pageSize = ref(<number>10); //每页组别
let GroupNum = ref(0); //总长度
let PageNum = ref(1); //当前页码
const handleSizeChange = () => {
  tableData.value = tableData.value.slice(
    (PageNum.value - 1) * pageSize.value,
    PageNum.value * pageSize.value
  );
};

const handleCurrentChange = () => {
  tableData.value = tableData.value.slice(
    (PageNum.value - 1) * pageSize.value,
    PageNum.value * pageSize.value
  );
};

interface Manager {
  name: string;
  uid: number;
  position: string;
}

const name = ref<string>("");
const position = ref<string>("");
const showAdd = ref<boolean>(false);
const snoInput = ref<string>("");
const tableData = ref<Manager[]>([
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
  {
    name: "张三",
    uid: 123123,
    position: "组织委员/宣传委员",
  },
]);

const options = [
  {
    value: 0,
    label: "组织委员",
  },
  {
    value: 1,
    label: "宣传委员",
  },
];

const add = () => {
  showAdd.value = true;
};
const searchBySno = () => {
  getInfoBySno(snoInput.value).then((res: any) => {
    if (res.data) name.value = res.data.uname;
    else {
      ElMessage.error("目标不存在");
      name.value = "";
    }
  });
};
</script>

<style scoped>
.container {
  width: 95%;
  height: 100%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
}
.font-1 {
  font-size: 16px;
  color: #c7242f;
}
.head {
  width: 60%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.font-2 {
  font-size: 24px;
}
.font-3 {
  display: inline;
}
.name {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.add {
  font-size: 12px;
}
.table {
  margin-top: 50px;
  width: 650px;
  overflow: auto;
}
.dialog_head {
  width: 50%;
  display: flex;
}
.dialog {
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-pagination.is-background .el-pager li {
  border-radius: 50%;
}
</style>
