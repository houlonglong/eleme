<template>
  <div>
    <section class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key=index class="menu-item"
          :class="{'current': currenIndex === index}"
          @click="selectMenu(index, $event)"
          ref="menuList">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <div class="food-warapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item, index) in goods" :key=index class="food-list food-list-hook">
            <h1 class="title">{{ item.name }}</h1>
            <ul>
              <li @click="selectFood(item,$event)" v-for="(item, index) in item.foods" :key=index class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="item.icon" alt="">
                </div>
                <div class="content">
                    <h2 class="name">{{ item.name }}</h2>
                    <p class="description">{{ item.description }}
                    </p>
                    <div class="extra">
                      <span class="count">月货 {{ item.sellCount }}</span>
                      <span>好评率 {{ item.rating }}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{ item.price }} </span>
                      <span class="old" v-show="item.oldPrice">￥ {{ item.oldPrice }}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol
                      @add="addFood"
                      :food="item"></cartcontrol>
                    </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <shop-cart
    ref="shopcart"
    :delivery-price="seller.deliveryPrice"
    :min-price="seller.minPrice" :select-foods="selectFoods"></shop-cart>
    <food :food="selectedFood" ref="food" @add="addFood"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopCart from '../shopCart/shopCart';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food';

import API from '../../API/';

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      classMap: ['decrease', 'discont', 'guarantee', 'invoice', 'special'],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  components: {
    cartcontrol,
    shopCart,
    food
  },
  created () {
    API.shop.getGoods().then(res => {
      this.goods = res.data.data;
      this.$nextTick(() => {
        this.__initScorll();
        this.__calulateHeight();
      });
    });
  },
  computed: {
    currenIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          this.__followScroll(i);
          return i;
        }
      }
      return 0;
    },
    selectFoods () {
      let foods = [];
      this.goods.forEach((goods) => {
        goods.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    __initScorll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        if (pos.y < 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    __calulateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(0);

      Array.from(foodList).forEach(element => {
        height += element.clientHeight;
        this.listHeight.push(height);
      });
    },
    selectMenu (index, event) {
      if (event._constructed) {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 200);
      }
    },
    _drop (target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    addFood (target) {
      this.$nextTick(() => {
        this._drop(target);
      });
    },
    __followScroll (index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.meunScroll.scrollToElement(el, 300, 0, -100);
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/mxin.scss';
  .goods {
    position: absolute;
    top: 173px;
    bottom: 46px;
    display: flex;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      ul {
        .menu-item {
          display: table;
          padding: 0 12px;
          width: 56px;
          height: 54px;
          line-height: 14px;
          &.current {
            position: relative;
            z-index: 0;
            margin-top: -1px;
            background: #fff;
            font-weight: 700;
            .text {
               @include border-none()
            }
          }
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            &.decrease {
              @include bg-image('../../assets/img/decrease_3');
            }
            &.discont {
              @include bg-image('../../assets/img/discount_3');
            }
            &.guarantee {
              @include bg-image('../../assets/img/guarantee_3');
            }
            &.invoice {
               @include bg-image('../../assets/img/invoice_3');
            }
            &.special {
               @include bg-image('../../assets/img/special_3');
            }
          }
          .text {
            display: table-cell;
            width: 56px;
            font-size: 12px;
            vertical-align: middle;
            @include border-1px(rgba(7,17,27,0.1));
          }
        }
      }
    }
    .food-warapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child {
          @include border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27)
          }
          .description, .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .description {
            margin-bottom: 8px;
            line-height: 14px;
          }

          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 18px;
              font-size: 14px;
              color: rgb(240, 20, 20);;
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 5px;
          }
        }
      }
    }
  }
</style>
