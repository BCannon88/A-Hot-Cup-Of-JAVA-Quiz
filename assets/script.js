const introEl = document.querySelector("#java-home-page");
let initialsInput = document.querySelector("#initials");
let timeEl = document.querySelector("div.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");
const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];
const startBtn = document.querySelector("#start");
const viewScrBtn = document.querySelector("#view-hot-java-scores");
const submitScrBtn = document.querySelector("#submit-score");
const clearScrBtn = document.querySelector("#clearscores");
const answerBtn = document.querySelectorAll("button.answerBtn")
const answer1Btn = document.querySelector("#option1");
const answer2Btn = document.querySelector("#option2");
const answer3Btn = document.querySelector("#option3");
const answer4Btn = document.querySelector("#option4");
const goBackBtn = document.querySelector("#goback");
const checkEl = document.querySelector("#check");
const finalEl = document.querySelector("#final");
const highscoresEl = document.querySelector("#highscores");

const questions = [
    //  answer option numbers will start at 0 and go to 3
    {
        question: "What is the outer most scope called?",
        answers: [" Lexical Scope", " Global Scope", " Functional Scope", " Scope Chain"],
        correctAnswer: "1"
    },
    {

        question: "How do you find the minimum of x and y using JavaScript?",
        answers: [" min(x,y);", " Math.min(x,y)", "  Math.min(xy)", " min(xy);"],
        correctAnswer: "1"
    },
    {

        question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
        answers: ["  alertBox(“Hello DataFlair!”);", "  alert(Hello DataFlair!);", " msgAlert(“Hello DataFlair!”);", " alert(“Hello DataFlair!”);"],
        correctAnswer: "3"
    },
    {

        question: "What are reserved-words that perform action on values and variables?",
        answers: [" Statement", " Expression", " Method", " Operator"],
        correctAnswer: "3"
    },
    {
        question: "JavaScript is a ____ -side programming language.",
        answers: [" Client", " Server", " Both", " None"],
        correctAnswer: "2"
    },

];




// timer
function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        answer1Btn.textContent = questions[id].answers[0];
        answer2Btn.textContent = questions[id].answers[1];
        answer3Btn.textContent = questions[id].answers[2];
        answer4Btn.textContent = questions[id].answers[3];
    }
}

function checkAnswer(event) {
    event.preventDefault();

    checkEl.style.display = "block";
    let p = document.createElement("p");
    checkEl.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreList = scoreList.sort((x, y) => {
        if (x.score < y.score) {
            return 1;
        } else {
            return -1;
        }
    });

    scoreListEl.innerHTML = "";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {

    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML = "";
}


startBtn.addEventListener("click", startQuiz);

answerBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);

viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No HighScores.");
    }
});