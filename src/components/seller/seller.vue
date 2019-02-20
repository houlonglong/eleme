<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title"> {{seller.name }}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="fa fa-heart favorite-icon"
          :class="{active: favorite}"
          aria-hidden="true"></span>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin border-1px">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">
            {{ seller.bulletin}}
          </p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[seller.supports[index].type]">
            </span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic,key) in seller.pics" :key="key">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(item,index) in seller.infos" :key="index">{{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import star from 'components/star/star';
import split from 'components/split/split';
import { savaTolocal, loadFromlocal } from 'common/js/store';
import BScroll from 'better-scroll';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classMap: ['decrease', 'discont', 'guarantee', 'invoice', 'special'],
      favorite: (() => {
        return loadFromlocal(this.seller.id, 'favorite', false);
      })()

    };
  },
  mounted () {
    this._initScroll();
    this._initPics();
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  methods: {
    _initScroll () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    },
    _initPics () {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length;
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picScroll.refresh();
          }
        });
      }
    },
    toggleFavorite (event) {
      if (event._constructed) {
        this.favorite = !this.favorite;
        savaTolocal(this.seller.id, 'favorite', this.favorite);
      }
    }
  },
  components: {
    star,
    split
  },
  watch: {
    seller () {
      this._initScroll();
      this._initPics();
    }
  }
};
</script>

<style lang="scss" scoped>
  @import 'common/scss/mxin.scss';
  .seller {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview {
      position: relative;
      padding: 18px;
      .titile {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-size: 14px;
      }
      .desc {
        padding-top: 10px;
        padding-bottom: 18px;
        font-size: 0;
        @include border-1px(rgba(7,17,27,0.1));
        .star {
          display: inline-block;
          margin-right: 8px;
          vertical-align: top
        }
        .text {
          display: inline-block;
          margin-right: 12px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77,80,93);
          line-height: 18px;
        }
      }
      .remark {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,0.1);
          &:last-child {
             border-right: none
          }
          h2 {
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(8, 26, 26);
          }
          .content {
            font-size:10px;
            line-height: 24px;
            color: rgb(7, 17, 27);
            .stress {
              font-size: 24px;
            }
          }
        }
      }
      .favorite {
        position: absolute;
        top: 18px;
        right: 5px;
        width: 50px;
        text-align: center;
        .favorite-icon {
          display: block;
          margin-bottom: 4px;
          color: rgb(212, 214, 217);
          line-height: 24px;
          font-size: 24px;
          &.active {
            color: rgb(240, 20, 20);
          }
        }
        .text {
          color: rgb(77, 85, 93);
          line-height: 10px;
          font-size: 10px;
        }
      }
    }
    .bulletin {
      padding: 18px 18px 0 18px;
      .title {
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-size: 14px;
      }
      .content-wrapper {
        padding: 0 12px 16px 12px;
        .content {
          line-height: 24px;
          font-size: 12px;
          color: rgb(240,20,20)
        }
      }
      .supports {
          .support-item {
            padding: 16px 12px;
            @include border-1px(rgba(7,17,27,0.1));
            font-size: 0;
            &:last-child {
               @include border-none()
            }
            .icon {
              display: inline-block;
              width: 12px;
              height: 12px;
              margin-right: 4px;
              background-size: 12px 12px;
              background-repeat: no-repeat;
              vertical-align: top;
              &.decrease {
                @include bg-image('../../assets/img/decrease_2');
              }
              &.discont {
                @include bg-image('../../assets/img/discount_4');
              }
              &.guarantee {
                @include bg-image('../../assets/img/guarantee_4');
              }
              &.invoice {
                @include bg-image('../../assets/img/invoice_4');
              }
              &.special {
                @include bg-image('../../assets/img/special_4');
              }
            }
          }
          .text {
            line-height: 16px;
            font-size: 12px;
            color: rgb(7, 17, 27)
          }
        }
    }
    .pics {
      padding: 18px;
      .title {
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-size: 14px;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list {
          font-size: 0;
          .pic-item {
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child {
              margin: 0;
            }
          }
        }
      }
    }
    .info {
      padding: 18px 18px 0 18px;
      .title {
        padding-bottom: 12px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-size: 14px;
        @include border-1px(rgba(7,17,27,0.1));
      }
      .info-item {
        padding: 16px 12px;
        color: rgb(7,17,27);
        line-height: 16px;
        font-size: 12px;
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child {
          border-right: none
        }
    }
  }
}
</style>
