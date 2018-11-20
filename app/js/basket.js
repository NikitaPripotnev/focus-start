let colorRed = "#f54b5e";
let colorLightGrey = "#adafb2";
let basketPrice = document.querySelector(".header__basket__price");
let basketClose = document.querySelector(".header__basket__svg-close");
export class Basket  {
  constructor(price) {
    this.price=price;
    basketPrice.innerText=this.price;
  }
  sum(price){
    this.price= parseInt(this.price) + parseInt(price);
    basketPrice.innerText=this.price;
    if(basketClose.style.display=="none"){
      basketClose.style.display = "inline-block";
      console.log(basketClose, basketClose.style.display);
    }
  }
  clear(){
    this.price=0;
    basketPrice.innerText=this.price;
    basketClose.style.display = "none";
  }

};

export function basketFocus(){
  document.querySelector(".header__basket__svg-basket").style.stroke = colorRed;
  document.querySelector(".header__basket__price").style.color = colorRed;
  document.querySelector(".header__basket__dollar").style.color = colorRed;
}
export function basketUnFocus(){
  document.querySelector(".header__basket__svg-basket").style.stroke = colorLightGrey;
  document.querySelector(".header__basket__price").style.color = colorLightGrey;
  document.querySelector(".header__basket__dollar").style.color = colorLightGrey;
}
