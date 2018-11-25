import * as requestModuleSync from "./sync.js";
import {addEventForButtons,closeBasket} from "./basket-draw-other.js";
import {setItemsLocalStorage, showDataSmallBasket} from "./basket-functions.js";

let basketBox;
export let circlesStep;

export function drawBasket(){

  let basket = this;
  let blackBox = document.querySelector(".basket-wrapper");

  blackBox.classList.remove("display-none");

  let templateBasketBox = document.getElementById("basket-box");
  let basketStep1 = document.getElementById("basket-step0");
  let wrap = document.querySelector(".wrapper");

  wrap.appendChild(templateBasketBox.content.cloneNode(true));
  basketBox = wrap.querySelector(".basket");
  basketBox.appendChild(basketStep1.content.cloneNode(true));


  this.appData.forEach(function(elem, index){
    let funcWrap = renderAppInBasket.bind(elem, index, basket);
    console.log("http://localhost:3000/API/application" + elem.id + ".json", "drawBasket");
    requestModuleSync.downloadDataSync("http://localhost:3000/API/application" + elem.id + ".json", funcWrap);

  });

  circlesStep = document.querySelectorAll(".step");
  circlesStep.forEach(function(element, id){
    element.dataset.id = id;
  });


  blackBox.onclick = closeBasket;

  addEventForButtons(circlesStep[1], ".button-step1", ".step1-application");

}



function renderAppInBasket(index, basket){

  let appParam = requestModuleSync.list;
  let table = document.querySelector(".basket__table");
  let tr = document.getElementById("table-row");
  let clone = tr.content.cloneNode(true);


  clone.querySelector(".basket__table__td__image").src = appParam.img_basket;

  clone.querySelector(".basket__table__td__h").innerText = appParam.title;

  clone.querySelector(".table__price").innerText = appParam.price;

  clone.querySelector(".basket__table__checkbox").id = "check"+index;

  clone.querySelector(".basket__table__checkbox-label").htmlFor = "check"+index;

  let sumPrice = clone.querySelector(".table__sum-price");
  sumPrice.innerText = appParam.price*this.count;

  let countApp = clone.querySelector(".toggle-app__count");
  countApp.innerText = this.count;

  let clickPlus = basketCountPlus.bind(this, basket, sumPrice, countApp, appParam.price);
  clone.querySelector(".toggle-app__plus").onclick = clickPlus;

  let clickMinus = basketCountMinus.bind(this, basket, sumPrice, countApp, appParam.price);
  clone.querySelector(".toggle-app__minus").onclick = clickMinus;

  let rubish = clone.querySelector(".basket__table__td__rubish");
  let clickDelete = deleteAppBasket.bind(rubish, basket);
  rubish.onclick = clickDelete;

  table.appendChild(clone);
  addIdElements();
  resultSum(basket.price);
}

function addIdElements(){
  let parent = document.querySelector(".basket__table");
  let child = parent.querySelectorAll(".basket__table__tr-data");
  child.forEach(function(elem, index){
    elem.id = "basket-tr"+index;
    elem.querySelector(".basket__table__td__rubish").dataset.id = index;
  });
}

function deleteAppBasket(basket){
  let index = this.dataset.id;
  let parent = document.querySelector(".basket__table");
  let child = document.getElementById("basket-tr"+index);
  let sum = child.querySelector(".table__sum-price").innerText;
  let sumCount = child.querySelector(".toggle-app__count").innerText

  basket.price-=parseInt(sum);
  basket.count-=parseInt(sumCount);
  resultSum(basket.price);
  basket.appData.splice(index,1);
  showDataSmallBasket(basket);
  setItemsLocalStorage(basket.price, basket.count, basket.appData);
  parent.removeChild(child);
  addIdElements();
}

function basketCountPlus(basket, elementSumPrice, elementCountApp, priceSingle){
  this.count++;
  console.log( "plus click");
  elementSumPrice.innerText = this.count*priceSingle;
  elementCountApp.innerText = this.count;
  basket.price += parseInt(priceSingle);
  basket.count++;
  showDataSmallBasket(basket);
  setItemsLocalStorage(basket.price, basket.count, basket.appData);
  resultSum(basket.price);
}
function basketCountMinus(basket, elementSumPrice, elementCountApp, priceSingle){
  if(this.count>0){
    this.count--;
    elementSumPrice.innerText = this.count*priceSingle;
    elementCountApp.innerText = this.count;
    basket.price -= parseInt(priceSingle);
    basket.count--;
    showDataSmallBasket(basket);
    setItemsLocalStorage(basket.price, basket.count, basket.appData);
    resultSum(basket.price);
  }

}

function resultSum(sum){
  document.querySelector(".basket__to-order__dollars").innerText = sum;
  document.querySelector(".basket__to-order__cents").innerText = "00";
}
