//Deklarera knappar

question1BtnA = document.querySelector("#question1BtnA");
question1BtnB = document.querySelector("#question1BtnB");

//Clickevent knappar

question1BtnA.addEventListener("click", () => {
  alert("Du har fel!");
});

question1BtnB.addEventListener("click", () => {
  alert("Du har rätt!");
});
//
