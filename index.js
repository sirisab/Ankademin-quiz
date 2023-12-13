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
      d: "Sverige!",
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
    imageA: 'Liam.jpeg',
    imageB: 'Louis.jpeg',
    imageC: 'Zayn.jpeg',
    imageD: 'Harry.jpeg',
    imageE: 'Niall.jpeg',
  
  }

];

//Variabler till senare
const quizContainer = document.querySelector('.quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//Nightmode/daymode-knapp
const nightModeBtn = document.querySelector("#nightModeBtn");

nightModeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("daymode")) {
    toggleNightMode(true);
  } else {
    toggleNightMode(false);
  }
});

//Vad som händer när man klickar på knappen - den byter mellan true och false
const toggleNightMode = (isNightMode) => {
  document.body.className = isNightMode ? 'nightmode' : 'daymode';
  nightModeBtn.innerHTML = isNightMode ? "&#9788;" : "&#9790;";
  
  // När nightmode är på: växlar mellan två olika html-innehåll
  document.querySelectorAll('.question, .answers').forEach(questionDiv => {
    questionDiv.style.backgroundColor = isNightMode ? "black" : ""; // Set background color or reset
  });
}

const generateQuiz = (questions, quizContainer, resultsContainer, submitButton) => {

	const showQuestions = (questions, quizContainer) =>{
    // Här sparar vi output och svarsalternativen och question till forEach nedan
    const output = [];
    let answers;
    let question;
  
    // För varje fråga
    questions.forEach((currentQuestion, i) => {
      //Tilldela currentQuestion till question 
      question = currentQuestion;

      if (question) {
      // Först nollställer vi listan med svar
      answers = [];
  
      // För varje möjligt svar på frågan...
      for(letter in question.answers){
        // lägger vi till en radiobutton...
        if (question.type === "radio" || question.type === "checkbox"){
          answers.push(
            '<label>'
              + '<input type="'+question.type+'"name="question'+i+'" value="'+letter+'">'
              
              + ' ' + question.answers[letter]
            + '</label>' + '<br>'
          );
        }
      }

      //Ny if-sats: Om det finns bildalternativ, lägg till dem
      if (question.type === "image") {
        for (imageLetter in question.answers) {
          answers.push(
            '<label>'            
              + '<input type="radio" name="question'+i+'" value="'+imageLetter+'">'
              + ' ' + question.answers[imageLetter]
              + '<img src="'+ question['image' + imageLetter.toUpperCase()] + '">'
            + '</label>' + '<br>'
          );
        }
      }

      // Lägger till frågan och svaren i output
      output.push(
        '<div class="question">' + question.id + ". " + question.question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
      }
    });;
    
    // Slutligen läggs output-listan i HTML-form i quizContainer
    quizContainer.innerHTML = output.join('');
  }

	const showResults = (questions, quizContainer, resultsContainer) => {

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
      } 
  
    // Ta bort eventuella existerande färgklasser inför nästa steg
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
	showQuestions(questions, quizContainer);

	// Visa resultaten när användaren klickar på Submit
	submitButton.onclick = function(){
		showResults(questions, quizContainer, resultsContainer);
	}
}

//Visa hela quizet
generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);