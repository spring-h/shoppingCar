<!--
 * @author: Spring
 * @create: 2021-05-31 16:37 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-31 17:07 PM
 * @desc:
-->
<template>
  <div class="commoditylist">
    <div class="commodity" v-for="(item,index) in arr" :key=index>
      <div class="commodity-i">
        <img :src="item.img" alt="" />
      </div>
      <div class="commodity-info">
        <div class="commodity-info-price">
          ￥<span class="price">{{item.price}}</span>
        </div>
        <div class="commodity-info-title">{{item.desc}}</div>
        <div class="commodity-info-evaluate">
          <span commodity-info-evaluate-num>{{item.evaNum}}</span>条评价
        </div>
        <div class="commodity-info-storename">
          {{item.merchant}}
        </div>
        <div class="commodity-info-add">
          <div class="contrast">
            <input type="checkbox" name="" id="">
            对比
          </div>
          <div class="focus">
            <span class="iconfont icon-02"></span>
            关注
          </div>
          <div class="shopcar bindshopcar" @click="addgoods(item)" :only="item.goodsID" >
            <span class="iconfont icon-gouwuche2"></span>  加入购物车
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["arr"],
  data() {
    return {}
  },
  methods: {
    addgoods(item) {
      this.$emit("addshopcar", item)
    },
  },
}
</script>
<style lang="scss">
  // flex 函数
@mixin flex($jc: center, $ai: center, $fd: row) {
  display: flex;
  justify-content: $jc;
  align-items: $ai;
  flex-direction: $fd;
}
// grid  函数
@mixin grid($cloumns, $rows, $gip: 0 0) {
  display: grid;
  grid-template-columns: $cloumns;
  grid-template-rows: $rows;
  grid-gap: $gip;
}
// 文字溢出隐藏
@mixin hidden($num) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $num;
  overflow: hidden;
}
.body{
  user-select: none;
}
//单行文本溢出隐藏
.line_hidden {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
  //*************************** */
.commoditylist {
  width: 100%;
  @include flex(space-between,center);
  flex-wrap: nowrap;
  .commodity {
    flex-shrink: 0;
    width: 215px;
    height: 475px;
    @include flex(flex-start, center, column);
    &-i {
      width: 215px;
      height: 215px;
      @include flex();
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-info {
      font-size: 12px;
      &-price {
        font-size: 16px;
        color: #e4393c;
        margin: 20px 0 15px 0;
        > span {
          font-size: 20px;
        }
      }
      &-title {
        color: #666;
        @include hidden(2);
      }
      &-evaluate {
        color: #a7a7a7;
        margin: 12px 0;
        > span {
          color: #646fb0;
        }
      }
      &-storename {
        color: #999;
      }
      &-add {
        @include grid(57px 57px 96px, 27px);
        font-size: 12px;
        color: #999;
        margin-top: 40px;
        > div {
          border: 1px solid #ddd;
          @include flex(center, center);
        }
        .contrast {
          border-right: none;
        }
        .shopcar {
          border-left: none;
          &:hover{
              color: pink;
              cursor: pointer;
          }
          &:active{
              color: red;
          }
        }

      }
    }
  }
}
</style>

