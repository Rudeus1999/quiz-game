//add function for music
const musicButton = document.querySelector(".sound-on");
const music = document.getElementById("background-music");

musicButton.addEventListener("click", function() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});


//script for enumeration
//function to tally the score of each correct answer in the enumeration quiz
function myfun(){
    timerFrozen = true; // Freeze the timer when showing the score

    var v1 = document.myform.one.value.toLowerCase();
    var v2 = document.myform.two.value.toLowerCase();
    var v3 = document.myform.three.value.toLowerCase();
    var v4 = document.myform.four.value.toLowerCase();
    var v5 = document.myform.five.value.toLowerCase();
    var v6 = document.myform.six.value.toLowerCase();
    var v7 = document.myform.seven.value.toLowerCase();
    var v8 = document.myform.eight.value.toLowerCase();

    //score starts at 0
    var count = 0;

    //each correct answer adds the score by 1
    if(v1=="mercury"){
        count++;
    }
    if(v2=="venus"){
        count++;
    }
    if(v3=="earth"){
        count++;
    }
    if(v4=="mars"){
        count++;
    }
    if(v5=="jupiter"){
        count++;
    }
    if(v6=="saturn"){
        count++;
    }
    if(v7=="uranus"){
        count++;
    }
    if(v8=="neptune"){
        count++;
    }
//alerts the user of their total score
    alert("you got "+count+" out of 8!");

    resetElement.style.display = "block";

}
const resetElement = document.getElementById("resetbtn");
const timerElement = document.getElementById("time-left"); // Timer element
const totalTime = 60; // Total time for the quiz in seconds
let countdown; // Variable to hold the countdown interval
let timerFrozen = false; // Variable to track if the timer is frozen


function startTimer() {
    let timeLeft = totalTime;
    updateTimer(timeLeft);

    countdown = setInterval(() => {
        if (!timerFrozen) { // Check if the timer is not frozen
            timeLeft--;
            updateTimer(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(countdown);
                handleTimeout(); // Automatically end the quiz when time runs out
            }
        }
    }, 1000);
}

function updateTimer(seconds) {
    timerElement.textContent = seconds;
}

function resetTime() {
    clearInterval(countdown);
    updateTimer(totalTime);
}

function handleTimeout() {
    myfun();
}
//function to freeze the timer
function showScore() {
    timerFrozen = true; // Freeze the timer when showing the score
    nextButton.style.display = "block";
}

//calls in the functions to start the timer
function startQuiz(){
   
    timerFrozen = false; // Reset the timerFrozen variable
  
    resetTime(); // Reset the timer
 
    startTimer(); // Start the timer when the quiz starts
}

function resetQuiz(){
    timerFrozen = false; // Reset the timerFrozen variable
  
    resetTime(); // Reset the timer
 
    startTimer(); // Start the timer when the quiz starts
    resetElement.style.display = "none"; //hides the play again button
}

resetElement.addEventListener("click", resetQuiz); //button play again will reset the quiz if clicked

startQuiz();


