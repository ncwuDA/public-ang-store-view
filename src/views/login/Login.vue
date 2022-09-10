<template>
  <div class="login" style="overflow-y:hidden">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h4 class="loginTitle">
        后台管理系统
      </h4>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" @keyup.enter.native="submitLogin" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      checked: true,
      rules: {
        username: [{required: true, message: "请输入用户名", trigger: "blur"}, {
          min: 5,
          max: 14,
          message: '长度在 5 到 14 个字符',
          trigger: 'blur'
        }
        ],
        password: [{required: true, message: "请输入密码", trigger: "blur"}, {min: 6, message: '密码长度要大于6', trigger: 'blur'}],
      }

    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (this.loginForm.username === 'admin' && this.loginForm.password === '529529') {
            this.$router.push("/main")
          } else {
            this.$message.error('账号或密码错误！');
          }
        } else {
          return false;
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  background-color: #7a7979;
}

.loginContainer {
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #2f2e2e;
}

.loginTitle {
  margin: 0 auto 48px auto;
  text-align: center;
  font-size: 30px;
  color: white;
}

</style>