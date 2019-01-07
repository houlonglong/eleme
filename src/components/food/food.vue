<template>
  <div class="food" v-show="showFla4g"> 

  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
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
  }
</style>