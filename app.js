let quizData = [
    {
    question: "What continent has the most World Heritage Sites?",
    options: ["Asia", "Africa", "Europe", "North America"],
    correct: "Europe",
    },
    {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correct: "Mars",
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
    },
    {
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: "Blue Whale",
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
    },
    {
    question: "Which religion has the cow a holy animal?",
    options: [
        "Buddhism", "Judaism",
        "Christianity", "Hinduism",],
    correct: "Hinduism",
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
    },
  
    ];
  
  const quizContainer = document.querySelector(".quiz-container");
  const question = document.querySelector(".quiz-container .question");
  const options = document.querySelector(".quiz-container .options");
  const nextBtn = document.querySelector(".quiz-container .next-btn");
  const quizResult = document.querySelector(".quiz-result");
  const startBtnContainer = document.querySelector(".start-btn-container");
  const startBtn = document.querySelector(".start-btn-container .start-btn");
  
  let questionNumber = 0;
  let score = 0;
  const MAX_QUESTIONS = 10;
  let timerInteval;

  const shuffleArray = array => {
    return array.slice().sort(() => Math.random() - 0.5);
  };

  quizData = shuffleArray(quizData);

  const resetLocalStorage = () => {
    for (i = 0; i < MAX_QUESTIONS; i++) {
      localStorage.removeItem(`userAnswer_${i}`);
    }
  };
  
  resetLocalStorage();
  

  const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct) {
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

  const createQuestion = () => {
    clearInterval(timerInteval);

    let secondsLeft = 29;
    const timerDisplay = document.querySelector(".quiz-container .timer");
    timerDisplay.classList.remove("danger");

    timerDisplay.textContent = 'Time left: 30 seconds';

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
    

    options.innerText = "";
    question.innerText = quizData[questionNumber].question;

    const shuffledOptioons = shuffleArray(quizData[questionNumber].options);

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

  const retakeQuiz =() => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();


    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
  }

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerText = "";

 const resultHeading = document.createElement("h2");
    resultHeading.innerText = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);   

    
    for (let i = 0; i < MAX_QUESTIONS; i++) {
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct; 
        
        let answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
        resultItem.classList.add("incorrect");
    }
    resultItem.innerText = `<div class="question">Question ${i + 1}: ${
        quizData[i].question
    }</div>
      <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
      <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;
  
      quizResult.appendChild(resultItem);
    }

const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
};

  createQuestion();


  const displayNextQuestion = () => {
    if (questionNumber >= MAX_QUESTIONS - 1) {
        displayQuizResult();
        return;
    }


    questionNumber++;
    createQuestion();
  };

  nextBtn.addEventListener("click", displayNextQuestion)

  nextBtn.addEventListener("click", displayNextQuestion);

  startBtn.addEventListener("click", () => {
    startBtnContainer.style.display = "none";
    quizContainer.style.display = "block";
    createQuestion();
  });