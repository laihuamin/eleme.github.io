<template>
  <div class="seller">
    <div class="seller-wrap" ref="contentWrap">
      <div class="content-wrap">
        <div class="header">
          <div class="header-top">
            <div class="title">
              <div class="name">{{this.seller.name}}</div>
              <div class="rating">
                <star :size="36" :score="seller.score" class="star"></star>
                <div class="sellCount">月售{{seller.sellCount}}单</div>
              </div>
            </div>
            <div class="favorite">
              <i class="icon-favorite icon" :class="{'like':this.favorite === true}" @click="change($event)"></i>
              <span class="text" v-show="this.favorite">已收藏</span>
              <span class="text" v-show="!this.favorite">未收藏</span>
            </div>
          </div>
          <div class="header-bottom">
            <div class="minPrice">
              <p class="title-name">起送价</p>
              <p class="title-text"><span class="text-con">{{seller.minPrice}}</span><span class="text-text">元</span></p>
            </div>
            <div class="deliveryPrice">
              <p class="title-name">商家配送</p>
              <p class="title-text"><span class="text-con">{{seller.deliveryPrice}}</span><span class="text-text">元</span></p>
            </div>
            <div class="deliveryTime">
              <p class="title-name">平均配送时间</p>
              <p class="title-text"><span class="text-con">{{seller.deliveryTime}}</span><span class="text-text">分钟</span></p>
            </div>
          </div>
        </div>
        <split></split>
        <div class="top">
          <h1 class="top-title">公告与活动</h1>
          <div class="top-content">{{seller.bulletin}}</div>
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <span class="support-icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="support-text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="middle">
          <div class="middle-title">商家实景</div>
          <div ref="picWrap">
            <ul class="pics" v-if="seller.pics" ref="picsList">
              <li v-for="(pic,index) in seller.pics" class="pics-item" ref="li">
                <img :src="seller.pics[index]" class="picture"/>
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="bottom">
          <div class="bottom-title">商家信息</div>
          <ul class="infos" v-if="seller.infos">
            <li v-for="(info,index) in seller.infos" class="infos-item">
              <span class="infos-text">{{seller.infos[index]}}</span>
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
  import split from '../split/split.vue';
  import star from '../star/star.vue';
  import BScroll from 'better-scroll';
 export default{
   props: {
     seller: {
       type: Object
     }
   },
   data () {
     return {
       favorite: false
     };
   },
   created () {
     let _this = this;
     this.$http.get().then(() => {
       this.$nextTick(() => {
         this.contentScroll = new BScroll(this.$refs.contentWrap, {click: true});
         this.contentScroll.refresh();
         this.ulwidth();
         this.$nextTick(() => {
           _this.picScroll = new BScroll(this.$refs.picWrap, {
             click: true,
             scrollX: true,
             bounce: true
           });
         });
       });
     });
     this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
   },
   methods: {
     ulwidth () {
       let li = this.$refs.li;
       let liWidth = li[0].offsetWidth + 6;
       this.$refs.picsList.style.width = liWidth * li.length + 'px';
     },
     change (event) {
       if (!event._constructed) {
         return;
       }
       this.favorite = !this.favorite;
     }
   },
   components: {
     shopcart: shopcart,
     split: split,
     star: star
   }
 };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minx.styl"
.seller-wrap{
  position absolute
  top 174px
  bottom 48px
  left 0
  overflow hidden
  width 100%
  background-color white
  .content-wrap {
    .header {
      padding 18px
      border-1px(rgba(7,17,27,0.1))
      .header-top {
        display flex
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        .title{
          flex 1
          .name{
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
          }
          .rating{
            display flex
            .star{
              flex 1
            }
            .sellCount{
              flex 1
              font-size 10px
              line-height 18px
              color rgb(77,85,93)
            }
          }
        }
        .favorite {
          flex 0 0 40px
          width 40px
          text-align center
          .icon {
            display block
            font-size 24px
            line-height 24px
            color rgb(147,153,159)
          }
          .like{
            color rgb(240,20,20)
          }
          .text {
            display block
            font-size 10px
            line-height 10px
            color rgb(77, 85, 93)
          }
        }
      }

      .header-bottom{
        display flex
        padding-top 18px
        text-align center
        .minPrice{
          flex 1
          border-right 1px solid rgba(7,17,27,0.1)
        }
        .deliveryPrice{
          flex 1
          border-right 1px solid rgba(7,17,27,0.1)
        }
        .deliveryTime{
          flex 1
        }
        .minPrice,.deliveryPrice,.deliveryTime{
          .title-name{
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
          }
          .title-text{
            margin-top 4px
            .text-con{
              font-size 24px
              line-height 24px
              color rgb(7,17,27)
            }
            .text-text{
              font-size 10px
              line-height 24px
              color rgb(7,17,27)
            }
          }
        }
      }
    }
    .top{
      padding 18px 18px 0 18px
      .top-title{
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      }
      .top-content{
        padding 8px 12px 16px 12px
        font-size 12px
        line-height 24px
        color rgb(240,20,20)
        font-weight 200
        border-1px(rgba(7,17,27,0.1))
      }
      .supports{
        .support-item{
          padding 16px 12px
          border-1px(rgba(7,17,27,0.1))
          .support-icon{
            display inline-block
            width 16px
            height 16px
            background-size 12px 12px
            background-repeat no-repeat
            vertical-align middle
          }
          .decrease{
            bg-image(decrease_4)
          }
          .discount{
            bg-image(discount_4)
          }
          .guarantee{
            bg-image(guarantee_4)
          }
          .invoice{
            bg-image(invoice_4)
          }
          .special{
            bg-image(special_4)
          }
          .support-text{
            margin-left 6px
            font-size 12px
            line-height 16px
            font-weight 200
            color rgb(7,17,27)
          }
        }
      }
    }
    .middle{
      padding 18px
      border-1px(rgba(7,17,27,0.1))
      .middle-title{
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      }
      .pics{
        margin-top 12px
        display flex
        .pics-item{
          flex 1
          margin-left 6px
          .picture{
            width 120px
            height 90px
          }
        }
      }
    }
    .bottom{
      padding 18px
      border-1px(rgba(7,17,27,0.1))
      .bottom-title{
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
        margin-bottom 12px
        border-1px(rgba(7,17,27,0.1))
      }
      .infos{
        .infos-item{
          padding 16px 12px
          border-1px(rgba(7,17,27,0.1))
          .infos-text{
            font-weight 200
            font-size 12px
            line-height 16px
            color rgb(7,17,27)
          }
        }
      }
    }
  }
}
</style>
