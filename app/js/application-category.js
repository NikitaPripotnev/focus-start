import * as appCategoryFunctions from "./application-category-functions.js";
import {basketFocus, basketUnFocus} from "./basket.js";

appCategoryFunctions.categoryOnLoad();

let linksSideBar = document.querySelectorAll(".catalog__nav__menu__item__link");
linksSideBar.forEach(function(element, id){
  var funcWrap = appCategoryFunctions.clickSideBar.bind(element, id);
  element.onclick = funcWrap;
});

let basketWithoutClose = document.querySelector(".header__basket-without-close");
basketWithoutClose.onmouseover = basketFocus;
basketWithoutClose.onmouseout = basketUnFocus;

document.querySelector(".header__basket__svg-close").onclick = appCategoryFunctions.clickClose;
