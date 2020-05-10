<template>
  <div>
    <div class="header">
      <div class="logo">
        <img src="http://img.cixi518.com/ljh_logo.jpeg"
             alt="default_logo">
      </div>
    </div>
    <div class="content">
      <van-field placeholder="用户名"
                 v-model="username"
                 left-icon="manager"
                 :error-message="usernameError" />
      <!-- eye -->
      <van-field v-if="loginWay==='password'"
                 placeholder="登录密码"
                 v-model="password"
                 left-icon="lock"
                 :type="passwordType">
        <van-icon slot="right-icon"
                  @click="switchPasswordType"
                  :name="passwordIcon" />
      </van-field>
      <van-field v-else
                 placeholder="短信验证码"
                 v-model="password"
                 left-icon="comment-o"
                 type="text">
        <VerifyCodeBtn slot="button"
                       @sendVerifyCode="sendVerifyCode" />
      </van-field>
      <div class="button-wrap">
        <van-button size="large"
                    @click="handleLogin"
                    type="info">登录</van-button>
      </div>
      <div class="more-wrap">
        <router-link class="link"
                     to="/register">没有账号？去注册</router-link>
        <div class="switch-way"
             @click="switchLoginWay">{{loginWayObj.toggleMsg}}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Field, Icon, Button } from "vant";
import VerifyCodeBtn from "components/VerifyCodeBtn.vue";
import { UserModule } from "@/store/modules/user";

@Component({
  name: "Login",
  components: {
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Button.name]: Button,
    VerifyCodeBtn
  }
})
export default class extends Vue {
  private username: string = "admin";
  private password: string = "123456";
  private code: string = "";
  private loginWay: string = "password";
  private passwordType: string = "password";
  private usernameError: string = "";

  get loginWayObj() {
    if (this.loginWay === "password") {
      return {
        icon: "closed-eye",
        toggleMsg: "验证码登录"
      };
    }
    return {
      icon: "eye",
      toggleMsg: "密码登录"
    };
  }

  get passwordIcon() {
    return this.passwordType === "password" ? "closed-eye" : "eye";
  }

  private sendVerifyCode() {
    this.usernameError = "";
    if (!this.username) {
      // 根据需求做判断
      this.usernameError = "用户名必填";
    }
  }
  private switchPasswordType() {
    this.passwordType = this.passwordType === "password" ? "text" : "password";
  }
  private switchLoginWay() {
    this.password = this.code = "";
    this.loginWay = this.loginWay === "password" ? "verifyCode" : "password";
  }
  private handleLogin() {
    const data = {
      username: this.username,
      password: this.password,
      $router: this.$router,
      $route: this.$route
    };
    UserModule.Login(data);
    // this.login(data)
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 165px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}
.content {
  width: 100%;
  height: auto;
  padding: 0 15px;
  box-sizing: border-box;
  .button-wrap {
    width: 100%;
    height: auto;
    margin-top: 15px;
  }
}
.more-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 14px;
  a.link {
    color: #1989fa;
  }
  .switch-way {
    color: #333;
  }
}
</style>
