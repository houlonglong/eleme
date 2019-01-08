<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food"> 
      <div class="content">
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
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol'
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
  components: {
    cartcontrol
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          const $food = this.$refs.food;
          this.scroll = new BScroll($food, {
            click: true
          })
        }
      })
    },
    hide() {
        this.showFlag = false;
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
    }
  }
</style>