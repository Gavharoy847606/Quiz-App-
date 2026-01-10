let questions = [];
let currentQuestion = 0;
let score = 0;
let timer = 10;
let timerIntervalId;


const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const timerQuiz = document.getElementById("timer");


fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
  .then(res => res.json())
  .then(data => {
    questions = data.results;
    showQuestion();
  });



// Savollarni va javoblarini  birma bir olish.
function sortQuestion() {
  let current = questions[currentQuestion];

  questionEl.innerHTML = current.question;

  let options = [
    ...current.incorrect_answers,
    current.correct_answer
  ];

  options.sort(() => Math.random() - 0.5);

  options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerHTML = option;

    btn.addEventListener("click", () => {
      checkAnswer(btn, current.correct_answer);
      if(btn === "" ){
        return current.correct_answer;
      }
    });

    answersEl.appendChild(btn);
  });
}



function showQuestion() {
  answersEl.innerHTML = "";
  resultEl.innerHTML = "";


  sortQuestion();
  clearInterval(timerIntervalId);
  startQuizTime();
}

function checkAnswer(selectedBtn, correctAnswer) {
  const allButtons = answersEl.querySelectorAll("button");

  allButtons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerHTML === correctAnswer) {
      btn.classList.add("correct");
    }
  });

  if (selectedBtn.innerHTML === correctAnswer) {
    score += 0.5;
  } else {
    selectedBtn.classList.add("wrong");
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }

});


function showResult() {
  questionEl.innerHTML = "Quiz tugadi 🎉";
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";

  resultEl.innerHTML = `
    To‘g‘ri javoblar soni: ${score / 0.5} ta <br>
    Umumiy ball: ${score}
  `;
}

// Ruxshona bolimi Sal codeni oddiy functionga olib alohida qilindi showQuestion ichidadi sortQuestion boshqa codiga o`zgatrishish kirirtmadim.




// har bir savol uchun soniya sanash funksiyasi.
function startQuizTime() {
  timer = 5;

  timerQuiz.innerText = `Time: ${timer}`;

  timerIntervalId = setInterval(() => {
    timer--;
    timerQuiz.innerText = `Timer: ${timer}`
    if (timer <= 0) {
      clearInterval(timerIntervalId);
      answersBlockFunc();
    }
  }, 1000)
}

// Agar soniya sanab bolguncha javob berishga ulgurmasa belgilshni blocklaydigan funksiya 
function answersBlockFunc() {
  const allButtons = answersEl.querySelectorAll("button");

  allButtons.forEach(btn => {
    btn.disabled = true;
    CorrectAnswerFunc()
    
  });
}

// Agar soniya sanab bolguncha javob berishga ulgurmasa belgilshni blocklagandan keyin to`gri javobni korsatadigan funksiya.

function CorrectAnswerFunc() {
  const buttons = answersEl.querySelectorAll("button");
  const correctAnswer = questions[currentQuestion].correct_answer;

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerHTML === correctAnswer) {
      btn.classList.add("correct");
    }
  });
}

//
// function nextQuiz() {
//   currentQuestion++;

//   if (currentQuestion < questions.length) {
//     showQuestion();
//   } else {
//     showResult();
//   }
// }

//Gavahroy bo`limi secound sanash va boshqalar 

