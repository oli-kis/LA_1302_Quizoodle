const quizData = [
  {
    question: "In which city can you find the Colosseum?",
    a: "Vatican City",
    b: "Rome",
    c: "Paris",
    d: "San Marino",
    correct: "b",
  },
  {
    question: "How long is the border between the United States and Canada?",
    a: "3,525 miles",
    b: "4,525 miles",
    c: "5,525 miles",
    d: "6,525 miles",
    correct: "c",
  },
  {
    question:
      "In the Big Bang Theory, what is the name of Sheldon and Leonards neighbour?",
    a: "Penny",
    b: "Patty",
    c: "Lily",
    d: "Jessie",
    correct: "a",
  },
  {
    question: "In which city is the Juventus Football Club based?",
    a: "Milano",
    b: "Rome",
    c: "Turin",
    d: "Marseille",
    correct: "c",
  },
  {
    question: "What is the longest river in the world?",
    a: "Amazon River",
    b: "Nile",
    c: "Congo River",
    d: "Aare",
    correct: "b",
  },
  {
    question: "Which band released the song “Wonderwall” in the 90s?",
    a: "Joy Division",
    b: "The Verge",
    c: "Nirvana",
    d: "Oasis",
    correct: "d",
  },
  {
    question: "Who was the 40th President of the United States?",
    a: "Ronald Reagen",
    b: "Franklin D. Roosevelt",
    c: "Bill Clinton",
    d: "George W. Bush",
    correct: "a",
  },
  {
    question:
      "If you are eating chicken jalfrezi, what type of food are you eating?",
    a: "Italian food",
    b: "Indian food",
    c: "Mexican food",
    d: "French food",
    correct: "b",
  },
  {
    question: "In which country was the airline Ryanair founded?",
    a: "Ireland",
    b: "Germany",
    c: "England",
    d: "Spain",
    correct: "a",
  },
];
const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");
let currentQuiz = 0;
let score = 0;

function textQuestion() {
  //Show text question
  quiz.innerHTML = `
  <div class="quiz-header">How many squaremeters of dirt is in a hole with the size of 3x2x3?</div>
            <div id="answer-buttons" class="btn-grid">
              <form class="form" id="form" action="" method="POST">
              <input id="textAnswer" type="number" placeholder="Your answer">
              </form>
              <button id="submit" onclick="checkTextQuestion()">Submit</button>
            </div>
  `;
}
function checkTextQuestion() {
  const textAnswer = document.getElementById("textAnswer");
  //If answer correct
  if (textAnswer.value == "0") {
    score++;
    results();
  } else {
    results();
  }
}
function results() {
  //Render win page
  quiz.innerHTML = `  
         <h2>You answered ${score}/${
    quizData.length + 1
  } questions correctly</h2>  
  </br> <h2>You were right ${getScoreInPercent(score)}% of the time </h2>
  <img src="trophy.png" alt="" />
         <button onclick="location.reload()">Play Again</button>  
       `;
}

function getScoreInPercent(score) {
  return Math.round((score / (quizData.length + 1)) * 100);
}

const deselectAnswers = () => {
  answerElements.forEach((answer) => (answer.checked = false));
};
const getSelected = () => {
  let answer;
  answerElements.forEach((answerElement) => {
    if (answerElement.checked) answer = answerElement.id;
  });
  return answer;
};
const loadQuiz = () => {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionElement.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
};
loadQuiz();
submitButton.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === quizData[currentQuiz].correct) score++;
    currentQuiz++;
    if (currentQuiz < quizData.length) loadQuiz();
    else {
      textQuestion();
    }
  }
});
