


function closeBasket(){

  document.querySelector(".basket-wrapper").classList.add("display-none");

  let basket = document.querySelector(".basket");
  let wrap = document.querySelector(".wrapper");
  wrap.removeChild(basket);

}



/*
export function drawSteps(elemRemove) {
  return new Promise(function(resolved, rejected) {
    let basket = document.querySelector(".basket");
    let basketStep = document.getElementById("basket-step"+this.dataset.id);
    if(basketStep){
      basket.removeChild(elemRemove);
      resolved(basket.appendChild(basketStep.content.cloneNode(true)));
    }
    else{
      rejected(new Error("draw failed in: basket-step"+this.dataset.id));
    }
  });
}
*/


export {addEventForButtons,closeBasket}
