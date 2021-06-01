<!--
 * @author: Spring
 * @create: 2021-05-31 15:08 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-06-01 11:10 AM
 * @desc:
-->
<template>
  <div style="width:1200px;margin:0 auto">
    <button @click="$router.go(-1)">返回商品列表</button>
    <div class="address">
      <div class="address-allcommodity">
        全部商品<span class="topallcommodity"> {{ allgoosnum }}</span>
      </div>
      <div class="address-to">
        <div class="address-to-text">配送至</div>
        <div class="select">
          <select name="" id="">
            <option value="">配送至武侯区</option>
            <option value="">配送至成华区</option>
          </select>
        </div>
      </div>
    </div>
    <div class="shopCar">
      <div class="tool">
        <div class="tool-all" @click="allchoose">
          <input
            type="checkbox"
            :checked="allchecked"
            id="all"
            class="allchoose"
          />
          <label for="all">全选</label>
        </div>
        <div class="tool-commodity">商品</div>
        <div class="tool-price">单价</div>
        <div class="tool-num">数量</div>
        <div class="tool-allprice">小计</div>
        <div class="tool-handle">操作</div>
      </div>
      <div class="store_list">
        <div class="store" v-for="item in shopArr" :key="item.merchantID">
          <div class="store-info">
            <input
              type="checkbox"
              @click="storechecked(item.merchantID, item.storechecked)"
              :checked="item.storechecked"
              class="bindstorecheck"
            />
            <div class="store-info-name">{{ item.merchant }}</div>
          </div>
          <div class="shoplist" v-for="it in item.goodsarr" :key="it.goodsID">
            <input
              type="checkbox"
              :checked="it.checked"
              @click="goodschecked(it)"
              class="input bindinput"
            />
            <div class="shoplist-commodity">
              <div class="shoplist-commodity-i">
                <img :src="it.img" alt="" />
              </div>
              <div class="shoplist-commodity-title">
                <span>{{ it.name }}</span>
              </div>
              <div class="shoplist-commodity-color">红色</div>
              <div class="shoplist-commodity-size">M</div>
              <div class="shoplist-commodity-server">
                <div><span class="iconfont icon-shezhi"></span></div>
                选服务
              </div>
            </div>
            <div class="shoplist-price">￥{{ it.price }}<span></span></div>
            <div class="shoplist-num">
              <div class="shoplist-num-step">
                <div class="reduce bindreduce" @click="changenum(it, 'r')">
                  -
                </div>
                <input type="text" class="inputnum" disabled :value="it.num" />
                <div class="add bindadd" @click="changenum(it, 'a')">+</div>
              </div>
              <div class="have">有货</div>
            </div>
            <div class="shoplist-allprice">
              ￥<span class="bindsmallprice">{{ it.price * it.num }}</span>
            </div>
            <div class="shoplist-tool">
              <div class="delete binddelete" @click="delgoods(it)">删除</div>
              <div class="focus">移入关注</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accountbox">
      <div class="account">
        <div class="account-all">
          <input
            type="checkbox"
            @click="allchoose"
            :checked="allchecked"
            id="all2"
            class="allchoose"
          />
          <label for="all2">全选</label>
        </div>
        <div class="account-delete" @click="delchoose">删除选择的商品</div>
        <div class="account-focus">移入关注</div>
        <div class="account-clear" @click="alldel">清理购物车</div>
        <div class="account-choose">
          已选择<span class="account-choose-num">{{ choosenum }}</span
          >件商品
        </div>
        <div class="account-allprice">
          总价：<span class="account-allprice-num">{{ total }}</span>
        </div>
        <div class="gobuy">去结算</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // props: ["arr", "allchecked"],
  data() {
    return {
      //购物车数据
      shopArr: [],
      //全选
      allchecked: true,
      allnum: 0,
    };
  },
  computed: {
    total() {
      let price = 0;
      let arr;
      if (this.$route.params.arr) {
        arr = this.$route.params.arr;
      }else if(localStorage.getItem("shopArr")){
        arr=localStorage.getItem("shopArr")
      } else {
        arr = this.shopArr;
      }
      arr.forEach((item) => {
        item.goodsarr.forEach((it) => {
          if (it.checked) price += Number(it.price) * Number(it.num);
        });
      });
      return price;
    },
    choosenum() {
      let n = 0;
      let arr;
      if (this.$route.params.arr) {
        arr = this.$route.params.arr;
      }else if(localStorage.getItem("shopArr")){
        arr=localStorage.getItem("shopArr")
      } else {
        arr = this.shopArr;
      }
      arr.forEach((item) => {
        item.goodsarr.forEach((it) => {
          if (it.checked) n += it.num;
        });
      });
      return n;
    },
    allgoosnum() {
      let n = 0;
      let arr;
      if (this.$route.params.arr) {
        arr = this.$route.params.arr;
      }else if(localStorage.getItem("shopArr")){
        arr=localStorage.getItem("shopArr")
      } else {
        arr = this.arr;
      }
      arr.forEach((item) => {
        n += item.goodsarr.length;
      });
      return n;
    },
  },
  methods: {
    changenum(it, status) {
      let obj = {
        it,
        status,
      };
      if (it.num == 1 && status == "r") {
        return;
      }
      if (it.num >= 1 && it.num < 99) {
        this.addreduce(obj)
      }
    },
    //商家checked
    storechecked(id, checked) {
      let obj = { id, checked };
      this.checkedstore(obj)
    },
    //商品checked
    goodschecked(item) {
      this.checkedgoods(item)
    },
    //全选
    allchoose() {
      this.allcheck()
    },
    //删除商品
    delgoods(it) {
      this.goodsdel(it)
    },
    //改变数量
    addreduce(info) {
      let { it, status } = info;
      let index = this.shopArr.findIndex(
        (item) => item.merchantID == it.merchantID
      );
      let i = this.shopArr[index].goodsarr.findIndex(
        (item) => item.goodsID == it.goodsID
      );
      status == "a"
        ? this.shopArr[index].goodsarr[i].num++
        : this.shopArr[index].goodsarr[i].num--;
    },
    //商家checked
    checkedstore(it) {
      let { shopArr } = this;
      let index = shopArr.findIndex((item) => item.merchantID == it.id);
      this.shopArr[index].storechecked = !it.checked;
      this.shopArr[index].goodsarr.forEach(
        (item) => (item.checked = !it.checked)
      );
      this.checkedneed();
    },
    //商品checked
    checkedgoods(it) {
      let { shopArr } = this;
      let index = shopArr.findIndex((item) => item.merchantID == it.merchantID);
      let i = shopArr[index].goodsarr.findIndex(
        (item) => item.goodsID == it.goodsID
      );
      this.shopArr[index].goodsarr[i].checked = !it.checked;
      let all = this.shopArr[index].goodsarr.every((item) => item.checked);
      this.shopArr[index].storechecked = all ? true : false;
      this.checkedneed();
    },
    //全選
    allcheck() {
      this.allchecked = !this.allchecked
      let { allchecked } = this
      this.shopArr.forEach((item) => {
        item.storechecked = allchecked
        item.goodsarr.forEach((it) => (it.checked = allchecked))
      })
      this.Storage()
    },
    //判断全选是否该选上
    checkedneed() {
      let { shopArr } = this
      let check = shopArr.every((item) => item.storechecked)
      this.allchecked = check
      this.Storage()
    },
    //删除商品
    goodsdel(it) {
      let { shopArr } = this
      let index = shopArr.findIndex((item) => item.merchantID == it.merchantID)
      let i = shopArr[index].goodsarr.findIndex(
        (item) => item.goodsID == it.goodsID
      )
      this.shopArr[index].goodsarr.splice(i, 1)
      if (this.shopArr[index].goodsarr.length == 0)
        this.shopArr.splice(index, 1)
      this.Storage()
    },
    //清空购物车
    alldel() {
      this.shopArr = []
      localStorage.removeItem("shopArr")
    },
    //删除选择商品
    delchoose() {
      this.shopArr=this.shopArr.filter(item=>{
        item.goodsarr=item.goodsarr.filter(it=>!it.checked)
        return !item.storechecked
      })
      // console.log(this.shopArr);
      this.Storage()
    },
    //缓存
    Storage() {
      let shopArr = JSON.stringify(this.shopArr)
      localStorage.setItem("shopArr", shopArr)
    },
  },
  mounted() {
    console.log(111);
    if(this.$route.params.arr){
      this.shopArr = this.$route.params.arr;
    }else
    if(localStorage.getItem("shopArr")){
      this.shopArr=localStorage.getItem("shopArr")
    }
    this.checkedneed()
  },
};
</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
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
// 地址栏
.address {
  width: 100%;
  margin-bottom: 15px;
  @include flex(space-between, center);
  &-allcommodity {
    color: #e2231a;
    font-size: 16px;
    font-weight: bold;
    > span {
      font-size: 14px;
    }
  }
  &-to {
    @include flex(flex-start);
    &-text {
      margin-right: 10px;
    }
  }
}

// 购物车

.shopCar {
  //菜单栏
  margin-bottom: 55px;
  .tool {
    width: 100%;
    background-color: #f3f3f3;
    border: 1px solid #e9e9e9;
    font-size: 14px;
    @include grid(135px 455px repeat(4, 1fr), 45px);
    > div {
      @include flex(flex-start);
    }
    &-all {
      margin-left: 13px;
    }
    &-price,
    &-num,
    &-allprice,
    &-handle {
      @include flex(center);
    }
  }
  //商家信息
  .store {
    width: 100%;
    &-info {
      width: 100%;
      height: 40px;
      margin-left: 13px;
      @include flex(flex-startt);
      &-name {
        color: #666;
        font-size: 16px;
        margin-left: 13px;
      }
    }
    &-line {
      height: 3px;
      width: 100%;
      background-color: #aaaaaa;
    }
    //商品信息
    .shoplist {
      @include grid(45px 545px repeat(4, 1fr), 80px);
      box-sizing: border-box;
      padding: 15px 0 25px 0;
      background-color: #fff4e8;
      > input {
        margin-left: 17px;
      }
      &-commodity {
        @include grid(80px 205px 40px, repeat(4, 20px), 5px 25px);
        &-i {
          width: 80px;
          height: 80px;
          grid-area: 1/1/5/2;
          @include flex;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &-title {
          color: #333;
          font-size: 12px;
          grid-area: 1/2/3/3;
          line-height: 22px;
          @include hidden(2);
        }
        &-color {
          font-size: 12px;
        }
        &-size {
          font-size: 12px;
        }
        &-server {
          @include flex(flex-start);
          div {
            width: 17px;
            height: 17px;
            background-color: red;
            margin-right: 5px;
            @include flex;
            span {
              color: #fff;
              font-size: 12px;
            }
          }
        }
      }
      &-price,
      &-allprice {
        @include flex(center, flex-start);
      }
      &-num {
        @include flex(flex-start, center, column);
        &-step {
          width: 80px;
          height: 20px;
          @include flex(flex-start);
          border: 1px solid #cbcbcb;
          .reduce {
            width: 17px;
            height: 20px;
            background-color: #f1f1f1;
            border-right: 1px solid #cbcbcb;
            @include flex;
            &:hover {
              cursor: pointer;
            }
          }
          input {
            width: 45px;
            height: 20px;
            border: none;
            text-align: center;
          }
          .add {
            width: 17px;
            height: 20px;
            background-color: #f1f1f1;
            border-left: 1px solid #cbcbcb;
            @include flex;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .have {
          font-size: 12px;
          color: #c8b1aa;
        }
      }
      &-tool {
        font-size: 15px;
        color: #666;
        @include flex(flex-start, center, column);
        .delete {
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
}

.accountbox {
  width: 100%;
  height: 55px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  .account {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    font-size: 12px;
    @include grid(50px 95px 60px 60px 1fr 100px 125px 90px, 55px, 0 10px);
    > div {
      @include flex;
    }
    &-delete {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    &-clear {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    &-choose {
      grid-column-start: 6;
      &-num {
        color: #e2231a;
      }
    }
    &-allprice {
      &-num {
        color: #e2231a;
        font-size: 20px;
      }
    }

    .gobuy {
      width: 90px;
      height: 100%;
      background-color: #e64347;
      @include flex;
      font-size: 19px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
