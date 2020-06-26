<template>
  <div class="network" v-resize:debounce.initial="resize">
    <ThreeScene :width="width" :height="height" @position="setPosition">
      <ScenarioBubble v-for="(s, i) in scenarios" :key="`scenario-${i}`" :x="s.x" :y="s.y"/>
    </ThreeScene>
    <div class="overlay">
      <div class="anchor" :style="{transform: `translate(${position.x}px, ${position.y}px)`}">
        <CrisisCircle v-for="(c, i) in crises" :key="`crisis-${i}`" :x="c.x" :y="c.y" :label="c.name"/>
      </div>
    </div>
  </div>
</template>

<script>
import ThreeScene from '@/components/ThreeScene.vue'
import ScenarioBubble from '@/components/ScenarioBubble.vue'
import CrisisCircle from '@/components/CrisisCircle.vue'
import resize from 'vue-resize-directive'
import { mapState } from 'vuex'
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
  computed: {
    ...mapState(['crises', 'scenarios'])
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
