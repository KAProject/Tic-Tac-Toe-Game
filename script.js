let boxes = document.querySelectorAll(".box");
const clickSound = new Audio("../assets/mechanical-click.mp3");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startBtn = document.querySelector("#startBtn");
let player1Input = document.querySelector("#player1");
let player2Input = document.querySelector("#player2");
let gameDiv = document.getElementById("gameDiv");
let statusDiv = document.getElementById("status");
let playerInputsDiv = document.querySelector(".player-inputs");

let player1Name = "";
let player2Name = "";
let turnO = true; // true: playerO, false: playerX
let count = 0; //To Track Draw
let gameStarted = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  gameStarted = false;
  player1Input.value = "";
  player2Input.value = "";
  player1Input.disabled = false;
  player2Input.disabled = false;
  startBtn.disabled = false;
  gameDiv.classList.add("hide");
  statusDiv.innerText = "";
  playerInputsDiv.style.display = "";
};

const startGame = () => {
  player1Name = player1Input.value.trim() || "Player 1";
  player2Name = player2Input.value.trim() || "Player 2";
  if (!player1Name || !player2Name) {
    alert("Please enter both player names.");
    return;
  }
  gameStarted = true;
  player1Input.disabled = true;
  player2Input.disabled = true;
  startBtn.disabled = true;
  enableBoxes();
  gameDiv.classList.remove("hide");
  updateStatus();
  playerInputsDiv.style.display = "none";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!gameStarted) return;
    clickSound.currentTime = 0;
    clickSound.play();
    if (turnO) {
      //playerO turn
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX turn
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
    if (!isWinner && count < 9) {
      updateStatus();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  let winnerName = winner === "O" ? player1Name : player2Name;
  msg.innerText = `Congratulations, Winner is ${winnerName}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  statusDiv.innerText = "";
};
function updateStatus() {
  if (!gameStarted) {
    statusDiv.innerText = "";
    return;
  }
  if (turnO) {
    statusDiv.innerText = `Current Turn: ${player1Name} (O)`;
  } else {
    statusDiv.innerText = `Current Turn: ${player2Name} (X)`;
  }
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", startGame);

// Disable boxes and hide game until game starts
disableBoxes();
gameDiv.classList.add("hide");