//Array of the game
const game = Array(9).fill("");

//validator turn of user
let xIsNext = true;

function handleclickSelectItem() {
  if (this.textContent === "" && game[this.dataset.index] === "") {
    game[this.dataset.index] = xIsNext ? "X" : "O";
    xIsNext = !xIsNext;
    setRenderBoard(game);
    if (calculateWinner(game).win)
      handleWinner(calculateWinner(game).userWinner);
  }
}

function handleWinner(winner) {
  game.fill(winner);
  window.isTurnOf.innerHTML = `El ganador es: ${winner}`;
  btn.disabled = false;
  btn.addEventListener("click", startGame);
}

function startGame() {
  game.fill("");
  setRenderBoard(game);
}
function renderBoard({ data, index }, elementHTML) {
  const tagSpan = document.createElement("span");
  tagSpan.textContent = data;
  tagSpan.dataset.index = index;
  tagSpan.addEventListener("click", handleclickSelectItem);
  elementHTML.append(tagSpan);
  window.isTurnOf.innerHTML = `Es el turno de: ${xIsNext ? "X" : "O"}`;
}

function setRenderBoard(arrayForReder) {
  root.innerHTML = "";
  arrayForReder.forEach((value, index) => {
    renderBoard(
      {
        data: value,
        index: index,
      },
      window.root
    );
  });
}

setRenderBoard(game);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return (winner = {
        win: true,
        userWinner: squares[a],
      });
    }
  }
  return false;
}
