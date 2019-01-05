<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight' : totalCount > 0}">
            <i  class="fa fa-shopping-cart" aria-hidden="true" :class="{'highlight' : totalCount > 0}">
            </i>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'highlight' : totalCount > 0}">
            ￥ {{totalPrice}}
          </div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop">
        <div v-for="(ball, index) in balls" :key=index v-show="balls.show" class="ball">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [ ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
        ]
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach( (food) => {
          total += food.price * food.count;
        })
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach( (food) => {
          count += food.count;
        })
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        }
        else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`;
        }
        else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import 'common/scss/mxin.scss';
  .shopcart {
    z-index: 5;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255,255,255,0.4);
      .content-left {
        flex: 1;
        .logo-wrapper {
          position: relative;
          top: -10px;
          display: inline-block;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          background: #141d27;
          border-radius: 50%;
          box-sizing: border-box;
          vertical-align: top;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #24343c;
            text-align: center;
            &.highlight {
              background: rgb(0,160,220)
            }
            i {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;
              &.highlight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight:700;
            color: #fff;
            background: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgb(0,0,0);
          }
        }
        .price {
          display: inline-block;
          margin-top: 12px;
          padding-right: 12px; 
          font-size: 16px;
          font-weight: 700;
          box-sizing: border-box;
          border-right: 1px solid rgba(255,255,255,0.1);
          line-height: 24px;
          vertical-align: top;
          color: rgba(255,255,255,0.4);
          &.highlight {
              color: #fff;
            }
        }
        .desc {
          display: inline-block;
          vertical-align: top;
          line-height: 24px;
          margin: 12px 0 0 12px;
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          text-align: center;
          font-weight: 700;
          background: #2b333b;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container {
      .ball {
        
      }
    }
  }
</style>