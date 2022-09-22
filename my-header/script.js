
const overlay = document.querySelector('.overlay');
const burger = document.querySelector('.burger');

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function toggleMenu() {

    document.querySelector('.content').classList.toggle('content__active')
    overlay.classList.toggle('overlay__active')
    burger.classList.toggle('burger__active')
}



document.querySelector('.listbox__open').addEventListener('click', openList);
document.querySelector('.listbox__overlay').addEventListener('click', function() {
    document.querySelector('.listbox').classList.toggle('listbox__active');
});;

let arr = new Array();
const cityblock = document.querySelector('.cityblock');

function doPost() {
    
    var xhr = new XMLHttpRequest(); 
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            arr = JSON.parse(xhr.responseText);
            for(let i = 0; i<arr.length; i++) {
                cityblock.appendChild( createDiv(arr[i].name ));      
            }
        }
    }
    xhr.open("POST", 'https://studika.ru/api/areas', true);
    xhr.send();

}

function createDiv(text) {
    let div = document.createElement('div');
    div.textContent = text;

    return div
}

function openList() {
    document.querySelector('.listbox').classList.toggle('listbox__active');
    if(arr.length > 0) {
        console.log("уже сделали постзапрос");
    }
    else {
        doPost();
    }
}
