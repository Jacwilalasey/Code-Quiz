var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var optionsEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var scoreListEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;

  findQuestion();
}

function findQuestion() {
  var currentQuestion = questions[currentQuestionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  optionsEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    optionsEl.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) {
      time = 0;
    }

    timerEl.textContent = time;
    feedbackEl.textContent = "Whoops! Wrong anser.";
  } else {
    feedbackEl.textContent = "Good work! Correct answer.";
  }

   feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 500);

  currentQuestionIndex++;

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    findQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var scoreEl = document.getElementById("final-score");
  scoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  time--;
  timerEl.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveScore() {
  var initials = scoreListEl.value.trim();

  if (initials !== "") {
    var highscores = [];
    console.log(initials);

    var newScore = {
      score: time,
      initials: initials
    };

    console.log(newScore);

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

function pressEnter(e) {
  if (e.key === "Enter") {
    saveScore();
  }
}

submitBtn.onclick = saveScore;

startBtn.onclick = startQuiz;

scoreListEl.onkeyup = pressEnter;

