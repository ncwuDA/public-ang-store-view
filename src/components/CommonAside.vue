<template>
  <div id="commonAside" class="div">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <h3 style="font-size: 20px;">{{isCollapse ? "后台":"后台管理系统"}}</h3>
      <el-menu-item
        v-for="item in noChildren"
        @click="clickMenu(item)"
        :index="item.path"
        :key="item.path"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title" style="font-size: 16px;">{{ item.label }}</span>
      </el-menu-item>

      <el-submenu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title" style="font-size: 16px;">{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="(subItem, subIndex) in item.children"
          :key="subItem.path"
        >
          <el-menu-item :index="subIndex.path">
            {{ subItem.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}

.div {
  height: 700px;
  width: 100%;
  background-color: #545c64;
}
</style>

<script>
export default {
  name: "commonAside",
  data() {
    return {
      menu: [
        {
          path: "/home",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/goods",
          name: "goods",
          label: "商品管理",
          icon: "s-goods",
          url: "MallManage/MallManage",
        },
        {
          path: "/order",
          name: "order",
          label: "工单管理",
          icon: "s-order",
          url: "UserManage/UserManage",
        },
        // {
        //   label: "其他",
        //   icon: "location",
        //   children: [
        //     {
        //       path: "/page1",
        //       name: "page1",
        //       label: "页面1",
        //       icon: "setting",
        //       url: "Other/PaggeOne",
        //     },
        //     {
        //       path: "/page2",
        //       name: "page2",
        //       label: "页面2",
        //       icon: "setting",
        //       url: "Other/PaggeTwo",
        //     },
        //   ],
        // },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
        this.$router.push({
            name: item.name
        })
    }
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
};
</script>