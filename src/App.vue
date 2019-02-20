<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link tag="div" :to="{path: '/goods'}" class="tab-item">商品</router-link>
      <router-link tag="div" :to="{path: '/ratings'}" class="tab-item">评价</router-link>
      <router-link tag="div" :to="{path: '/seller'}" class="tab-item">商家</router-link>
    </div>
       <keep-alive>
          <router-view keep-alive :seller="seller"></router-view>
       </keep-alive>

  </div>
</template>

<script>
import API from './API/index';
import Header from './components/header/header';
import { urlParse } from 'common/js/url';
export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }

    };
  },
  created () {
    this._getSeller();
  },
  methods: {
    _getSeller () {
      API.shop.getSeller(this.seller.id).then(res => {
        this.seller = Object.assign({}, this.seller, res.data.data);
      });
    }
  },
  components: {
    'v-header': Header
  }
};
</script>

<style lang="scss">
@import 'common/scss/mxin.scss';
#app {
  .tab {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7,17,27,0.1));
    .tab-item {
      flex: 1;
      text-align: center;
      color: rgb(77,85,93);
      font-size: 14px;
      &.router-link-exact-active {
        color: rgb(240,20,20)
      }
    }
  }
}
</style>
