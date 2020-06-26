<template>
  <div id="app">
    <router-view/>
    <div v-if="!initialized" class="loader">
      <svg width="400" height="400" viewBox="0 0 200 200">
        <g transform="translate(100 100)">
          <g class="anim dumb"><circle r="50" cx="50"/></g>
          <g class="anim rev smart"><circle r="50" cx="-100"/></g>
          <g class="anim dumb"><circle r="50" cy="100"/></g>
          <g class="anim rev dumb"><circle r="50" cx="150"/></g>
          <g class="anim smart"><circle r="50" cy="-150"/></g>
          <g class="anim rev smart"><circle r="50" cy="-50"/></g>
        </g>
      </svg>
      <span>running<br>scenarios</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['initialized'])
  },
  created () {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="scss">
@import "@/assets/style/base";
</style>
<style lang="scss">
@import "@/assets/style/global";
.loader {
  position: absolute;
  width: 100%;
  background: $color-white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    // margin-bottom: $spacing;
    position: absolute;
    overflow: visible;

    .anim {
      mix-blend-mode: difference;
      @include tint(fill);

      animation-name: loading;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;

      &.rev {
        animation-direction: reverse;
        animation-name: loading-alt;
      }
      &.smart {

      }

      circle {
      }
    }
    @keyframes loading {
      0% {
        transform: rotate(0deg) scale(1);
      }
      50% {
        transform: rotate(180deg) scale(0.5);
      }
      100% {
        transform: rotate(360deg) scale(1);
      }
    }
    @keyframes loading-alt {
      0% {
        transform: rotate(0deg) scale(0.5);
      }
      50% {
        transform: rotate(180deg) scale(1);
      }
      100% {
        transform: rotate(360deg) scale(0.5);
      }
    }
  }

  span {
    text-align: center;
    line-height: 1.1;
    text-transform: uppercase;
    font-size: 3em;
    color: $color-white;
    animation-name: font-var;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }
}
</style>
