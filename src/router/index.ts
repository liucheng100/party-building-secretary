import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "@/utils/auth";

const routes = [
  {
    path: "/",
    component: () => import("@/views/home.vue"),
    meta: {
      title: "主页",
      requireAuth: true,
    },
    children: [
      {
        path: "/info",
        component: () => import("@/views/pages/info.vue"),
        meta: {
          title: "支部信息",
        },
      },
      {
        path: "/deal",
        meta: {
          title: "业务处理",
        },
        redirect: "/deal/stateControl",
        children: [
          {
            path: "/deal/operateRecord",
            component: () => import("@/views/pages/operateRecord.vue"),
            meta: {
              title: "操作记录",
            },
          },
          {
            path: "/deal/stateControl",
            component: () => import("@/views/pages/deal.vue"),
            meta: {
              title: "状态管理",
            },
          },
          {
            path: "/deal/fileApproval",
            component: () => import("@/views/pages/f_approval.vue"),
            meta: {
              title: "文件审批",
            },
          },
          {
            path: "/deal/fileApproval/fileCheck",
            name: "f_check",
            component: () => import("@/views/pages/f_check.vue"),
            meta: {
              title: "查看文件",
            },
          },
        ],
      },
      {
        path: "/p_management",
        meta: {
          title: "人员管理",
        },
        redirect: "/p_management/p_info",
        children: [
          {
            path: "/p_management/p_info",
            component: () => import("@/views/pages/p_management.vue"),
            meta: {
              title: "人员信息",
            },
          },
          {
            name: "p_info_check",
            path: "/p_management/p_info/p_info_check",
            component: () => import("@/views/pages/p_info_check.vue"),
            meta: {
              title: "个人详情",
            },
            params: {
              row: {},
            },
          },
          {
            path: "/p_management/learnGroup",
            component: () => import("@/views/pages/learnGroup.vue"),
            meta: {
              title: "学习小组",
            },
            children: [
              {
                path: "",
                redirect: "/p_management/learnGroup/grouped",
              },
              {
                path: "grouped",
                component: () => import("@/views/pages/alreadyGrouped.vue"),
              },
              {
                path: "ungrouped",
                component: () => import("@/views/pages/unGrouped.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/authority",
        component: () => import("@/views/pages/authority.vue"),
        meta: {
          title: "权限管理",
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login.vue"),
    meta: {
      title: "登录",
      requireAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior: () => ({ top: 0 }),
});
router.beforeEach(async (to, from, next) => {
  let token = getToken();
  if (to.meta.requireAuth && !token) {
    next({
      path: "/login",
      query: {
        from: to.path,
      },
    });
  } else {
    window.document.title =
      to.meta.title == undefined
        ? "天津大学学生党建平台支书端"
        : `${to.meta.title} - 天津大学学生党建平台支书端`;
    next();
  }
});
export default router;
