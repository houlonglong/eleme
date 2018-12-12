<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class ="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]" >{</span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count"> {{ seller.supports.length }}个</span>
        <i class="fa fa-chevron-right"></i>
      </div>
 
    </div>
    <div class="bulletin-wrapper">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        classMap: ['decrease', 'discont', 'guarantee', 'invoice', 'special']
      }
    },
    name: 'v-header',
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
  }
</script>

<style lang='scss' scoped>

@import 'common/scss/mxin.scss';

  .header {
    color: #ffffff;
    background: #999999;
    .content-wrapper {
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0; 
      .avatar {
        display: inline-block;
        vertical-align: top;
        img {
          border-radius: 2px; 
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
             @include bg-image('../../assets/img/brand');
             background-size: 30px 18px;
             background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support {
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              @include bg-image('../../assets/img/decrease_1');
            }
            &.discont {
              @include bg-image('../../assets/img/discount_1');
            }
            &.guarantee {
              @include bg-image('../../assets/img/guarantee_1');
            }
            &.invoice {
               @include bg-image('../../assets/img/invoice_1');
            }
            &.special {
               @include bg-image('../../assets/img/special_1');
            }
          }
          .text {
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding: 0 8px;
        height: 23px;
        line-height: 24px;
        border-radius: 14px; 
        background: rgba(0,0,0,0.2);
        text-align: center;
        .count {
          font-size: 10px;
        }
        .fa-chevron-right {
          font-size: 10px;
          margin-left: 5px;
        }
      }
    }
  }
</style>