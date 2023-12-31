//Array med frågor
myQuestions = [
    {
      id: 1,
      question: "Vad heter Chiles största ö?",
      answers: {
        a: "Chileo",
        b: "Chiloé",
      },
      correctAnswer: "b",
    },
    {
      id: 2,
      question: "Vad heter ön utanför Sveriges största ö?",
      answers: {
        a: "Fårö",
        b: "Färö",
      },
      correctAnswer: "a",
    },
    {
      id: 3,
      question: "Vad heter ön i Siljan?",
      answers: {
        a: "Sållerö",
        b: "Selleri-ön",
      },
      correctAnswer: "a",
    },
  ];
  
  //Initialisera index, en slags räknare
  let currentQuestionIndex = 0;
  
  // we'll need a place to store the output and the answer choices
  
  //Visa frågan
  let showQuestion = (array) => {
    let output =[];
    let answers;
    let quizContainer = document.querySelector("#quizContainer");
    let text = document.createElement("p");
    text.innerText = `${array[currentQuestionIndex].id}. ${array[currentQuestionIndex].question}`;
    quizContainer.append(text);
  };
  
  let showAnswers= (array) => {
    let answerContainer = document.querySelector("#answerContainer");
    let buttonA = document.createElement("button");
    let buttonB = document.createElement("button");
    buttonA.innerText = `${array[currentQuestionIndex].answers.a}`;
    buttonB.innerText = `${array[currentQuestionIndex].answers.b}`;
    answerContainer.append(buttonA, buttonB);
    buttonA.addEventListener("click", () => {
      alert("Du har feeeel!");
    })
    buttonB.addEventListener("click", () => {
      alert("Du har rätt!");
    })
  };
  
  
  
  showQuestion(myQuestions);
  showAnswers(myQuestions);