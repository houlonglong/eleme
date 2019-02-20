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
        <div v-if="seller.supports"
        class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]" >{</span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count"   @click="showDetail">
        <span class="count"> {{ seller.supports.length }}个</span>
        <i class="fa fa-chevron-right"></i>
      </div>

    </div>
    <div class="bulletin-wrapper" @click="showDetail">
       <span class="title"></span>
       <span class="bulletin-text">{{ seller.bulletin }}</span>
       <i class="fa fa-chevron-right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
      <transition name="fade">
        <div class="detail" v-show="detailShow">
          <div class="detail-wrap clearfix">
            <div class="detail-main">
              <h1 class="name">{{ seller.name }}</h1>
              <div class="star-wrap">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul class="supports" v-if="seller.supports">
                <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                  <span class="icon" :class="classMap[seller.supports[index].type]">
                  </span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                  <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="hideDatail">
            <i class="fa fa-times"  aria-hidden="true" ></i>
          </div>
      </div>
      </transition>
  </div>
</template>

<script>
import star from 'components/star/star';

export default {
  data () {
    return {
      classMap: ['decrease', 'discont', 'guarantee', 'invoice', 'special'],
      detailShow: false
    };
  },
  components: {
    star
  },
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },

    hideDatail () {
      this.detailShow = false;
    }
  }
};
</script>

<style lang='scss' scoped>

@import 'common/scss/mxin.scss';

  .header {
    position: relative;
    color: #ffffff;
    background: rgba(7,17,27,0.5);
    overflow: hidden;
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
    .bulletin-wrapper {
      position: relative;
      padding: 0 22px 0 12px;
      height: 28px;
      background: rgba(7,17,27,0.2);
      line-height: 28px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .title {
        display: inline-block;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        vertical-align: top;
        @include bg-image('../../assets/img/bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text {
        margin: 0 4px;
        font-size: 10px;
        font-weight: 200;
        vertical-align: top;
      }
      i {
        position: absolute;
        top: 8px;
        right: 12px;
        font-size: 10px;
      }
    }
    .background {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 100%;
      opacity: 1;
      background: rgba(7,17,27,0.8);
      backdrop-filter: blur(10px);
      overflow: auto;
      &.fade-enter-active, &.fade-leave-active {
        transition: all 0.5s; // 定义平移的过渡效果
      }
      &.fade-enter,&.fade-leave-active {
        background: rgba(7,17,27,0);
        opacity: 0;
      }
      .detail-wrap {
        width: 100%;
        min-height: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            font-size: 16px;
            font-weight: 700;
            line-height: 16px;
            text-align: center;
          }
          .star-wrap {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;
            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .text {
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
            }
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px;
                background-repeat: no-repeat;
                &.decrease {
                  @include bg-image('../../assets/img/decrease_2');
                }
                &.discont {
                  @include bg-image('../../assets/img/discount_2');
                }
                &.guarantee {
                  @include bg-image('../../assets/img/guarantee_2');
                }
                &.invoice {
                  @include bg-image('../../assets/img/invoice_2');
                }
                &.special {
                  @include bg-image('../../assets/img/special_1');
                }
              }
              .text {
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
          .bulletin {
            margin: 0 auto;
            width: 80%;
              .content {
                padding: 0 12px;
                font-size: 12px;
                line-height: 24px;
              }
          }
        }
      }
      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }
</style>
