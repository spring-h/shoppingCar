/*
 * @author: Spring
 * @create: 2021-04-22 15:18 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-04-28 19:43 PM
 * @desc:
 */
let aaa=[]
let that;
let carArr = [];
let imgArr = [
  "./img/01.jpg",
  "./img/02.jpg",
  "./img/03.jpg",
  "./img/04.jpg",
  "./img/05.jpg",
  "./img/06.jpg",
  "./img/07.jpg",
  "./img/08.jpg",
  "./img/09.jpg",
  "./img/10.jpg",
];
/**
 * TODO获取id
 * @param {*} node
 * @returns
 */
const getA = (node) => {
  let id = node.getAttribute("only");
  let index = that.carArr.findIndex((item) => {
    return item.goodsID == id;
  });
  return index;
};

/**
 * TODO 创建商品类
 */
class Commodity {
  constructor(arr) {
    that = this;
    //?所有数据
    this.allarr = arr;
    this.allarr.forEach((item, index) => (item.img = imgArr[index]));
    //?数据
    this.arr = arr.slice(0, 5);
    //?购物车数组
    this.carArr = [];
    //?上一页
    this.previouspage = document.querySelector(".previous");
    this.previouspage.onclick = this.previous.bind(this);
    //?下一页
    this.nextpage = document.querySelector(".next");
    this.nextpage.onclick = this.next.bind(this);
    //?首页
    this.firstpage = document.querySelector(".first");
    this.firstpage.onclick = this.first.bind(this);
    //?尾页
    this.lastpage = document.querySelector(".last");
    this.lastpage.onclick = this.last.bind(this);
    //?获取页数的输入框
    this.gopage = document.querySelector(".gopage");
    //?共多少页
    this.allpagenum = document.querySelector(".pagenumber");
    this.allpagenum.innerHTML = Math.ceil(this.allarr.length / 5);
    //?页数确定
    this.pagesure = document.querySelector(".bindsure");
    this.pagesure.onclick = this.gotopage.bind(this);
    //?页数的盒子
    this.pagenum = document.querySelector(".pagenum");
    //?初始化商品
    this.init_commodity();
    this.renderpage();
  }



  /**
   * TODO 判断是否禁用按钮
   */
  cango(){
    let firstnode=this.arr[0]
    let index = this.allarr.findIndex(item=>item.goodsID==firstnode.goodsID)
    this.previouspage.disabled=false
    this.nextpage.disabled=false
    this.previouspage.style.color="#333"
    this.nextpage.style.color="#333"
    this.previouspage.style.backgroundColor="#ddd"
    this.nextpage.style.backgroundColor="#ddd"
    if(index<5){
      this.previouspage.disabled=true
      this.previouspage.style.backgroundColor="#eee"
      this.previouspage.style.color="#ccc"
    }
    if(index>this.allarr.length-6){
      this.nextpage.disabled=true
      this.nextpage.style.backgroundColor="#eee"
      this.nextpage.style.color="#ccc"
    }
  }

  /**
   * TODO 页数 input 失焦
   */
  gotopage() {
    let value = this.gopage.value;
    console.log(value);
    let page = Math.ceil(this.allarr.length / 5);
    if (value >= 1 && value <= page) {
      let index = (value - 1) * 5;
      this.arr = this.allarr.slice(index, index + 5);
      this.init_commodity();
    } else {
      this.arr=this.allarr.slice(0,4)
      this.gopage.value=1
      this.init_commodity()
    }
    this.together()
  }

  /**
   * TODO 渲染页数
   */
  renderpage() {
    let page = Math.ceil(this.allarr.length / 5);
    let tem = "";
    if (page <= 5) {
      for (let i = 0; i < page; i++) {
        tem += `<div class="pagenum-son" only=${i + 1}>${i + 1}</div>`;
      }
      this.pagenum.style.width = 35 * +page + (page - 1) * 10 + "px";
      this.pagenum.innerHTML = tem;
    } else {
      for (let i = 0; i < 5; i++) {
        tem += `<div class="pagenum-son" only=${i + 1}>${i + 1}</div>`;
      }
      this.pagenum.style.width = 35 * +page + (page - 1) * 10 + "px";
      this.pagenum.innerHTML = tem;
    }
    //获取页数按钮 绑定事件
    let specificpage = document.querySelectorAll(".pagenum-son");
    specificpage.forEach((item) => {
      item.onclick = this.gospecificpage;
    });
    this.together()
  }

  /**
   * TODO 点击具体的页数
   */
  gospecificpage() {
    let num = this.getAttribute("only");

    let value = (num - 1) * 5;
    that.arr = that.allarr.slice(value, value + 5);
    that.init_commodity();
    that.together()
  }

  /**
   * TODO 上一页
   */
  previous() {
    let firstnode = this.arr[0];
    let index = this.allarr.findIndex(
      (item) => item.goodsID == firstnode.goodsID
    );
    if (index - 5 >= 0) {
      this.arr = this.allarr.slice(index - 5, index);
      this.init_commodity();
    }
    this.together()
  }

  /**
   * TODO 下一页
   * 
   */
  next() {
    let lastnode = this.arr[4];
    let index = this.allarr.findIndex(
      (item) => item.goodsID == lastnode.goodsID
    );
    if (this.allarr.length - 1 > index + 6) {
      this.arr = this.allarr.slice(index + 1, index + 6);
      this.init_commodity();
    } else {
      this.arr = this.allarr.slice(index + 1);
      this.init_commodity();
    }
    this.together()
  }
  
  /**
   * TODO 判断当前页数
   */
  nowpage(){
    let firstnode=this.arr[0]
    let index = this.allarr.findIndex(item=>item.goodsID==firstnode.goodsID)
    let number=Math.ceil((index+1)/5)
    this.gopage.value=number
    //获取页数按钮 绑定事件
    let specificpage = document.querySelectorAll(".pagenum-son");
    specificpage.forEach(item=>item.style.backgroundColor="#fff")
    specificpage.forEach(item=>item.style.color="#333")
    specificpage.forEach(item=>{
      if(item.getAttribute('only')==number){
        item.style.backgroundColor="#333"
        item.style.color="#fff"
      }
    })

  }

  /**
   * TODO 首页
   */
  first() {
    this.arr = this.allarr.slice(0, 5);
    this.init_commodity();
    this.together()
  }

  /**
   * TODO 尾页
   */
  last() {
    let last = this.allarr.length - 1;
    this.arr = this.allarr.slice(last - 4);
    this.init_commodity();
    this.together()
  }

  //TODO 执行 判断颜色 和 上一页下一页是否禁用
  together(){
    this.nowpage()
    this.cango()
  }

  /**
   * TODO 初始化商品页面 
   */
  init_commodity() {
    let commoditylist = Tool(".commoditylist");
    let tem = "";
    this.arr.forEach((item, index) => {
      item.num = 1;
      item.checked = true;
      item.storechecked = true;
      tem += render(item);
    });
    commoditylist.innerHTML = tem;
    this.bind_addCar();
  }

  /**
   * TODO 绑定加入购物车事件
   */
  bind_addCar() {
    let addCar = Toolall(".bindshopcar");
    addCar.forEach((item) => {
      item.onclick = this.addCar;
    });
  }

  /**
   * TODO加入购物车事件
   */
  addCar() {
    let id = this.getAttribute("only");
    //查找点击的商品索引
    let index = that.arr.findIndex((item) => {
      return item.goodsID == id;
    });
    //检查商品是否存在
    let indexes = carArr.findIndex((item) => {
      return item.goodsID == that.arr[index].goodsID;
    });
    //如果商品不存在
    if (indexes == -1) {
      carArr.push(JSON.parse(JSON.stringify(that.arr[index])));
    } else {
      carArr[indexes].num++;
    }
    let localdata = JSON.stringify(carArr);
    localStorage.setItem("carArr", localdata);
    // console.log("添加成功");
    //渲染购物车
    init_shopcar();
  }
}

/**
 *  TODO 创建购物车类
 */
class ShopCar {
  constructor(obj) {
    this.name = obj.name;
    this.desc = obj.desc;
    this.evaNum = obj.evaNum;
    this.img = obj.img;
    this.goodsID = obj.goodsID;
    this.merchant = obj.merchant;
    this.merchantID = obj.merchantID;
    this.num = obj.num;
    this.price = obj.price;
    this.checked = obj.checked;
    this.storechecked = obj.storechecked;
    //? 商品的加号
    this.addbtn = Tool(`.bindadd[only=${this.goodsID}]`);
    //? 商品的减号
    this.reducebtn = Tool(`.bindreduce[only=${this.goodsID}]`);
    //? 删除商品的元素
    this.delbtn = Tool(`.binddelete[only=${this.goodsID}]`);
    //? 显示商品数量的input元素
    this.numinput = Tool(`.inputnum[only=${this.goodsID}]`);
    //? 商品的input元素
    this.checkedinput = Tool(`.bindinput[only=${this.goodsID}]`);
    //? 显示小计的元素
    this.smallprice = Tool(`.bindsmallprice[only=${this.goodsID}]`);
    //? 商家input元素
    this.storeinput = Tool(`.bindstorecheck[only=${this.merchantID}]`);

    this.init();
  }

  /**
   * TODO初始化页面
   */
  init() {
    this.storeinput.checked = this.storechecked;
    this.checkedinput.checked = this.checked;
    //绑定事件
    this.bindIncident();
    //判断商家是否勾选
    this.store_checked();
    judge();
  }

  /**
   * TODO绑定按钮事件
   */
  bindIncident() {
    this.addbtn.onclick = this.add.bind(this);
    this.reducebtn.onclick = this.reduce.bind(this);
    this.delbtn.onclick = this.del.bind(this);
    this.checkedinput.onclick = this.changeinput.bind(this);
    this.storeinput.onclick = this.changestoreinput.bind(this);
    this.numinput.onchange = this.handlnum.bind(this);
  }

  /**
   * TODO改变原数据
   * @param {*} value
   */
  changecarArr(value) {
    let index = carArr.findIndex((item) => {
      return item.goodsID == this.goodsID;
    });
    carArr[index][value] = this[value];
    //缓存购物车商品
    localstorageshopcar();
  }

  /**
   * TODO加号事件
   */
  add() {
    if (this.num < 99) {
      this.num++;
      this.numinput.value++;
      //改变原数据
      this.changecarArr("num");
      //计算小计
      this.smallpricefunction();
      //计算总价
      total();
      //判断商品数量
      commoditynum();
    }
  }

  /**
   * TODO减号事件
   */
  reduce() {
    if (this.num > 1) {
      this.num--;
      this.numinput.value--;
      //改变原数据
      this.changecarArr("num");
      //计算小计
      this.smallpricefunction();
      //计算总价
      total();
      //判断商品数量
      commoditynum();
    }
  }

  /**
   * TODO手动输入数量
   */
  handlnum() {
    this.num = this.numinput.value;
    //改变原数据
    this.changecarArr("num");
    this.smallpricefunction();
    //计算总价
    total();
    //判断商品数量
    commoditynum();
  }

  /**
   * TODO删除事件
   */
  del() {
    console.log(this.goodsID);
    let index = carArr.findIndex((item) => {
      return item.goodsID == this.goodsID;
    });
    carArr.splice(index, 1);
    //判断商家是否勾选
    this.store_checked();
    //缓存购物车商品
    localstorageshopcar();
    //渲染购物车
    init_shopcar();
  }

  /**
   * TODO计算小计
   */
  smallpricefunction() {
    this.smallprice.innerHTML = this.num * this.price;
  }

  /**
   * TODOinput 勾选
   */
  changeinput() {
    let index = carArr.findIndex((item) => {
      return item.goodsID == this.goodsID;
    });
    carArr[index].checked = this.checkedinput.checked;
    this.store_checked();
    //判断全选
    judge();
    //计算总价
    total();
    //判断商品数量
    commoditynum();
    //缓存购物车商品
    localstorageshopcar();
  }

  /**
   * TODO 商家勾选
   */
  changestoreinput() {
    let inputnode = Toolall(`.bindinput[onlystoe=${this.merchantID}]`);
    console.log(inputnode);
    inputnode.forEach((item) => {
      item.checked = this.storeinput.checked;
    });
    carArr.forEach((item) => {
      if (item.merchantID == this.merchantID) {
        item.checked = this.storeinput.checked;
      }
    });
    //计算总价
    total();
    //判断全选
    judge();
    //判断商品数量
    commoditynum();
    //缓存购物车商品
    localstorageshopcar();
  }

  /**
   * TODO 判断商家是否应该勾选
   */
  store_checked() {
    let id = this.merchantID;
    //定义中转数组 用于判定 商家下面的所有商品是否全部选中
    let station = [];
    //提出 商家下面的所有商品
    carArr.forEach((item) => {
      if (item.merchantID == id) {
        station.push(item);
      }
    });
    //判断商品是否全部选中
    let boolean = station.every((item) => {
      return item.checked;
    });
    //如果都选中
    if (boolean) {
      console.log(this.storeinput);
      this.storeinput.checked = true;
      //改变数据结构
      carArr.forEach((item) => {
        if (item.merchantID == id) {
          item.storechecked = true;
        }
      });
    } else {
      //如果有没选中
      this.storeinput.checked = false;
      //改变数据结构
      carArr.forEach((item) => {
        if (item.merchantID == id) {
          item.storechecked = false;
        }
      });
    }
  }
}

/**
 * TODO 判断是否有缓存
 */
if (localStorage.getItem("carArr")) {
  let obj = JSON.parse(localStorage.getItem("carArr"));
  carArr = obj;
  init_shopcar();
}

/**
 * TODO删除选中的商品
 */
function delchoose() {
  let checknode = Toolall('.store_list input[type="checkbox"]');
  checknode.forEach((item) => {
    if (item.checked) {
      let index = carArr.findIndex((it) => {
        return item.getAttribute("only") == it.goodsID;
      });
      if (index != -1) {
        carArr.splice(index, 1);
      }
    }
  });
  //缓存购物车商品
  localstorageshopcar();
  init_shopcar();
}

/**
 * TODO判断商品数量
 */
function commoditynum() {
  let num = 0;
  let commoditynum = Tool(".account-choose-num");
  carArr.forEach((item) => {
    if (item.checked) {
      num += Number(item.num);
    }
  });
  commoditynum.innerHTML = num;
}

/**
 * TODO点击全选事件
 */
(function () {
  let chooseall = Toolall(".allchoose");
  chooseall.forEach((item) => {
    item.onclick = chooseallevent;
  });
  function chooseallevent() {
    let input = [
      ...Toolall(".shopCar input[type=checkbox]"),
      ...Toolall(".accountbox input[type=checkbox]"),
    ];
    input.forEach((it) => (it.checked = this.checked));
    carArr.forEach((item) => {
      item.checked = this.checked;
      item.storechecked = this.checked;
    });
    total();
    commoditynum();
    //缓存购物车商品
    localstorageshopcar();
  }
})();

/**
 * TODO判断全选是否应该勾上
 */
function judge() {
  let chooseall = Toolall(".allchoose");
  let judge = carArr.every((item) => {
    return item.checked;
  });
  if (judge) {
    chooseall.forEach((item) => (item.checked = true));
  } else {
    chooseall.forEach((item) => (item.checked = false));
  }
}

/**
 * TODO计算总价
 */
function total() {
  //? 商品总价元素
  let totalnode = Tool(".account-allprice-num");
  let price = 0;
  carArr.forEach((item) => {
    if (item.checked) {
      price += item.num * item.price;
    }
  });
  totalnode.innerHTML = price;
}

/**
 * TODO渲染商品页面
 * @param {*} item
 * @returns
 */
function render(item) {
  let tem = `
  <div class="commodity">
  <div class="commodity-i">
    <img src="${item.img}" alt="" />
  </div>
  <div class="commodity-info">
    <div class="commodity-info-price">
      ￥<span class="price">${item.price}</span>
    </div>
    <div class="commodity-info-title">${item.desc}</div>
    <div class="commodity-info-evaluate">
      <span commodity-info-evaluate-num>${item.evaNum}</span>条评价
    </div>
    <div class="commodity-info-storename">
      ${item.merchant}
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
    <div class="shopcar bindshopcar" only="${item.goodsID}" >
      <span class="iconfont icon-gouwuche2"></span>  加入购物车
    </div>
  </div>
    </div>
  </div>`;
  return tem;
}

/**
 * TODO渲染购物车
 * @param {*} obj
 */
function render_shopcar(obj) {
  //获取即将添加内容的盒子
  let storelist = Tool(".store_list");
  //获取商家盒子
  let store = [...Toolall(".store")];
  // 查询商家是否存在
  let index = store.findIndex((item) => {
    return item.getAttribute("only") == obj.merchantID;
  });
  let tem = `
  <div class="shoplist" only="${obj.goodsID}">
  <input type="checkbox" onlystoe="${obj.merchantID}" only="${
    obj.goodsID
  }" class="input bindinput" />
  <div class="shoplist-commodity">
    <div class="shoplist-commodity-i">
      <img src="${obj.img}" alt="" />
    </div>
    <div class="shoplist-commodity-title">
      <span>${obj.name}</span>
    </div>
    <div class="shoplist-commodity-color">红色</div>
    <div class="shoplist-commodity-size">M</div>
    <div class="shoplist-commodity-server">
      <div><span class="iconfont icon-shezhi"></span></div>选服务
    </div>
  </div>
  <div class="shoplist-price">￥${obj.price}<span></span></div>
  <div class="shoplist-num">
    <div class="shoplist-num-step">
      <div class="reduce bindreduce" only="${obj.goodsID}">-</div>
      <input type="text" class="inputnum" disabled only="${
        obj.goodsID
      }"  value="${obj.num}" />
      <div class="add bindadd" only="${
        obj.goodsID
      }" onclick='obj.add(${obj})' >+</div>
    </div>
    <div class="have">有货</div>
  </div>
  <div class="shoplist-allprice ">￥<span only="${
    obj.goodsID
  }" class="bindsmallprice">${obj.price * obj.num}</span></div>
  <div class="shoplist-tool">
    <div class="delete binddelete" only="${obj.goodsID}">删除</div>
    <div class="focus">移入关注</div>
  </div>
</div>
  
  `;
  let divstore = `
  <div class="store" only="${obj.merchantID}">
  <div class="store-info">
    <input type="checkbox" class="bindstorecheck" only="${obj.merchantID}" />
    <div class="store-info-name">${obj.merchant}</div>
  </div>
  <div class="store-line"></div>
  `;
  let divstoreend = `</div>`;
  if (index == -1) {
    tem = `
    ${divstore}${tem}${divstoreend}
    `;
    storelist.innerHTML += tem;
  } else {
    store[index].innerHTML += tem;
  }
}

/**
 *  TODO实例化购物车中商品
 */
function init_shopcar() {
  let storelist = Tool(".store_list");
  storelist.innerHTML = "";
  carArr.forEach((item) => {
    //渲染购物车
    render_shopcar(item);
  });
  total();
  carArr.forEach((item) => {
    //实例化对象
    new ShopCar(item);
  });
  // 判断全选
  judge();
  //全部商品元素
  let topall = Tool(".topallcommodity");
  topall.innerHTML = carArr.length;
  //判断商品数量
  commoditynum();
}

/**
 * TODO 清理购物车
 */
function delallcommodity() {
  carArr = [];
  //缓存购物车商品
  localstorageshopcar();
  init_shopcar();
}

/**
 * TODO 缓存
 */
function localstorageshopcar() {
  console.log(aaa);
  let localdata = JSON.stringify(carArr);
  localStorage.setItem("carArr", localdata);
}

axios
  .post("http://24123z8o79.zicp.vip/getAllGoods")
  .then(function (response) {
    console.log(response.data); 
    new Commodity(response.data);
    aaa=response.data
  })
  .catch(function (error) {
    console.log(error);
  });
