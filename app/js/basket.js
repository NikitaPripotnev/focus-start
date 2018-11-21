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
    this.price = price+this.price;
    let index=this.appData.findIndex(function(elem,i){
      return elem.id==id;
    });
    if(index!=-1){
      this.appData[index].count++;
    }
    else{
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
