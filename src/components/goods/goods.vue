<template>
<div class="goods">
  <div class="goods-wrap">
    <div class="menu-wrap" ref="menuWrap">
      <ul  class="menu">
        <li class="menu-item" v-for="(item,index) in goods" :class="{'cuerrent':cuerrentIndex === index}" @click="setscroll(index,$event)">
          <span class="text"><span class="icon" :class="classMap[item.type]" v-show="item.type > 0"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul>
        <li v-for="item in goods" class="foodHook">
          <h1 class="title" ><span class="line"></span><span class="text">{{item.name}}</span></h1>
          <ul>
            <li v-for="(food, index) in item.foods" class="foods">
              <img :src="food.icon" class="food-pic">
              <div class="content">
                <h1 class="name">{{food.name}}</h1>
                <p class="description" >{{food.description}}</p>
                <p class="food-sellCount"><span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}</span></p>
                <p class="food-price"><span class="price"><span class="brand">￥</span>{{food.price}}</span><span class="oldPrice" v-show="food.oldPrice"><span class="brand">￥</span>{{food.oldPrice}}</span></p>
                <numCount :food.sync="food" class="num-count"></numCount>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <shopcart :selectfood="selectfood" :deliveryprice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
</div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import numCount from '../numCount/numCount.vue';
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  created () {
    let _this = this;
    this.$http.get('/api/goods').then(response => {
      _this.goods = response.body.data;
      this.$nextTick(function () {
        _this._initScroll();
        _this._caculateHeight();
      });
    }, response => {});
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  computed: {
    cuerrentIndex () {
      for (var i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectfood () {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrap, {click: true});
      this.foodsScroll = new BScroll(this.$refs.foodsWrap, {
        click: true,
        probeType: 3});
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
//    getCount (index, msg) {
//      this.foods.count[index] = msg;
//    },
    _caculateHeight () {
      let height = 0;
      let foodList = this.$refs.foodsWrap.getElementsByClassName('foodHook');
      this.listHeight.push(height);
      for (var i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
       this.listHeight.push(height);
      }
    },
    setscroll (index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrap.getElementsByClassName('foodHook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    }
  },
  components: {
    shopcart: shopcart,
    numCount: numCount
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minx.styl"
  .goods-wrap
    display flex
    position absolute
    top 174px
    width 100%
    bottom 58px
    overflow hidden
    .menu-wrap
      flex 0 0 80px
      color rbg(240,20,20)
      background #f3f5f7
      width 80px
      .menu
        overflow hidden
        .menu-item
          width 56px
          height 54px
          display table
          padding 0 12px
          .text
            display table-cell
            vertical-align middle
            font-weight 200
            font-size 12px
            line-height 14px
            font-family "方正兰亭细黑_GBK_M"
            border-1px(rgba(7,17,27,0.1))
            .icon
              display inline-block
              width 12px
              height 12px
              background-size 12px 12px
              background-repeat no-repeat
              margin-left 2px
              vertical-align top
              &.decrease
                bg-image(decrease_3)
              &.discount
                bg-image(discount_3)
              &.guarantee
                bg-image(guarantee_3)
              &.invoice
                bg-image(invoice_3)
              &.special
                bg-image(special_3)
          &.cuerrent
            background-color white
            .text
              font-weight 700
    .foods-wrap
      flex 1
      .title
        height 26px
        background #f3f5f7
        font-size 0
        .line
          display inline-block
          vertical-align middle
          height 26px
          background #d9dde1
          width 2px
        .text
          display inline-block
          vertical-align middle
          font-size 12px
          color rgb(147,153,159)
          line-height 26px
          margin-left 28px
      .foods
        margin 0 18px
        padding 18px 0
        display flex
        border-1px(rgba(7,17,27,0.1))
        .food-pic
          flex 0 0 57px
          width 57px
          height 57px
        .content
          flex 1
          margin-left 10px
          position relative
          .name
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
            margin 2px 0 8px 0
          .description
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            margin-bottom 8px
          .food-sellCount
            margin-bottom 8px
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
            .rating
              margin-left 12px
          .food-price
            .price
              color red
              font-size 14px
              line-height 14px
              font-weight 700
              .brand
                color red
                font-size 10px
                line-height 10px
                font-weight normal
            .oldPrice
              margin-left 8px
              color rgb(147,153,159)
              font-size 10px
              line-height 10px
              font-weight 700
              text-decoration line-through
              .brand
               color rgb(147,153,159)
               font-size 10px
               line-height 10px
               font-weight normal
          .num-count
            position absolute
            right 18px
            bottom 0

</style>
