var galleryEl = document.querySelector("#gallery"),
    viewEl = galleryEl.querySelector(".view"),
    viewContainerEl = viewEl.querySelector(".view-container"),
    viewItemEls = viewContainerEl.querySelectorAll(".view-item"),
    listEl = galleryEl.querySelector(".list"),
    listItemEls = listEl.querySelectorAll("li"),
    btnListItemEls = listEl.querySelectorAll("li > a"),
    _galleryW = 800,
    _cuId = 0,
    _exId = null,
    _max = null;

function onClickListItem(e) 
{
    e.preventDefault();
    //원하는 요소를 지정
    var el = e.currentTarget, parentEl = el.parentElement, index = btnListItemEls.indexOf(el);
    if(!parentEl.classList.contains("selected")) 
    {
        //비활성화 되어있는 리스트만 선별
        _cuId = index;
        //클래스를 삭제
        listItemEls[_exId].classList.remove("selected");
        //클래스를 추가
        listItemEls[_cuId].classList.add("selected");
        //실제로 이미지 갤러리가 움직이는 기능 호출
        gallerySlide();
        _exId = _cuId;
    }
}
//사진과 슬라이드의 비율을 알맞게 조정합니다.
function galleryResize() 
{
    viewEl.style.width = _galleryW + "px";
    viewContainerEl.style.width = _galleryW * _max + "px";
    for(var i = 0; i < _max; i++) 
    {
        viewItemEls[i].style.width = _galleryW + "px";
    }
}
//슬라이드가 움직일 수 있도록 위치, 속도 작용시킵니다.
function gallerySlide() 
{
    viewContainerEl.style.transform = "translate3d(" + _galleryW * _cuId * -1 + "px, 0, 0)";
    viewContainerEl.style.transition = "transform 300ms ease-in-out";
}

//이벤트 바인딩 되는 기능입니다.
function addEvent() 
{
    for(var i = 0; i < _max; i++) 
    {
        btnListItemEls[i].addEventListener("click", onClickListItem);
    }
}
//초기화
function init() 
{
    _exId = _cuId;
    _max = viewItemEls.length;
    btnListItemEls = Array.prototype.slice.call(btnListItemEls);
    galleryResize();
    addEvent();
}
init();