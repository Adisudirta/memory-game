// elements in navigation
const scoreContainer = document.getElementById("score-container");
const btnStart = document.getElementById("btn-start");
const containerTimer = document.getElementById("timer-container");

// main elements
const cards = document.querySelectorAll(".card");
const containerGame = document.querySelector(".container-game");

let firstCard = null;
let secondCard = null;
let score = 00;
let time = 10;
let gameIsStart = false;

function addScore() {
  score += 12.5;
  scoreContainer.innerText = `Score: ${score}`;
}

function resetGame() {
  firstCard = null;
  secondCard = null;
  score = 00;
  time = 10;
  gameIsStart = false;

  cards.forEach(function (card) {
    if (card.classList.contains("flip")) {
      card.classList.remove("flip");
    }
  });
}

function shuffle() {
  for (let i = containerGame.children.length; i >= 0; i--) {
    containerGame.appendChild(containerGame.children[(Math.random() * i) | 0]);
  }

  cards.forEach(function (card) {
    card.classList.add("flip");

    setTimeout(function () {
      card.classList.remove("flip");
    }, 1500);
  });
}

function gameTimer() {
  let timer = setInterval(function () {
    time -= 1;
    containerTimer.innerText = `Timer: ${time}`;

    if (time == 0) {
      clearInterval(timer);
      alert(`Your score is ${score}`);
      resetGame();
      containerTimer.innerText = `Timer: ${time}`;
      scoreContainer.innerText = `Score: ${score}`;
      btnStart.removeAttribute("disabled");
    }
  }, 1000);
}

function flipCard() {
  if (!firstCard) {
    firstCard = this;
    firstCard.classList.add("flip");
  } else if (firstCard) {
    if (firstCard.getAttribute("cardId") !== this.getAttribute("cardId")) {
      secondCard = this;
      secondCard.classList.add("flip");

      if (firstCard.getAttribute("class") === secondCard.getAttribute("class")) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        addScore();

        firstCard = null;
        secondCard = null;
      } else {
        setTimeout(function () {
          console.log(firstCard, secondCard);
          firstCard.classList.remove("flip");
          secondCard.classList.remove("flip");

          firstCard = null;
          secondCard = null;
        }, 700);
      }
    }
  }
}

function setEvent() {
  if (gameIsStart) {
    btnStart.setAttribute("disabled", "");

    cards.forEach(function (card) {
      card.addEventListener("click", flipCard);
    });
  }
}

btnStart.addEventListener("click", function () {
  gameIsStart = true;
  shuffle();
  setEvent();
  gameTimer();
});
