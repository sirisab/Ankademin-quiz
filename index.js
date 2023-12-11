//Array med frågor
const myQuestions = [
  {
    id: 1,
    question: "Chiles största ö heter Chileo.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 2,
    question: "Johan är DRIP.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 3,
    question: "Nintendos populäraste consol 2023 heter Nintendo Wii.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 4,
    question: "Vad heter Pauls backup-konto i Fortnite?",
    answers: {
      a: "Pålenskåln",
      b: "PauliSonni",
      c: "BuBbEl",
      d: "bombASTICsideeye"
    },
    correctAnswer: ["a"],
    type: "radio",
  },
  {
    id: 5,
    question: "Paul heter egentligen Isis.",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 6,
    question: "Vi äter Vanessamat på lördagar.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 7,
    question: "Siris första jobb var:",
    answers: {
      a: "Reklamutdelare",
      b: "Cirkusartist",
      c: "Glassförsäljare",
      d: "Statsminister"
    },
    correctAnswer: ["a", "d"],
    type: "checkbox",
  },
  {
    id: 8,
    question: "Nintendos mest populära syskonpar heter Maria och Luigia.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 9,
    question: "Pauls nalle heter Pappa Björn.",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: ["b"],
    type: "radio",
  },
  {
    id: 10,
    question: "Siri är 100 år.",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: ["b"],
    type: "radio",
  }

];



//Nightmode/daymode-knapp

const nightModeBtn = document.querySelector("#nightModeBtn");
nightModeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("daymode")){
    document.body.className = 'nightmode';
    nightModeBtn.innerHTML = ""
    nightModeBtn.innerHTML = "&#9788"
  }
  else {
    document.body.className = 'daymode';
    nightModeBtn.innerHTML = ""
    nightModeBtn.innerHTML = "&#9790;"
  }
})

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
            
            + question.answers[letter]
          + '</label>'
        );
        // ... eller en checkbox.
      } else if (question.type === "checkbox"){
        answers.push(
          '<label>'
            + '<input type="checkbox" name="question'+i+'" value="'+letter+'">'
            
            + question.answers[letter]
          + '</label>'
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

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);