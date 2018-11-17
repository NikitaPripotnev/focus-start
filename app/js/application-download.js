export const xhr = new XMLHttpRequest();
let listApplication;

export function downloadInfoApplication(url){
  let list;
  xhr.open('GET', url, true);
  xhr.send();

  xhr.onreadystatechange = function() { 
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
    } else {
      alert(xhr.responseText);
    }

  }
  xhr.onload = function(){
    list = JSON.parse(xhr.responseText);
    console.log(list, "onload");
  }
  console.log(list, "downloadInfoApplication");
  return list;
};

