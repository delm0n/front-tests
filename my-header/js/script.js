/* боковое меню/бургер */

const overlay = document.querySelector('.overlay');
const burger = document.querySelector('.burger');

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function toggleMenu() {

    document.querySelector('.content').classList.toggle('content__active')
    overlay.classList.toggle('overlay__active')
    burger.classList.toggle('burger__active')
}

/* выпадающий список */

document.querySelector('.listbox__open').addEventListener('click', openList);
document.querySelector('.listbox__overlay').addEventListener('click', function () {
    document.querySelector('.listbox').classList.toggle('listbox__active');
});;

let arr = new Array(); //список всех городов
const cityblock = document.querySelector('.cityblock');


//отправка пост-запроса
function doPost() {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            arr = JSON.parse(xhr.responseText);
            for (let i = 0; i < arr.length; i++) {
                cityblock.appendChild(createDiv(arr[i].name));
            }

            //прелодер
            document.querySelector('.loader').classList.toggle('loader__hide');

            canClick();

        }
    }
    xhr.open("POST", 'https://studika.ru/api/areas', true);
    xhr.send();

}

//создание div с текстом внутри
function createDiv(text) {
    let div = document.createElement('div');
    div.textContent = text;
    return div
}
function craeteDivAndClose(text) {

    let div = createDiv(text);

    let close = document.createElement('div');
    close.classList.add('close');
    close.onclick = function () {

        document.querySelectorAll('.cityblock div.__active')[arrChoose.indexOf(div.textContent)].classList.remove('__active');
        arrChoose.splice(arrChoose.indexOf(div.textContent), 1)
        checkButton();
        updateArrChoose();

    }

    div.appendChild(close)

    return div
}


function openList() {

    //arrChoose = arrChooseGlobal;
    checkButton();
    document.querySelector('.listbox').classList.toggle('listbox__active');
    if (arr.length > 0) {
        console.log("уже сделали постзапрос");
    }
    else {
        doPost();
    }
}

let arrChooseGlobal = new Array(); //список выбранных городов глобального СОСТОЯНИЯ
let arrChoose = new Array(); //список выбранных городов в выпадающем списке
const choosecitylist = document.querySelector('.choosecitylist').children;

//инициализация дочерних объектов, полученных с сервера, и добавление на них событий
function canClick() {

    const cityblockChildList = cityblock.children;

    for (let i = 0; i < cityblockChildList.length; i++) {
        cityblockChildList[i].addEventListener('click', function () {

            if (arrChoose.includes(cityblockChildList[i].textContent)) {
                cityblockChildList[i].classList.remove('__active');
                arrChoose.splice(arrChoose.indexOf(cityblockChildList[i].textContent), 1)

                checkButton();
                updateArrChoose();
            }

            else {
                cityblockChildList[i].classList.add('__active');
                arrChoose.push(cityblockChildList[i].textContent);

                checkButton();
                updateArrChoose();
            }
            console.log(arrChoose);
        });
    }
}


//обновление списка выбранных регионов
function updateArrChoose() {
    document.querySelector('.choosecitylist').innerHTML = '';

    if (arrChoose.length != 0) {
        for (let j = 0; j < arrChoose.length; j++) {
            document.querySelector('.choosecitylist').appendChild(craeteDivAndClose(arrChoose[j]));

        }
    }
    else {
        let anyRegion = createDiv('Любой регион');
        anyRegion.style = 'padding-right: 16px ;'
        document.querySelector('.choosecitylist').appendChild(anyRegion);

    }
}


function checkButton() {
    //проверяем, есть ли изменения
    if (JSON.stringify(arrChoose.sort()) === JSON.stringify(arrChooseGlobal.sort())) {
        document.querySelector('.save').classList.remove('save__active');
    }

    else {
        document.querySelector('.save').classList.add('save__active');
    }
}

//действия по клику на кнопку сохранить
function clickSave() {
    if (document.querySelector('.save').classList.contains('save__active')) {
        arrChooseGlobal = []
        let strCity = '';

        for (let i = 0; i < arrChoose.length; i++) {
            arrChooseGlobal.push(arrChoose[i])
            strCity += arrChoose[i];
            if (i < arrChoose.length - 1) {
                strCity += ", "
            }
        }

        if (strCity == '') {
            document.querySelector('.textblock').textContent = 'Любой регион';
            
    }
        else {
            document.querySelector('.textblock').textContent = strCity;
        }

        document.cookie = "region=" + strCity   ;
        document.querySelector('.listbox').classList.toggle('listbox__active');
    }
}

//подсказки по вводу значения в input
function hint(event) {

    if (event.target.value !== '') {
        document.querySelector('.closeicon').classList.add('closeicon__active');
        let str = event.target.value[0].toUpperCase() + event.target.value.slice(1);

        for (let i = 0; i < cityblock.children.length; i++) {
            cityblock.children[i].style = ''
            if (!cityblock.children[i].textContent.includes(str)) {
                cityblock.children[i].style = 'display: none'
            }
            else {
                cityblock.children[i].innerHTML =cityblock.children[i].textContent
                .replace(str, '<b style="color:#0656B4">' + str + '</b>')
            }
        }
    }

    else {
        cleanInput();
    }
}

//очистка поля ввода
function cleanInput() {
    document.querySelector('.searchinput').value = '';
    document.querySelector('.closeicon').classList.remove('closeicon__active');
        for (let i = 0; i < cityblock.children.length; i++) {
            cityblock.children[i].style = '';
            cityblock.children[i].innerHTML = cityblock.children[i].textContent ;
        }
}


/* карусель */

const left = document.querySelector('.left');
const right = document.querySelector('.right');

let countOfClick = 0;
let pixels = 100; //количество пикселей прокрутки
let countGlobal =  Math.ceil((document.querySelector('.navblock__panel').scrollWidth - document.body.scrollWidth) / pixels);
if (countGlobal< 0) {
    countGlobal = 1;
}

right.addEventListener('click', function() {

    if (countOfClick != countGlobal) {
        countOfClick = countOfClick+1;
        document.querySelector('.navrow').style = "transform: translateX(-"+ pixels*countOfClick +"px)";       
    }

    checkCountOfClick()
})

left.addEventListener('click', function() {

    if (countOfClick > 0) {
        countOfClick = countOfClick-1;
        document.querySelector('.navrow').style = "transform: translateX(-"+ pixels*(countOfClick-1) +"px)";   
    }

    checkCountOfClick();
    
})

function checkCountOfClick() {

    if (countOfClick != countGlobal) {
        right.classList.remove('arrow__hide')
    }
    else {
        right.classList.add('arrow__hide')
    }

    if(countOfClick > 0) {
        left.classList.remove('arrow__hide');
    }
    else {
        left.classList.add('arrow__hide');
    }

}
