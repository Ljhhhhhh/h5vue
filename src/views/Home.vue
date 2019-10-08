<template>
  <div class="home">
    <div>{{$store.state.test.number}}</div>
    <van-field v-model="value" placeholder="请输入用户名" />
    <van-button type="info" :loading="loading" @click="add">异步+1</van-button>
    <van-button type="primary" @click="addOne">主要按钮</van-button>
    <div class="msg">this is msg 我是消息</div>
    <div class="sq"></div>
  </div>
</template>

<script>
import { Button, Field } from 'vant'
import { mapActions, mapMutations, mapGetters } from 'vuex' // createNamespacedHelpers

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
    [Field.name]: Field
  },
  computed: {
    ...mapGetters({
      loading: 'loading'
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
    width: 630px;
    height: 75px;
    background: #3a8;
    margin: 0 auto;
  }
</style>
