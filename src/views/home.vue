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
<script>
import Navtree from "@/components/Navtree.vue";
import MainHeader from "@/components/MainHeader.vue";
export default {
  components: {
    Navtree,
    MainHeader,
  },
};
</script>
<style scoped>
.main {
  background-color: #fafafa;
  display: grid;
  grid-template-columns: 300px auto;
  overflow-x: hidden;
}
.nav {
  z-index: 99;
  min-height: 100vh;
}
.screen {
  background-color: #fafafa;
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
  background-color: #fff;
}
.content {
  display: grid;
  grid-template-rows: 90px auto;
}
</style>
