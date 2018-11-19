const xhr = new XMLHttpRequest();

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
