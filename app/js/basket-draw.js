import * as requestModuleSync from "./sync.js";
import * as appCategoryFunctions from "./application-category-functions.js";

export function drawBasket(){
  document.querySelector(".basket-wrapper").classList.remove("display-none")

  let template = document.getElementById("basket-box");
  let wrap = document.querySelector(".wrapper");
  wrap.appendChild(template.content.cloneNode(true));

  console.log(this.appData, "draw");
  this.appData.forEach(function(elem, index){
    let funcWrap = renderAppInBasket.bind(elem, index);
    console.log("http://localhost:3000/API/application" + elem.id + ".json", "drawBasket");
    requestModuleSync.downloadDataSync("http://localhost:3000/API/application" + elem.id + ".json", funcWrap);

  });

}
function renderAppInBasket(index){

  let appParam = requestModuleSync.list;
  let table = document.querySelector(".basket__table");
  let tr = document.getElementById("table-row");
  let clone = tr.content.cloneNode(true);


  clone.querySelector(".basket__table__td__image").src = appParam.img;

  clone.querySelector(".basket__table__td__h").innerText = appParam.title;

  clone.querySelector(".table__price").innerText = appParam.price;

  clone.querySelector(".basket__table__checkbox").id = "check"+index;

  clone.querySelector(".basket__table__checkbox-label").htmlFor = "check"+index;

  let sumPrice = clone.querySelector(".table__sum-price");
  sumPrice.innerText = appParam.price*this.count;

  let countApp = clone.querySelector(".toggle-app__count");
  countApp.innerText = this.count;

  let clickPlus = basketCountPlus.bind(this,sumPrice, countApp, appParam.price);
  clone.querySelector(".toggle-app__plus").onclick = clickPlus;

  let clickMinus = basketCountMinus.bind(this,sumPrice, countApp, appParam.price);
  clone.querySelector(".toggle-app__minus").onclick = clickMinus;

  let rubish = clone.querySelector(".basket__table__td__rubish");
  let clickDelete = deleteAppBasket.bind(rubish,appCategoryFunctions.basket);
  rubish.onclick = clickDelete;

  table.appendChild(clone);
  addIdElements();
  resultSum(appCategoryFunctions.basket.price);
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
  console.log(index,  parent, child, sum, "delete");
  appCategoryFunctions.basket.price-=parseInt(sum);
  resultSum(appCategoryFunctions.basket.price);
  basket.appData.splice(index,1);
  parent.removeChild(child);
  addIdElements();
}

function basketCountPlus(elementSumPrice, elementCountApp, priceSingle){
  this.count++;
  console.log( "plus click");
  elementSumPrice.innerText = this.count*priceSingle;
  elementCountApp.innerText = this.count;
  appCategoryFunctions.basket.price += parseInt(priceSingle);
  resultSum(appCategoryFunctions.basket.price);
}
function basketCountMinus(elementSumPrice, elementCountApp, priceSingle){
  if(this.count>0){
    this.count--;
    elementSumPrice.innerText = this.count*priceSingle;
    elementCountApp.innerText = this.count;
    appCategoryFunctions.basket.price -= parseInt(priceSingle);
    resultSum(appCategoryFunctions.basket.price);
  }


}

function resultSum(sum){
  document.querySelector(".basket__to-order__dollars").innerText = sum;
  document.querySelector(".basket__to-order__cents").innerText = "00";
}
