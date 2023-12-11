//Array med frågor
const myQuestions = [
  {
    id: 1,
    question: "Chiles största ö heter Chileo.",
    inputType: "radio",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
  },
  {
    id: 2,
    question: "Johan är DRIP.",
    type: "radio",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
  },
  {
    id: 3,
    question: "Nintendos populäraste consol 2023 heter Nintendo Wii.",
    type: "radio",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
  },
  {
    id: 4,
    question: "Vad heter Pauls backup-konto i Fortnite?",
    type: "checkbox",
    answers: {
      a: "Pålenskåln",
      b: "PauliSonni",
      c: "BuBbEl",
      d: "bombASTICsideeye"
    },
    correctAnswer: ["a"],
  },
  {
    id: 5,
    question: "Paul heter egentligen Isis.",
    type: "radio",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: ["b"],
  },
  {
    id: 6,
    question: "Vi äter Vanessamat på lördagar.",
    type: "radio",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
  },
  {
    id: 7,
    question: "Siris första jobb var:",
    type: "radio",
    answers: {
      a: "Reklamutdelare",
      b: "Cirkusartist",
      c: "Glassförsäljare",
      d: "Statsminister"
    },
    correctAnswer: ["a", "d"],
  },
  {
    id: 8,
    question: "Nintendos mest populära syskonpar heter Maria och Luigia.",
    type: "radio",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
  },
  {
    id: 9,
    question: "Pauls nalle heter Pappa Björn.",
    type: "radio",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: ["b"],
  },
  {
    id: 10,
    question: "Siri är 100 år.",
    type: "radio",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: ["b"],
  }

];

//Nightmode-knapp resp. daymode-knapp

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

//Här börjar den stora quizfunktionen
function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
    // Vi behöver någonstans att förvara outputen och svaren på frågorna
    const output = [];
    let answers;
  
    //För varje fråga...
    questions.forEach((question, i) => {
      // först nollställer vi listan av svar om det är första frågan
      if (i === 0) {
        answers = [];
      }
  
      // för varje tillgängligt svar på denna fråga...
      for(let letter in question.answers.inputType) {

        // avgör vilken input type som används på frågan
      const inputType = question.inputType;

      console.log("inputType", inputType);

        // Lägg till en radio button/checkbox etc beroende på input type
        answers.push(`
            <label>
              <input type="${inputType}" name="question${i}" value="${letter}">
              ${letter}: ${question.answers[letter].text}
            </label>
          `
        );
      }
  
      // Lägg till frågorna och svaren till output-arrayen
      output.push(`
        <div class="question">${question.id}. ${question.question}</div>
        <div class="answers">${answers.join('')}</div>
        `
      );
    })
  
    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }

	function showResults(questions, quizContainer, resultsContainer) {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    let userAnswer = '';
    let numCorrect = 0;
  
    // for each question...
    questions.forEach((question, i) => {
      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;
  
      // if answer is correct
      if (userAnswer === question.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
  
        // color the answers green
        answerContainers[i].style.color = 'green';
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[i].style.color = 'orange';
      }
    });

    // Remove existing color classes
    resultsContainer.classList.remove("red", "yellow", "green");

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