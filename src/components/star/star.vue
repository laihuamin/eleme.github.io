<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let intengr = Math.floor(score);
        for (let i = 0; i < intengr; i++) {
           result.push(CLS_ON);
        }
        if (score % 1 !== 0) {
           result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minx.styl"
  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        background-size 20px 20px
        margin-right 22px
        &:last-chlid
          margin-right 0
        &.on
          bg-image(star48_on)
        &.off
          bg-image(star48_off)
        &.half
          bg-image(star48_half)
    &.star-36
      .star-item
        width 15px
        height 15px
        background-size 15px 15px
        margin-right 6px
        &:last-chlid
          margin-right 0
        &.on
          bg-image(star36_on)
        &.off
          bg-image(star36_off)
        &.half
          bg-image(star36_half)

    &.star-24
      .star-item
        width 10px
        height 10px
        background-size 10px 10px
        margin-right 3px
        &:last-chlid
          margin-right 0
        &.on
          bg-image(star24_on)
        &.off
          bg-image(star24_off)
        &.half
          bg-image(star24_half)
</style>
