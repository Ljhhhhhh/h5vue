<template>
  <van-tabbar route
              :safe-area-inset-bottom="true">
    <van-tabbar-item icon="home-o"
                     replace
                     to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="orders-o"
                     replace
                     to="/article">文章</van-tabbar-item>
  </van-tabbar>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tabbar, TabbarItem } from 'vant'

@Component({
  name: 'FooterTabbar',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
})
export default class extends Vue {
  
}
</script>
