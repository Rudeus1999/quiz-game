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

/*Script to display the questions for each html*/ 
//THIS IS FOR TRUE OR FALSE

//These are the questions for the TRUE OR FALSE quiz
const questions = [
    {
        question: " The Great Red Spot is a massive storm on Jupiter that has been raging for centuries. ",
        answers: [
            { text: "True", correct: true},
            { text: "False", correct: false},
        
        ]
    },
    {
        question: " Mercury is the hottest planet in our solar system due to its proximity to the Sun. ",
        answers: [
            { text: "True", correct: true},
            { text: "False", correct: false},
        
        ]
    },
    {
        question: " The Milky Way is the largest galaxy in the observable universe. ",
        answers: [
            { text: "True", correct: false},
            { text: "False", correct: true},
        
        ]
    },
    {
        question: " The asteroid belt, located between Mars and Jupiter, is primarily composed of large, solid rocks. ",
        answers: [
            { text: "True", correct: false},
            { text: "False", correct: true},
        
        ]
    },
    {
        question: " Black holes are regions in space where gravity is so strong that nothing, not even light, can escape their grasp. ",
        answers: [
            { text: "True", correct: true},
            { text: "False", correct: false},
        
        ]
    } 

];
//get the buttons for script
const questionElement = document.getElementById("multiple-question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

//scoring for quiz

let currentQuestionIndex= 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

//adds question index 
function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + "." + currentQuestion.question;

//adds each answer in the quiz to the choices

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
//every time you start a new game it goes back to the question 1
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
//adds color for correct and incorrect answers and adds to score if correct
function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    //disables the buttons after answering and displays the next button for next question
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display ="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
//function that goes to next question else show score
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}
//if next button is clicked, goes to next question
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
});

//add a timer to quiz
const timerElement = document.getElementById("time-left"); // Timer element
const totalTime = 30; // Total time for the quiz in seconds
let countdown; // Variable to hold the countdown interval
let timerFrozen = false; // Variable to track if the timer is frozen

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timerFrozen = false; // Reset the timerFrozen variable
    nextButton.innerHTML = "Next";
    resetTime(); // Reset the timer
    showQuestion();
    startTimer(); // Start the timer when the quiz starts
}

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
    showScore();
}
//function to freeze the timer
function showScore() {
    resetState();
    timerFrozen = true; // Freeze the timer when showing the score
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}




startQuiz();


