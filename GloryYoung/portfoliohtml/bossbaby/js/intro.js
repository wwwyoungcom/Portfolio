var checkmarkIdPrefix = "loadingCheckSVG-";
var checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
//모든 요소의 줄 간격을 50으로 지정해 줍니다.
var verticalSpacing = 50;

//setTimeout 함수를 사용해서 intro.html이 13000초 뒤에 index.html으로 넘어가기 위한 코드입니다.
//setTimeout은 Window의 메소드이며, 설정해둔 시간(또는 코드)에 따라 코드를 실행하는 타이머 기능입니다.
setTimeout(function(){
  //intro.html에서 index.html로 전환을 위한 위치를 지정하고
  location.href = './index.html';
  //10000초로 시간을 지정해 13000초가 지나면 index.html로 넘어가도록 하는 코드입니다.
}, 10000)

//https://tvsic.blog.me/20200265313
//shuffleArray를 사용해서 미리 순서대로 지정해둔 배열이 아닌, 임의의 배열(순서)로 텍스트들이 나오게 할 것입니다.
function shuffleArray(array) {
  //array의 가장 큰 숫자부터 하나씩 감소하는 for 반복문을 이용합니다.
    for (var i = array.length - 1; i > 0; i--) {
      //Math.floor 함수는 ()의 안에서 소수점을 포함하지 않은(버립니다) 정수값을 반환합니다.
      //Math.random 함수는 임의의 실수(0~1)를 반환합니다.
      //실수 값이 아닌 정수 값으로 사용하기 위해 Math.floor 안에 Math.random을 넣어주고,
      //0을 포함하지 않기 위해 + 1을 해줍니다.
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    //반환
    return array;
}

//createElementNS 코드를 사용해 벡터 이미지(SVG)를 외부에서 가져오기 위한 함수입니다.
function createSVG(tag, properties, opt_children) {
  //createElement는 HTML 요소를 생성해주는 메소드 코드이기에 createElementNS를 사용합니다.
  //document.createElementNS("http://www.w3.org/2000/svg", 요소명(현재는 tag로 설정));
  var newElement = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for(prop in properties) {
  //발생한 요청에 대해 특별한 식별자를 부여할 수 있는(특정한 값도 넣을 수 있다) 세션의 메소드 코드를 이용합니다.
  //setAttribute(요소명, 오브젝트 분류);
    newElement.setAttribute(prop, properties[prop]);
  }
  if (opt_children) {
  //forEacgh는 한 줄씩 차례로 내려가면서 요소를 처리하는 함수입니다.
    opt_children.forEach(function(child) {
  //appendChild는 지정된 부모요소에 자식요소로 추가합니다.
  //위에서 createElement 코드로 생성된 요소에 자식요소로써 태그 추가됩니다.
      newElement.appendChild(child);
    })
  }
  //반환
  return newElement;
}

//그래픽 옆에 text 제어를 위한 함수를 작성합니다.
//Offset은 한점의 좌표를 xOffset, yOffset만큼 이동시키는 함수입니다.
function createPhraseSvg(phrase, yOffset) {
  var text = createSVG("text", {
    fill: "white",
    x: 50,
    y: yOffset,
    "font-size": 18
  });
  //글씨 뒤에 "..."을 붙여 로딩 중인 표현을 극대화시키도록 합니다.
  text.appendChild(document.createTextNode(phrase + "..."));
  //반환
  return text;
}

//그래픽의 외형을 제어하기 위한 함수를 작성합니다.
function createCheckSvg(yOffset, index) {
  //텍스트 랜덤 배열 로딩바의 그래픽 - 체크 표시
  var check = createSVG("polygon", {
    points: "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
    fill: "rgba(255,255,255,1)",
    id: checkmarkIdPrefix + index
  });
  //텍스트 랜덤 배열 로딩바의 그래픽 - 체크 동그라미 테두리
  var circle_outline = createSVG("path", {
    d: "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
    fill: "#C5E3F4"
  })
  //텍스트 랜덤 배열 로딩바의 그래픽 - 체크 동그라미 
  var circle = createSVG("circle", {
    id: checkmarkCircleIdPrefix + index,
    fill: "rgba(255,255,255,0)",
    cx: 16,
    cy: 16,
    r: 15
  })
  //그래픽이 차례로 움직일 수 있도록 모든 그래픽을 한 그룹으로 묶어서 transform을 줍니다.
  var group = createSVG("g", {
    transform: "translate(10 " + (yOffset - 20) + ") scale(.9)"
  }, [circle, check, circle_outline]);
  //반환
  return group;
}

//foreach는 for문과 같은 반복문이지만, 반복 횟수를 명시하지 않고 모두 수행하게 합니다.
//위에서 작성했던 그래픽들이 반복하여 올라올 수 있도록 합니다.
function addPhrasesToDocument(phrases) {
  phrases.forEach(function(phrase, index) {
    var yOffset = 30 + verticalSpacing * index;
    //getElementById('#id'), 해당하는 id를 가진 태그에 대해 실행합니다.
    document.getElementById("phrases").appendChild(createPhraseSvg(phrase, yOffset));
    document.getElementById("phrases").appendChild(createCheckSvg(yOffset, index));
  });
}

//addEventListener는 하나의 요소에 여러 개의 이벤트를 실행시킬 수 있습니다.
document.addEventListener("DOMContentLoaded", function(event) {
  //그래픽 옆에 들어갈 텍스트들을 적어 주었습니다.
  //위에서 작성했던 shuffleArray를 넣어 이 텍스트들이 랜덤한 순서로 나오도록 합니다.
  var phrases = shuffleArray(["동생을 갖고 싶다고 조르는 중", "비밀 기저귀 임무를 수행하는 중", "아기 vs 애완견, 세계 베이비 협회 논쟁 중", "탈모 유전자인지 알아보는 중", "안전하게 아기를 배달하는 중", "머리로 수박 깨기 vs 수박으로 머리 깨기", "공갈 젖꼭지를 달라고 시위하는 중", "식탁 밑으로 기어 들어가는 중", "이유식을 엎어버리는 중", "엄빠 몰래 모든 쿠키를 먹어 치워버리는 중", "아기 배달 신청서를 작성하는 중", "엄빠의 싸인을 위조하는 중", "옆집 강아지와 마주보며 으르렁대는 중", "새벽 3시에 울음을 터뜨리는 중", "클래식을 들으며 낮잠을 자는 중", "변기물을 가지고 노는 중"]);
  addPhrasesToDocument(phrases);
});