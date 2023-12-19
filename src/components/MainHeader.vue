<template>
    <div class="header noSelect">
        <p class="title">
            <!-- <span>{{ $route.matched[1]?.meta.title }}</span> -
            <span style="cursor: pointer" @click="goBack">{{
                $route.meta.title
            }}</span> -->
        </p>
        <div class="r-box">
            <img class="icon-user" src="@/assets/ljc/kuangjia/user.svg" />
            <p class="text">当前支部</p>
            <p class="name">{{ BRANCH_INFO.partybranchName }}</p>
            <el-popconfirm title="您确定要退出登录吗？" confirm-button-text="确认" cancel-button-text="取消" @confirm="logout"
                width="200px">
                <template #reference>
                    <div class="logout">
                        退出登录
                    </div>
                </template>
            </el-popconfirm>
        </div>
    </div>
</template>

<script setup>
import getAssetsFile from "@/utils/pub-use";
import { removeToken } from "@/utils/auth";
import { ref, inject } from 'vue'

const BRANCH_INFO = inject('BRANCH_INFO')
const isResizing = ref(false)
const login = ref(false)
const isCursor = ref(false)

const logout = () => {
    ElMessage.success("退出登录成功");
    removeToken();
    this.$router.push("/login");
}
const goBack = () => {
    if (this.$route.meta.title?.split("-").length >= 2) {
        if (this.$router.options.history.state.back) {
            this.$router.back();
        } else {
            this.$router.push("/");
        }
    }
}

</script>

<style scoped>
.header {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    font-size: 26px;
    color: #2f2f2f;
}

.user {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.logout {
    width: 132px;
    height: 48px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;

    user-select: none;
    cursor: pointer;
    transition: .2s;
    margin-left: 52px;
    font-size: 20px;

}

.logout:hover {
    background-color: #fff;
    color: rgb(199, 36, 47);
    background-color: rgb(253, 235, 237);
}

.r-box {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: rgba(80, 80, 80, 1);

}

.name {
    margin-left: 20px;
}

.text {
    margin-left: 28px;
}

.icon-user {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
}
</style>