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
    question: "1D har inte lagt av! De tar bara en paus – sen 7 år tillbaka.",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["a"],
    type: "radio",
  },
  {
    id: 4,
    question: "Vem slutade i One Direction 2015?",
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
    question: "Medlemmarna i 1D kommer från två olika länder, nämligen:",
    answers: {
      a: "USA!",
      b: "Storbritannien!",
      c: "Irland!",
      d: "Sverige!",
    },
    correctAnswer: ["b", "c"],
    wrongAnswer: ["a", "d"],
    type: "checkbox",
  },
  {
    id: 6,
    question: "One Directions fans kallas:",
    answers: {
      a: "Wonders",
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
    question: "One Direction bildades efter att ha tävlat i en talangjakt på tv. Vilken?",
    answers: {
      a: "X-Factor",
      b: "American Idol",
      c: "Britain's Got Talent"
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
    question: "Vem i One Direction är Harry Styles?",
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

//Vad som händer när man klickar på knappen - den byter mellan true och false
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
  
  // Nightmode - byter färg på element
  document.querySelectorAll('.question, .answers').forEach(questionDiv => {
    questionDiv.style.backgroundColor = isNightMode ? "darkblue" : ""; 
    h1Container.style.backgroundColor = isNightMode ? "darkblue" : "";
    document.querySelector('h1').style.color = isNightMode ? "white" : "";
    quizContainer.style.backgroundColor = isNightMode ? "darkgrey" : "";
    submitButton.style.backgroundColor = isNightMode ? "darkblue" : "";
    document.querySelector('#submit').style.color = isNightMode ? "white" : "";
    document.querySelector('#results').style.color = isNightMode ? "white" : "";

  });
}

// Funktionen som skapar quizet med alla delar
const generateQuiz = (questions, quizContainer, resultsContainer, submitButton) => {

  //Funktionen som visar frågorna och svarsalternativen
	const showQuestions = (questions, quizContainer) =>{

    // Här sparar vi output och svarsalternativen, och question till forEach nedan
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
            '<label id="imageQuestion">'            
              + '<input type="radio" name="question'+i+'" value="'+imageLetter+'">'
              + '<br>' 
              + ' ' + question.answers[imageLetter]
              + '<img src="'+ question['image' + imageLetter.toUpperCase()] + '">'
            + '</label>' + '<br>'
          );
        }
      }

      // Lägger till frågan och svaren i output
      output.push(
        '<div class="question">' + question.id + ". " + question.question + '</div>' //Frågan
        + '<div class="answers">' + answers.join('') + '</div>' //Svaret
      );
      }
    });;
    
    // Slutligen läggs output-listan i HTML-form i quizContainer-diven
    quizContainer.innerHTML = output.join('');
  }

  //Funktionen som visar resultatet
	const showResults = (questions, quizContainer, resultsContainer) => {

    // Här skapas en variabel för alla divs med class "answers"
    const answerContainers = quizContainer.querySelectorAll('.answers');
    
    // Här kommer vi att räkna användarens svar, både vad den svarar och om det var rätt eller ej
    let userAnswer = '';
    let numCorrect = 0;
  
    // För varje fråga...
    questions.forEach((question, i) => {
      // ...hitta vad användaren svarat
      userAnswer = (answerContainers[i].querySelector('input[name=question' + i + ']:checked') || {}).value;

      // Om svarsalternativen har type radio eller image ...
      if(question.type === "radio" || question.type === "image" ){
        // och om svaret är rätt ...
        if (question.correctAnswer.includes(userAnswer)) {
          // lägg till poäng på rätta svar-räknaren ...
          numCorrect++;
          // och färga svaret grönt!
          answerContainers[i].style.backgroundColor = 'rgb(148, 211, 155)';
        }
        // Om svaret är fel eller ej ifyllt...
        else {
          // färga svaret orange!
          answerContainers[i].style.backgroundColor = 'rgb(243, 88, 88)';
        }
        // Om svarsalternativen har type checkbox...
       } else if (question.type === "checkbox") {

        let container = answerContainers[i];
        let checkboxes = container.querySelectorAll("input[type='checkbox']");
        
        let passed = false;

        let answers = Array.from(checkboxes).map(checkbox => {
          if (checkbox.checked) {
            return checkbox.value;
          }
        }).filter(value => value !== undefined);

        if (answers.length > 0) {
          passed = answers.every(answer => question.correctAnswer.includes(answer));
        }
        
        if (passed) {
          numCorrect++;
          // och färga svaret grönt!
          answerContainers[i].style.backgroundColor = 'rgb(148, 211, 155)';
        }
      // Om svaret är fel eller ej ifyllt...
      else {
        // färga svaret orange!
        answerContainers[i].style.backgroundColor = 'rgb(243, 88, 88)';
      }
    }
    // Ta bort eventuella existerande färgklasser inför nästa steg
    resultsContainer.classList.remove("red", "yellow", "green");

     // If-satser för olika resultat: <50%
     if (numCorrect <= questions.length *0.5) {
      resultsContainer.innerHTML = 'Underkänt! Du fick ' + numCorrect + ' rätt av ' + questions.length + '! Du är ingen riktig Directioner.';
      resultsContainer.classList.add("red");
    }

    // If-satser för olika resultat: 50-75%
    else if (numCorrect >= questions.length*0.5 && numCorrect <= questions.length*0.75) {

    resultsContainer.innerHTML = 'Bra! Du fick ' + numCorrect + ' rätt av ' + questions.length + '! Du är nästan en riktig Directioner!';
    resultsContainer.classList.add("yellow");
    }
    // If-satser för olika resultat: >75%
    else if (numCorrect >= questions.length*0.75) {
    resultsContainer.innerHTML = 'Riktigt bra jobbat! Du fick ' + numCorrect + ' rätt av ' + questions.length + '! Du är en riktig Directioner!';
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