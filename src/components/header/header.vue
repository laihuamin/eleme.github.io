<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar"  width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports" v-if="seller.supports">
          <span class="icon ":class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports-count" v-if="seller.supports" @click="showDetail()">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail()">
      <span class="bulletin"></span><span class="text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
        <div class="detail-wrap clearfix">
           <div class="detail-main">
             <h1 class="detail-title">{{seller.name}}</h1>
             <div class="star-wrapper">
                <star :size="48" :score="seller.score" ></star>
             </div>
             <h1 class="detail-nameone">
               <span class="line"></span>
               <span class="nameone-title">优惠信息</span>
               <span class="line"></span>
             </h1>
             <ul class="supports" v-if="seller.supports">
               <li class="support-item" v-for="(item,index) in seller.supports">
                 <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                 <span class="text">{{seller.supports[index].description}}</span>
               </li>
             </ul>
             <h1 class="detail-nametwo">
               <div class="line"></div>
               <div class="text">商品公告</div>
               <div class="line"></div>
             </h1>
             <p class="detail-text">{{seller.bulletin}}</p>
           </div>
        </div>
        <div class="footer" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';

 export default{
   props: {
     seller: {
       type: Object
     }
   },
   data () {
     return {
       detailShow: false
     };
   },
   methods: {
     showDetail () {
       this.detailShow = true;
     },
     closeDetail () {
       this.detailShow = false;
     }
   },
   created () {
     this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
   },
   components: {
     star: star
   }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minx";

.header
  color: white
  position relative
  .content-wrapper
    background-color rgba(7,17,27,0.5)
    font-size 0
    padding 24px 12px 18px 24px
    position relative
    .avatar
      display inline-block
      vertical-align top
      border-radius 2px
    .content
      display inline-block
      margin-left 16px
      vertical-align top
      .title
        margin 2px 0 8px 0
        font-size 0
        .brand
          width 30px
          height 18px
          display inline-block
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
          vertical-align top
        .name
          font-size 16px
          font-weight bold
          line-height 18px
          vertical-align top
          margin-left 6px
      .description
        font-size 12px
        font-weight 200
        line-height 12px
        margin-bottom 10px
      .supports
        margin-bottom 2px
        font-size 0
        .text
          font-size 10px
          font-weight 200
          line-height 12px
          margin-left 4px
          vertical-align top
        .icon
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          margin-left 2px
          vertical-align top
          &.decrease
            bg-image(decrease_1)
          &.discount
            bg-image(discount_1)
          &.guarantee
            bg-image(guarantee_1)
          &.invoice
            bg-image(invoice_1)
          &.special
            bg-image(special_1)
    .supports-count
      position absolute
      padding 7px 8px
      background-color rgba(0,0,0,0.2)
      border-radius 14px
      right 12px
      bottom 18px
      .count
        font-size 10px
        line-height 12px
        font-weight 200
      .icon-keyboard_arrow_right
        font-size 10px
        margin-left 4px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    color white
    padding  0 22px 0 12px
    background-color rgba(7,17,27,0.2)
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    .bulletin
      display inline-block
      vertical-align top
      margin-top 7px
      width 22px
      height 15px
      bg-image(bulletin)
      background-size 22px 15px
      background-repeat no-repeat
    .text
      font-size 10px
      font-weight 200
      color white
      margin-left 4px
      height 28px
      line-height 28px
    .icon-keyboard_arrow_right
      font-size 10px
      position absolute
      right 12px
      top 9px

  .background
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index -1
    filter blur(10px)
  .detail
    position fixed
    width 100%
    height 100%
    overflow auto
    z-index 100
    top 0
    color white
    background-color rgba(7,17,27,0.8)
    backdrop-filter blur(10px)
    .detail-wrap
      width 100%
      min-height 100%
      .detail-main
        padding-bottom 64px
        margin-top 64px
    .clearfix
      display inline-block
      &:after
        content "."
        display block
        height 0
        clear both
        visibility hidden
        line-height 0
      .detail-title
        text-align center
        font-size 16px
        line-height 16px
        font-weight 700
      .star-wrapper
        text-align center
        margin-top 16px
      .detail-nameone
        text-align center
        font-size 0
        margin-top 28px
        .line
          width 112px
          display inline-block
          height 1px
          background-color rgba(255,255,255,0.2)
          vertical-align middle
        .nameone-title
          display inline-block
          vertical-align middle
          font-size 14px
          font-weight 700
          margin 0 12px
      .supports
        margin 24px 0 0 48px
        font-size 0
        .support-item
          margin-bottom 12px
          .icon
            display inline-block
            width 16px
            height 16px
            background-size 16px 16px
            background-repeat no-repeat
            vertical-align top
            &.decrease
              bg-image(decrease_1)
            &.discount
              bg-image(discount_1)
            &.guarantee
              bg-image(guarantee_1)
            &.invoice
              bg-image(invoice_1)
            &.special
              bg-image(special_1)
          .text
            font-size 12px
            font-weight 200
            line-height 12px
            margin-left 6px
            vertical-align top

      .detail-nametwo
        display flex
        width 80%
        margin 16px auto 24px
        .line
          position relative
          top 7px
          flex 1
          width 112px
          height 1px
          background-color rgba(255,255,255,0.2)
        .text
          font-weight 700
          font-size 14px
          line-height 14px
          margin 0 12px
      .detail-text
        font-size 12px
        line-height 24px
        font-weight 200
        width 279px
        margin 0 auto
    .footer
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
</style>
