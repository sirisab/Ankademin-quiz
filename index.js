const questions = [
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
      b: "Storbritannien!"
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
]

//Deklarerar och definierar variabler
const startBtn = document.querySelector("#startBtn");
const questionCard = document.querySelector("#questionCard");
const nextBtn = document.querySelector("#nextBtn");
let currentQuestionIndex = 0;

//Vad som händer när man klickar på start-knappen
startBtn.addEventListener("click", () => {
  
  //Gömmer/visar olika element
  startBtn.classList.add("hide");
  questionCard.classList.remove("hide");
  nextBtn.classList.remove("hide");
  
  

  //För varje fråga
  questions.forEach ((question) => {
  //Här sparar jag svaren:
  let answers =[];
  
  //Och ifall frågan är av typen radio:
  if (question.type === "radio") {

    //Lägg till själva frågan
    document.getElementById("questionCard").innerHTML = 
      `Fråga ${question.id}: ${question.question}` 
      console.log(question.id);
    } else if (question.type === "checkbox") {

      //Lägg till själva frågan
      document.getElementById("questionCard").innerHTML = 
        `Fråga ${question.id}: ${question.question}` 
        console.log(question.id);
      }
  
  });
    // ... eller en checkbox.

  });

  //När man klickar på Next Button
  nextBtn.addEventListener("click", (question) => {
    currentQuestionIndex--;
    document.getElementById("questionCard").innerHTML = 
      `Fråga ${question.id}: ${question.question}`;
      console.log(question.id);
  })





  
  
