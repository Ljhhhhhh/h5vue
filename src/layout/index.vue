<template>
  <div class="layout-container">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="layout-content"></router-view>
      </keep-alive>
      <router-view class="layout-content"
                   v-else></router-view>
    </transition>
    <footer-tabbar />
  </div>

</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import defaultSetting from "@/settings";
import FooterTabbar from "components/FooterTabbar.vue";

@Component({
  name: "Layout",
  components: {
    FooterTabbar
  }
})
export default class extends Vue {

  private transitionName = ''
  
  @Watch('$route')
  private changeDir(to: any, from: any) {
    if (defaultSetting.layoutNeedPageTrans) {
      const toIndex = to.meta.tabIndex
      const fromIndex = from.meta.tabIndex
      this.transitionName = toIndex > fromIndex ? 'forward' : 'back'
    }
  }
  
}
</script>
<style lang="scss" scoped>
.layout-content {
  height: calc(100% - 50px)!important;
}
</style>