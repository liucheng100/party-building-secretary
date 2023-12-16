<template>
  <div class="navTree noSelect">
    <img src="../assets/logo.png" class="logo" />
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
              <img v-show="!i.active" :src="require(i.icon)" alt="" />
              <img v-show="i.active" :src="require(i.icon_)" alt="" />
            </div>
            <div :class="{ title: 1, active: i.active }">
              {{ i.title }}
            </div>
          </div>
        </div>
        <div
          :class="{
            'sub-box-outer': 1,
            active: i.state === 2,
          }"
          :style="{
            height: i.state === 1 ? i.height + 'px' : '',
          }"
          @transitionend="transitionend(i)"
        >
          <div
            @transitionend.stop
            :ref="(el) => (domList[i.routePath] = el)"
            :class="{ 'sub-box-inner': 1, active: i.active }"
          >
            <div
              @click="$router.push(ii.routePath)"
              class="nav-2"
              v-for="ii in i.children"
            >
              <div class="left-dec none"></div>
              <div class="right-box">
                <div class="icon none"></div>
                <div
                  :class="{
                    title: 1,
                    active: $route.path.includes(ii.routePath),
                  }"
                >
                  {{ ii.title }}
                </div>
              </div>
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
import require from "@/utils/pub-use";

const $route = useRoute();
const $router = useRouter();

const navList = reactive([
  {
    title: "支部信息",
    //自己设置对应的路由和icon路径（从assets文件夹开始
    routePath: "/info",
    icon: "ljc/kuangjia/zhi.svg",
    icon_: "ljc/kuangjia/zhi_.svg",
    children: [
      {
        title: "asdfasdf",
        routePath: "/info/asdfasdf",
      },
    ],
  },
  {
    title: "业务处理",
    routePath: "/deal",
    icon: "ljc/kuangjia/ye.svg",
    icon_: "ljc/kuangjia/ye_.svg",
    children: [
      {
        title: "文件审批",
        routePath: "/deal/fileApproval",
      },
      {
        title: "状态管理",
        routePath: "/deal/stateControl",
      },
      {
        title: "操作记录",
        routePath: "/deal/xxx",
      },
    ],
  },
  {
    title: "人员管理",
    routePath: "/p_management",
    icon: "ljc/kuangjia/ren.svg",
    icon_: "ljc/kuangjia/ren_.svg",
    children: [
      {
        title: "人员信息",
        routePath: "/p_management/p_info",
      },
      {
        title: "学习小组",
        routePath: "/p_management/learnGroup",
      },
    ],
  },
  {
    title: "权限管理",
    routePath: "/3",
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

.logo {
  width: 234px;
  margin-top: 24px;
  margin-bottom: 58px;
  cursor: pointer;
}

.item-box {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item {
  height: auto;
  margin-bottom: 30px;
}

.nav-1 {
  height: 92px;
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
  height: 92px;
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  margin-right: 12px;
  width: 40px;
  height: 40px;
}

.icon img {
  width: 100%;
  height: 100%;
}

.icon.none {
  opacity: 0;
}

.title {
  font-size: 28px;
  color: rgba(159, 159, 159, 1);
  transition: 0.14s;
}
.title.active {
  color: rgba(80, 80, 80, 1);
}
</style>
