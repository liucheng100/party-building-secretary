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
  
  // 这里发请求获取支部信息
  const BRANCH_INFO = reactive({})
  // provide出去
  provide('BRANCH_INFO', BRANCH_INFO)
  
  </script>
  <style scoped>
  .main {
    background-color: #fafafa;
    display: grid;
    grid-template-columns: 307px auto;
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
  .decor{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 40px 70px;
    padding-bottom: 25px;
    overflow: overlay;
  }
  .content {
    display: grid;
    grid-template-rows: 90px auto;
    padding: 0 32px 32px 0;
  }
  </style>
  