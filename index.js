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
    question: "Pauls backup-konto i Fortnite heter Pålenskåln.",
    answers: {
      a: "Sant",
      b: "Falskt"
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
    question: "Både Johan och Siri har jobbat som värd.",
    answers: {
      a: "Sant",
      b: "Falskt",
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

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

	function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    let output = [];
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
        '<div class="question">' + question.question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    })
  
    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }

	function showResults(questions, quizContainer, resultsContainer) {
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
  
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
        answerContainers[i].style.color = 'red';
      }
    });
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

	// show the questions
	showQuestions(questions, quizContainer);

	// when user clicks submit, show results
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);