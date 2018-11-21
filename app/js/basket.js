let colorRed = "#f54b5e";
let colorLightGrey = "#adafb2";
let basketPrice = document.querySelector(".header__basket__price");
let basketClose = document.querySelector(".header__basket__svg-close");
export class Basket  {
  constructor(price) {
    this.price=price;
    this.appData = [];

    //перенести за класс
    basketPrice.innerText=this.price;
  }
  addApp(price, id){
    let flag = false;
    this.price= parseInt(this.price) + parseInt(price);
    this.appData.forEach(function(elem, i){
      if((elem.id)==id){
        elem.count++;
        flag=true;
      }
    });
    if(!flag){
      this.appData.push({id: id, count: 1});
    }
    console.log(this.appData, "addApp in class Basket");


    //перенести за класс
    basketPrice.innerText=this.price;
    if(basketClose.style.display=="none"){
      basketClose.style.display = "inline-block";
    }
  }
  clear(){
    this.price=0;
    this.appData = [];
    console.log(this.appData, "clear ib class Basket");

    //перенести за класс
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
