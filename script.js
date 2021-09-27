const cards = document.querySelectorAll(".card");
const scoreContainer = document.getElementById("score-container");
const btnStart = document.getElementById("btn-start");

let firstCard = null;
let secondCard = null;
let score = 00;
let gameIsStart = false;

function addScore() {
  score += 12.5;
  scoreContainer.innerText = `Score: ${score}`;
}

btnStart.addEventListener("click", function () {
  gameIsStart = true;
  console.log(gameIsStart);
  setEvent();
});

function setEvent() {
  if (gameIsStart) {
    btnStart.setAttribute("disabled", "");

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        if (!card.classList.contains("same")) {
          if (!firstCard) {
            firstCard = card;
            firstCard.classList.add("flip");
          } else if (firstCard) {
            secondCard = card;
            secondCard.classList.add("flip");

            setTimeout(function () {
              if (firstCard.getAttribute("class") === secondCard.getAttribute("class")) {
                firstCard.classList.add("same");
                secondCard.classList.add("same");
                addScore();
              } else {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
              }

              firstCard = null;
              secondCard = null;
            }, 800);
          }
        }
      });
    });
  }
}
