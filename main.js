//캔버스 설정하기
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 850;

//유저 만들기
let imgElem2 = new Image();
imgElem2.src = './img/pig.png';

//장애물 만들기
let obsImgs = document.querySelectorAll('.ff');
let obsImgs2 = document.querySelectorAll('.vv');

//변수정의
let animation;
let timer = 0;
let jump;
let jumptimer = 0;

//유저 객체 만들기
let gameU = {
    x: 400,
    y: 800,
    width: 50,
    height: 50,
    draw(){
        ctx.drawImage(imgElem2,this.x,this.y,this.width,this.height);
    }
}
gameU.draw();

//장애물 배열
let obstacleArr = [];
//장애물 만들기
class Obstacle {
    constructor(){
        this.x = Math.floor(Math.random()*440);
        // this.y = 300;
        this.y = -200;
        this.width = 50;
        this.height = 50;
        //num은 0,1,2 랜덤값이 지정
        this.num = Math.floor(Math.random()*4);
    }
    draw(){
        ctx.drawImage(obsImgs[this.num],this.x,this.y,this.width,this.height);
    }
}

//장애물 배열
let obstacleArr2 = [];
//장애물 만들기
class Obstacle2 {
    constructor(){
        this.x = Math.floor(Math.random()*440);
        // this.y = 300;
        this.y = -200;
        this.width = 50;
        this.height = 50;
        //num은 0,1,2 랜덤값이 지정
        this.num = Math.floor(Math.random()*2);
    }
    draw(){
        ctx.drawImage(obsImgs2[this.num],this.x,this.y,this.width,this.height);
    }
}

//화면을 계속해서 진행하는 함수
//애니매이션 만들기
//1초에 60번 실행함
//장애물은 2~3초 하나씩 생성

//공통 algorithm
function algorithm (){
    timer++;
    //캔버스 지우기
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    //장애물 배열에 넣기
    if(timer % 15 === 0){
        let obs = new Obstacle;
        obstacleArr.push(obs);
    }
    if(timer % 200 === 0){
        let obs2 = new Obstacle2;
        obstacleArr2.push(obs2);
    }

    //유저 왼쪽 오른쪽 움직이기
    if(jump){
        gameU.x-=5;
        if(gameU.x<=0){
        gameU.x = 0;
        }
    }
    else {
        gameU.x+=5;
        if(gameU.x>=550){
        gameU.x =550;
        }
    }
    gameU.draw();
}
//1단계
function startFrame(){
    animation = requestAnimationFrame(startFrame);
    algorithm();
    obstacleArr.forEach((item,index,arr)=>{
        //왼쪽으로 이동된 장애물 제거하기
        //x좌표가 0보다 작으면 배열에서 제거
        if(item.y>900){
            arr.splice(index,1);
        }
        item.y += 5;
        item.draw();
        //충돌하는지 확인
        crashCheck(gameU,item);
    })
    obstacleArr2.forEach((item2,index2,arr2)=>{
        //왼쪽으로 이동된 장애물 제거하기
        //x좌표가 0보다 작으면 배열에서 제거
        if(item2.y>850){
            arr2.splice(index2,1);
        }
        item2.y += 5;
        item2.draw();
        //충돌하는지 확인
        crashCheck2(gameU,item2);
    })
}

//2단계
function startFrame2(){
    animation2 = requestAnimationFrame(startFrame2);
    algorithm();
    obstacleArr.forEach((item,index,arr)=>{
        //왼쪽으로 이동된 장애물 제거하기
        //x좌표가 0보다 작으면 배열에서 제거
        if(item.y>850){
            arr.splice(index,1);
        }
        item.y += 8;
        item.draw();
        //충돌하는지 확인
        crashCheck(gameU,item);
    })
    obstacleArr2.forEach((item2,index2,arr2)=>{
        //왼쪽으로 이동된 장애물 제거하기
        //x좌표가 0보다 작으면 배열에서 제거
        if(item2.y>850){
            arr2.splice(index2,1);
        }
        item2.y += 8;
        item2.draw();
        //충돌하는지 확인
        crashCheck2(gameU,item2);
    })
}

//3단계
function startFrame3(){
    animation3 = requestAnimationFrame(startFrame3);
    algorithm();
    obstacleArr.forEach((item,index,arr)=>{
        //왼쪽으로 이동된 장애물 제거하기
        //x좌표가 0보다 작으면 배열에서 제거
        if(item.y>850){
            arr.splice(index,1);
        }
        item.y += 12;
        item.draw();
        //충돌하는지 확인
        crashCheck(gameU,item);
    })
    obstacleArr2.forEach((item2,index2,arr2)=>{
        //왼쪽으로 이동된 장애물 제거하기
        //x좌표가 0보다 작으면 배열에서 제거
        if(item2.y>850){
            arr2.splice(index2,1);
        }
        item2.y += 12;
        item2.draw();
        //충돌하는지 확인
        crashCheck2(gameU,item2);
    })
}

//유저 키 설정하기
window.addEventListener('keydown',function(e){
    if(e.code == "ArrowLeft"){
        jump = true;
    }
})
window.addEventListener('keydown',function(e){
    if(e.code == "ArrowRight"){
        jump = false;
    }
})

//충돌 변수 설정
let pig2 = document.querySelector('#pig2');
let imgWidth = 100;
let imgHeight = 100;
let notice = document.querySelector('#notice');
let restart = document.querySelector('#restart');
let start = document.querySelector('#start');
let nextlevel = document.querySelector('#nextlevel');
let level2 = document.querySelector('#level2');
//충돌 확인하기
function crashCheck(user,item){
    let x차이 = (item.x+item.width/2) - (user.x+user.width/2);
    let y차이 = (item.y+item.height/2) - (user.y+user.height/2);
    if(Math.abs(x차이) <=20 && Math.abs(y차이) <=20 ){
        imgWidth +=5;
        imgHeight +=5;
        pig2.style.width = imgWidth+'px';
        pig2.style.height = imgHeight+'px';
        notice.innerHTML = '우웩우웩~~~';

        //게임 오버
        if(imgWidth>=200){
            cancelAnimationFrame(animation);
            notice.innerHTML = '수고~';
            start.style.display = 'block';
            start.innerHTML = 'game over';
            setTimeout(()=>{
                start.innerHTML = 'restart?';
            },3000)
            start.addEventListener('click',function(){
                document.location.reload();
            })
        }
    }
}
//충돌 확인하기
function crashCheck2(user,item){
    let x차이 = (item.x+item.width/2) - (user.x+user.width/2);
    let y차이 = (item.y+item.height/2) - (user.y+user.height/2);
    if(Math.abs(x차이) <=20 && Math.abs(y차이) <=20 ){
        imgWidth -=2;
        imgHeight -=2;
        pig2.style.width = imgWidth+'px';
        pig2.style.height = imgHeight+'px';
        notice.innerHTML = '냠냠냠~~~';
        console.log(imgWidth);
        //게임 클리어
        if(imgWidth<75){
            notice.innerHTML = '성공!~';
            nextlevel.style.display = 'block';
            cancelAnimationFrame(animation);
            nextlevel.addEventListener('click',function(){
                nextlevel.innerHTML= 'level2';
                setTimeout(() => {
                    nextlevel.innerHTML = '3';
                }, 1000);
                setTimeout(() => {
                    nextlevel.innerHTML = '2';
                }, 2000);
                setTimeout(() => {
                    nextlevel.innerHTML = '1';
                }, 3000);
                setTimeout(() => {
                    nextlevel.style.display = 'none';
                }, 3500);
                setTimeout(() => {
                    startFrame2();
                }, 4000);
            })
        }
        if(imgWidth<50){
            notice.innerHTML = '성공!~';
            nextlevel.innerHTML = 'want next level?';
            cancelAnimationFrame(animation2);
            nextlevel.addEventListener('click',function(){
                nextlevel.innerHTML= 'level3';
                setTimeout(() => {
                    nextlevel.innerHTML = '3';
                }, 1000);
                setTimeout(() => {
                    nextlevel.innerHTML = '2';
                }, 2000);
                setTimeout(() => {
                    nextlevel.innerHTML = '1';
                }, 3000);
                setTimeout(() => {
                    nextlevel.style.display = 'none';
                    nextlevel.style.opacity = 0;
                }, 3500);
                setTimeout(() => {
                    startFrame3();
                }, 4000);
            })
        }
        if(imgWidth<40){
            notice.innerHTML = '성공!~';
            nextlevel.innerHTML = 'gameclear';
            cancelAnimationFrame(animation3);
        }
    }
}

//게임 시작하기
start.addEventListener('click',function(){
    setTimeout(()=>{
        start.innerHTML = '3';
    },1000)
    setTimeout(()=>{
        start.innerHTML = '2';
    },2000)
    setTimeout(()=>{
        start.innerHTML = '1';
    },3000)
    setTimeout(()=>{
        start.style.display = 'none';
        startFrame();
    },4000)
});