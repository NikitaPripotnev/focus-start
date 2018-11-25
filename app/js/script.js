import * as carouselModule from "./carousel.js";
import * as requestModule from "./application-download.js";
import {createBasket, initialSmallBasket} from "./basket-functions.js";
//var list =  module.downloadInfoApplication("http://localhost:3000/API/packet-applications.json");
let listApplication;
let basket;


function getLengthList(){
  return listApplication.length;
}
function addElements(list, i){
    let item = document.createElement("li");

    let a = document.createElement("a");
    a.href = "category-application.html?"+i;

    let wrapper = document.createElement("div");
    wrapper.className = "app-pack";

    let img=document.createElement("img");
    img.className = "app-pack__img";
    img.src = list[i].img;
    wrapper.appendChild(img);

    let footer=document.createElement("footer");

    let p=document.createElement("p");
    p.className = "app-pack__name";
    p.innerText=list[i].title;
    footer.appendChild(p);

    let time=document.createElement("time");
    time.className = "app-pack__time";
    time.innerText=list[i].title_time;
    time.dataTime = list[i].dataTime;
    footer.appendChild(time);
    wrapper.appendChild(footer);

    a.appendChild(wrapper);
    item.appendChild(a);
    item.className = "app-pack-wrapper"
    return item;
};
//

//точки для карусели
function carouselAddElements(){
    let wrapper = document.createElement("div");
    wrapper.className = "carousel";

    for(let i=0;i<listApplication.length;i++){
        let circle = document.createElement("div");
        circle.classList.add("carousel__circle");
        circle.dataset.number = i;
        circle.onclick = carouselModule.circleCarouselClick;
        if(i==0){
          circle.classList.add("carousel__circle_active");
        }
        wrapper.appendChild(circle);
    }
    return wrapper;
};

document.querySelector(".slider__arrow_left").onclick = carouselModule.sliderLeftArrow;
document.querySelector(".slider__arrow_right").onclick = carouselModule.sliderRightArrow;

//Рендер приложений для карусели
function renderCarousel(){
  listApplication = requestModule.list;
  let  carousel = carouselModule.carousel;
  carousel.appendChild(addElements(listApplication, listApplication.length-1));
  for(let i=0;i<7;i++){
    carousel.appendChild(addElements(listApplication, i));
  }
  carousel.appendChild(addElements(listApplication, 0));
  document.querySelector(".content__top").appendChild(carouselAddElements());
}


function startPage(){
  basket = createBasket();
  requestModule.downloadData("http://localhost:3000/API/packet-applications.json", renderCarousel);

  initialSmallBasket(basket);
}

function resizeCarousel() {

  window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    if ( !resizeTimeout ) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();

     }, 55);
    }
  }

  function actualResizeHandler() {
    // handle the resize event
    carouselModule.resizeCarousel();
  }

};

document.addEventListener("DOMContentLoaded", startPage);
document.addEventListener("DOMContentLoaded", resizeCarousel);
