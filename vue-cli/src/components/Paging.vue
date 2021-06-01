<!--
 * @author: Spring
 * @create: 2021-05-31 17:07 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-31 17:09 PM
 * @desc:
-->
<template>
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
</template>
<script>
export default {
  props: ["arr"],
  data() {
    return {
      allpage: "",
      nowpage: "",
    }
  },
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

//************************* */
//分页
.paging{
  width: 70%;
  @include flex(space-around,center);
  margin: 10px auto;
  .btn{
    padding: 3px;
    background-color: #ddd;
    border: 1px solid #B0AFB0;
    color: #333;
    @include flex;
    &:hover{
      cursor: pointer;
    }
  }
  .go {
    @include flex;
    input{
      width: 30px;
      height: 20px;
      border: 1px solid #767676;
      text-align: center;
    }
  }
  .pagenum{
    @include flex(space-between);
    &-son{
      width: 30px;
      padding: 2.5px;
      border: 1px solid #767676;
      @include flex;
      &:hover{
        cursor: pointer;
      }
    }
  }
}
</style>
