<template>
<div class="num-count">
  <i class="icon-remove_circle_outline" v-show="food.count>0" @click="removeCount($event)" v-on:click="pushCount"></i>
  <span class="count" v-show="food.count>0">{{food.count}}</span>
  <i class="icon-add_circle" @click="addCount($event)" v-on:click="pushCount"></i>
</div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
export default {
 props: {
   food: {
     type: Object
   }
 },
  methods: {
    addCount (event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    removeCount (event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    },
    pushCount: function () {
     this.$emit('transferCount', this.food.count);
    }
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
.num-count{
  font-size 0
  .icon-remove_circle_outline{
    display inline-block
    vertical-align bottom
    font-size 24px
    line-height 24px
    color rgb(0,160,220)
  }
  .count{
    display inline-block
    vertical-align bottom
    font-size 10px
    line-height 24px
    color rgb(147,153,159)
    margin-left 12px
  }
  .icon-add_circle{
    display inline-block
    vertical-align bottom
    font-size 24px
    line-height 24px
    color rgb(0,160,220)
    margin-left 12px
  }
}
</style>
