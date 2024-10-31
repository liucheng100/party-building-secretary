<template>
  <div class="container">
    <div class="font-1">
      说明：支部管理员除“权限管理”以外，有与支部书记有相同的权限
    </div>
    <div class="head">
      <div class="font-2">当前支部管理员：</div>
      <el-button class="add" color="#c7242f" @click="showAdd = true"
        >添加支部管理员</el-button
      >
    </div>
    <div class="table" v-if="!isMobile">
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
            <el-button
              v-if="scope.row.status"
              class="cancel"
              style="color: #c7242f"
              link
              @click="toCancel(scope.row)"
              >撤销</el-button
            >
            <el-button
              v-if="!scope.row.status"
              class="cancel"
              style="color: green"
              link
              @click="toAdd(scope.row.value)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table" v-else>
      <el-table
        :data="tableData"
        style="width: 100%; height: 95%"
        :header-cell-style="{ background: '#FFF8F9', color: '#2F2F2F' }"
      >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="uid" label="学工号" />
        <el-table-column prop="position" label="职位" />
        <el-table-column label="管理">
          <template #default="scope">
            <el-button
              v-if="scope.row.status"
              class="cancel"
              style="color: #c7242f; font-size: 12px;"
              link
              @click="toCancel(scope.row)"
              >撤销</el-button
            >
            <el-button
              v-if="!scope.row.status"
              class="cancel"
              style="color: green; font-size: 12px;"
              link
              @click="toAdd(scope.row.value)"
              >添加</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!--添加弹窗-->
  <el-dialog v-model="showAdd" title="" width="500">
    <div class="dialog">
      <div class="dialog_head">
        <el-input
          placeholder="输入需要查找的学工号"
          v-model="snoInput"
          clearable
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
        v-model="selectedPosition"
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
        <el-button type="primary" @click="confirmAdd"> 添加 </el-button>
      </div>
    </template>
  </el-dialog>

  <!--删除弹窗-->
  <el-dialog v-model="showCancel" width="300" center>
    <div style="font-size: 20px; text-align: center">确认删除</div>
    <template #footer>
      <div style="display: flex; justify-content: space-around">
        <el-button type="primary" @click="confrimCancel"> 确认 </el-button>
        <el-button @click="showCancel = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, watchEffect, computed } from "vue";
import { getInfoBySno, update3Person, getBranchInfo } from "@/api/authority";
import { ElMessage } from "element-plus";

import { useIsMobileStore } from "@/stores/isMobileStore";

const isMobileStore = useIsMobileStore();
const isMobile = computed(() => isMobileStore.isMobile);

interface Manager {
  name: any;
  uid: any;
  position: string;
  value: number;
  status: number;
}

const BRANCH_INFO: any = inject("BRANCH_INFO");
const assets: any = ref();
const name = ref<string>("");
const selectedPosition = ref<number>(1);
const showAdd = ref<boolean>(false);
const showCancel = ref<boolean>(false);
const cancelValue = ref<number>(1);
const snoInput = ref<string>("");
const tableData = ref<Manager[]>([
  {
    name: "-",
    uid: "-",
    position: "组织委员",
    value: 1,
    status: 0,
  },
  {
    name: "-",
    uid: "-",
    position: "宣传委员",
    value: 2,
    status: 0,
  },
]);

const options = [
  {
    value: 1,
    label: "组织委员",
  },
  {
    value: 2,
    label: "宣传委员",
  },
];

onMounted(() => {
  watchEffect(() => {
    if (BRANCH_INFO.partybranchId) {
      update();
    }
  });
});

const update = () => {
  if (BRANCH_INFO.partybranchId) {
    getBranchInfo(BRANCH_INFO.partybranchId).then((res: any) => {
      //console.log(res);
      assets.value = res.data;
      let Organizer = assets.value.partybranchOrganizer;
      let Propagator = assets.value.partybranchPropagator;
      tableData.value = [
        {
          name: Organizer ? Organizer.username : "-",
          uid: Organizer ? Organizer.sno : "-",
          position: "组织委员",
          value: 1,
          status: Organizer ? 1 : 0,
        },
        {
          name: Propagator ? Propagator.username : "-",
          uid: Propagator ? Propagator.sno : "-",
          position: "宣传委员",
          value: 2,
          status: Propagator ? 1 : 0,
        },
      ];
    });
  }
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

const toAdd = (index: any) => {
  selectedPosition.value = index;
  showAdd.value = true;
};

const confirmAdd = () => {
  if (!name.value) {
    ElMessage.warning("请搜索以确认信息");
    return;
  }
  update3Person({
    branchId: assets.value.partybranchId,
    index: selectedPosition.value,
    newStuNum: snoInput.value,
  }).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("添加成功");
      snoInput.value = "";
      name.value = "";
      showAdd.value = false;
      update();
    } else {
      ElMessage.error(res.msg);
    }
  });
};

const toCancel = (e: any) => {
  showCancel.value = true;
  cancelValue.value = e.value;
};

const confrimCancel = () => {
  update3Person({
    branchId: assets.value.partybranchId,
    index: cancelValue.value,
    newStuNum: "",
  }).then((res: any) => {
    if (res.code == 0) {
      ElMessage.success("删除成功");
      showCancel.value = false;
      update();
    } else {
      ElMessage.error(res.msg);
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
  width: 50%;
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

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    margin-left: 0;
    padding: 10px;
  }
  .head {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
  .table {
    width: 100%;
  }
  .dialog {
    width: 100%;
    padding: 10px;
  }
  .dialog_head {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
  }
  .name {
    justify-content: center;
  }
  .add {
    margin-top: 10px;
  }
  .el-input {
    font-size: 12px;
    width: 60%;
  }
  .el-button {
    font-size: 12px;
  }
}
</style>
