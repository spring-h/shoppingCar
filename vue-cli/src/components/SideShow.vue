<!--
 * @author: Spring
 * @create: 2021-05-31 15:11 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-31 16:21 PM
 * @desc:
-->
<template>
  <div class="sideshow">
    <button class="left" @click="arrows('left')" :disabled=disabled ><span class="iconfont icon-lunboxiangzuo"></span></button>
    <div class="sideshowimg">
      <div :style="css" :class={transition:istransition}>
        <img :src="item" v-for="item in showarr" :key="item" alt="" >
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
  </div>
</template>

<script>
export default {
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
    console.log(this.showarr);
    setInterval(() => {
      this.arrows('right')
    }, 2000)
  }
};
</script>

<style scoped lang="scss">
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
.sideshow{
  width: 100%;
  height: 500px;
  position: relative;
  margin-bottom: 20px;
  .left,.right{
    border: none;
    background-color: transparent;
    outline: none;
    position: absolute;
    cursor: pointer;
    z-index: 9999;
    top: 50%;
    span{
      font-size: 50px;
    color: #fff;
    }
   transform: translateY(-50%);
  }
  .left{
    left: 0;
  }
  .right{
    right: 0;
  }
  .sideshowimg{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    @include flex(center,center);
    div{
      @include flex(center,center);
      width: 100%;
      height: 100%;
      flex-shrink: 0;
      position: absolute;
      left:0;
      >img{
        width: 100%;
        height: 100%;
      }
    }
    .transition{
      transition: all .5s;
    }
  }
  .location{
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    @include flex(space-around,center);
    .circle{
      cursor: pointer;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
    }
  }
}
</style>
