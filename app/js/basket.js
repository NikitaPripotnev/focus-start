import {setItemsLocalStorage} from "./basket-functions.js";

let basketPrice = document.querySelector(".header__basket__price");
let basketClose = document.querySelector(".header__basket__svg-close");

export class Basket  {
  constructor(price, count) {
    this.price = price;
    this.count = count;
    this.appData = [];

    //перенести за класс
    basketPrice.innerText=this.price;
  }
  addApp(price, id){
    this.price = price+this.price;
    this.count++;
    let index=this.appData.findIndex(function(elem,i){
      return elem.id==id;
    });
    if(index!=-1){
      this.appData[index].count++;
    }
    else{
      this.appData.push({id: id, count: 1});
    }
    setItemsLocalStorage(this.price, this.count, this.appData);


    //перенести за класс
    basketPrice.innerText=this.price;
    if(basketClose.style.display=="none"){
      basketClose.style.display = "inline-block";
    }
  }
  clear(){
    this.price = 0;
    this.count = 0;
    this.appData = [];
    localStorage.clear();

    //перенести за класс
    basketPrice.innerText=this.price;
    basketClose.style.display = "none";
  }

};
