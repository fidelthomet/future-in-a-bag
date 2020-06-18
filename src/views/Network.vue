<template>
  <div class="network">
    <ThreeScene :width="512" :height="512"/>
  </div>
</template>

<script>
import ThreeScene from '@/components/ThreeScene.vue'
export default {
  name: 'network',
  components: {
    ThreeScene
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
</style>
