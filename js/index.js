/*
 * @author: Spring
 * @create: 2021-05-26 18:06 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-28 14:43 PM
 * @desc:
 */

var carousel = {
  props: ["arr"],
  data() {
    return {
      //小圆点盒子宽度
      width: "",
      //小圆点 当前位置
      current: "",
      //展示的数组
      showarr: [],
      //手动控制图片展示宽度
      css: { left: "0" },
      //是否开启动画
      istransition: true,
      //控制连续点击
      disabled:false
    }
  },
  template: `
  <div class="sideshow">
    <button class="left" @click="arrows('left')" :disabled=disabled ><span class="iconfont icon-lunboxiangzuo"></span></button>
    <div class="sideshowimg">
      <div :style="css" :class={transition:istransition}>
        <img :src="item" v-for="(item,index) in showarr" :key="item" alt="" >
      </div>
    </div>
    <button class="right" @click="arrows('right')" :disabled=disabled><span class="iconfont icon-lunboxiangyou"></span></button>
    <div class="location" :style="{width:width+'px'}">
      <div 
      v-for="(item,index) in arr" 
      :key=index
      @click="circleclick(index)"
      :style="{backgroundColor:current==index?'#666':'#fff'}"  
      class='circle' 
      :only=index>
      </div>
    </div>
  </div>`,
  methods: {
    arrows(direction) {
      this.disabled=true
      let { showarr, arr } = this
      let last = arr.length - 1
      let index = arr.findIndex((item) => item == showarr[1])
      if (direction == "left") {
        this.css = { left: "1200px" }
        setTimeout(() => {
          let a = 0
          let b = 1
          this.istransition = false
          this.css = { left: 0 }
          if (index - 1 == 0) {
            a = 0
            b = last
          } else if (index - 1 < 0) {
            a = last
            b = last-1
          } else {
            a = index - 1
            b = index - 2
          }
          this.showarr = [this.arr[b], this.arr[a], this.arr[index]]
          this.circlecolor()
          this.disabled=false
          setTimeout(() => {
            this.istransition = true
          }, 100)
        }, 500)
      }
      if (direction == "right") {
        this.css = { left: "-1200px" }
        setTimeout(() => {
          let a = 0
          let b = 1
          this.istransition = false
          this.css = { left: 0 }
          if (index + 1 == last) {
            a = last
            b = 0
          } else if (index + 1 > last) {
            a = 0
            b = 1
          } else {
            a = index + 1
            b = index + 2
          }
          this.showarr = [this.arr[index], this.arr[a], this.arr[b]]
          this.circlecolor()
          this.disabled=false
          setTimeout(() => {
            this.istransition = true
          }, 100)
        }, 500)
      }
      
    },
    circlecolor() {
      let index = this.arr.findIndex((item) => item == this.showarr[1])
      this.current = index
    },
    circleclick(index) {
      let arr=this.arr
      let a=0,b=1
      let last=this.arr.length-1
      if(index-1<0){
        a=last
        b=index+1
      }else
      if(index+1>last){
        a=index-1
        b=0
      }else
      {
        a=index-1
        b=index+1
      }
      this.showarr=[arr[a],arr[index],arr[b]]
      this.circlecolor()
    },
  },
  mounted() {
    this.width = (this.arr.length * 2 - 1) * 10
    this.showarr = [this.arr[this.arr.length - 1], this.arr[0], this.arr[1]]
    setInterval(() => {
      this.arrows('right')
    }, 2000)
  },
}

var goods = {
  props: ["arr"],
  data() {
    return {}
  },
  template: `
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
  `,
  methods: {
    addgoods(item) {
      this.$emit("addshopcar", item)
    },
  },
  mounted() {},
}

var paging = {
  props: ["arr"],
  data() {
    return {
      allpage: "",
      nowpage: "",
    }
  },
  template: `
  <div class="paging">
    <div class="first btn" @click="turn(1)">首页</div>
    <button class="previous btn" @click="turn('pre')" >上一页</button>
    <div class="pagenum">
      <div class="pagenum-son">{{nowpage}}</div>
    </div>
    <button class="next btn" @click="turn('next')">下一页</button>
    <div class="last btn" @click="turn(allpage)">尾页</div>
    <div class="allpage">共<span class="number pagenumber">{{allpage}}</span>页</div>
    <div class="go">到第<input value="1" type="text" @blur="turninput($event)" class="gopage">页</div>
  </div>
  `,
  methods: {
    turn(page) {
      if (page == "pre") {
        this.nowpage = this.nowpage == 1 ? this.nowpage : this.nowpage - 1
      }
      if (page == "next") {
        this.nowpage =
          this.nowpage == this.allpage ? this.nowpage : Number(this.nowpage) + 1
      }
      if (page == 1) {
        this.nowpage = 1
      }
      if (page == this.allpage) {
        this.nowpage = this.allpage
      }
      this.$emit("fatherturn", this.nowpage)
    },
    turninput(e) {
      let page = e.target.value
      if (page >= 1 && page <= Number(this.allpage)) {
        this.nowpage = page
        e.target.value = page
      } else {
        this.nowpage = 1
        e.target.value = 1
      }
      this.$emit("fatherturn", this.nowpage)
    },
  },
  mounted() {
    this.allpage = Math.ceil(this.arr.length / 5)
    this.nowpage = 1
  },
}

var shopcar = {
  props: ["arr", "allchecked"],
  data() {
    return {
      allnum: 0,
    }
  },
  template: `
  <div>
    <div class="address">
      <div class="address-allcommodity">全部商品<span class="topallcommodity"> {{allgoosnum}}</span></div>
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
          <input type="checkbox" :checked="allchecked" id="all" class="allchoose" />
          <label for="all">全选</label>
        </div>
        <div class="tool-commodity">商品</div>
        <div class="tool-price">单价</div>
        <div class="tool-num">数量</div>
        <div class="tool-allprice">小计</div>
        <div class="tool-handle">操作</div>
      </div>
      <div class="store_list">
        <div class="store" v-for="(item,index) in arr" :key="item.merchantID" >
          <div class="store-info">
            <input type="checkbox" @click="storechecked(item.merchantID,item.storechecked)" :checked="item.storechecked" class="bindstorecheck" />
            <div class="store-info-name">{{item.merchant}}</div>
          </div>
          <div class="shoplist" v-for="(it,ind) in item.goodsarr" :key="it.goodsID" >
            <input type="checkbox" :checked="it.checked" @click="goodschecked(it)" class="input bindinput" />
            <div class="shoplist-commodity">
              <div class="shoplist-commodity-i">
                <img :src="it.img" alt="" />
              </div>
              <div class="shoplist-commodity-title">
                <span>{{it.name}}</span>
              </div>
              <div class="shoplist-commodity-color">红色</div>
              <div class="shoplist-commodity-size">M</div>
              <div class="shoplist-commodity-server">
                <div><span class="iconfont icon-shezhi"></span></div>选服务
              </div>
            </div>
            <div class="shoplist-price">￥{{it.price}}<span></span></div>
            <div class="shoplist-num">
              <div class="shoplist-num-step">
                <div class="reduce bindreduce" @click="changenum(it,'r')">-</div>
                <input type="text" class="inputnum" disabled  :value="it.num" />
                <div class="add bindadd" @click="changenum(it,'a')" >+</div>
              </div>
              <div class="have">有货</div>
            </div>
            <div class="shoplist-allprice ">￥<span class="bindsmallprice">{{ it.price * it.num}}</span></div>
            <div class="shoplist-tool">
              <div class="delete binddelete" @click="delgoods(it)" >删除</div>
              <div class="focus">移入关注</div>
            </div>
          </div>  
        </div>
      </div>  
    </div>
    <div class="accountbox">
      <div class="account">
        <div class="account-all">
          <input type="checkbox" @click="allchoose" :checked="allchecked" id="all2" class="allchoose">
          <label for="all2">全选</label>
        </div>
        <div class="account-delete" @click="choosedel">
          删除选择的商品
        </div>
        <div class="account-focus">
          移入关注
        </div>
        <div class="account-clear" @click="alldel">
          清理购物车
        </div>
        <div class="account-choose">
          已选择<span class="account-choose-num">{{choosenum}}</span>件商品
        </div>
        <div class="account-allprice">
          总价：<span class="account-allprice-num">{{total}}</span>
        </div>
        <div class="gobuy">
          去结算
        </div>
      </div>
    </div>
  </div>  
  `,
  computed: {
    total() {
      let price = 0
      this.arr.forEach((item) => {
        item.goodsarr.forEach((it) => {
          if (it.checked) price += Number(it.price) * Number(it.num)
        })
      })
      return price
    },
    choosenum() {
      let n = 0
      this.arr.forEach((item) => {
        item.goodsarr.forEach((it) => {
          if (it.checked) n += it.num
        })
      })
      return n
    },
    allgoosnum() {
      let n = 0
      this.arr.forEach((item) => {
        n += item.goodsarr.length
      })
      return n
    },
  },
  methods: {
    changenum(it, status) {
      let obj = {
        it,
        status,
      }
      if (it.num == 1 && status == "r") {
        return
      }
      if (it.num >= 1 && it.num < 99) {
        this.$emit("addreduce", obj)
      }
    },
    //商家checked
    storechecked(id, checked) {
      let obj = { id, checked }
      this.$emit("checkedstore", obj)
    },
    //商品checked
    goodschecked(item) {
      this.$emit("checkedgoods", item)
    },
    //全选
    allchoose() {
      this.$emit("allcheck")
    },
    //删除商品
    delgoods(it) {
      this.$emit("goodsdel", it)
    },
    //删除全部
    alldel() {
      this.$emit("delall")
    },
    //删除选择商品
    choosedel() {
      this.$emit("delchoose")
    },
  },
}

const app = new Vue({
  el: "#app",
  components: {
    goods,
    carousel,
    paging,
    shopcar,
  },
  data() {
    return {
      //轮播图数组
      sideshowArr: ["./img/l1.jpg", "./img/l2.jpg", "./img/l3.jpg"],
      //模拟所有的商品数组
      allgoodsArr: [
        {
          id: 1,
          name: "华为 P20 Pro",
          goodsID: "sp0000001",
          price: "3599.00",
          desc: "华为（HUAWEI） 华为Mate20 手机  麒麟980AI智能芯片全面屏超微距影像超大广角 翡冷翠 全网通6GB+128GB",
          tag: "['tag001','tag002']",
          evaNum: "21999",
          imgAddr: "暂无",
          merchant: "万佳诚手机专营店",
          merchantID: "sj000001",
          info: "{}",
          img: "./img/01.jpg",
        },
        {
          id: 2,
          name: "中兴Axon 30Pro",
          goodsID: "sp0000002",
          price: "3298.00",
          desc: "中兴Axon 30Pro 6400万双主摄 120HZ屏 8GB+128GB 曜石黑 骁龙888 55W快充",
          tag: "['tag001','tag002']",
          evaNum: "3298",
          imgAddr: "暂无",
          merchant: "中兴京东自营官方",
          merchantID: "sj00002",
          info: "{}",
          img: "./img/02.jpg",
        },
        {
          id: 3,
          name: "OPPOA8",
          goodsID: "sp0000003",
          price: "999.00",
          desc: "OPPOA8 多功能AI三摄 4230mAh大电池 6.5英寸水滴屏 美颜拍照智能手机",
          tag: "['tag001','tag002']",
          evaNum: "3298",
          imgAddr: "暂无",
          merchant: "OPPO京东自营官方",
          merchantID: "sj00003",
          info: "{}",
          img: "./img/03.jpg",
        },
        {
          id: 4,
          name: "朵唯（DOOV）D11Pro",
          goodsID: "sp0000004",
          price: "999.00",
          desc: "朵唯（DOOV）D11Pro 6GB+64GB 冰海兰 智能手机 4G全网通 老人学生双卡双待",
          tag: "['tag001','tag002']",
          evaNum: "3298",
          imgAddr: "暂无",
          merchant: "朵唯手机京东自营",
          merchantID: "sj00004",
          info: "{}",
          img: "./img/04.jpg",
        },
        {
          id: 5,
          name: "Redmi Note8Pro",
          goodsID: "sp0000005",
          price: "3399.00",
          desc: "Redmi Note8Pro 6400万全场景四摄 黑色",
          tag: "['tag001','tag002']",
          evaNum: "3899",
          imgAddr: "暂无",
          merchant: "小米京东自营旗舰店",
          merchantID: "sj00009",
          info: "{}",
          img: "./img/05.jpg",
        },
        {
          id: 6,
          name: "红米9A Redmi 9A",
          goodsID: "sp0000006",
          price: "585.00",
          desc: "【当天发货】小米 红米9A Redmi 9A 5000mAh大电量 大屏幕大字体大音量",
          tag: "['tag001','tag002']",
          evaNum: "34689",
          imgAddr: "暂无",
          merchant: "头号卖家旗舰店",
          merchantID: "sj00005",
          info: "{}",
          img: "./img/06.jpg",
        },
        {
          id: 7,
          name: "红米 Note 9 Redmi 9",
          goodsID: "sp0000007",
          price: "1449.00",
          desc: "小米 红米Note9 5G手机【11重好礼】 云墨灰 8GB+128GB 【下单立减】小金刚品",
          tag: "['tag001','tag002']",
          evaNum: "5699",
          imgAddr: "暂无",
          merchant: "京铠玄手机旗舰店",
          merchantID: "sj00007",
          info: "{}",
          img: "./img/07.jpg",
        },
        {
          id: 8,
          name: "Redmi 8A",
          goodsID: "sp0000008",
          price: "699.00",
          desc: "Redmi 8A 5000mAh大电量 大字体大音量大内存 骁龙八核处理器 AI人脸解锁",
          tag: "['tag001','tag002']",
          evaNum: "699",
          imgAddr: "暂无",
          merchant: "京铠玄手机旗舰店",
          merchantID: "sj00007",
          info: "{}",
          img: "./img/08.jpg",
        },
        {
          id: 9,
          name: "Redmi 10X",
          goodsID: "sp0000009",
          price: "999.00",
          desc: "Redmi 10X 4G Helio G85游戏芯 4800万超清四摄 5020mAh大电量 小孔全面屏",
          tag: "['tag001','tag002']",
          evaNum: "2999",
          imgAddr: "暂无",
          merchant: "小米京东自营旗舰店",
          merchantID: "sj00009",
          info: "{}",
          img: "./img/09.jpg",
        },
        {
          id: 10,
          name: "Redmi Note8Pro",
          goodsID: "sp0000010",
          price: "1299.00",
          desc: "Redmi Note8Pro 6400万全场景四摄 液冷游戏芯 4500mAh长续航 NFC 18W快充",
          tag: "['tag001','tag002']",
          evaNum: "2899",
          imgAddr: "暂无",
          merchant: "小米京东自营旗舰店",
          merchantID: "sj00009",
          info: "{}",
          img: "./img/10.jpg",
        },
      ],
      //渲染的商品数组
      rendergoodsArr: [],
      //购物车数据
      shopArr: [],
      //全選
      allchecked: true,
      //总价
      total: 0,
    }
  },
  methods: {
    //改变数量
    addreduce(info) {
      let { it, status } = info
      let index = this.shopArr.findIndex(
        (item) => item.merchantID == it.merchantID
      )
      let i = this.shopArr[index].goodsarr.findIndex(
        (item) => item.goodsID == it.goodsID
      )
      status == "a"
        ? this.shopArr[index].goodsarr[i].num++
        : this.shopArr[index].goodsarr[i].num--
    },
    //切换商品页
    fatherturn(page) {
      let last = page * 5
      this.rendergoodsArr = this.allgoodsArr.slice(last - 5, last)
    },
    //加入购物车
    addshopcar(goods) {
      let { shopArr } = this
      let index = shopArr.findIndex(
        (item) => item.merchantID == goods.merchantID
      )
      if (index == -1) {
        let obj = {
          merchant: goods.merchant,
          merchantID: goods.merchantID,
          storechecked: true,
          goodsarr: [
            {
              desc: goods.desc,
              name: goods.name,
              price: goods.price,
              img: goods.img,
              merchantID: goods.merchantID,
              goodsID: goods.goodsID,
              evaNum: goods.evaNum,
              checked: true,
              num: 1,
            },
          ],
        }
        this.shopArr.push(obj)
      } else {
        let i = shopArr[index].goodsarr.findIndex(
          (item) => item.goodsID == goods.goodsID
        )
        if (i == -1) {
          let obj = {
            desc: goods.desc,
            name: goods.name,
            price: goods.price,
            img: goods.img,
            merchantID: goods.merchantID,
            goodsID: goods.goodsID,
            evaNum: goods.evaNum,
            checked: true,
            num: 1,
          }
          this.shopArr[index].goodsarr.push(obj)
        } else {
          this.shopArr[index].goodsarr[i].num++
        }
      }
      this.Storage()
    },
    //商家checked
    checkedstore(it) {
      let { shopArr } = this
      let index = shopArr.findIndex((item) => item.merchantID == it.id)
      this.shopArr[index].storechecked = !it.checked
      this.shopArr[index].goodsarr.forEach(
        (item) => (item.checked = !it.checked)
      )
      this.checkedneed()
    },
    //商品checked
    checkedgoods(it) {
      let { shopArr } = this
      let index = shopArr.findIndex((item) => item.merchantID == it.merchantID)
      let i = shopArr[index].goodsarr.findIndex(
        (item) => item.goodsID == it.goodsID
      )
      this.shopArr[index].goodsarr[i].checked = !it.checked
      let all = this.shopArr[index].goodsarr.every((item) => item.checked)
      this.shopArr[index].storechecked = all ? true : false
      this.checkedneed()
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
    delall() {
      this.shopArr = []
      localStorage.removeItem("shopArr")
    },
    //删除选择商品
    delchoose() {
      this.shopArr.forEach((item, index) => {
        item.goodsarr.forEach((it, ind) => {
          if (it.checked) {
            item.goodsarr.splice(ind, 1)
          }
        })
        if (item.storechecked) {
          this.shopArr.splice(index, 1)
        }
      })
      this.Storage()
    },
    //缓存
    Storage() {
      let shopArr = JSON.stringify(this.shopArr)
      localStorage.setItem("shopArr", shopArr)
    },
  },
  mounted() {
    this.rendergoodsArr = this.allgoodsArr.slice(0, 5)
    if (localStorage.getItem("shopArr")) {
      let shopArr = localStorage.getItem("shopArr")
      this.shopArr = JSON.parse(shopArr)
    }
    this.checkedneed()
  },
})
