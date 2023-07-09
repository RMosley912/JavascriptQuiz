let questions = 
    [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Trainer Marking Language", "Hyper Text Marketing Language", "Hyper Text Markup Language", "Hyper Text Markup Leveler"],
            answer: 2
        },
        {
            question: "Choose the correct HTML tag for the largest heading:",
            options: ["<heading>", "<h6>", "<h1>", "<head>"],
            answer: 2
        },
        {
            question: "How can you make a list that lists the items with numbers?",
            options: ["<ul>", "<dl>", "<ol>", "<list>"],
            answer: 2
        },
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheet", "Colorful Style Sheet", "Creative Style Sheet", "Computer Style Sheet"],
            answer: 0
        },
        {
            question: "Where in an HTML document is the correct place to refer to an external CSS file?",
            options: ["In the <head> section", "At the end of the document", "In the <body> section", "At the start of the document"],
            answer: 0
        },
        {
            question: "What is the correct CSS syntax?",
            options: ["body {color: black;}", "{body;color:black;}", "{body:color=black;}", "body:color=black;"],
            answer: 0
        },
        {
            question: "How do you add a background color for all <h1> elements?",
            options: ["all.h1 {background-color:#FFFFFF;}", "h1.all {background-color: #FFFFFF;}", "h1 {background-color: #FFFFFF;}", "<h1> {background-color: #FFFFFF;}"],
            answer: 2
        },
        {
            question: "What CSS property is used to change the text color of an element?",
            options: ["color", "text-color", "font-color", "fgcolor"],
            answer: 0
        }
    ];


let timer = 75;
let score = 0;
let currentQuestionIndex = 0;

// Get all necessary elements
let quizSection = document.getElementById('quiz-section');

let endSection = document.getElementById('end-section');
let questionElement = document.getElementById('question');


let messageElement = document.getElementById('message');
let optionElements = document.getElementsByClassName('list-group-item-action');
  let scoreElement = document.getElementById('score');
let initialsElement = document.getElementById('initials');
let submitScoreButton = document.getElementById('submit-score');
let restartButton = document.getElementById('restart');
let startButton = document.getElementById('start-btn');


let timerElement = document.getElementById('timer');
let viewHighscoresButton = document.getElementById('view-highscores');
let clearHighscoresButton = document.getElementById('clear-highscores');
let highscoresElement = document.getElementById('highscores');
let highscoresListElement = document.getElementById('highscores-list');
let timerInterval;

viewHighscoresButton.addEventListener('click', viewHighscores);
clearHighscoresButton.addEventListener('click', clearHighscores);
startButton.addEventListener('click', startQuiz);


// Start quiz function
function startQuiz() {
    endSection.style.display = 'none';
    quizSection.style.display = 'block';
    score = 0;
    timer = 75;
    currentQuestionIndex = 0;
    timerElement.innerText = `Time: ${timer}`;
    timerInterval = setInterval(() => {
        timer--;
        timerElement.innerText = `Time: ${timer}`;
        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);
 
    nextQuestion();
};


// Next question function
function nextQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    for(let i = 0; i < 4; i++) {
        optionElements[i].innerText = currentQuestion.options[i];
    }
};

// Option clicked function
function optionClicked(e) {
    let answer = questions[currentQuestionIndex].answer;
    if(e.target.innerText === questions[currentQuestionIndex].options[answer]) {
        messageElement.innerText = "Correct!";
        score += 10;
    } else {
        messageElement.innerText = "That's not correct.";
        timer -= 5;  // This is your penalty for wrong answers
    }
    currentQuestionIndex++;
    if(currentQuestionIndex === questions.length || timer <= 0) {
        endQuiz();
    } else {
        nextQuestion();
    }
}

// End quiz function
function endQuiz() {
    clearInterval(timerInterval);
    timer = 0;
    timerElement.innerText = `Time: ${timer}`;
    quizSection.style.display = 'none';
    endSection.style.display = 'block';
    scoreElement.innerText = score;
}

// Add event listeners
for(let i = 0; i < 4; i++) {
    optionElements[i].addEventListener('click', optionClicked);
}
submitScoreButton.addEventListener('click', saveScore);
restartButton.addEventListener('click', startQuiz);

function saveScore() {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    
    let newScore = {
        score: score,
        initials: initialsElement.value
    };
    highscores.push(newScore);
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    viewHighscores();
}
S
function viewHighscores() {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    let highscoresString = "";
    for(let i = 0; i < highscores.length; i++) {
        highscoresString += `${highscores[i].initials} - ${highscores[i].score}\n`;
    }
    alert(highscoresString);
}

// Clear highscores function
function clearHighscores() {
    localStorage.removeItem("highscores");
}




// Start quiz
