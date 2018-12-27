<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i  class="fa fa-shopping-cart" aria-hidden="true">
            </i>
          </div>
      </div>
      <div class="price">
            ￥ 435
          </div>
          <div class="desc">配送价</div>
        </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script>
  export default {
    
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
            i {
              font-size: 24px;
              line-height: 44px;
              color: #80858a;

            }
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
          color:  rgba(255,255,255,0.4);
          
        }
        .desc {
          display: inline-block;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;

      }
    }
  }
</style>