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

function closeBasket(){

  document.querySelector(".basket-wrapper").classList.add("display-none");

  let basket = document.querySelector(".basket");
  let wrap = document.querySelector(".wrapper");
  wrap.removeChild(basket);

}

function drawSteps(elemRemove){

  let basket = document.querySelector(".basket");
  let basketStep = document.getElementById("basket-step"+this.dataset.id);
  basket.replaceChild(basketStep.content.cloneNode(true), basket.lastElementChild);

}

function addEventForButtons(circlesStepNumberStep, classButton){
  let changeStep = addActiveStep.bind(circlesStepNumberStep);
  let button = document.querySelector(classButton);
  button.addEventListener("click", changeStep);

  let drawStep3 = drawSteps.bind(circlesStepNumberStep);
  button.addEventListener("click", drawStep3);
}

function clickToggle(){
  if(this.classList.contains('toggle__on')){
    this.classList.add("toggle__off");
    this.classList.remove("toggle__on");
    this.dataset.check = "false";

  }else{
    this.classList.add("toggle__on");
    this.classList.remove("toggle__off");
    this.dataset.check = "true";
  }
  console.log(this.dataset.check, "inClickToggle")
}



export {addEventForButtons, closeBasket, drawSteps, addActiveStep, clickToggle}
