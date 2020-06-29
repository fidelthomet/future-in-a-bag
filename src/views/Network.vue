<template>
  <div class="network" v-resize:debounce.initial="resize">
    <svg class="backdrop" width="100%" height="100%">
      <g :style="{transform: `translate(50%, 50%)`}">
        <g :style="{transform: `scale(${position.zoom}) translate(${position.x}px, ${position.y}px)`}">
          <line v-for="(l, i) in links" :key="`link-${l, i}`" class="link"
            :x1="l.source.x * networkScale" :y1="l.source.y * -networkScale" :x2="l.target.x * networkScale" :y2="l.target.y * -networkScale"/>
        </g>
      </g>
    </svg>
    <ThreeScene :width="width" :height="height" @position="setPosition" @click="clicked($event)" @detail="detail($event)">
      <ScenarioBubble v-for="(s, i) in scenarios" :key="`scenario-${i}`"
        :id="s.hash" :axis="s.axis" :x="s.x * networkScale" :y="s.y * networkScale"/>
    </ThreeScene>
    <div class="overlay">
      <div class="anchor" :style="{transform: `scale(${position.zoom}) translate(${position.x}px, ${position.y}px)`}">
        <CrisisCircle v-for="(c, i) in crises" :key="`crisis-${i}`" :x="c.x * networkScale" :y="c.y * networkScale" :label="c.name"/>
      </div>
    </div>
    <transition name="fade">
      <div v-if="highlight" class="blur"/>
    </transition>
    <ThreeScene :width="width" :height="height" @position="setPosition" non-interactive :position="position">
      <ScenarioBubble v-for="(s, i) in scenarios.filter(d => d.hash === highlight)" :key="`scenario-${i}`"
        :axis="s.axis" :x="s.x * networkScale" :y="s.y * networkScale"/>
    </ThreeScene>
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
      position: { x: 0, y: 0, zoom: 1 },
      networkScale: 20,
      highlight: false
    }
  },
  computed: {
    ...mapState(['crises', 'scenarios', 'links'])
  },
  methods: {
    resize (el) {
      const rect = el.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    },
    setPosition (pos) {
      this.position = pos
    },
    clicked (e) {
      this.highlight = null
    },
    detail (id) {
      this.highlight = id
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

  .backdrop {
    position: absolute;

    .link {
      stroke: $color-black;
      // stroke: #00FFD1;
      stroke-width: 10;
    }
  }

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

  .blur {
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    background-color: transparentize($color-white, 0.2);
    @supports (
      (-webkit-backdrop-filter: saturate(150%) blur(10px))
        or (backdrop-filter: saturate(150%) blur(10px))
    ) {
      background: transparentize($color-pale-gray, 0.8);
      -webkit-backdrop-filter: saturate(150%) blur(10px);
      backdrop-filter: saturate(150%) blur(10px);
    }
  }
}
</style>
