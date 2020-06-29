<template>
  <div class="scenario-details" :style="{transform: `translate(${x}px, ${-y}px)`}">
    <div class="inner">
      <span class="wrapper">
        <span>{{ scenario.name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scenario-details',
  props: {
    scenario: {
      type: Object,
      default: null
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
.scenario-details {
  position: absolute;
  .inner {
    // background: $color-white;
    height: 256px;
    width: 256px;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    > span {
      font-size: 2em;
      text-align: center;
      color: $color-black;
      animation-name: font-var;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate;
      animation-timing-function: ease-in-out;
      line-height: 1.2;
      // text-shadow: 0px 0px 5px $color-white;
      // background: $color-white;
      > span {
        padding: 0 $spacing / 8;
        background: $color-white;
      }
    }
  }
}
</style>
