<template>
  <van-button class="verify-btn"
              @click="btnClick"
              size="mini"
              type="primary"
              :disabled="!!codeRestTime">
    {{codeRestTime ? `${codeRestTime}S` : '发送验证码'}}
  </van-button>
</template>
<script>
import { Button } from 'vant'
export default {
  name: 'VerifyCodeBtn',
  components: {
    [Button.name]: Button
  },
  props: {
    btnMsg: {
      type: String,
      default: '发送验证码'
    },
    restTime: {
      type: Number,
      default: 30
    }
  },
  data () {
    return {
      codeRestTime: 0
    }
  },
  methods: {
    btnClick () {
      this.codeRestTime = this.restTime
      let timer = setInterval(() => {
        --this.codeRestTime
        if (!this.codeRestTime) {
          clearInterval(timer)
          timer = null
        }
      }, 1000)
      this.$emit('sendVerifyCode')
    }
  }
}
</script>
<style lang="scss" scoped>
.verify-btn{
    padding: 0 5px;
    min-width: 6.5em;
  }
</style>
