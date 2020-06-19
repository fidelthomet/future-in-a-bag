<template>
  <div class="network" v-resize:debounce.initial="resize">
    <ThreeScene :width="width" :height="height" @position="setPosition">
      <ScenarioBubble :x="200" :y="300"/>
      <ScenarioBubble :x="500" :y="-100"/>
      <ScenarioBubble :x="-400" :y="100"/>
      <ScenarioBubble :x="-500" :y="-300"/>
    </ThreeScene>
    <div class="overlay">
      <div class="anchor" :style="{transform: `translate(${position.x}px, ${position.y}px)`}">
        <CrisisCircle :x="0" :y="0" label="crisis"/>
        <CrisisCircle :x="300" :y="-400" label="crisis"/>
        <CrisisCircle :x="-900" :y="-100" label="crisis"/>
        <CrisisCircle :x="600" :y="400" label="crisis"/>
      </div>
    </div>
  </div>
</template>

<script>
import ThreeScene from '@/components/ThreeScene.vue'
import ScenarioBubble from '@/components/ScenarioBubble.vue'
import CrisisCircle from '@/components/CrisisCircle.vue'
import resize from 'vue-resize-directive'
export default {
  name: 'network',
  components: {
    ThreeScene,
    ScenarioBubble,
    CrisisCircle
  },
  directives: {
    resize
  },
  data () {
    return {
      width: 512,
      height: 512,
      position: { x: 0, y: 0 }
    }
  },
  methods: {
    resize (el) {
      const rect = el.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    },
    setPosition (pos) {
      this.position = pos
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

  .overlay {
    position: absolute;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    pointer-events: none;

    .anchor {
      position: absolute;
      top: 50vh;
      left: 50vw;
      height: 0;
      width: 0;
    }
  }
}
</style>
