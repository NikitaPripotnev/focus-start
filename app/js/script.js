
var list = [
    { 
        img: "../assets/png/shot-1_2018-11-05/shot-1.png", 
        p: "Стандартный пакет", 
        dataTime: "2012-04-08", 
        time: "08 апреля 2012"  
    },
    { 
        img: "../assets/png/shot-2_2018-11-05/shot-2.png", 
        p: "Новый ЦФТ-банк", 
        dataTime: "2012-04-08", 
        time: "09 Сентября 2016" 
    },
    { 
        img: "../assets/png/shot-3_2018-11-05/shot-3.png", 
        p: "Каталог разработок", 
        dataTime: "2012-04-08", 
        time: "03 марта 2012" 
    },
    { 
        img: "../assets/png/shot-1_2018-11-05/shot-1.png", 
        p: "Стандартный пакет", 
        dataTime: "2012-04-08", 
        time: "08 апреля 2012"  
    },
    { 
        img: "../assets/png/shot-2_2018-11-05/shot-2.png", 
        p: "Новый ЦФТ-банк", 
        dataTime: "2012-04-08", 
        time: "09 Сентября 2016" 
    },
    { 
        img: "../assets/png/shot-3_2018-11-05/shot-3.png", 
        p: "Каталог разработок", 
        dataTime: "2012-04-08", 
        time: "03 марта 2012" 
    },
    { 
        img: "../assets/png/shot-2_2018-11-05/shot-2.png", 
        p: "Новый ЦФТ-банк", 
        dataTime: "2012-04-08", 
        time: "09 Сентября 2016" 
    }
];


function addElements(list, i){

    let wrapper = document.createElement("div");
    wrapper.className = "app-pack";

    let img=document.createElement("img");
    img.className = "app-pack__img";
    img.src = list[i].img;
    wrapper.appendChild(img);

    let footer=document.createElement("footer");
    
    let p=document.createElement("p");
    p.className = "app-pack__name";
    p.innerText=list[i].p;
    footer.appendChild(p);

    let time=document.createElement("time");
    time.className = "app-pack__time";
    time.innerText=list[i].time;
    time.dataTime = list[i].dataTime;
    footer.appendChild(time);
    wrapper.appendChild(footer);

    return wrapper;
}

var parent = document.getElementsByClassName("content__top__galery-overflow");

parent[0].appendChild( addElements(list, Math.floor(Math.random() * list.length )));
parent[0].appendChild( addElements(list, Math.floor(Math.random() * list.length )) );
parent[0].appendChild( addElements(list, Math.floor(Math.random() * list.length )) );
parent[0].appendChild( addElements(list, Math.floor(Math.random() * list.length )));
parent[0].appendChild( addElements(list, Math.floor(Math.random() * list.length )) );
parent[0].appendChild( addElements(list, Math.floor(Math.random() * list.length )) );

function carousel(){
    let wrapper = document.createElement("div");
    wrapper.className = "carousel";

    for(let i=0;i<list.length;i++){
        let circle = document.createElement("div");
        circle.className = "carousel__circle";
        wrapper.appendChild(circle);
    }


}