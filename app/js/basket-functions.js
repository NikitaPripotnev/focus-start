import {Basket} from "./basket.js";
import {drawBasket} from "./basket-draw.js";


let basketPrice = document.querySelector(".header__basket__price");
let basketCount = document.querySelector(".header__basket__count");
let basketClose = document.querySelector(".header__basket__svg-close");

export let basket;
export function createBasket(){

  basket = new Basket(0, 0);
  if(localStorage.getItem("basket") !== null){

      basket.price = parseInt(localStorage.getItem("price"));
      basket.count = parseInt(localStorage.getItem("count"));
      basket.appData = JSON.parse(localStorage.getItem("appData"));

  }else{

  }
  console.log(basket, "createBasket");
  return basket;

}

export function setItemsLocalStorage(price, count, appData){
  localStorage.setItem("basket", "true");
  localStorage.setItem("price", price);
  localStorage.setItem("count", count);
  let jsonAppData = JSON.stringify(appData);
  localStorage.setItem("appData", jsonAppData);
}

function basketFocus(){
  let colorRed = "#f54b5e";
  document.querySelector(".header__basket__svg-basket").style.stroke = colorRed;
  document.querySelector(".header__basket__price").style.color = colorRed;
  document.querySelector(".header__basket__dollar").style.color = colorRed;
  document.querySelector(".header__basket__count").style.color = colorRed;
}
function basketUnFocus(){
  let colorLightGrey = "#adafb2";
  document.querySelector(".header__basket__svg-basket").style.stroke = colorLightGrey;
  document.querySelector(".header__basket__price").style.color = colorLightGrey;
  document.querySelector(".header__basket__dollar").style.color = colorLightGrey;
  document.querySelector(".header__basket__count").style.color = colorLightGrey;
}

function clearBasket(){
  this.clear();
  showDataSmallBasket(this)
}

export function initialSmallBasket(basket){

  showDataSmallBasket(basket);
  let basketWithoutClose = document.querySelector(".header__basket-without-close");
  basketWithoutClose.onmouseover = basketFocus;
  basketWithoutClose.onmouseout = basketUnFocus;

  let funcClickBasket = drawBasket.bind(this, basket);
  basketWithoutClose.onclick = funcClickBasket;

  let funcClickClose = clearBasket.bind(basket);
  document.querySelector(".header__basket__svg-close").onclick = funcClickClose;

}

export function showDataSmallBasket(basket){
  basketPrice.innerText=basket.price;
  basketCount.innerText=basket.count;
  if(basket.price!=0&&basketClose.classList.contains("display-none")){
    basketClose.classList.remove("display-none");
  }
  else if(basket.price==0&&(!basketClose.classList.contains("display-none"))){
    basketClose.classList.add("display-none");
  }

}
