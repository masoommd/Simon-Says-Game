let gameSeq=[];
let userSeq=[];
let HighScore=0;
let btns=['yellow','green','purple','red'];
let h2=document.querySelector('h2');

let started=false;
let level=0;

document.addEventListener("keypress",function(){
    if(started==false){
        console.log('Game is started');
        started=true;
        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
}

function levelUp(){
    level++;
    userSeq=[];
    h2.innerText=`Level ${level}`;
    //choose random button
    let rndIdx=Math.floor(Math.random()*3);
    let rndClr=btns[rndIdx];
    let rndBtn=document.querySelector(`.${rndClr}`);    
    // console.log(rndIdx);
    // console.log(rndClr);
    // console.log(rndBtn);
    
    gameSeq.push(rndClr);
    console.log(gameSeq);
    btnFlash(rndBtn);

}

function checkAns(idx){
    // console.log("Curr level", level);
    if(gameSeq[idx]===userSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(level>HighScore){
            HighScore=level;
        }
        h2.innerHTML=`Game Over! <b>Your score is ${level}.<b> <br> Press any key to restart the game.<br> 
                        Highscore is ${HighScore}.`;
        document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor='white';
        },150);
        
        reset();
    }
}

function btnPress(){
    // console.log(this);
    let btn=this;
    userFlash(btn);
    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allbtns=document.querySelectorAll('.btn');
for(let btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}