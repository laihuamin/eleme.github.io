<template>
  <div class="ratingselect">
    <div class="button-group">
      <span class="total" :class="{'active':this.select === 2}" @click="selecttype(2, $event)" v-on:click="pushtype">{{desc.all}}<span class="total-num">{{rating.length}}</span></span>
    <span class="satisfy" :class="{'active':this.select === 0}" @click="selecttype(0, $event)" v-on:click="pushtype">{{desc.positive}}<span class="satisfy-num">{{satisfy}}</span></span>
      <span class="unsatisfy" :class="{'active':this.select === 1}" @click="selecttype(1, $event)"v-on:click="pushtype">{{desc.nagetive}}<span class="unsatisfy-num">{{unsatisfy}}</span></span>
    </div>
    <p class="switch"><i class="icon-check_circle icon" :class="{'onlycon':this.onlycontent === true}" @click="switchCon($event)" v-on:click="pushcontent"></i><span class="text">只能看见有评价的内容</span></p>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  const POSITIVE = 0;
  const NAGETIVE = 1;
export default{
  props: {
    rating: {
      type: Array,
      default () {
        return [];
      }
    },
//    select: {
//      type: Number,
//      default: ALL
//    },
//    onlycontent: {
//      type: Boolean
//    },
    desc: {
      type: Object,
      default: {
        all: '全部',
        positive: '满意',
        nagetive: '不满意'
      }
    }
  },
  data () {
    return {
      select: ALL,
      onlycontent: false
    };
  },
  computed: {
    unsatisfy: function () {
      let num = 0;
      for (let i = 0; i < this.rating.length; i++) {
        if (this.rating[i].rateType === 1) {
           num++;
        }
      }
      return num;
    },
    satisfy: function () {
      let num = 0;
      for (let i = 0; i < this.rating.length; i++) {
        if (this.rating[i].rateType === 0) {
          num++;
        }
      }
      return num;
    }
  },
  methods: {
    selecttype (type, event) {
      if (!event._constructed) {
        return;
      }
      this.select = type;
    },
    pushtype: function () {
      this.$emit('pushtype', this.select);
    },
    pushcontent: function () {
      this.$emit('pushcontent', this.onlycontent);
    },
    switchCon (event) {
      if (!event._constructed) {
        return;
      }
      this.onlycontent = !this.onlycontent;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minx.styl"
.ratingselect{
  padding  18px 18px 0px 18px
  font-size 0
  border-1px(rgba(7,17,27,0.2))
  .button-group{
    padding-bottom 18px
    border-1px(rgba(7,17,27,0.2))
    .total{
      display inline-block
      font-size 12px
      color white
      line-height 16px
      padding 8px 12px
      background-color rgba(0,160,220,0.2)
      border none
      border-radius 2px
      &.active{
        background-color rgb(0,160,220)
      }
      .total-num{
        font-size 8px
      }
    }
    .satisfy{
      display inline-block
      font-size 12px
      color white
      line-height 16px
      padding 8px 12px
      margin-left 8px
      background-color rgba(0,160,220,0.2)
      border none
      border-radius 2px
      &.active{
        background-color rgb(0,160,220)
      }
      .satisfy-num{
        font-size 8px
      }
    }
    .unsatisfy{
      display inline-block
      font-size 12px
      color white
      line-height 16px
      padding 8px 12px
      margin-left 8px
      background-color rgba(77,85,93,0.2)
      border none
      border-radius 2px
      &.active{
        background-color rgb(77,85,93)
      }
      .unsatisfy-num{
        font-size 8px
      }
    }
  }
  .switch{
    padding  12px 0
    font-size 0

    .icon{
      display inline-block
      margin-right 4px
      line-height 24px
      font-size 24px
      color rgb(147,153,159)
      vertical-align middle
      &.onlycon{
        color rgb(0,160,220)
      }
    }
    .text{
      display inline-block
      font-size 12px
      line-height 24px
      color rgb(147,153,159)
      vertical-align middle
    }
  }
}
</style>
