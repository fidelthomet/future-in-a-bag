<template>
  <div class="network" v-resize:debounce.initial="resize">
    <ThreeScene :width="width" :height="height"/>
  </div>
</template>

<script>
import ThreeScene from '@/components/ThreeScene.vue'
import resize from 'vue-resize-directive'
export default {
  name: 'network',
  components: {
    ThreeScene
  },
  directives: {
    resize
  },
  data () {
    return {
      width: 512,
      height: 512
    }
  },
  methods: {
    resize (el) {
      const rect = el.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";

.network {
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
