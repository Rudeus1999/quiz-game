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
//THIS IS FOR MULTIPLE QUIZ

//These are the questions for the multiple choice quiz
const questions = [
    {
        question: " Which planet is known as the Red Planet? ",
        answers: [
            { text: "a. Venus", correct: false},
            { text: "b. Earth", correct: false},
            { text: "c. Mars", correct: true},
            { text: "d. Pluto", correct: false},
        
        ]
    },
    {
        question: " What is the largest moon in our solar system? ",
        answers: [
            { text: "a. Io", correct: false},
            { text: "b. Europa", correct: false},
            { text: "c. Titan", correct: false},
            { text: "d. Ganymede", correct: true},
        
        ]
    },
    {
        question: " What is the name of the telescope launched into space by NASA in 1990, known for its stunning images of distant galaxies and nebulae? ",
        answers: [
            { text: "a. Hubble Space Telescope", correct: true},
            { text: "b. Kepler Space Telescope", correct: false},
            { text: "c. Chandra X-ray Observatory", correct: false},
            { text: "d. Spitzer Space Telescope", correct: false},
        
        ]
    },
    {
        question: " What is the process by which a star, much larger than our Sun, ends its life in a colossal explosion, releasing an immense amount of energy? ",
        answers: [
            { text: "a. Fusion", correct: false},
            { text: "b. Fission", correct: false},
            { text: "c. Supernova", correct: true},
            { text: "d. Solar flare", correct: false},
        
        ]
    },
    {
        question: " Which spacecraft, launched by NASA, became the first human-made object to reach interstellar space in 2012? ",
        answers: [
            { text: "a. Voyager 1", correct: true},
            { text: "b. Curiosity", correct: false},
            { text: "c. New Horizons", correct: false},
            { text: "d. Cassini", correct: false},
        
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
//function to freeze timer
function showScore() {
    resetState();
    timerFrozen = true; // Freeze the timer when showing the score
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}



//starts timer and quiz
startQuiz();





