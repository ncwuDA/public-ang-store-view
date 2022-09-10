<template>
  <div class="header">
    <!-- 左侧 -->
    <div class="l-content">
      <el-button @click="handlMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
    </div>

    <!-- 右侧 -->
    <div class="r-content">
      <el-dropdown trigger="click" size="medium">
        <!-- 头像 -->
        <span>
          <img class="user" :src="userImg" />
        </span>
        <!-- 下拉菜单 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/images/user.jpg"),
    };
  },
  methods:{
    handlMenu(){
      this.$store.commit("collapseMenu")
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}

.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
