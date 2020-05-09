<template>
  <van-button class="verify-btn"
              @click="btnClick"
              size="mini"
              type="primary"
              :disabled="!!codeRestTime">
    {{codeRestTime ? `${codeRestTime}S` : '发送验证码'}}
  </van-button>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { Button } from "vant";

@Component({
  name: "VerifyCodeBtn",
  components: {
    [Button.name]: Button
  }
})
export default class extends Vue {
  @Prop({ default: "发送验证码" }) private btnMsg!: string;
  @Prop({ default: 30 }) private restTime!: number;

  private codeRestTime = 0;

  @Emit("sendVerifyCode")
  private btnClick() {
    this.codeRestTime = this.restTime;
    let timer: number = setInterval(() => {
      --this.codeRestTime;
      if (!this.codeRestTime) {
        clearInterval(timer);
      }
    }, 1000);
  }
  
}
</script>
<style lang="scss" scoped>
.verify-btn {
  padding: 0 5px;
  min-width: 6.5em;
}
</style>
