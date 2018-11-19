import * as appCategoryFunctions from "./application-category-functions.js";

appCategoryFunctions.categoryOnLoad();
let linksSideBar = document.querySelectorAll(".catalog__nav__menu__item__link");
linksSideBar.forEach(function(element){
  element.onclick = appCategoryFunctions.clickSideBar;
});
