import * as requestModule from "./application-download.js";

import {createBasket, initialSmallBasket, setItemsLocalStorage, showDataSmallBasket} from "./basket-functions.js";

let listApplication;
let numApp=7;
let basket;
let get = location.search;
if(get == '') get = "standart-pack.json"  ;
else{
  get = get.replace("?", "");
};

function addDeleteActiveLink(link){
  let sideBar = document.querySelector(".catalog__nav__menu");
  sideBar.querySelector(".link_active").classList.remove("link_active");
  link.classList.add("link_active");
}

function renderAppInfo(listApplication){

  let wrap = document.querySelector(".category-content");

  wrap.querySelector(".application__title").innerText = listApplication.title;

  let appTime = wrap.querySelector(".application__time");
  appTime.innerText = listApplication.title_time;
  appTime.dataTime = listApplication.dataTime;

  wrap.querySelector(".application__short-information").innerText = listApplication.short_information;

  wrap.querySelector(".application__type").innerText = listApplication.application__type;

  wrap.querySelector(".application__developer").innerText = listApplication.application__developer;

  wrap.querySelector(".application__code").innerText = listApplication.application__code;

  wrap.querySelector(".application__requirement").innerText = listApplication.application__requirement;

  wrap.querySelector(".application__info2__img").src = listApplication.img;

  wrap.querySelector(".application__info2__price").innerText = listApplication.price;

  let funcClickButtonBasket = clickButtonBasket.bind(this, listApplication);
  wrap.querySelector(".button_basket").onclick = funcClickButtonBasket;

}


function renderApp(listApplication){

  let template = document.querySelector(".application");
  let wrap = document.querySelector(".category-content");

  wrap.appendChild(template.content.cloneNode(true));
  renderAppInfo(listApplication);
}

function sideBarFunc(listApplication){

  addDeleteActiveLink(this);
  renderAppInfo(listApplication);
}

export function clickSideBar(id){

  let link = this;

  if(id>=numApp){
    alert("Извините, данное приложение временно отсутствует");
  }
  else{
    requestModule.downloadData("http://localhost:3000/API/application" + id + ".json")
    .then(function(listApplication){
      let funcWrap = sideBarFunc.bind(link, listApplication);
      funcWrap();
    });
  }
}

function initialLinks(){
  let linksSideBar = document.querySelectorAll(".catalog__nav__menu__item__link");
  linksSideBar.forEach(function(element, id){
    var funcWrap = clickSideBar.bind(element, id);
    element.onclick = funcWrap;
  });
}

export function categoryOnLoad(){
  basket = createBasket();
  addDeleteActiveLink(document.querySelectorAll(".catalog__nav__menu__item__link")[get]);
  requestModule.downloadData("http://localhost:3000/API/application" + get + ".json").then(function(list){
    let listApplication = list;
    renderApp(listApplication)
  });
  initialLinks();
  initialSmallBasket(basket);
}

function clickButtonBasket(listApplication){
  basket.addApp(parseInt(listApplication.price), listApplication.id);
  setItemsLocalStorage(basket.price, basket.count, basket.appData);
  showDataSmallBasket(basket);
}
