import {Basket} from "./basket.js";
import {drawBasket} from "./basket-draw.js";

export function createBasket(){

  let basket = new Basket(0, 0);
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
}
function basketUnFocus(){
  let colorLightGrey = "#adafb2";
  document.querySelector(".header__basket__svg-basket").style.stroke = colorLightGrey;
  document.querySelector(".header__basket__price").style.color = colorLightGrey;
  document.querySelector(".header__basket__dollar").style.color = colorLightGrey;
}

export function initialSmallBasket(basket){

  showDataSmallBasket(basket);
  let basketWithoutClose = document.querySelector(".header__basket-without-close");
  basketWithoutClose.onmouseover = basketFocus;
  basketWithoutClose.onmouseout = basketUnFocus;

  let funcClickBasket = drawBasket.bind(basket);
  basketWithoutClose.onclick = funcClickBasket;

  document.querySelector(".header__basket__svg-close").onclick = basket.clear;

}

export function showDataSmallBasket(basket){
  document.querySelector(".header__basket__price").innerText=basket.price;
  //document.querySelector(".header__basket__count").innerText=basket.price;
}
