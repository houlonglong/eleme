<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports">
          <span class="icon"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
    <div class="bullletin-wrapper"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-header',
    props: {
      seller: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style lang='scss' scoped>
  .header {
    color: #ffffff;
    background: #000;
    .content-wrapper {
      padding: 24px 12px 18px 24px;
      .avatar {
        display: inline-block;
      }
      .content {
        display: inline-block;
      }
    }
  }
</style>