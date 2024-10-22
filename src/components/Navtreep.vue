<template>
 
  <div class="navTree noSelect" >
    <div class="boxer">
    <img src="../assets/logo.png" class="logo" />
    </div>
    <div class="item-box">
      <div v-for="(i, idx) in navList" class="item">
        <div
          :class="{
            'nav-1': 1,
            active: i.active,
          }"
          @click="$router.push(i.routePath)"
        >
        <div :class="{ 'left-dec': 1, active: i.active }"></div>
          <div class="right-box">
            <div class="icon">
              
            </div>
            <div :class="{ title: 1, active: i.active }">
              {{ i.title }}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>


</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";


import { ElDrawer, ElButton } from 'element-plus';


const $route = useRoute();
const $router = useRouter();

const navList = reactive([
  {
    title: "支部信息",
    //自己设置对应的路由和icon路径（从assets文件夹开始
    routePath: "/info",
    icon: "ljc/kuangjia/zhi.svg",
    icon_: "ljc/kuangjia/zhi_.svg",
  },
  //{
    //title: "操作记录",
    //routePath: "/deal/operateRecord",
    //icon: "ljc/kuangjia/ye.svg",
    //icon_: "ljc/kuangjia/ye_.svg",
  //},
   {
    title: "文件审批",
    routePath: "/deal/fileApproval",
    icon: "ljc/kuangjia/ye.svg",
    icon_: "ljc/kuangjia/ye_.svg",
  },
   {
    title: "状态管理",
    routePath: "/deal/stateControl",
    icon: "ljc/kuangjia/ye.svg",
    icon_: "ljc/kuangjia/ye_.svg",
  },
  {
    title: "人员信息",
    routePath: "/p_management/p_info",
    icon: "ljc/kuangjia/ren.svg",
    icon_: "ljc/kuangjia/ren_.svg",
  },
    {
    title: "学习小组",
    routePath: "/p_management/learnGroup",
    icon: "ljc/kuangjia/ren.svg",
    icon_: "ljc/kuangjia/ren_.svg",
  },
  {
    title: "权限管理",
    routePath: "/authority",
    icon: "ljc/kuangjia/quan.svg",
    icon_: "ljc/kuangjia/quan_.svg",
  },
]);

let domList = {};

const route_change_handle = () => {
  navList.forEach((nav) => {
    if ($route.path.includes(nav.routePath)) {
      nav.height = domList[nav.routePath]?.offsetHeight || 0;
      nav.state = 1;
      nav.active = true;
    } else {
      if (nav.state !== 0) {
        nav.height = domList[nav.routePath]?.offsetHeight || 0;
        nav.state = 1;
        nav.active = false;
        nextTick(() => {
          nav.state = 0;
        });
      }
    }
  });
};

const transitionend = (i) => {
  if (i.state === 1) {
    i.state = 2;
  }
};

watch($route, () => {
  route_change_handle();
});

onMounted(() => {
  route_change_handle();
});
</script>


<style scoped>
.navTree {
  /* background-color: #ffffff; */
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  
}

.boxer{
  display: flex;
  justify-content: center;
}
.logo {
  width: 100%;
  margin-top: 3vh;
  margin-bottom: 4vh;
  cursor: pointer;
 
}

.item-box {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item {
  height: auto;

  margin-bottom: 2vh;
}

.nav-1 {
  height: 9vh;
  display: flex;
  border-radius: 0px 4px 4px 0px;
  transition: 0.12s;
  cursor: pointer;
}
.nav-1.active {
  background-color: #fff;
}

.sub-box-outer {
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 0.26s ease;
}

.sub-box-outer.active {
  height: auto;
}

.sub-box-inner {
  height: auto;
  width: 100%;
  opacity: 0;
  transition: 0.2s;
  transform: scale(0.9);
  transform-origin: center 0;
  padding-top: 30px;
}
.sub-box-inner.active {
  transform: scale(1);
  opacity: 1;
}
.nav-2 {
  height: 9vh;
  display: flex;
  cursor: pointer;
}
.left-dec {
  width: 8px;
  height: 100%;
  transform: translateX(-100%);
  transition: 0.2s;
}
.left-dec.active {
  background-color: rgba(199, 36, 47, 1);
  transform: translateX(0);
}

.left-dec.none {
  opacity: 0;
}

.right-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  margin-right: 12px;
  width: 100%;
  height: 5vh;
  @media screen and (max-width:768px) {
    display: none;
  }
}

.icon img {
  width: 100%;
  height: 100%;
}

.icon.none {
  opacity: 0;
}

.title {
  font-size: clamp(3.0rem, 5.0rem + 1.05vw, 9.0rem);
  color: rgba(159, 159, 159, 1);
  transition: 0.14s;
}
.title.active {
  color: rgba(80, 80, 80, 1);
}
</style>
