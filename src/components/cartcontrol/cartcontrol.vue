<template>
  <div class="cartcontrol">
    <transition name="move">
      <div v-show="food.count > 0" class="cart-decrease" aria-hidden="true" @click="decrease">
        <span class="inner fa fa-minus-circle"></span>
      </div>
    </transition>
    <div class="cart-cout"  v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add fa fa-plus-circle" aria-hidden="true" @click="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object,
    }
  },
  created() {
    console.log(this.food)
  },
  methods: {
    addCart(event,) {
      if(!event._constructed) {
        return 
      } else if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
         this.food.count ++;
      }
    },
    decrease(evnet) {
      if(!event._constructed) {
        return 
      } else {
         this.food.count --;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s linear
    }
    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      .inner {
          transform: rotate(180deg);
      }
    }
    .inner {
      display: inline-block;
      font-size: 18px;
      line-height: 24px;
      color: rgb(0,160,220);
      transition: all 0.4s linear;
      transform: rotate(0)
    }
    
  }
  .cart-cout {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    font-size: 18px;
    line-height: 24px;
    color: rgb(0,160,220)
  }
}
</style>