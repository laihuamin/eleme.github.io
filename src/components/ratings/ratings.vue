<template>
<div class="rating" >
  <div class="rating-wrap" ref="contentWrap">
    <div class="content-wrap">
      <div class="header">
        <div class="header-left">
          <h1 class="total-name">{{this.seller.score}}</h1>
          <p class="total-rating">综合评分</p>
          <p class="rank-rate">高于周边商家{{this.seller.rankRate}}%</p>
        </div>
        <div class="header-right">
          <div class="score-wrap">
            <span class="text">服务态度</span>
            <star :size="36" :score="this.seller.serviceScore" class="score-star"></star>
            <span class="score">{{this.seller.serviceScore}}</span>
          </div>
          <div class="score-wrap">
            <span class="text">商品评分</span>
            <star :size="36" :score="this.seller.foodScore" class="score-star"></star>
            <span class="score">{{this.seller.foodScore}}</span>
          </div>
          <div class="deliverytime">
            <span class="deliverytime-title">送达时间</span>
            <span class="deliverytime-text">{{this.seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class="content" >
        <ratingselect :rating="rating"  :desc="desc" v-on:pushtype="gettype" v-on:pushcontent="getContent"></ratingselect>
        <!--<div class="title">-->
          <!--<div class="button-group">-->
            <!--<button class="total">全部{{total}}</button>-->
            <!--<button class="satisfy">满意{{satisfy}}</button>-->
            <!--<button class="unsatisfy">不满意{{unsatisfy}}</button>-->
          <!--</div>-->
          <!--<p><i class="icon-check_circle icon"></i>只能看见有评价的内容</p>-->
        <!--</div>-->
        <ul>
          <li v-for="item in rating" class="user" v-show="needShow(item.rateType, item.text)" ref="li">
            <div class="user-rateTime">{{item.rateTime}}</div>
            <img :src="item.avatar" class="user-pic"/>
            <div class="user-content">
              <p class="user-name">{{item.username}}</p>
              <p class="user-ratetype">
                <star :size="24" :score="item.score" class="user-star"></star><span v-if="item.deliveryTime" class="user-deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </p>
              <p class="user-text">{{item.text}}</p>
              <div v-show="item.recommend.length" class="uesr-recommend">
                <i :class="{'icon-thumb_up': item.rateType ===0, 'icon-thumb_down':item.rateType ===1,'iconone': item.rateType ===0,'icontwo': item.rateType ===1}"></i>
                <ul class="recommends">
                 <li v-for="recommend in item.recommend" class="recommend">{{recommend}}</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <shopcart></shopcart>
</div>
</template>

<script type="text/ecmascript-6">
import shopcart from '../shopcart/shopcart.vue';
import star from '../star/star.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import BScroll from 'better-scroll';
const ALL = 2;
export default{
  components: {
    shopcart: shopcart,
    star: star,
    split: split,
    ratingselect: ratingselect
  },
  data () {
    return {
      rating: [],
      seller: {},
      select: ALL,
      onlycontent: false,
      desc: {
        all: '全部',
        positive: '满意',
        nagetive: '不满意'
      }
    };
  },
  created () {
    let _this = this;
    let promise1 = this.$http.get('/api/ratings');
    let promise2 = this.$http.get('/api/seller');
    Promise.all([promise1, promise2]).then(([res1, res2]) => {
      this.rating = res1.body.data;
      this.seller = res2.body.data;
        this.$nextTick(function () {
          this._initScroll();
          if (this._initScroll()) {
            this.contentScroll.refresh();
          }
        });
  }, (res1, res2) => {});
  },
  methods: {
    _initScroll () {
      this.contentScroll = new BScroll(this.$refs.contentWrap, {
        click: true
      });
    },
    gettype: function (data) {
      this.select = data;
    },
    getContent: function (data) {
      this.onlycontent = data;
    },
    needShow (type, text) {
      if (this.onlycontent === true && (!text)) {
          return false;
      }
      if (this.select === ALL) {
          return true;
      } else {
         return type === this.select;
      }
    }
  }
//  computed: {
//    unsatisfy: function () {
//      let num = 0;
//      for (let i = 0; i < this.rating.length; i++) {
//        if (this.rating[i].rateType === 1) {
//           num++;
//        }
//      }
//      return num;
//    },
//    satisfy: function () {
//      let num = 0;
//      for (let i = 0; i < this.rating.length; i++) {
//        if (this.rating[i].rateType === 0) {
//          num++;
//        }
//      }
//      return num;
//    },
//    total: function () {
//      return this.satisfy + this.unsatisfy;
//    }
//  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minx.styl"
.rating-wrap{
  width 100%
  position absolute
  top 174px
  bottom 0
  left 0
  overflow hidden
  background-color #F3F5F7
  .header{
    display flex
    border-1px(rgba(7,17,27,0.2))
    background-color white
    .header-left{
      flex 0 0 120px
      width 120px
      padding 18px 8.5px
      text-align center
      border-right 1px solid rgba(147,153,159,0.2)
      .total-name{
        font-size 24px
        color rgb(255,153,0)
        line-height 28px
        margin-bottom 6px
      }
      .total-rating{
        font-size 12px
        color rgb(7,17,27)
        line-height 12px
        margin-bottom 8px
      }
      .rank-rate{
        font-size 10px
        color rgb(147,153,159)
        line-height 10px
        margin-bottom 6px
      }
    }
    .header-right{
      flex 1
      padding 18px 24px
      .score-wrap{
        display flex
        line-height 18px
        vertical-align middle
        .text{
          font-size 12px
          line-height 18px
          color rgb(7,17,27)
          flex 2
        }
        .score-star{
          flex 4
          margin-left 5px
        }
        .score{
          flex 1
          color rgb(255,153,0)
          font-size 12px
          line-height 18px
        }
      }
      .deliverytime{
        line-height 18px
        vertical-align middle
        font-size 0
        .deliverytime-title{
          font-size 12px
          line-height 18px
          color rgb(7,17,27)
        }
        .deliverytime-text{
          font-size 12px
          line-height 18px
          color rgb(147,153,159)
          margin-left 12px
        }
      }
    }
  }
  .content{
    background-color white
    overflow hidden
    width 100%
    .user{
      margin 0 18px
      padding 18px 0
      display flex
      position relative
      border-1px(rgba(7,17,27,0.2))
      .user-rateTime{
        position absolute
        top 18px
        right 18px
        font-size 10px
        font-weight 200
        line-height 12px
        color rgb(147,153,159)
      }
      .user-pic{
        flex 0 0 28px
        width 28px
        height 28px
        border-radius 50%
      }
      .user-content{
        margin-left 12px
        .user-name{
          font-size 10px
          color rgb(7,17,27)
          line-height 12px
          margin-bottom 4px
        }
        .user-ratetype{
          line-height 12px
          margin-bottom 6px
          .user-star{
            display inline-block
            background transparent
            vertical-align middle
          }
          .user-deliveryTime{
            margin-left 6px
            display inline-block
            font-size 10px
            font-weight 200
            color rgb(147,153,159)
            vertical-align middle
          }
        }
        .user-text{
          font-size 12px
          line-height 18px
          color rgb(7,17,27)
        }
        .uesr-recommend {
          font-size 0
          display flex
          .iconone {
            color rgb(0,160,220)
            font-size 12px
            line-height 16px
            flex 0 0 12px
          }
          .icontwo{
            color rgb(0,160,220)
            font-size 12px
            line-height 16px
            flex 0 0 12px
          }
          .recommends {
            flex 1
            .recommend {
              border-radius 2px
              border 1px solid rgba(7, 17, 27, 0.1)
              padding 0 6px
              margin-left 8px
              font-size 9px
              color rgb(147, 153, 159)
              line-height 16px
              display inline-block
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
            }
          }
        }
      }
    }
  }
}
</style>
