//querySelector는 css 요소를 찾습니다.
//var 이름 = document.querySelector('class 이름');
var menuBtn = document.querySelector('.menu-btn');
var nav = document.querySelector('nav');
var lineOne = document.querySelector('nav .menu-btn .line--1');
var lineTwo = document.querySelector('nav .menu-btn .line--2');
var lineThree = document.querySelector('nav .menu-btn .line--3');
var link = document.querySelector('nav .nav-links');

//addEventListener를 사용해 클릭하면 지정해둔 이벤트가 나오도록 합니다.
menuBtn.addEventListener('click', () => {
    //원하는 요소에 지정해둔 class들이 toggle되도록 합니다.
    nav.classList.toggle('nav-open');
    lineOne.classList.toggle('line-cross');
    lineTwo.classList.toggle('line-fade-out');
    lineThree.classList.toggle('line-cross');
    link.classList.toggle('fade-in');
})