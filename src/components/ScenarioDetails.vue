<template>
  <div class="scenario-details" :style="{transform: `translate(${x}px, ${-y}px)`}">
    <div class="info">
      <div class="title">{{ scenario.name }}</div>
      <div class="description">{{ scenario.description }}</div>
    </div>
    <div class="quote smart">
      <span class="name">{{ scenario.smart.name }}</span>
      <br>
      <span>«{{ scenario.smart.quote }}»</span>
    </div>
    <div class="quote dumb">
      <span class="name">{{ scenario.dumb.name }}</span>
      <br>
      <span>«{{ scenario.dumb.quote }}»</span>
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
  .info {
    display: flex;
    position: absolute;
    transform: translate(calc(-33% + #{$spacing / 2}), calc(-200px - 100%));
    width: 960px;

    .title {
      width: 320px;
      font-size: 3.6em;
      // font-weight: 900;
      font-variation-settings: "wght" 900, "slnt" -10;
      text-align: right;
      padding: 0 $spacing 0 0;
      line-height: 0.9;
    }

    .description {
      width: 640px;
      column-count: 2;
      column-gap: $spacing;
      hyphens: auto;
    }
  }
  .quote {
    position: absolute;
    width: 480px;
    padding: 0 $spacing / 2;

    span {
      font-variation-settings: "slnt" -10;
    }

    .name {
      font-weight: bold;
      font-variation-settings: "slnt" 0;
    }

    &.smart {
      border-right: 10px solid $color-smart;
      transform: translate(calc(-170px - 100%), calc(-20px - 100%));
      text-align: right;
    }

    &.dumb {
      border-left: 10px solid $color-dumb;
      transform: translate(calc(170px), 20px);
    }
  }
}
</style>
