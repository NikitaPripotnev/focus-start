import * as requestModule from "./application-download.js";
import {addEventForButtons,closeBasket} from "./basket-draw-other.js";
import {setItemsLocalStorage, showDataSmallBasket} from "./basket-functions.js";

let basketBox;
export let circlesStep;


/*
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

    requestModule.downloadData("http://localhost:3000/API/application" + elem.id + ".json").then(function(listApplication){
      let funcWrap = renderAppInBasket.bind(elem, index, listApplication, basket);
      funcWrap();
    });

  });

  circlesStep = document.querySelectorAll(".step");
  circlesStep.forEach(function(element, id){
    element.dataset.id = id;
  });


  blackBox.onclick = closeBasket;

  let elemRemove = basketBox.querySelector(".step1-application");
  addEventForButtons(circlesStep[1], ".button-step1");

  })

}
*/
function addActiveStep(){
  let stepCircles = document.querySelectorAll(".step");
  let numberCircle = this.dataset.id;
  let lengthCircles = stepCircles.length;

  stepCircles.forEach(function(element, id){
    if(id<=numberCircle){
      element.classList.remove("disabled");
      if(id==(lengthCircles-1)){
        element.classList.add("step-success");
      }
    }
    else{
      element.classList.add("disabled");
    }
  });
}

function drawSteps(elemRemove){

  let basket = document.querySelector(".basket");
  let basketStep = document.getElementById("basket-step"+this.dataset.id);

  basket.removeChild(elemRemove);
  return basket.appendChild(basketStep.content.cloneNode(true));
}

function addEventForButtons(circlesStepNumberStep, button, elemRemove){
  let changeStep = addActiveStep.bind(circlesStepNumberStep);
  button.addEventListener("click", changeStep);

  let wrapDrawStep = drawSteps.bind(circlesStepNumberStep, elemRemove);
  button.addEventListener("click", wrapDrawStep);

}


function drawElementsForBasket(){

    this.appData.forEach(function(elem, index){
    requestModule.downloadData("http://localhost:3000/API/application" + elem.id + ".json").then(function(listApplication){
      let funcWrap = renderAppInBasket.bind(elem, index, listApplication, basket);
      funcWrap();
    });

  });

  circlesStep = document.querySelectorAll(".step");
  circlesStep.forEach(function(element, id){
    element.dataset.id = id;
  });

}


function drawbasket(){
  return new Promise(function(resolved, rejected) {
    let basket = this;
    let blackBox = document.querySelector(".basket-wrapper");
    blackBox.onclick = closeBasket;

    blackBox.classList.remove("display-none");

    let templateBasketBox = document.getElementById("basket-box");
    let basketStep1 = document.getElementById("basket-step0");
    let wrap = document.querySelector(".wrapper");

    wrap.appendChild(templateBasketBox.content.cloneNode(true));
    basketBox = wrap.querySelector(".basket");


    if(basketStep1){

      resolved(basketBox.appendChild( basketStep1.content.cloneNode(true) ));
    }
    else{
      rejected(new Error("draw basket failed :( "));
    }

  });
}


function clickOnBasket(){
  let basket = this;
  drawbasket()
  .then(function(basketStep0){

    let wrapDrawElementsForBasket = drawElementsForBasket.bind(basket);
    wrapDrawElementsForBasket();

    let button = basketStep0.querySelector(".button-step1");
    addEventForButtons(circlesStep[1], button, basketStep0);

    return button;

  })
  .then(function(button){

    let elemRemove = document.querySelector(".step-2__cards");
    addEventForButtons(circlesStep[2], button, elemRemove);

    return button;

  })

}

function renderAppInBasket(index, appParam, basket){

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
