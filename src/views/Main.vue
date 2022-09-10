<template>
  <div>
    <el-container style="height: 100%">
    <!-- 边栏 -->
      <el-aside width="auto">
        <common-aside/>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header>
          <common-header/>
        </el-header>
        
        <!-- 内容主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from '../components/CommonHeader.vue';

export default {
  name: "Main",
  components: {
    CommonAside,
    CommonHeader,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #2a2b2bfa;
}

.el-main {
  padding-top: 0;
}
</style>
