<template>
  <transition name="move">
    <div class="food" v-show="showFlag"> 
      <div class="content">
        <div class="image-header">
          <img :src="food.image">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .food {
    z-index: 30;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.2s linear
      }
    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0)
    }
  }
</style>