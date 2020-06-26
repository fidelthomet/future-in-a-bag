<template>
  <div class="crisis-circle" :style="{transform: `translate(${x}px, ${-y}px)`}">
    <div class="inner">
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'crisis-circle',
  props: {
    label: {
      type: String,
      default: 'Crisis'
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
.crisis-circle {
  position: absolute;
  .inner {
    background: $color-black;
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
</style>
