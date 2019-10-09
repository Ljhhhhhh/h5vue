<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view class="router" v-else></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed: {
    transitionName () {
      return this.$store.state.direction
    }
  }
}
</script>

<style lang="scss">
@import "style/common.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router {
  width: 100%;
  height: 100%;
  height: 100vh;
  overflow: scroll;
  position: fixed;
  overflow: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  background: #f0f0f0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f2f2f2;
}
</style>
