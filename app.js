/*-------------------------------- Constants --------------------------------*/

let quizData = [
  {
  question: "What continent has the most World Heritage Sites?",
  options: ["Asia", "Africa", "Europe", "North America"],
  correct: "Europe",
  type: "history" ,
  },
  {
  question: "Which planet is known as the 'Red Planet'?",
  options: ["Mars", "Venus", "Jupiter", "Mercury"],
  correct: "Mars",
  type: "any",
  },
  {
  question: "What is the Vredefort Dome, a World Heritage site in South Africa??",
  options: [
    "The world's largest asteroid impact site",
      "An 11th-century stadium",
      "A historic gold mine",
      "A volcanic crater",
  ],
  correct: "The world's largest asteroid impact site",
  type: "history",
  },
  {
  question: "What is the largest mammal on Earth?",
  options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
  correct: "Blue Whale",
  type: "any",
  },
  {
  question: "Which famous artist painted the Mona Lisa?",
  options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
  ],
  correct: "Leonardo da Vinci",
  type:"history"
  },
  {
  question: "Which playwright wrote the tragedy 'Romeo and Juliet'?",
  options: [
      "William Shakespeare",
      "George Bernard Shaw",
      "Oscar Wilde",
      "Charles Dickens",
  ],
  correct: "William Shakespeare",
  type: "any",
  },
  {
  question: "What does a World Heritage site added in 2006 recognizes in Mexico add?",
  options: [
      "Artist Diego Rivera's murals",
      "The Zona Rosa neighborhood of Mexico City",
      "Its tequila-producing area",
      "A bullring in Acapulco",
  ],
  correct: "Its tequila-producing area",
  type: "history"
  },
  {
  question:
  "Which ancient wonder of the world was a massive statue of the Greek god Zeus?",
  options: [
  "Great Pyramid of Giza",
      "Hanging Gardens of Babylon",
      "Statue of Zeus at Olympia",
      "Colossus of Rhodes",
  ],
  correct: "Statue of Zeus at Olympia",
  type: "history"
  },
  {
  question: "Which religion has the cow a holy animal?",
  options: [
      "Buddhism", "Judaism",
      "Christianity", "Hinduism",],
  correct: "Hinduism",
  type: "any",
  },

  {
  question: "Which food is from Mexico?",
  options: [
      "Injera",
      "Banga",
      "Molletes",
      "Pastilla",
  ],
  correct: "Molletes",
  type: "any",
  },

  ];

//   *------------------------ Cached Element References ------------------------*/


const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");
const category  = document.getElementById("category")

let questionNumber = 0;
let score = 0;
let timerInteval;
let selectCategory;
let categoryArray;

  const shuffleArray = array => {
    return array.slice().sort(() => Math.random() - 0.5);
  };

  

  const resetLocalStorage = () => {
    for (i = 0; i < categoryArray.length; i++) {
      localStorage.removeItem(`userAnswer_${i}`);
    }
  };
  
  // resetLocalStorage();
  
/*-------------------------------- Functions --------------------------------*/
  const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === categoryArray[questionNumber].correct) {
        score++;
        e.target.classList.add("correct");
    }else {
        e.target.classList.add("incorrect");
    }

    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach(o => {
        o.classList.add("disabled");
    });
  };

  const startTimer = () => {
    clearInterval(timerInteval);

    let secondsLeft = 59;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");

    timerDisplay.textContent = 'Time left: 60 seconds';

    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Time Left: ${secondsLeft
          .toString()
          .padStart(2, "0")} seconds`;
        secondsLeft--;
    
        if (secondsLeft < 10) {
          timerDisplay.classList.add("danger");
        }
    
        if (secondsLeft < 0) {
          clearInterval(timerInterval);
          displayNextQuestion();
        }
      }, 1000);
  };

const createQuestion = () => {
  
  categoryArray = quizData.filter((question) => question.type === selectCategory);
  categoryArray = shuffleArray(categoryArray);
  
    options.innerText = "";
    question.innerText = categoryArray[questionNumber].question;

    const shuffledOptioons = shuffleArray(categoryArray[questionNumber].options);

    shuffledOptioons.forEach(o => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerText = o;
        options.appendChild(option);
        option.addEventListener("click", (e) => {
            checkAnswer(e);
        });
        options.appendChild(option);
    });
  };
/*---------------------------- Variables (state) ----------------------------*/

  const retakeQuiz =() => {
    questionNumber = 0;
    score = 0;
    // quizData = shuffleArray(quizData);
    resetLocalStorage();


    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
  };

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerText = "";

 const resultHeading = document.createElement("h2");
    resultHeading.innerText = `You have scored ${score} out of ${categoryArray.length}.`;
    quizResult.appendChild(resultHeading);   

    
    for (let i = 0; i < categoryArray.length; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = categoryArray[i].correct; 
        
        let answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
        resultItem.classList.add("incorrect");
    }
    resultItem.innerText = `<div class="question">Question ${i + 1}: ${
        categoryArray[i].question
    }</div>
      <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
      <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;
  
      quizResult.appendChild(resultItem);
    }

  const retakeBtn= document.querySelector("button");
    retakeBtn.addEventListener("click", (retakeQuiz) => {
      window.location.reload();
    });
  
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerText = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
  };

  const displayNextQuestion = () => {
    if (questionNumber >= categoryArray.length - 1) {
        displayQuizResult();
        return;
    }


    questionNumber++;
    createQuestion();
  };
/*----------------------------- Event Listeners -----------------------------*/


  nextBtn.addEventListener("click", displayNextQuestion);
  

  startBtn.addEventListener("click", () => {
    selectCategory = category.value; 
    startBtnContainer.style.display = "none";
    quizContainer.style.display = "block";
    createQuestion();
    startTimer();
  });
  

  







