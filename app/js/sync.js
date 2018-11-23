const xhr = new XMLHttpRequest();

export let list;
export function downloadDataSync(url, someFunc){
  xhr.open('GET', url, false);
  xhr.send();
  list = JSON.parse(xhr.responseText);
  someFunc();
};
