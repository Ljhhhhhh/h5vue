<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view class="router"
                   v-else></router-view>
    </transition>
    <service-worker-update-popup />
  </div>
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import defaultSetting from '@/settings'
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue'


@Component({
  name: 'App',
  components: {
    ServiceWorkerUpdatePopup
  }
})
export default class extends Vue {
  get transitionName () {
    if (defaultSetting.needPageTrans) {
      return this.$store.state.app.direction
    }
    return ''
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
}

.router {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
