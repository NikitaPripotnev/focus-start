import * as requestModule from "./application-download.js";
import {addEventForButtons,closeBasket, addActiveStep, drawSteps, clickToggle} from "./basket-draw-other.js";
import {setItemsLocalStorage, showDataSmallBasket} from "./basket-functions.js";
import {basket as basketFromFunc} from "./basket-functions.js";

let basketBox;
export let circlesStep;



function addElementsForStep1(basket){

  basket.appData.forEach(function(elem, index){
    requestModule.downloadData("http://localhost:3000/API/application" + elem.id + ".json").then(function(listApplication){
      let funcWrap = renderAppInBasket.bind(elem, index, listApplication, basket);
      funcWrap();
    });

  });

  let button = basketBox.querySelector(".button-step1");
  button.addEventListener("click", functionForButton1);
}

export function drawBasket(basket){
  if(basket.price!=0){
    let blackBox = document.querySelector(".basket-wrapper");
    blackBox.classList.remove("display-none");
    blackBox.addEventListener("click", closeBasket);

    let wrap = document.querySelector(".wrapper");
    let templateBasketBox = document.getElementById("basket-box");
    wrap.appendChild(templateBasketBox.content.cloneNode(true));
    let basketStep1 = document.getElementById("basket-step0");

    basketBox = wrap.querySelector(".basket");
    basketBox.appendChild(basketStep1.content.cloneNode(true));
    circlesStep = document.querySelectorAll(".step");
    circlesStep.forEach(function(element, id){
      element.dataset.id = id;
    });
    addElementsForStep1(basket);
    circlesStep[0].addEventListener("click", functionForButton2Back);
    circlesStep[1].addEventListener("click", functionForButton1);
    circlesStep[2].addEventListener("click", functionForButton2);

  }
  else{
    alert("Добавьте что-нибудь в корзину для покупки!")
  }

}

function functionForButton1(){
  let promise1 = new Promise(  function(resolve, reject) {

    let changeStep = addActiveStep.bind(circlesStep[1]);
    changeStep();

    let draw = drawSteps.bind(circlesStep[1]);
    draw();
    setInfoCards();
    let step2template = document.querySelector(".step-2__cards");
    if(step2template){
      resolve(".button-step2");
    }
    else{
      reject(console.log(" button1 failed =(( "))
    }
      });

    promise1.then(function(buttonClass){

      let button = document.querySelector(buttonClass);
      button.addEventListener("click", functionForButton2);
      let buttonBack = document.querySelector(".button-step2_back");
      console.log(document.querySelector(".button-step2_back"), "check in checkafsdf")
      buttonBack.addEventListener("click", functionForButton2Back);
    }).catch(e => {
    console.log(e, "func1");
});
}
function addDownloadAnimation(){
  let templateDownloadBox = document.getElementById("pauseDownload");
  let wrap = document.querySelector(".wrapper");
  wrap.appendChild(templateDownloadBox.content.cloneNode(true));

  document.querySelector(".basket-wrapper").removeEventListener("click", closeBasket );
}
function deleteDownloadAnimation(){
  let downloadBox = document.querySelector(".pauseDownload-box");
  let wrap = document.querySelector(".wrapper");
  wrap.removeChild(downloadBox);
  document.querySelector(".basket-wrapper").addEventListener("click", closeBasket );
}


function functionForButton2Back(){
  let promise2back = new Promise(  function(resolve, reject) {

      let changeStep = addActiveStep.bind(circlesStep[0]);
      changeStep();

      let draw = drawSteps.bind(circlesStep[0]);
      draw();
      addElementsForStep1(basketFromFunc);
      let step1template = document.querySelector(".step1-application");
      if(step1template){
        resolve(".button-step1");
      }
      else{
        reject(console.log(" button2back failed =(( "))
      }

  });

  promise2back.then(function(buttonClass){

    let button = document.querySelector(buttonClass);
    button.addEventListener("click", functionForButton1);

  }).catch(e => {
    console.log(e,"func2back");
});
}



function functionForButton2(){
  let promise2 = new Promise(  function(resolve, reject) {

    addDownloadAnimation();
    getInfoCards();

    setTimeout(function(){

      let changeStep = addActiveStep.bind(circlesStep[2]);
      changeStep();

      let draw = drawSteps.bind(circlesStep[2]);
      draw();
      setContactInfo()
      document.querySelector(".toggle").onclick = clickToggle;
      let step3template = document.querySelector(".step-3__contact-info-wrapper");
      if(step3template){
        resolve(".button-step3");
      }
      else{
        reject(console.log(" button2 failed =(( "))
      }
    }, Math.random()*2000)

  });

  promise2.then(function(buttonClass){

    let button = document.querySelector(buttonClass);
    button.addEventListener("click", functionForButton3);

    deleteDownloadAnimation();

  }).catch(e => {
    console.log(e,"func2");
});
}

function functionForButton3(){
  let promise3 = new Promise(  function(resolve, reject) {
    addDownloadAnimation();
    getContactInfo();

    setTimeout(function(){

      console.log(checkCardsInfo, checkContactInfo);
      if(checkData()){
        console.log(localStorage.getItem("cardNumber"), "check");
        let changeStep = addActiveStep.bind(circlesStep[3]);
        changeStep();

        let draw = drawSteps.bind(circlesStep[3]);
        draw();
        let step3template = document.querySelector(".step-4__success-wrapper");
        resolve(".button-step4");
      }
      else{
        reject(console.log(" data is not full =("))
      }
    }, Math.random()*3000)

  });

  promise3.then(function(buttonClass){
    circlesStep[0].removeEventListener("click", functionForButton2Back);
    circlesStep[1].removeEventListener("click", functionForButton1);
    circlesStep[2].removeEventListener("click", functionForButton2);
    let button = document.querySelector(buttonClass);
    button.addEventListener("click", functionForButton4);
    deleteDownloadAnimation();
      document.querySelector(".basket-wrapper").removeEventListener("click", closeBasket );
  }, function(){
    alert("Не введены все данные!!!");
    deleteDownloadAnimation();
  })
}

function functionForButton4(){
  //СОХРАНИТЬ в JSON и ОТПРАВИТЬ

  closeBasket();
}



function getInfoCards(){
  try{
    localStorage.setItem("cardNumber", document.querySelector(".input-number-card").value);
    localStorage.setItem("month", document.querySelector(".input-year-month_left").value);
    localStorage.setItem("year", document.querySelector(".input-year-month_right").value);
    localStorage.setItem("cardHolder", document.getElementById("card-holder").value);
  }
  catch(e){
    console.log(e);
    checkCardsInfo=false;
  }
}
let checkCardsInfo = true;
let checkContactInfo = true;
function getContactInfo(){
  try{
      localStorage.setItem("surname", document.getElementById("surname").value);
      localStorage.setItem("name", document.getElementById("name").value);
      localStorage.setItem("telephone", document.getElementById("telephone").value);
      localStorage.setItem("email", document.getElementById("email").value);
      localStorage.setItem("organization", document.getElementById("organization").value);
      localStorage.setItem("INN", document.getElementById("INN").value);
      localStorage.setItem("city", document.getElementById("city").value);

      localStorage.setItem("consult", document.querySelector(".toggle").dataset.check);
      localStorage.setItem("quick-install", document.getElementById("quick-install").checked);
      localStorage.setItem("def-install", document.getElementById("def-install").checked);

    }
    catch(e){
      console.log(e);
      checkContactInfo = false;
    }

}
function checkData(){
  if(
    (localStorage.getItem("cardNumber")!=null)&&
    (localStorage.getItem("month")!=null)&&
    (localStorage.getItem("year")!=null)&&
    (localStorage.getItem("cardHolder")!=null)&&
    (localStorage.getItem("surname")!=null)&&
    (localStorage.getItem("name")!=null)&&
    (localStorage.getItem("telephone")!=null)&&
    (localStorage.getItem("email")!=null)&&
    (localStorage.getItem("organization")!=null)&&
    (localStorage.getItem("INN")!=null)&&
    (localStorage.getItem("surname")!=null)&&(
    (localStorage.getItem("quick-install")!=null)||
    (localStorage.getItem("cdef-install")!=null))
  )
    return true;
  else {
    return false;
  }
}
function setInfoCards(){
  document.querySelector(".input-number-card").value = localStorage.getItem("cardNumber");
  document.querySelector(".input-year-month_left").value = localStorage.getItem("month");
  document.querySelector(".input-year-month_right").value = localStorage.getItem("year");
  document.getElementById("card-holder").value = localStorage.getItem("cardHolder");
}

function setContactInfo(){
  document.getElementById("surname").value = localStorage.getItem("surname");
  document.getElementById("name").value = localStorage.getItem("name");
  document.getElementById("telephone").value = localStorage.getItem("telephone");
  document.getElementById("email").value = localStorage.getItem("email");
  document.getElementById("organization").value = localStorage.getItem("organization");
  document.getElementById("INN").value = localStorage.getItem("INN");
  document.getElementById("city").value = localStorage.getItem("surname");

  let toggle = document.querySelector(".toggle")
  if(localStorage.getItem("consult")=="false"){
    toggle.classList.add("toggle__off");
    toggle.classList.remove("toggle__on");
  }else if(localStorage.getItem("consult")=="true"){
    toggle.classList.add("toggle__on");
    toggle.classList.remove("toggle__off");
  }

  document.getElementById("quick-install").checked = !!localStorage.getItem("quick-install");
  document.getElementById("def-install").checked = !!localStorage.getItem("def-install");


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
