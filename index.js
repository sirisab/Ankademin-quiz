const questions = [
  {
    id: 1,
    question: "Banan är ett frö",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["a"],
    type: "radio",
  }, 
  {
    id: 2,
    question: "Trollpipistrell är en slags fladdermus",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["a"],
    type: "radio",
  },
  {
    id: 3,
    question: "Liljekonvaljen är ätbar",
    answers: {
      a: "Sant",
      b: "Falskt",
    },
    correctAnswer: ["b"],
    type: "radio",
}
]

//Deklarerar och definierar variabler
const startBtn = document.querySelector("#startBtn");
const questionCard = document.querySelector("#questionCard");
const nextBtn = document.querySelector("#nextBtn");
let currentQuestionIndex;

//Vad som händer när man klickar på start-knappen
startBtn.addEventListener("click", () => {
  
  //Gömmer/visar olika element
  startBtn.classList.add("hide");
  questionCard.classList.remove("hide");
  nextBtn.classList.remove("hide");
  
  currentQuestionIndex = 0;

  //För varje fråga
  questions.forEach ((question) => {
  //Här sparar jag svaren:
  let answers =[];
  
  //Och ifall frågan är av typen radio:
  if (question.type === "radio") {

    //Lägg till själva frågan
    document.getElementById("questionCard").innerHTML = 
      `Fråga ${question.id}: ${question.question}` 
    }
  });
    // ... eller en checkbox.
  });

  //När man klickar på Next Button
  nextBtn.addEventListener("click", (question) => {
    currentQuestionIndex++;
    document.getElementById("questionCard").innerHTML = 
      `Fråga ${question.id}: ${question.question}`;
      console.log(question.id);
  })





  
  
