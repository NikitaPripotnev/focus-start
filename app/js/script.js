/*
var list = [
    {
        img: "../assets/png/shot-1_2018-11-05/shot-1.png",
        p: "Стандартный пакет",
        dataTime: "2012-04-08",
        time: "08 апреля 2012"
    },
    {
        img: "../assets/png/shot-2_2018-11-05/shot-2.png",
        p: "Новый ЦФТ-банк",
        dataTime: "2012-04-08",
        time: "09 Сентября 2016"
    },
    {
        img: "../assets/png/shot-3_2018-11-05/shot-3.png",
        p: "Каталог разработок",
        dataTime: "2012-04-08",
        time: "03 марта 2012"
    },
    {
        img: "../assets/png/shot-1_2018-11-05/shot-1.png",
        p: "Стандартный пакет",
        dataTime: "2012-04-08",
        time: "08 апреля 2012"
    },
    {
        img: "../assets/png/shot-2_2018-11-05/shot-2.png",
        p: "Новый ЦФТ-банк",
        dataTime: "2012-04-08",
        time: "09 Сентября 2016"
    },
    {
        img: "../assets/png/shot-3_2018-11-05/shot-3.png",
        p: "Каталог разработок",
        dataTime: "2012-04-08",
        time: "03 марта 2012"
    },
    {
        img: "../assets/png/shot-2_2018-11-05/shot-2.png",
        p: "Новый ЦФТ-банк",
        dataTime: "2012-04-08",
        time: "09 Сентября 2016"
    }
];
*/
var list = [
    {
        img: "../assets/png/numbers/1.png",
        p: "Стандартный пакет",
        dataTime: "2012-04-08",
        time: "08 апреля 2012"
    },
    {
        img: "../assets/png/numbers/2.png",
        p: "Новый ЦФТ-банк",
        dataTime: "2012-04-08",
        time: "09 Сентября 2016"
    },
    {
        img: "../assets/png/numbers/3.png",
        p: "Каталог разработок",
        dataTime: "2012-04-08",
        time: "03 марта 2012"
    },
    {
        img: "../assets/png/numbers/4.png",
        p: "Стандартный пакет",
        dataTime: "2012-04-08",
        time: "08 апреля 2012"
    },
    {
        img: "../assets/png/numbers/5.png",
        p: "Новый ЦФТ-банк",
        dataTime: "2012-04-08",
        time: "09 Сентября 2016"
    },
    {
        img: "../assets/png/numbers/6.png",
        p: "Каталог разработок",
        dataTime: "2012-04-08",
        time: "03 марта 2012"
    },
    {
        img: "../assets/png/numbers/7.png",
        p: "Новый ЦФТ-банк",
        dataTime: "2012-04-08",
        time: "09 Сентября 2016"
    }
];

function addElements(list, i){
    let item = document.createElement("li");

    let wrapper = document.createElement("div");
    wrapper.className = "app-pack";

    let img=document.createElement("img");
    img.className = "app-pack__img";
    img.src = list[i].img;
    wrapper.appendChild(img);

    let footer=document.createElement("footer");

    let p=document.createElement("p");
    p.className = "app-pack__name";
    p.innerText=list[i].p;
    footer.appendChild(p);

    let time=document.createElement("time");
    time.className = "app-pack__time";
    time.innerText=list[i].time;
    time.dataTime = list[i].dataTime;
    footer.appendChild(time);
    wrapper.appendChild(footer);

    item.appendChild(wrapper);

    return item;
}
//
let carousel = document.querySelector(".content__top__galery-overflow__list");
carousel.appendChild(addElements(list, list.length-1));
for(let i=0;i<7;i++){
  carousel.appendChild(addElements(list, i));
}
carousel.appendChild(addElements(list, 0))



let indexOfSlider = 0;
let positionOfSlider = 0;
let widthOfSlider = 360;

document.querySelector(".slider__arrow_left").onclick = function() {

  let circle = document.getElementsByClassName("carousel__circle");
  circle[indexOfSlider].classList.remove("carousel__circle_active");
  if(indexOfSlider!=0){
    indexOfSlider--;
    positionOfSlider = positionOfSlider + widthOfSlider;
  }else{
    indexOfSlider = list.length-1;
    positionOfSlider = -widthOfSlider*indexOfSlider;
  }
  carousel.style.marginLeft = positionOfSlider + 'px';
  circle[indexOfSlider].classList.add("carousel__circle_active");

};

document.querySelector(".slider__arrow_right").onclick = function() {
  let circle = document.getElementsByClassName("carousel__circle");
  circle[indexOfSlider].classList.remove("carousel__circle_active");
  if(indexOfSlider!=6){
    indexOfSlider++;
    positionOfSlider = positionOfSlider - widthOfSlider;
  }else{
    indexOfSlider = 0;
    positionOfSlider = -widthOfSlider*indexOfSlider;
  }
  carousel.style.marginLeft = positionOfSlider + 'px';
  circle[indexOfSlider].classList.add("carousel__circle_active");

};

function circleCarousel(){
  indexOfSlider = this.dataset.number;
  positionOfSlider = -widthOfSlider*indexOfSlider;
  carousel.style.marginLeft = positionOfSlider + 'px';
  document.querySelector(".carousel__circle_active").classList.remove("carousel__circle_active");
  this.classList.add("carousel__circle_active");
}

function carouselka(){
    let wrapper = document.createElement("div");
    wrapper.className = "carousel";

    for(let i=0;i<list.length;i++){
        let circle = document.createElement("div");
        circle.classList.add("carousel__circle");
        circle.dataset.number = i;
        circle.onclick = circleCarousel;
        if(i==0){
          circle.classList.add("carousel__circle_active");
        }
        wrapper.appendChild(circle);
    }
    return wrapper;
}
document.querySelector(".content__top").appendChild(carouselka());
