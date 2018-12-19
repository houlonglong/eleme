<template>
  <div class="star" :class="statType">
    <span v-for="(star,index) in stars" :key="index" :class="star" class="star-item"></span>
  </div>
</template>

<script>
  const STARLENGTH = 5;
  const CLS_ON     = 'on';
  const CLS_HALF   = 'half';
  const CLS_OFF    = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      statType() {
        return `star-${this.size}`
      },
      stars() {
        let result = [];
        let score  = Math.floor(this.score * 2) / 2;
        let HasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);

        for(let i=0; i<integer; i++) {
          result.push(CLS_ON)
        }
        if(HasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < STARLENGTH) {
          result.push(CLS_OFF)
        }
        return result;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'common/scss/mxin.scss';
  .star {
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
         @include bg-image('../../assets/img/star48_on')
        }
        &.half {
          @include bg-image('../../assets/img/star48_half')
        }
        &.off {
          @include bg-image('../../assets/img/star48_off')
        }
      }
    }
    &.star-36{
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 16px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
         @include bg-image('../../assets/img/star36_on')
        }
        &.half {
          @include bg-image('../../assets/img/star36_half')
        }
        &.off {
          @include bg-image('../../assets/img/star36_off')
        }
      }
    }
    &.star-24{
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
         @include bg-image('../../assets/img/star24_on')
        }
        &.half {
          @include bg-image('../../assets/img/star24_half')
        }
        &.off {
          @include bg-image('../../assets/img/star24_off')
        }
      }
    }
    
  }
</style>