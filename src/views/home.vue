<!--
 * @Author: Langjc
 * @Date: 2023-12-26 20:40:50
 * @LastEditTime: 2023-12-27 15:53:41
 * @LastEditors: Langjc
 * @Description: 
-->
<template>
    <div class="main">
        <Navtree class="nav" />
        <div class="content">
            <MainHeader />
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
import MainHeader from "@/components/MainHeader.vue";
import { ref, reactive, provide } from 'vue'
import { getToken, setToken, setBranchId } from "@/utils/auth";
import { getInfo } from "@/api/login";
import { getBranchInfo } from "@/api/branch";

// 这里发请求获取支部信息
const USER_INFO = reactive({})
const BRANCH_INFO = reactive({greatCount:'这个疑似砍了'})
// provide出去
provide('BRANCH_INFO', BRANCH_INFO)
provide('USER_INFO', USER_INFO)

if (getToken()) {
    getInfo().then(v => {
        if (!v.code) {
            Object.assign(USER_INFO, v.data)
            const partybranchId = USER_INFO.partybranchId
            setBranchId(USER_INFO.partybranchId)
            getBranchInfo(partybranchId).then(v => {
                Object.assign(BRANCH_INFO, v.data)
            })
        }
    })
}

</script>
<style scoped>
.main {
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
    padding: 10px 30px;
    overflow: hidden;
}

.decor {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 70px 0 70px;
    /* padding-bottom: 25px; */
    overflow: overlay;
}

.content {
    display: grid;
    grid-template-rows: 90px auto;
    padding: 0 32px 0 0;
}
</style>
  