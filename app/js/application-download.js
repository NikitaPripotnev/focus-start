
/*
export let list;
export function downloadData(url, someFunc){
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;

    if (xhr.status != 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      list = JSON.parse(xhr.responseText);
      someFunc();
    }
  }
};
*/
export function downloadData(url) {
  return new Promise(function(resolved, rejected) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.addEventListener("load", function() {
      if (xhr.status < 400)
        resolved(JSON.parse(xhr.responseText));
      else
        rejected(new Error("Request failed: " + xhr.statusText));
    });
    xhr.addEventListener("error", function() {
      rejected(new Error("Network error"));
    });
    xhr.send();
  });
}
