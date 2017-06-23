<template>
  <div>
    <div class="shopcart">
    <transition name="fold">
      <div class="detail" v-show="detailShow">
        <div class="detail-title">
          <span class="detail-shop">购物车</span>
          <span class="detail-clear" @click="empty">清空</span>
        </div>
        <div class="detail-wrap" ref="detailWrap">
          <ul ref="list">
            <li v-for="item in selectfood" class="detail-item" ref="li">
              <span class="name">{{item.name}}</span>
              <span class="price">￥{{item.price}}</span>
              <numCount :food.sync="item" v-on:click="ulHeight()"></numCount>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="content"  @click="show">
      <div class="content-left">
        <div class="logo" >
          <div class="logo-back" :class="{'highLight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></i>
          </div>
        </div>
        <div class="price">￥{{this.totalPrice}}</div>
        <div class="deliveryPrice">另需配送费￥{{deliveryprice}}元</div>
        <div class="totalCount" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="content-right" :class="{'highLight': diff >= 0}">{{surplusPrice}}</div>
    </div>
  </div>
    <transition name="fold"><div class="bg" v-show="detailShow"></div></transition>
  </div>
</template>

<script type="text/ecmascript-6">
import numCount from '../numCount/numCount.vue';
import BScroll from 'better-scroll';
export default {
  props: {
    selectfood: {
      type: Array,
      default () {
        return [];
      }
    },
    deliveryprice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  data () {
    return {
      fold: true
    };
  },
  computed: {
    detailShow () {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
    },
    totalPrice () {
      let totalPrice = 0;
      for (let i = 0; i < this.selectfood.length; i++) {
        totalPrice += this.selectfood[i].price * this.selectfood[i].count;
      }
      return totalPrice;
    },
    totalCount () {
      let totalCount = 0;
      for (let i = 0; i < this.selectfood.length; i++) {
        totalCount += this.selectfood[i].count;
      }
      return totalCount;
    },
    surplusPrice () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return `去结算`;
      }
    },
    diff () {
     return (this.totalPrice - this.minPrice);
    }
  },
  components: {
    numCount: numCount
  },
  methods: {
    show () {
      this.fold = !this.fold;
      if (!this.fold) {
        if (!this.detailScroll) {
          let _this = this;
          this.$nextTick(function () {
            this.ulHeight();
            this.$nextTick(function () {
              _this.detailScroll = new BScroll(this.$refs.detailWrap, {
                click: true
              });
            });
          });
        }
      }
    },
    empty () {
      this.selectfood.forEach((food) => {
        food.count = 0;
      });
    },
    ulHeight () {
      this.$nextTick(function () {
        let li = this.$refs.li;
        let liHeight = li[0].clientHeight;
        this.$refs.list.style.height = liHeight * li.length + 'px';
      });
    }
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minx.styl"
  .shopcart {
  position fixed
  left 0
  bottom 0
  width 100%
  z-index 50
  height 48px
  .content {
    display flex
    width 100%
    .content-left {
      flex 1
      background #141d27
      position relative
      border 0
      font-size 0
      .logo {
        position absolute
        top -10px
        width 58px
        height 58px
        left 12px
        background #141d27
        border-radius 50%
        z-index 50
        .logo-back{
          background-color #2b343c
          width 44px
          height 44px
          border-radius 50%
          position absolute
          top 6px
          left 7px
          &.highLight{
            background-color rgb(0,160,220)
          }
          .icon-shopping_cart {
            font-size 24px
            line-height 24px
            color rgba(255, 255, 255, 0.4)
            position absolute
            top 10px
            left 10px
            &.highLight{
              color white
            }
          }
        }
      }
      .price{
        display inline-block
        font-size 16px
        line-height 24px
        color rgba(255,255,255,0.4)
        font-weight 700px
        padding  0 12px 0 82px
        margin 12px 0
        border-right  1px solid rgba(255,255,255,0.1)
      }
      .deliveryPrice{
        display inline-block
        font-size 12px
        line-height 24px
        color rgba(255,255,255,0.4)
        margin-left 12px
      }
      .totalCount{
        position absolute
        top -10px
        left 44px
        background-color red
        color white
        z-index 99
        padding 0 12px
        font-size 9px
        line-height 16px
        font-weight 700
        border-radius 8px
      }
    }
    .content-right {
      flex 0 0 105px
      background-color #2b333b
      border 0
      font-size 12px
      line-height 48px
      color rgba(255,255,255,0.4)
      font-weight 700
      text-align center
      &.highLight{
        background-color rgb(0,160,220)
        color white
      }
    }
  }
  .detail{
    position absolute
    left 0
    top 0
    z-index -1
    width 100%
    transform translate3d(0,-100%,0)
    .detail-title{
      background-color #f3f5f7
      font-size 0
      padding 0 18px
      display flex
      justify-content space-between
      border-1px(rgba(7,17,27,0.1))
      height 40px
      .detail-shop{
        font-size 14px
        line-height 40px
        font-weight 200
        color rgb(7,17,27)
        left 18px
      }
      .detail-clear{
        font-size 14px
        line-height 40px
        font-weight 200
        color rgb(0,160,220)
        right 18px
      }
    }
    .detail-wrap{
      width 100%
      max-height 217px
      background-color white
      padding-bottom 10px
      overflow hidden
      .detail-item{
        margin 0 18px
        padding 12px 0
        border-1px(rgba(7,17,27,0.1))
        display flex
        .name{
          font-size 14px
          line-height 24px
          color rgb(7,17,27)
          flex 6
        }
        .price{
          flex 1
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          line-height 24px
        }
      }
    }
  }
  .fold-enter-active, .fold-leave-active {
    transition: all .5s;
  }
  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
  }
}
  .bg{
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 10
    background-color rgba(7,17,27,0.8)
    backdrop-filter blur(10px)
    transform translate3d(0,0,0)
  }
  .fold-enter-active, .fold-leave-active {
    transition: all .5s;
  }
  .fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
  }
</style>
