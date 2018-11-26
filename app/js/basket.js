import {setItemsLocalStorage} from "./basket-functions.js";


export class Basket  {
  constructor(price, count) {
    this.price = price;
    this.count = count;
    this.appData = [];

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

  }
  clear(){
    this.price = 0;
    this.count = 0;
    this.appData = [];
    localStorage.clear();

  }

};
