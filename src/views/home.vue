<!--
 * @Author: Langjc
 * @Date: 2023-12-26 20:40:50
 * @LastEditTime: 2023-12-27 15:53:41
 * @LastEditors: Langjc
 * @Description: 
-->
<template>
  <div class="main">
    <Navtreep class="nav nav-small" />
    <Navtree  class="nav nav-big" />
    <div class="content">
      <MainHeader style="height: 75px" />
      <div id="screen" class="screen">
        <div class="decor">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Navtree from "@/components/Navtree.vue";
import Navtreep from "@/components/Navtreep.vue";
import MainHeader from "@/components/MainHeader.vue";
import { ref, onMounted, onBeforeUnmount,reactive, provide } from "vue";
import { getToken, setToken, setBranchId } from "@/utils/auth";
import { getInfo } from "@/api/login";
import { getBranchInfo } from "@/api/branch";

// 这里发请求获取支部信息
const USER_INFO = reactive({});
const BRANCH_INFO = reactive({ greatCount: "这个疑似砍了" });
// provide出去
provide("BRANCH_INFO", BRANCH_INFO);
provide("USER_INFO", USER_INFO);

if (getToken()) {
  getInfo().then((v) => {
    if (!v.code) {
      Object.assign(USER_INFO, v.data);
      const partybranchId = USER_INFO.partybranchId;
      setBranchId(USER_INFO.partybranchId);
      getBranchInfo(partybranchId).then((v) => {
        Object.assign(BRANCH_INFO, v.data);
      });
    }
  });
}
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  window.location.reload(); // 刷新页面
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
<style scoped>
.main {
  height: 100vh;
  background-color: #fafafa;
  display: grid;
  grid-template-columns: 20vw auto;
  overflow-x: hidden;
}

.nav {
  z-index: 99;
  min-height: 100vh;
}

.screen {
  flex: 1;
  /* padding: 0px 30px 0px 30px; */
  /* margin: 0 30px; */
  overflow: hidden;
}

.decor {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 40px;
  /* padding-bottom: 25px; */
  overflow: overlay;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
}

::v-deep .el-table th .cell {
  font-weight: 400;
}

.nav-small {
  display: none;
}

.nav-big{
  display: block;
}

@media screen and (max-width:768px) {
  .nav-small {
    display: block;
  }

  .nav-big {
    display: none;
  }
}
</style>
