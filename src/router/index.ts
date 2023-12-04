import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "@/utils/auth";

const routes = [
    {
        path: "/",
        component: () => import("@/views/home.vue"),
        meta: {
            title: "主页",
            requireAuth: false,
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
                redirect: '/deal/stateControl',
                children: [
                    {
                        path: "/deal/stateControl",
                        component: () => import("@/views/pages/deal.vue"),
                        meta: {
                            title: "状态管理",
                        },
                    },
                ],
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
