
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

  basket.removeChild(elemRemove);
  basket.appendChild(basketStep.content.cloneNode(true));

}

function addEventForButtons(circlesStepNumberStep, classButton, classRemoveElement){
  let changeStep = addActiveStep.bind(circlesStepNumberStep);
  let button = document.querySelector(classButton);
  button.addEventListener("click", changeStep);

  let elemRemove = document.querySelector(classRemoveElement);
  let drawStep3 = drawSteps.bind(circlesStepNumberStep, elemRemove);
  button.addEventListener("click", drawStep3);
}

export {addEventForButtons,closeBasket}
