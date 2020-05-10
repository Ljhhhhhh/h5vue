<template>
  <div>
    404
    <router-link replace to="/">返回首页</router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: '404'
})
export default class extends Vue {
}
</script>
