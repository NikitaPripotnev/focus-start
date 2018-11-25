import {addEventForButtons} from "./basket-draw-other.js";
import {circlesStep} from "./basket-draw.js";

addEventForButtons(circlesStep[3], ".button-step3", ".step-3__contact-info-wrapper");

function clickToggle(){
  if(this.classList.contains('toggle__on')){
    this.classList.remove("toggle__on");
  }else{
    this.classList.add("toggle__on");
  }

}

document.querySelector(".toggle").onclick = clickToggle;
