

let length = 7;
let indexOfSlider = 0;
let positionOfSlider = 0;
let widthOfSlider = 360;
let carousel = document.querySelector(".content__top__galery-overflow__list");
//document.querySelector(".slider__arrow_left").onclick =
 function sliderLeftArrow() {

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
  indexOfSlider = this.dataset.number;
  positionOfSlider = -widthOfSlider*indexOfSlider;
  carousel.style.marginLeft = positionOfSlider + 'px';
  document.querySelector(".carousel__circle_active").classList.remove("carousel__circle_active");
  this.classList.add("carousel__circle_active");
};



export{sliderRightArrow, sliderLeftArrow, circleCarouselClick, carousel};
