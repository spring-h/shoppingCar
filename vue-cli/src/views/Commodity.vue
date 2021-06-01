<!--
 * @author: Spring
 * @create: 2021-05-31 15:07 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-06-01 10:00 AM
 * @desc:
-->
<template>
  <div class="container">
    <button @click="toCar">去购物车</button>
    <side-show :arr="sideshowArr" ></side-show>
    <goods-list :arr="rendergoodsArr" @addshopcar="addshopcar"></goods-list>
    <paging :arr="allgoodsArr" @fatherturn="fatherturn"></paging>
  </div>
</template>
<script>
import SideShow from '../components/SideShow.vue';
import GoodsList from '../components/GoodsList';
import Paging from '../components/Paging'
export default {
  data() {
    return {
      //轮播图数组
      //模拟所有的商品数组
      sideshowArr: ["/img/l1.jpg", "/img/l2.jpg", "/img/l3.jpg"],
      allgoodsArr: [
        {
          id: 1,
          name: '华为 P20 Pro',
          goodsID: 'sp0000001',
          price: '3599.00',
          desc: '华为（HUAWEI） 华为Mate20 手机  麒麟980AI智能芯片全面屏超微距影像超大广角 翡冷翠 全网通6GB+128GB',
          tag: '["tag001","tag002"]',
          evaNum: '21999',
          imgAddr: '暂无',
          merchant: '万佳诚手机专营店',
          merchantID: 'sj000001',
          info: '{}',
          img: '/img/01.jpg',
        },
        {
          id: 2,
          name: '中兴Axon 30Pro',
          goodsID: 'sp0000002',
          price: '3298.00',
          desc: '中兴Axon 30Pro 6400万双主摄 120HZ屏 8GB+128GB 曜石黑 骁龙888 55W快充',
          tag: '["tag001","tag002"]',
          evaNum: '3298',
          imgAddr: '暂无',
          merchant: '中兴京东自营官方',
          merchantID: 'sj00002',
          info: '{}',
          img: '/img/02.jpg',
        },
        {
          id: 3,
          name: 'OPPOA8',
          goodsID: 'sp0000003',
          price: '999.00',
          desc: 'OPPOA8 多功能AI三摄 4230mAh大电池 6.5英寸水滴屏 美颜拍照智能手机',
          tag: '["tag001","tag002"]',
          evaNum: '3298',
          imgAddr: '暂无',
          merchant: 'OPPO京东自营官方',
          merchantID: 'sj00003',
          info: '{}',
          img: '/img/03.jpg',
        },
        {
          id: 4,
          name: '朵唯（DOOV）D11Pro',
          goodsID: 'sp0000004',
          price: '999.00',
          desc: '朵唯（DOOV）D11Pro 6GB+64GB 冰海兰 智能手机 4G全网通 老人学生双卡双待',
          tag: '["tag001","tag002"]',
          evaNum: '3298',
          imgAddr: '暂无',
          merchant: '朵唯手机京东自营',
          merchantID: 'sj00004',
          info: '{}',
          img: '/img/04.jpg',
        },
        {
          id: 5,
          name: 'Redmi Note8Pro',
          goodsID: 'sp0000005',
          price: '3399.00',
          desc: 'Redmi Note8Pro 6400万全场景四摄 黑色',
          tag: '["tag001","tag002"]',
          evaNum: '3899',
          imgAddr: '暂无',
          merchant: '小米京东自营旗舰店',
          merchantID: 'sj00009',
          info: '{}',
          img: '/img/05.jpg',
        },
        {
          id: 6,
          name: '红米9A Redmi 9A',
          goodsID: 'sp0000006',
          price: '585.00',
          desc: '【当天发货】小米 红米9A Redmi 9A 5000mAh大电量 大屏幕大字体大音量',
          tag: '["tag001","tag002"]',
          evaNum: '34689',
          imgAddr: '暂无',
          merchant: '头号卖家旗舰店',
          merchantID: 'sj00005',
          info: '{}',
          img: '/img/06.jpg',
        },
        {
          id: 7,
          name: '红米 Note 9 Redmi 9',
          goodsID: 'sp0000007',
          price: '1449.00',
          desc: '小米 红米Note9 5G手机【11重好礼】 云墨灰 8GB+128GB 【下单立减】小金刚品',
          tag: '["tag001","tag002"]',
          evaNum: '5699',
          imgAddr: '暂无',
          merchant: '京铠玄手机旗舰店',
          merchantID: 'sj00007',
          info: '{}',
          img: '/img/07.jpg',
        },
        {
          id: 8,
          name: 'Redmi 8A',
          goodsID: 'sp0000008',
          price: '699.00',
          desc: 'Redmi 8A 5000mAh大电量 大字体大音量大内存 骁龙八核处理器 AI人脸解锁',
          tag: '["tag001","tag002"]',
          evaNum: '699',
          imgAddr: '暂无',
          merchant: '京铠玄手机旗舰店',
          merchantID: 'sj00007',
          info: '{}',
          img: '/img/08.jpg',
        },
        {
          id: 9,
          name: 'Redmi 10X',
          goodsID: 'sp0000009',
          price: '999.00',
          desc: 'Redmi 10X 4G Helio G85游戏芯 4800万超清四摄 5020mAh大电量 小孔全面屏',
          tag: '["tag001","tag002"]',
          evaNum: '2999',
          imgAddr: '暂无',
          merchant: '小米京东自营旗舰店',
          merchantID: 'sj00009',
          info: '{}',
          img: '/img/09.jpg',
        },
        {
          id: 10,
          name: 'Redmi Note8Pro',
          goodsID: 'sp0000010',
          price: '1299.00',
          desc: 'Redmi Note8Pro 6400万全场景四摄 液冷游戏芯 4500mAh长续航 NFC 18W快充',
          tag: '["tag001","tag002"]',
          evaNum: '2899',
          imgAddr: '暂无',
          merchant: '小米京东自营旗舰店',
          merchantID: 'sj00009',
          info: '{}',
          img: '/img/10.jpg',
        },
      ],
      //渲染的商品数组
      rendergoodsArr: [],
      //购物车数据
      shopArr: [],
      //总价
      total: 0,
    };
  },
  components: { SideShow,GoodsList,Paging },
  methods: {
    //去购物车
    toCar(){
      this.$router.push({ name: 'car', params: {arr:this.shopArr }})
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
  },
};
</script>
<style lang="scss">
.container{
  margin: 0 auto;
  width: 1200px;
}
</style>
