let array = [];
let random;

const load = () => {
random = Math.floor(Math.random() * 100);
    console.log(random);

}
const input=()=>{
    const inputdata=Number(document.getElementById('input').value);
array=[...array,inputdata];
document.getElementById('guesses').innerHTML=array;
let highlow=document.getElementById('highlow');
let usernumber=document.getElementById('input');
if(array.length<maxguess){
    if(inputdata>random){
        usernumber.value="";
        highlow.innerHTML="Your Guess is high";
        }
        else if(inputdata<random){
        highlow.innerHTML="Your Guess is low";
        usernumber.value="";    
    }
        else{
            highlow.innerHTML="It's Correct";
            usernumber.value="";   
            usernumber.setAttribute("disabled", true);
            const newgame=document.getElementById("newgame");
            newgame.style.display="block";
        }
}
else{
    usernumber.setAttribute("disabled", true);
   
   newgame.style.display="block";
   highlow.innerHTML=`You Loose the correct number was ${random}`;
}


let attempt=document.getElementById("attempt");
attempt.innerHTML=array.length;
}







const startgame = () => {
document.getElementById('firstscreen').style.display="none";
document.getElementById('secondscreen').style.display="flex";
}
const easy = () => {
    maxguess = 10;
    startgame();
}
const hard = () => {
    maxguess = 5;
    startgame();
}
const newg=()=>{
window.location.reload();
}