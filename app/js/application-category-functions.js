import * as requestModule from "./application-download.js";
import {Basket} from "./basket.js";

let listApplication;
let numApp=7;
let basket;
let get = location.search;
console.log(get, "start");
if(get == '') get = "standart-pack.json"  ;
else{
  get = get.replace("?", "");
};

function addDeleteActiveLink(link){
  let sideBar = document.querySelector(".catalog__nav__menu");
  sideBar.querySelector(".link_active").classList.remove("link_active");
  link.classList.add("link_active");
}

function renderAppInfo(){
  listApplication = requestModule.list;
  console.log(listApplication,"from renerAppInfo");
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

  wrap.querySelector(".application__info2__img").src = listApplication.img_category;

  wrap.querySelector(".application__info2__price").innerText = listApplication.price;

  wrap.querySelector(".button_basket").onclick = clickButtonBasket;

}


function renderApp(){

  let template = document.querySelector(".application");
  let wrap = document.querySelector(".category-content");

  wrap.appendChild(template.content.cloneNode(true));
  renderAppInfo();
}

function sideBarFunc(){

  addDeleteActiveLink(this);
  renderAppInfo();
}

export function clickSideBar(id){
  console.log(this, id, "clickSideBar")
  if(id>=numApp){
    alert("Извините, данное приложение временно отсутствует")
  }
  else{
    let funcWrap = sideBarFunc.bind(this);
    requestModule.downloadData("http://localhost:3000/API/application" + id + ".json", funcWrap );
  }
}



export function categoryOnLoad(){
  requestModule.downloadData("http://localhost:3000/API/application" + get + ".json", renderApp);
  basket = new Basket(0);
}

function clickButtonBasket(){
  basket.addApp(listApplication.price, listApplication.id);
}
export function clickClose(){
  basket.clear();
}
