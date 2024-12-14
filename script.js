let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newBtn = document.querySelector(".new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnDisplay = document.querySelector("#turn");

let turn = true; // true for "O", false for "X"
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// Handle click event
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    box.innerText = turn ? "O" : "X";
    box.style.color = turn ? "#ff6f61" : "#4caf50";
    box.disabled = true;
    turn = !turn;
    turnDisplay.textContent = turn ? "O" : "X";
    checkWinner();
    checkDraw();
  });
});

// Check for winner
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      highlightWinner(pattern);
      showWinner(boxes[a].innerText);
      return;
    }
  }
}

// Highlight winning boxes
function highlightWinner(pattern) {
  pattern.forEach((index) => {
    boxes[index].style.background = "#ffd700";
    boxes[index].style.color = "#000";
  });
}

// Check for draw
function checkDraw() {
  if ([...boxes].every((box) => box.innerText)) {
    showDraw();
  }
}

// Show winner message
function showWinner(winner) {
  msg.innerText = `Congratulations! ${winner} wins!`;
  msgContainer.classList.remove("hide");
  disableAll();
}

// Show draw message
function showDraw() {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableAll();
}

// Disable all boxes
function disableAll() {
  boxes.forEach((box) => (box.disabled = true));
}

// Reset game
function resetGame() {
  turn = true;
  turnDisplay.textContent = "O";
  msgContainer.classList.add("hide");
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.style.background = "#fff";
    box.style.color = "#555";
  });
}

// Event listeners
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
