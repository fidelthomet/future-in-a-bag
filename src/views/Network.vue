<template>
  <div class="network" v-resize:debounce.initial="resize">
    <ThreeScene :width="width" :height="height" @position="setPosition"/>
    <div class="overlay">
      <div class="anchor" :style="{transform: `translate(${position.x}px, ${position.y}px)`}">
        <div class="item dumb">
          <span>ANCHOR</span>
        </div>
      </div>
    </div>
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

      .item {
        @include tint(background);
        height: 256px;
        width: 256px;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        span {
          font-size: 2em;
          color: $color-white;
          animation-name: font-var;
          animation-duration: 1s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
          animation-timing-function: ease-in-out;
        }
      }
    }
  }
}

@keyframes font-var {
  0% {
    font-variation-settings: "wght" 700, "slnt" -5;
  }

  100% {
    font-variation-settings: "wght" 900, "slnt" -10;
    transform: scale(1.1);
  }

  // 100% {
  //   font-variation-settings: "wght" 900, "slnt" -10;
  // }
}
</style>
