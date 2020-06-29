<template>
  <div id="app">
    <router-view/>
    <div v-if="!initialized" class="loader">
      <!-- <svg width="400" height="400" viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink">
        <g transform="translate(100 100)">
          <g class="anim dumb"><circle r="50" cx="50"/></g>
          <g class="anim rev smart"><circle r="50" cx="-100"/></g>
          <g class="anim dumb"><circle r="50" cy="100"/></g>
          <g class="anim rev dumb"><circle r="50" cx="150"/></g>
          <g class="anim smart"><circle r="50" cy="-150"/></g>
          <g class="anim rev smart"><circle r="50" cy="-50"/></g>
        </g>
      </svg> -->
      <div class="loading">
        <div class="anim dumb">
          <div class="circle bg" style="transform: translateX(50px)"/>
          <div class="circle dumb" style="transform: translateX(50px)"/>
        </div>
        <div class="anim rev smart">
          <div class="circle bg" style="transform: translateX(-100px)"/>
          <div class="circle smart" style="transform: translateX(-100px)"/>
        </div>
        <div class="anim dumb">
          <div class="circle bg" style="transform: translateY(100px)"/>
          <div class="circle dumb" style="transform: translateY(100px)"/>
        </div>
        <div class="anim rev dumb">
          <div class="circle bg" style="transform: translateX(150px)"/>
          <div class="circle dumb" style="transform: translateX(150px)"/>
        </div>
        <div class="anim smart">
          <div class="circle bg" style="transform: translateY(-150px)"/>
          <div class="circle smart" style="transform: translateY(-150px)"/>
        </div>
        <div class="anim rev smart">
          <div class="circle bg" style="transform: translateY(-50px)"/>
          <div class="circle smart" style="transform: translateY(-50px)"/>
        </div>
      </div>
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

  .loading {
    // margin-bottom: $spacing;
    transform-box:fill-box;
    position: absolute;
    // overflow: visible;
    display: block;
    background: $color-black;
    transform: scale(1.5);

    .anim {
      position: absolute;
      mix-blend-mode: difference;
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

      .circle {
        position: absolute;
        @include tint(background);
        // mix-blend-mode: difference;
        border-radius: 50px;
        width: 100px;
        height: 100px;
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
