import * as requestModule from "./application-download.js";

let listApplication;
let linkSideBar;
let get = location.search;
if(get == '') get=0
else{
  get = get.split("?")
};

function addDeleteActiveLink(link){
  let sideBar = document.querySelector(".catalog__nav__menu");
  sideBar.querySelector(".link_active").classList.remove("link_active");
  link.classList.add("link_active");
}

function renderAppInfo(i){
  listApplication = requestModule.list;
  console.log(listApplication, i, listApplication[i],"from renerAppInfo");
  let wrap = document.querySelector(".category-content");

  wrap.querySelector(".application__title").innerText = listApplication[i].title;

  let appTime = wrap.querySelector(".application__time");
  appTime.innerText = listApplication[i].title_time;
  appTime.dataTime = listApplication[i].dataTime;

  wrap.querySelector(".application__short-information").innerText = listApplication[i].short_information;

  wrap.querySelector(".application__type").innerText = listApplication[i].application__type;

  wrap.querySelector(".application__developer").innerText = listApplication[i].application__developer;

  wrap.querySelector(".application__code").innerText = listApplication[i].application__code;

  wrap.querySelector(".application__requirement").innerText = listApplication[i].application__requirement;

  wrap.querySelector(".application__info2__img").src = listApplication[i].img_category;

}

function renderApp(){
  let template = document.querySelector(".application");
  let wrap = document.querySelector(".category-content");

  wrap.appendChild(template.content.cloneNode(true));
  renderAppInfo(get[1]);
}

export function categoryOnLoad(){
  requestModule.downloadData("http://localhost:3000/API/packet-applications.json", renderApp);
}

function sideBarFunc(){

  let indexApp=0;
  console.log("вызов sideBar")
  for(indexApp; indexApp<listApplication.length; indexApp++){
          if(listApplication[indexApp].title==linkSideBar.innerHTML){
            break;
          }
      }
  if(indexApp==listApplication.length){
    indexApp=0;
    alert("Извините, данное приложение временно отсутствует")
  }
  addDeleteActiveLink(linkSideBar);
  renderAppInfo(indexApp);
}

export function clickSideBar(){
  linkSideBar = this;
  requestModule.downloadData("http://localhost:3000/API/packet-applications.json", sideBarFunc );
}
