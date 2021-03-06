<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">
              月售 {{ food.sellCount }}
            </span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{ food.price }}</span>
            <span class="old" v-show="food.oldPrice">原价 {{ food.oldPrice }}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy"  v-show="!food.count || food.count===0"
          @click.stop.prevent="addFirst">加入购物车  </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{ food.info }}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">
            商品评价
          </h1>
          <ratingselect
          :select-type="selectType"
          :only-content="onlyContent"
          :desc="desc"
          :ratings="food.ratings"
          @select="selectRating"
          @toogle="toggleContent"
          ></ratingselect>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length">
              <li v-show=needShow(rating.rateType,rating.text) class="rating-item border-1px" v-for="(rating, index) in food.ratings" :key="index">
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                   <img class="avatar" widht="12" height="12" :src="rating.avatar"/>
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                  <div class="text">
                    <span></span>
                    <span class="fa" aria-hidden="true"
                    :class="{
                      'fa-thumbs-up': rating.rateType === 0 ,
                      'fa-thumbs-down': rating.rateType === 1
                      }">
                    </span>
                    {{ rating.text }}
                  </div>
              </li>
            </ul>
            <div class="no-rating" v-else>
              暂无评价
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import { formatDate } from '../../common/js/date';

import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';

const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      selectType: POSITIVE,
      onlyContent: false,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '吐槽'
      }
    };
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  methods: {
    selectRating (type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent (onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    show () {
      this.showFlag = true;
      this.selectType = POSITIVE;
      this.onlyContent = false;
      this.$nextTick(() => {
        if (!this.scroll) {
          const $food = this.$refs.food;
          this.scroll = new BScroll($food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide () {
      this.showFlag = false;
    },
    addFood (target) {
      this.$emit('add', target);
    },
    addFirst (event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
      this.$emit('add', event.target);
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate (time) {
      let data = new Date(time);
      return formatDate(data, 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>

<style lang="scss" scoped>
  @import 'common/scss/mxin.scss';
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
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        i {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
      .content {
        position: relative;
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27)
        }
        .detail {
          margin-bottom: 18px;
          height: 10px;
          font-size: 0;
          .sell-count, .rating {
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .sell-count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240,20,20)
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .buy {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background: rgb(0, 160, 220);
          opacity: 1
        }
        &.fade-enter-active, &.fade-leave-active{
            transition: all 0.2s
        }
        &.fade-enter, &.fade-leave-active {
          opacity: 0;
          z-index: -1
        }
      }
      .info {
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgb(7,17,27)
        }
        .text {
          line-height: 24px;
          padding: 0 8px;
          font-size: 12px;
          color: rgb(77,85,93)
        }
      }
      .rating {
        padding: 18px 0 0 0;
        .title {
          line-height: 14px;
          margin-left: 18px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .rating-wrapper {
          padding: 0 18px;
        }
        .rating-item {
          position: relative;
          padding: 16px 0;
          @include border-1px(rgba(7,17,27,0.1));
          color: rgb(147,153,159);
          .user {
            position: absolute;
            right: 0;
            line-height: 12px;
            font-size: 0;
            .name {
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
              font-size: 10px;
            }
            .avatar {
              border-radius: 50%;
            }
          }
          .time {
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
          }
          .text {
            color: rgb(7,17,27);
            font-size: 12px;
            line-height: 16px;
            .fa-thumbs-up,.fa-thumbs-down {
              line-height: 16px;
              margin-right: 4px;
              font-size: 12px;
            }
            .fa-thumbs-up {
              color: rgb(0, 160, 220);
            }
            .fa-thumbs-down {
              color:rgb(147, 153, 159);
            }
          }
        }
        .no-rating {
          padding: 16px 0;
          color: rgb(147,153,159)
        }
      }
  }
</style>
