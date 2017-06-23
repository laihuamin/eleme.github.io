<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods"  class="item">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings" class="item">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller" class="item" >商家</router-link></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';
//  const ERR_OK = 0;
  export default{
    data () {
      return {
       seller: {}
      };
     },
    created () {
      this.$http.get('/api/seller').then(response => {
          this.seller = response.body.data;
        }, response => {});
    },
    components: {
      'v-header': header
    }

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/minx.styl"
#app
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex 1
      text-align center
      .item
        display block
        font-size 14px
        color rgb(77,85,93)
        &.active
          color rgb(240,20,20)
</style>
