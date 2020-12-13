const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1"); 
 
function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    
    //현재초가 10보다 작으면 0${seconds} 아니면 seconds 조건문 추가
    clockTitle.innerText =`
    ${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}`;
    }      
 
function init(){
    getTime();
    setInterval(getTime, 1000);
    }
 
init();
/* ---------------------------------------------------------------- */
