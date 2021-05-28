/*
 * @author: Spring
 * @create: 2021-04-25 09:18 AM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-04-28 10:11 AM
 * @desc: 轮播图
 */
//TODO 模拟JQ选择器
const Tool = (id) => {
  return document.querySelector(id);
};
const Toolall = (id) => {
  return document.querySelectorAll(id);
};
let t;

class Sideshow {
  constructor(arr) {
      t=this
    //图片数组
    this.imgArr = arr;
    //小圆点父集元素
    this.locationnode = Tool(".location");
    //小圆点数组
    this.circleArr = [];
    //左箭头
    this.left = Tool(".sideshow .left");
    //右箭头
    this.right = Tool(".sideshow .right");
    //图片元素
    this.imgnode = Tool(".sideshowimg img");
    //小圆点数组元素
    this.circleArrnode = [];
    //?初始化 渲染页面
    this.init(this.imgArr);
  }

  //TODO 通过图片数组 生成小圆点
  init(arr) {
      arr.forEach((element,index) => {
        let tem = `<div class='circle' only=${index}></div>`;
      this.circleArr.push(tem);
    });
    this.circleArr.forEach((item) => (this.locationnode.innerHTML += item));
    //改变小圆点父盒子宽度 生成间距
    this.locationnode.style.width =
      this.circleArr.length * 10 + (this.circleArr.length - 1) * 10 + "px";
    //获取小圆点数组元素
    this.circleArrnode = [...Toolall(".sideshow .circle")];
    //?绑定事件
    this.bindfunction();
    //?小圆点颜色
    this.circlecolor();
    //?启动轮播
    this.side();
  }

  //TODO 轮播
  side() {
    setInterval(() => {
      this.rightfunction();
    }, 1500);
  }

  //TODO 绑定函数
  bindfunction() {
    this.left.onclick = this.leftfunction.bind(this);
    this.right.onclick = this.rightfunction.bind(this);
    this.circleArrnode.forEach(item=>item.onclick=this.circleclick)
  }

  //TODO 点击左箭头
  leftfunction() {
    let node = this.imgnode.getAttribute("src");
    let index = this.imgArr.findIndex((item) => {
      return item == node;
    });
    if (index != 0) {
      this.imgnode.setAttribute("src", this.imgArr[index - 1]);
    } else {
      this.imgnode.setAttribute("src", this.imgArr[this.imgArr.length - 1]);
    }
    //?小圆点颜色
    this.circlecolor();
  }

  //TODO 点击右箭头
  rightfunction() {
    let node = this.imgnode.getAttribute("src");
    let index = this.imgArr.findIndex((item) => {
      return item == node;
    });
    if (index != this.imgArr.length - 1) {
      this.imgnode.setAttribute("src", this.imgArr[index + 1]);
    } else {
      this.imgnode.setAttribute("src", this.imgArr[0]);
    }
    //?小圆点颜色
    this.circlecolor();
  }

  //TODO 点击小圆点
  circleclick(){
    let index=this.getAttribute('only')
    t.imgnode.setAttribute('src',t.imgArr[index])
    //?小圆点颜色
    t.circlecolor();
  }

  //TODO 小圆点颜色
  circlecolor() {
    let node = this.imgnode.getAttribute("src");
    let index = this.imgArr.findIndex((item) => {
      return item == node;
    });
    //设置其他小圆点为白色
    this.circleArrnode.forEach((item) => (item.style.backgroundColor = "#fff"));
    this.circleArrnode[index].style.backgroundColor = "#000";
  }
}

//图片数组
let sideshowArr = ["./img/l1.jpg", "./img/l2.jpg", "./img/l3.jpg"];

new Sideshow(sideshowArr);


// ! 全选缓存

// ! 删除选择的商品 清理购物车 时数据未更新

