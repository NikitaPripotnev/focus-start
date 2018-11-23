import * as requestModuleSync from "./sync.js";
import * as appCategoryFunctions from "./application-category-functions.js";

export function drawBasket(){
  let template = document.getElementById("basket-box");
  let wrap = document.querySelector(".wrapper");
  wrap.appendChild(template.content.cloneNode(true));

  console.log(this.appData, "draw");
  this.appData.forEach(function(elem, index){
    let funcWrap = renderAppInBasket.bind(elem, index);
    requestModuleSync.downloadDataSync("http://localhost:3000/API/application" + elem.id + ".json", funcWrap);
    console.log(elem, "iter", index);
  });

}
function renderAppInBasket(index){

  let appParam = requestModuleSync.list;
  let table = document.querySelector(".basket__table");
  let tr = document.getElementById("table-row");
  let clone = tr.content.cloneNode(true);

  clone.querySelector(".basket__table__td__image").src = appParam.img_category;

  clone.querySelector(".basket__table__td__h").innerText = appParam.title;

  clone.querySelector(".table__price").innerText = appParam.price;

  clone.querySelector(".basket__table__checkbox").id = "check"+index;

  clone.querySelector(".basket__table__checkbox-label").htmlFor = "check"+index;

  clone.querySelector(".table__sum-price").innerText = appParam.price*this.count;
  table.appendChild(clone);
  resultSum();
}

function resultSum(){
  document.querySelector(".basket__to-order__dollars").innerText = appCategoryFunctions.basket.price;
  document.querySelector(".basket__to-order__cents").innerText = "00";
}
