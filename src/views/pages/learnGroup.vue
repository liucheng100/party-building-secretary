<!--
 * @Author: Langjc
 * @Date: 2023-12-26 20:40:50
 * @LastEditTime: 2023-12-27 17:15:52
 * @LastEditors: Langjc
 * @Description: 
-->
<template>
  <div class="container">
    <div class="head">
      <el-radio-group
        v-model="tabPosition"
        @change="handleTabChange()"
        style="margin-bottom: 30px"
      >
        <el-radio-button label="已分组"></el-radio-button>
        <el-radio-button label="未分组人员"></el-radio-button>
      </el-radio-group>
      <div>
        <el-button
          v-if="tabPosition !== '已分组'"
          class="custom-button"
          @click="addToGroup()"
          >将所选加入小组</el-button
        >
        <el-button
          v-if="tabPosition == '已分组'"
          class="custom-button"
          @click="List()"
          >导出当前分组名单</el-button
        >
        <el-button class="custom-button" @click="createDialogVisible = true"
          >创建学习小组</el-button
        >
        <el-button class="custom-button" @click="manageGroup()"
          >管理小组</el-button
        >
      </div>
    </div>
    <el-dialog v-model="createDialogVisible" title="创建学习小组" width="30%">
      <div class="PopUp">
        <div class="bar">
          <span class="title">组长学号</span>
          <el-input
            class="input"
            v-model="createGroupLeader"
            placeholder="请输入组长学号"
          ></el-input>
        </div>
        <div class="bar">
          <span class="title">所属支部</span>
          <el-input
            class="input"
            v-model="BRANCH_INFO.partybranchName"
            :disabled="true"
          ></el-input>
        </div>
        <span class="dialog-footer">
          <el-button @click="createDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="createGroup()">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog v-model="manageDialogVisible" title="管理学习小组" width="30%">
      <div class="PopUp">
        <el-table
          :data="tableData"
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
          <el-table-column label="组长" property="name">
            <template #default="scope">
              <div class="red-dot-container">
                <span>{{ scope.row.name }}</span>
                <span v-if="scope.row.isLeader" class="red-dot"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row.id)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog v-model="addVisible" title="添加到学习小组" width="30%">
      <div class="PopUp">
        <el-table
          :data="tableData"
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
          <el-table-column label="组长" property="name">
            <template #default="scope">
              <div class="red-dot-container">
                <span>{{ scope.row.name }}</span>
                <span v-if="scope.row.isLeader" class="red-dot"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="addMember(scope.row.id)"
                >添加</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <router-view v-slot="{ Component }">
      <component
        @addComplete="addVisible = false"
        ref="routerViewRef"
        :is="Component"
      />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { addGroup, getList, getGroup, getDeleteGroup } from "@/api/learngroup";
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();
const tabPosition = ref("已分组");
let BRANCH_INFO: { partybranchName: string } = JSON.parse(
  JSON.stringify(inject("BRANCH_INFO"))
); //ts的类型检测能不能死啊
let createDialogVisible = ref(false);
let manageDialogVisible = ref(false);
let addVisible = ref(false);
let createGroupLeader = ref("");
const routerViewRef = ref<any>();

let tableData = ref(<GroupedMember[]>[]);

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

const addMember = (groupId: number) => {
  routerViewRef.value.addNewMember(groupId);
};
const addToGroup = async () => {
  tableData = ref(<GroupedMember[]>[]);
  let GroupsRawData: { code: number; data: [] } = await getGroup();
  if (GroupsRawData.code === 0) processGroupData(GroupsRawData.data);
  addVisible.value = true;
};
// 根据路由初始化选项卡位置
const initTabPosition = () => {
  if (route.path.includes("/p_management/learnGroup/ungrouped")) {
    tabPosition.value = "未分组人员";
  } else {
    tabPosition.value = "已分组";
  }
};

const manageGroup = async () => {
  tableData = ref(<GroupedMember[]>[]);
  let GroupsRawData: { code: number; data: [] } = await getGroup();
  if (GroupsRawData.code === 0) processGroupData(GroupsRawData.data);
  manageDialogVisible.value = true;
};

const handleEdit = (index: any) => {
  manageDialogVisible.value = false;

  window.location.reload();
};
const handleDelete = async (index: any) => {
  await getDeleteGroup(index)
    .then((res: any) => {
      if (res.code === 0) {
        ElMessage.success("删除成功");
        manageDialogVisible.value = false;
        window.location.reload(); //刷新页面 跟它爆了
      }
    })
    .catch((err) => {
      console.log(err);
      ElMessage.warning("删除失败");
    });
};

const processGroupData = (groups: GroupedUser[]) => {
  groups.forEach((group) => {
    if (group.members != null) {
      //判断下是不是空组别
      let row: GroupedMember = { ...group.members[0] };
      if (group.members[0] != null) {
        row.id = group.id; // 只有每组的第一个成员有组号
        tableData.value.push(row);
      }
    }
  });
};

const createGroup = async () => {
  let GroupsRawData: { code: number; data: [] } = await addGroup(
    createGroupLeader.value
  );
  if (GroupsRawData.code === 0) {
    ElMessage.success({ message: "创建成功", offset: 150 });
    createDialogVisible.value = false;
  } else {
    ElMessage.error({ message: "创建失败", offset: 150 });
  }
};

const List = async () => {
  await getList().then((res: any) => {
    let result: Blob = res;
    let blob = new Blob([result], { type: "application/x-download" });
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.download = "分组名单.xls";
    link.href = url;
    link.click();
  });
};
// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    initTabPosition();
  }
);

// 组件初始化时执行
initTabPosition();

// 处理选项卡变化
const handleTabChange = () => {
  if (tabPosition.value === "已分组") {
    router.push("/p_management/learnGroup/grouped");
  } else {
    router.push("/p_management/learnGroup/ungrouped");
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.custom-button {
  margin-left: 30px;
  color: #c7242f;
  border-color: #c7242f;
  background-color: white;
}
.PopUp {
  width: 100%;
  height: 100%;
}
.PopUp .bar {
  display: flex;
  margin: auto;
  margin-bottom: 30px;
  justify-content: center;
}
.PopUp .bar .title {
  font-size: 18px;
  line-height: 50px;
  margin-right: 10px;
}
.PopUp .bar .input {
  width: 60%;
  height: 50px;
}
</style>
