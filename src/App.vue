<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup>
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useIsMobileStore } from "@/stores/isMobileStore";
import { ref, onMounted, onUnmounted } from "vue";

const isMobileStore = useIsMobileStore();

onMounted(() => {
  window.addEventListener("resize", isMobileStore.updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", isMobileStore.updateIsMobile);
});
</script>

<style scoped></style>
