const questions = [
    {
        question: "Delhi is situated on the bank of which river?",
        answers: [
            { text: "Ganga", correct: false },
            { text: "Yamuna", correct: true },
            { text: "Krishna", correct: false },
            { text: "Kaveri", correct: false },
        ]
    },
    {
        question: "Who is known as the Prince of Indian Mathematics?",
        answers: [
            { text: "Aryabhatta", correct: false },
            { text: "Bhaskara", correct: false },
            { text: "Ramanujan", correct: true },
            { text: "Brahmagupta", correct: false },
        ]
    },
    {
        question: "Which is the acid that is secreted in the stomach?",
        answers: [
            { text: "Hydrochloric Acid", correct: true },
            { text: "Nitric Acid", correct: false },
            { text: "Sulphuric Acid", correct: false },
            { text: "Citric Acid", correct: false },
        ]
    },
    {
        question: "Gambit and Stalemate terms are related to which sport?",
        answers: [
            { text: "Hockey", correct: false },
            { text: "Chess", correct: true },
            { text: "Football", correct: false },
            { text: "Tennis", correct: false },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false },
            { text: "Mercury", correct: false },
            { text: "Mars", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}




function handleNextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }else{
        startQuiz();
    }}
    
)
startQuiz();
