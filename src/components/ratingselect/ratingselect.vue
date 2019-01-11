<template>
  <div class="raringselect">
    <div class="rating-type border-1px">
      <span>{{desc.all}}</span>
      <span>{{desc.positive}}</span>
      <span>{{desc.negative}}</span>
    </div>
    <div class="switch">
      <i class="fa fa-check-circle" aria-hidden="true"></i>
      <span>只有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0; 
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    rating: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'common/scss/mxin.scss';
.raringselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    @include border-1px(rgba(7,17,27,0.1));
  }
}
</style>