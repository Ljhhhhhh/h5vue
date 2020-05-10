<template>
  <div class="container">
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images"
                        :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="now-value">
      <span>当前数值{{number}}</span>
      <div>
        <van-button type="info"
                    @click="addAsync"
                    :loading="loading"
                    size="small">异步+1</van-button>
        <van-button type="primary"
                    size="small"
                    @click="addOne">+1</van-button>
      </div>
    </div>
    <div class="icon-list">
      <svg-icon v-for="icon in iconList"
                :key="icon"
                class="icon"
                :icon-class="icon" />
    </div>
    <div class="buttons">
      <van-button type="warning"
                  @click="logout">退出登录</van-button>
      <router-link to="/404">
        <svg-icon icon-class="404" />前往404页面</router-link>
    </div>
    <footer-tabbar />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NumberModule } from '@/store/modules/test'
import FooterTabbar from "@/components/FooterTabbar.vue";
import { Button, Tabbar, TabbarItem, Swipe, SwipeItem } from 'vant'
import { UserModule } from '../store/modules/user';

@Component({
  name: "ome",
  components: {
    FooterTabbar,
    [Button.name]: Button,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  }
})

export default class extends Vue {
  private value = 1;
  private images = [
    "https://img.yzcdn.cn/vant/apple-1.jpg",
    "https://img.yzcdn.cn/vant/apple-2.jpg"
  ];
  private iconList = [
    "dashboard",
    "example",
    "eye-open",
    "eye",
    "form",
    "link",
    "nested",
    "password",
    "table",
    "tree",
    "user",
    "404"
  ];

  get number() {
    return NumberModule.number
  }

  get loading() {
    return this.$store.state['@@loading'].effects.onePlusAsync
  }

  private async logout() {
    await UserModule.LogOut()
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }

  private addOne () {
    NumberModule.onePlus()
  }

  private addAsync() {
    NumberModule.onePlusAsync()
  }
  
}
</script>

<style lang="scss" scoped>
.container {
  height: auto;
  width: 100%;
  padding-bottom: 50px;
}
.banner {
  width: 100%;
  height: auto;
  img {
    width: 100%;
    height: auto;
  }
}
.now-value {
  padding: 0 15px;
  box-sizing: border-box;
  font-size: 16px;
  // line-height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-list {
  margin: 15px;
  font-size: 24px;
  .icon {
    margin: 0 10px;
  }
}
.buttons {
  padding: 0 15px;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    color: #333;
  }
}
</style>
