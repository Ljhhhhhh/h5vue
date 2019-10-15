<template>
  <div class="home">
    <div>{{$store.state.test.number}}</div>
    <van-field v-model="value" placeholder="请输入用户名" />
    <van-button type="info" :loading="loading" @click="add">异步+1</van-button>
    <van-button type="primary" @click="addOne">主要按钮</van-button>
    <div class="msg">this is msg 我是消息</div>
    <div class="sq"></div>
    <svg-icon icon-class="user" class-name="eye"></svg-icon>
    <router-link to="/about">go about</router-link>
  </div>
</template>

<script>
import { Button, Field } from 'vant'
import { mapActions, mapMutations, mapGetters } from 'vuex' // createNamespacedHelpers
import service from '@/utils/request'
import SvgIcon from 'components/SvgIcon'
// const { mapActions } = createNamespacedHelpers('test')

export default {
  name: 'home',
  data () {
    return {
      value: 1
    }
  },
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    SvgIcon
  },
  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  },
  mounted () {
    // service.get('/article/list').then(res => {
    //   console.log(res, 'regs', process.env.NODE_ENV)
    // })
    service({
      url: '/article/list',
      method: 'get'
    }).then(res => {
      console.log(res, 'regs', process.env.NODE_ENV)
    })
  },
  methods: {
    add () {
      this.onePlusAction(this.value)
    },
    addOne () {
      this.onePlus(1)
    },
    ...mapActions({
      onePlusAction: 'test/onePlusAction'
    }),
    ...mapMutations({
      onePlus: 'test/onePlus'
    })
  }
}
</script>
<style lang="scss" scoped>
  .msg{
    font-size: 24px;
    line-height: 24px;
  }
  .sq{
    width: 315px;
    height: 40px;
    background: #3a8;
    margin: 0 auto;
  }
</style>
