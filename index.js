//Array med frågor
const myQuestions = [
  {
    id: 1,
    question: "Chiles största ö heter Chileo.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
  {
    id: 2,
    question: "Johan är DRIP.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
  {
    id: 3,
    question: "Nintendos populäraste consol 2023 heter Nintendo Wii.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
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
    correctAnswer: "a",
  },
  {
    id: 5,
    question: "Paul heter egentligen Isis.",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: "b",
  },
  {
    id: 6,
    question: "Vi äter Vanessamat på lördagar.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
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
    correctAnswer: "a",
  },
  {
    id: 8,
    question: "Nintendos mest populära syskonpar heter Maria och Luigia.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: "b",
  },
  {
    id: 9,
    question: "Pauls nalle heter Pappa Björn.",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: "b",
  },
  {
    id: 10,
    question: "Siri är 100 år.",
    answers: {
      a: "Sant",
      b: "Falskt"
    },
    correctAnswer: "b",
  }

];

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
    // we'll need a place to store the output and the answer choices
    const output = [];
    let answers;
  
    // for each question...
    questions.forEach((question, i) => {
      // first reset the list of answers
      answers = [];
  
      // for each available answer to this question...
      for(letter in question.answers){
  
        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            
            + question.answers[letter]
          + '</label>'
        );
      }
  
      // add this question and its answers to the output
      output.push(
        '<div class="question">' + question.id + ". " + question.question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
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