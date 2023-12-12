//Array med frågor
const myQuestions = [
  {
    id: 1,
    question: "One Direction är väldigt kända!",
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
    question: "Gruppen har inte lagt av, de är på paus sen 2015.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["a"],
    type: "radio",
  },
  {
    id: 4,
    question: "Vem slutade i One Direction?",
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
    question: "One Direction kommer från USA!",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: ["b"],
    type: "radio",
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
    question: "Vad hade 1D hetat om de inte tagit namnet One Direction?",
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
    question: "One Direction bildades efter att ha tävlat i svenska Talang.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 9,
    question: "Kryssa någon av One Directions låtar",
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

//Nightmode/daymode-knapp

const nightModeBtn = document.querySelector("#nightModeBtn");

nightModeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("daymode")) {
    toggleNightMode(true);
  } else {
    toggleNightMode(false);
  }
});

function toggleNightMode(isNightMode) {
  document.body.className = isNightMode ? 'nightmode' : 'daymode';
  nightModeBtn.innerHTML = isNightMode ? "&#9788;" : "&#9790;";
  
  // Loop through all elements with the class "question"
  document.querySelectorAll('.question, .answers').forEach(questionDiv => {
    questionDiv.style.backgroundColor = isNightMode ? "black" : ""; // Set background color or reset
  });
}

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
    // Här sparar vi output och svarsalternativen
    const output = [];
    let answers;
  
    // För varje fråga
    questions.forEach((question, i) => {
      // Först nollställer vi listan med svar
      answers = [];
  
      // För varje möjligt svar på frågan...
      for(letter in question.answers){
  
        // lägger vi till en radiobutton...
        if (question.type === "radio"){
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            
            + ' ' + question.answers[letter]
          + '</label>' + '<br>'
        );
        // ... eller en checkbox.
      } else if (question.type === "checkbox"){
        answers.push(
          '<label>'
            + '<input type="checkbox" name="question'+i+'" value="'+letter+'">'
            
            + ' ' + question.answers[letter]
          + '</label>' + '<br>'
        )
      }
      }
   
      // Lägger till frågan och svaren i output
      output.push(
        '<div class="question">' + question.id + ". " + question.question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    })
    
  
    // Slutligen kombineras output-listan till en HTML-sträng och lägger den på sidan
    quizContainer.innerHTML = output.join('');
  }

	function showResults(questions, quizContainer, resultsContainer) {
    // Här skapas en variabel för alla divs med class answers (se ovan)
    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    // Här räknar vi användarens svar
    let userAnswer = '';
    let numCorrect = 0;
  
    // För varje fråga...
    questions.forEach((question, i) => {
      // ...hitta vad användaren svarat
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
      console.log(userAnswer);

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
  
  
    // Remove existing color classes
    resultsContainer.classList.remove("red", "yellow", "green");
    console.log(numCorrect);
    // If-satser för olika resultat
    if (numCorrect <= questions.length *0.5) {
      resultsContainer.innerHTML = 'Underkänt! Du fick ' + numCorrect + ' rätt av ' + questions.length;
      resultsContainer.classList.add("red");

    }
    else if (numCorrect >= questions.length*0.5 && numCorrect <= questions.length*0.75) {
    // show number of correct answers out of total
    resultsContainer.innerHTML = 'Bra! Du fick ' + numCorrect + ' rätt av ' + questions.length;
    resultsContainer.classList.add("yellow");
    }
    else if (numCorrect >= questions.length*0.75) {
    // show number of correct answers out of total
    resultsContainer.innerHTML = 'Riktigt bra jobbat! Du fick ' + numCorrect + ' rätt av ' + questions.length + '!';
    resultsContainer.classList.add("green");
  }
});
  }
  

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

const quizContainer = document.querySelector('.quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);