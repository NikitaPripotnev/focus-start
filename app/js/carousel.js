

let length;
let indexOfSlider = 0;
let positionOfSlider = 0;
let widthOfSlider;
let carousel = document.querySelector(".content__top__galery-overflow__list");


 function sliderLeftArrow() {
  let wrapperLi = document.querySelectorAll(".app-pack-wrapper");
  widthOfSlider = wrapperLi[0].clientWidth;
  length = wrapperLi.length-2;
  let circle = document.getElementsByClassName("carousel__circle");
  circle[indexOfSlider].classList.remove("carousel__circle_active");
  if(indexOfSlider!=0){
    indexOfSlider--;
    positionOfSlider = positionOfSlider + widthOfSlider;
  }else{
    indexOfSlider = length-1;
    positionOfSlider = -widthOfSlider*indexOfSlider;
  }
  carousel.style.marginLeft = positionOfSlider + 'px';
  circle[indexOfSlider].classList.add("carousel__circle_active");

}
//document.querySelector(".slider__arrow_right").onclick =
function sliderRightArrow() {
  let wrapperLi = document.querySelectorAll(".app-pack-wrapper");
  widthOfSlider = wrapperLi[0].clientWidth;
  length = wrapperLi.length-2;
  let circle = document.getElementsByClassName("carousel__circle");
  circle[indexOfSlider].classList.remove("carousel__circle_active");
  if(indexOfSlider!=length-1){
    indexOfSlider++;
    positionOfSlider = positionOfSlider - widthOfSlider;
  }else{
    indexOfSlider = 0;
    positionOfSlider = -widthOfSlider*indexOfSlider;
  }
  carousel.style.marginLeft = positionOfSlider + 'px';
  circle[indexOfSlider].classList.add("carousel__circle_active");
}

function circleCarouselClick(){
  let wrapper = document.querySelector(".app-pack-wrapper");
  widthOfSlider = wrapper.clientWidth;
  indexOfSlider = this.dataset.number;
  positionOfSlider = -widthOfSlider*indexOfSlider;
  carousel.style.marginLeft = positionOfSlider + 'px';
  document.querySelector(".carousel__circle_active").classList.remove("carousel__circle_active");
  this.classList.add("carousel__circle_active");
};
function resizeCarousel(){
  let wrapper = document.querySelector(".app-pack-wrapper");
  widthOfSlider = wrapper.clientWidth;
  positionOfSlider = -widthOfSlider*indexOfSlider;
  carousel.style.marginLeft = positionOfSlider + 'px';
};



export{sliderRightArrow, sliderLeftArrow, circleCarouselClick, carousel, resizeCarousel};
