//Array med frågor
const myQuestions = [
  {
    id: 1,
    question: "One Direction har sålt över 70 miljoner skivor.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["a"],
    type: "radio",
  },
  {
    id: 2,
    question: "Vad hette One Directions första singel?",
    answers: {
      a: "Stole My Heart",
      b: "Up All Night",
      c: "Gotta Be You",
      d: "What Makes You Beautiful",
    },
    correctAnswer: ["d"],
    type: "radio",
  },
  {
    id: 3,
    question: "Gruppen har inte lagt av – de är på paus sen 2015.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["a"],
    type: "radio",
  },
  {
    id: 4,
    question: "Vem slutade i One Direction redan innan pausen?",
    answers: {
      a: "Harry",
      b: "Zayn",
      c: "Liam",
      d: "Louie",
      e: "Niall",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 5,
    question: "One Direction kommer från:",
    answers: {
      a: "USA!",
      b: "Storbritannien!",
      c: "Irland!",
      d: "Sverige!"
    },
    correctAnswer: ["b", "c"],
    type: "checkbox",
  },
  {
    id: 6,
    question: "One Directions fans kallas:",
    answers: {
      a: "Wandas",
      b: "Directioners",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 7,
    question: "Vad hade One Direction hetat om de inte tagit namnet One Direction?",
    answers: {
      a: "CNN",
      b: "TBA",
      c: "YOLO",
      d: "USP"
    },
    correctAnswer: ["d"],
    type: "radio",
  },
  {
    id: 8,
    question: "One Direction bildades efter att ha tävlat i X-Factor.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["a"],
    type: "radio",
  },
  {
    id: 9,
    question: "Kryssa någon av One Directions låtar (en är fel)",
    answers: {
      a: "The Best Song Ever",
      b: "Sweet as a Cake",
      c: "You and I",
      d: "Midnight Memories",
    },
    correctAnswer: ["a", "c", "d"],
    type: "checkbox",
  },
  {
    id: 10,
    question: "Vem är Harry Styles?",
    answers: {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
    },
    correctAnswer: ["d"],
    type: "image",
    image: '241103e9531552680ce88b1bb3718b742850f1f7.webp'
  }

];

//Variabler
const startBtn = document.querySelector("#startBtn");
const nextBtn = document.querySelector("#nextBtn");
const quizContainer = document.querySelector('.quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
let currentQuestionIndex = 0;

//Nightmode/daymode-knapp:

//Deklarerar och definierar variabeln
const nightModeBtn = document.querySelector("#nightModeBtn");

//Vad som händer när man klickar på knappen - byter mellan true och false
nightModeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("daymode")) {
    toggleNightMode(true);
  } else {
    toggleNightMode(false);
  }
});

// När nightmode är på: växlar mellan två olika html-innehåll
const toggleNightMode = (isNightMode) => {
  document.body.className = isNightMode ? 'nightmode' : 'daymode';
  nightModeBtn.innerHTML = isNightMode ? "&#9788;" : "&#9790;";
  
  // Loopa genom de element som har klassen "question" och "answers" och byt bakgrundsfärg:
  document.querySelectorAll('.question, .answers').forEach(questionDiv => {
    questionDiv.style.backgroundColor = isNightMode ? "black" : "";
  });
}

// Hela quizfunktionen skapas här
const generateQuiz = (questions, quizContainer, resultsContainer, submitButton) => {

	const showQuestions = (questions, quizContainer) => {
    // Här sparar vi arrayen "output" och svarsalternativen
    const output = [];
    let answers;
  
    // För varje fråga:
    questions.forEach((question, i) => {
      // Först nollställer vi listan med svar
      answers = [];
  
      // För varje möjligt svar på frågan...
      for(letter in question.answers){
  
        // lägger vi till en radiobutton/checkbox

        answers.push(
          '<label>'
            + '<input type="'+question.type+'"name="question'+i+'" value="'+letter+'">'
            
            + ' ' + question.answers[letter]
          + '</label>' + '<br>'
        );
      }
   
      // Lägger till frågan och svaren i output
      output.push(
        '<div class="question">' + question.id + ". " + question.question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    })
    
  
    // Slutligen läggs output-listan i quizContainer
    quizContainer.innerHTML = output.join('');
  }

	const showResults = (questions, quizContainer, resultsContainer) => {
    // Här skapas en variabel för alla divs med class answers (se ovan)
    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    // Här räknar vi användarens svar, dvs vad användaren valt och hur många rätt
    let userAnswer = '';
    let numCorrect = 0;
  
    // För varje fråga...
    questions.forEach((question, i) => {
      // ...hitta vad användaren svarat
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      // Om svarsalternativen har type radio ...
      if(question.type === "radio" || question.type === "checkbox" ) {
        // och om svaret är rätt ...
        if (question.correctAnswer.includes(userAnswer)) {
          // lägg till poäng på rätta svar-räknaren ...
          numCorrect++;
          // och färga svaret grönt
          answerContainers[i].style.color = 'green';
        }
        // Om svaret är fel eller ej ifyllt...
        else {
          // färga svaret orange
          answerContainers[i].style.color = 'orange';
        }
      } else {
    }
  
    // Nollställ färger för det sammanlagda resultatet
    resultsContainer.classList.remove("red", "yellow", "green");

    // If-satser för olika resultat: <50%
    if (numCorrect <= questions.length *0.5) {
      resultsContainer.innerHTML = 'Underkänt! Du fick ' + numCorrect + ' rätt av ' + questions.length + '!';
      resultsContainer.classList.add("red");
    }

    // If-satser för olika resultat: 50-75%
    else if (numCorrect >= questions.length*0.5 && numCorrect <= questions.length*0.75) {

    resultsContainer.innerHTML = 'Bra! Du fick ' + numCorrect + ' rätt av ' + questions.length + '!';
    resultsContainer.classList.add("yellow");
    }
    // If-satser för olika resultat: >75%
    else if (numCorrect >= questions.length*0.75) {
    resultsContainer.innerHTML = 'Riktigt bra jobbat! Du fick ' + numCorrect + ' rätt av ' + questions.length + '!';
    resultsContainer.classList.add("green");
  }
});
}
	// Kör funktionen showQuestions
	showQuestions(questions, quizContainer, currentQuestionIndex);

	// Visa resultaten när användaren klickar på Submit
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

//Visa hela quizet

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);