<template>
    <div class="header noSelect">
        
        <div class="prompt r-box">
            <img class="icon-user" src="@/assets/ljc/kuangjia/user.svg" />
            <div class="prompt-info">
                <p class="text">当前支部</p>
                <p class="name">{{ BRANCH_INFO.partybranchName }}</p>
            </div>
        </div>
        <el-popconfirm title="您确定要退出登录吗？" confirm-button-text="确认" cancel-button-text="取消" @confirm="logout"
            width="200px">
            <template #reference>
                <div class="logout">
                    退出登录
                </div>
                
            </template>
        </el-popconfirm>
    </div>
</template>

<script setup>
import getAssetsFile from "@/utils/pub-use";
import { useRoute, useRouter } from "vue-router";
import { removeToken } from "@/utils/auth";
import { ref, inject } from 'vue'

const BRANCH_INFO = inject('BRANCH_INFO')
const isResizing = ref(false)
const login = ref(false)
const isCursor = ref(false)
const router = useRouter();
const route = useRoute();

const logout = () => {
    ElMessage.success("退出登录成功");
    removeToken();
    router.push("/login");
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
    padding: 0 40px;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
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

.text {
    margin-right: 10px;
}

.prompt-info {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: flex-start;
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
    font-size:2.5rem;

    text-wrap: nowrap;

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
    transition: all .25s ease-in-out;
    color: rgba(80, 80, 80, 1);

}


.icon-user {
    width: 36px;
    height: 36px;
    margin-right: 10px;
}

@media screen and (max-width: 1080px) {
    .r-box {
        font-size: 18px;
    }

    
}

@media screen and (max-width: 700px) {
    .name {
        display: none;
    }
    .logout {
        font-size: clamp(2.0rem, 2.5rem + 1.05vw, 6.0rem) !important;
    }
}
</style>
