const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const main = document.getElementById("main");
const questionContainerElement = document.getElementById("question-box");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const score = document.getElementById("score");
const controls = document.getElementsByClassName("controls");
var i = 0;

let shuffledQuestions, currentQuestionIndex;

//Add Event Listener for starting Game
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

//Start a Game
function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

//Show next Question
function setNextQuestion() {
  resetState();
  score.innerHTML = "SCORE: " + i;
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  //Create answers
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  //Set right color for background
  setStatusClass(document.body, correct);
  //If answer correct add 1 Point
  checkIfCorrect();
  //Set right color for Buttons
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct);
    });
    nextButton.classList.remove("hide");
    nextButton.addEventListener("click", textQuestion);
  }
}

function checkIfCorrect() {
  if (document.body.classList.contains("correct")) {
    i++;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function textQuestion() {
  //Set score
  score.innerHTML = "SCORE: " + i;
  submitButton.classList.remove("hide");
  //Show text question
  questionContainerElement.innerHTML = `
  <div id="question">How many squaremeters of dirt is in a hole with the size of 3x2x3?</div>
          <div id="answer-buttons" class="btn-grid">
            <form class="form" id="form" action="" method="POST">
            <input id="textAnswer" type="text" placeholder="Ihre Antwort">
            </form>
          </div>
`;
  submitButton.addEventListener("click", checkTextQuestion);
}
function checkTextQuestion() {
  const textAnswer = document.getElementById("textAnswer");
  //If answer correct
  if (textAnswer.value == "0") {
    i += 1;
    score.innerHTML = "SCORE: " + i;
    textAnswer.style.backgroundColor = "rgba(0, 255, 106)";
    submitButton.classList.add("hide");
    document.body.classList.remove("wrong");
    document.body.classList.add("correct");
    startButton.innerText = "Results";
    startButton.classList.remove("hide");
    //add eventlistener to show results
    startButton.addEventListener("click", results);
  } else {
    submitButton.classList.add("hide");
    document.body.classList.add("wrong");
    startButton.innerText = "Results";
    startButton.classList.remove("hide");
    startButton.addEventListener("click", results);
  }
}

function results() {
  //Render win page
  main.innerHTML =
    `<div class="win-screen">
  <h1>Congratulations your Score is</h1>
  <div class="end-score">` +
    i +
    `</div>
  <h2>Your were right ` +
    getScoreInPercent(i) +
    `% of the time</h2>
  <img src="trophy.png" alt="" />
  <button class="btn start-btn" onclick="reloadPage()">Restart</button>
</div>`;
  score.innerHTML = "";
}

function getScoreInPercent(score) {
  return Math.round((score / 14) * 100);
}

function reloadPage() {
  document.location.reload();
}

//Questions
const questions = [
  {
    question: "In which city can you find the Colosseum?",
    answers: [
      { text: "Vatican City", correct: false },
      { text: "Rome", correct: true },
    ],
  },
  {
    question: "How long is the border between the United States and Canada?",
    answers: [
      { text: "3,525 miles", correct: false },
      { text: "4,525 miles", correct: false },
      { text: "5,525 miles", correct: true },
      { text: "6,525 miles", correct: false },
    ],
  },
  {
    question:
      "In the Big Bang Theory, what is the name of Sheldon and Leonards neighbour?",
    answers: [
      { text: "Penny", correct: true },
      { text: "Patty", correct: false },
      { text: "Lily", correct: false },
      { text: "Jessie", correct: false },
    ],
  },
  {
    question: "In which city is the Juventus Football Club based?",
    answers: [
      { text: "Milano", correct: false },
      { text: "Rome", correct: false },
      { text: "Turin", correct: true },
      { text: "Marseille", correct: false },
    ],
  },
  {
    question: "What is the longest river in the world?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Yellow River", correct: false },
      { text: "Congo River", correct: false },
      { text: "Nile", correct: true },
    ],
  },
  {
    question: "Which country does not share a border with Romania?",
    answers: [
      { text: "Ukraine", correct: false },
      { text: "Bulgaria", correct: false },
      { text: "Hungary", correct: false },
      { text: "Poland", correct: true },
    ],
  },
  {
    question: "In which country was the airline Ryanair founded?",
    answers: [
      { text: "Germany", correct: false },
      { text: "Ireland", correct: true },
      { text: "Scotland", correct: false },
      { text: "Spain", correct: false },
    ],
  },
  {
    question:
      "If you are eating chicken jalfrezi, what type of food are you eating?",
    answers: [
      { text: "French food", correct: false },
      { text: "Italian food", correct: false },
      { text: "Indian Food", correct: true },
      { text: "Mexican Food", correct: false },
    ],
  },
  {
    question: "Which band released the song “Wonderwall” in the 90s?",
    answers: [
      { text: "Joy Division", correct: false },
      { text: "The Verge", correct: false },
      { text: "Oasis", correct: true },
      { text: "Nirvana", correct: false },
    ],
  },
  {
    question: "What is the capital of Iraq?",
    answers: [
      { text: "Baghdad", correct: true },
      { text: "Islamabad", correct: false },
      { text: "Tehran", correct: false },
      { text: "Amman", correct: false },
    ],
  },
  {
    question: "Which country won the first Football World Cup in 1930?",
    answers: [
      { text: "Brazil", correct: false },
      { text: "Uruguay", correct: true },
      { text: "Italy", correct: false },
      { text: "Portugal", correct: false },
    ],
  },
  {
    question: "In which city was Martin Luther King Jr. assassinated?",
    answers: [
      { text: "New York", correct: false },
      { text: "Austin", correct: false },
      { text: "Miami", correct: false },
      { text: "Memphis", correct: true },
    ],
  },
  {
    question: "Who was the 40th President of the United States?",
    answers: [
      { text: "Ronald Reagan", correct: true },
      { text: "Franklin D. Roosevelt", correct: false },
      { text: "Bill Clinton", correct: false },
      { text: "George W. Bush", correct: false },
    ],
  },
  /*{
    question: "",
    answers: [
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
    ],
  },*/
];
