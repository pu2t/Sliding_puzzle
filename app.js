const size = 3;
const tileSize = 100;
let board = [];

function initBoard() {
  board = [...Array(size * size).keys()];
  do {
    board = shuffle(board);
  } while (!isSolvable(board) || isSolved(board));
  renderBoard();
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function isSolvable(board) {
  let inv = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = i + 1; j < board.length; j++) {
      if (board[i] && board[j] && board[i] > board[j]) inv++;
    }
  }
  return inv % 2 === 0;
}

function isSolved(board) {
  return board.every((val, i) => val === i);
}

function renderBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";

  board.forEach((val, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";

    if (val === 0) {
      tile.classList.add("empty");
    } else {
      const row = Math.floor((val - 1) / size);
      const col = (val - 1) % size;

      tile.style.backgroundImage = "url('puzzle.jpg')";
      tile.style.backgroundSize = `${tileSize * size}px ${tileSize * size}px`;
      tile.style.backgroundPosition = `-${col * tileSize}px -${row * tileSize}px`;

      tile.setAttribute("draggable", "true");

      tile.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", i);
      });

      tile.addEventListener("dragover", (e) => {
        const emptyIndex = board.indexOf(0);
        if (i === emptyIndex) e.preventDefault();
      });

      tile.addEventListener("drop", (e) => {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
        const toIndex = i;
        const emptyIndex = board.indexOf(0);

        if (toIndex === emptyIndex) {
          const validMoves = [
            emptyIndex - 1, emptyIndex + 1,
            emptyIndex - size, emptyIndex + size,
          ];
          if (validMoves.includes(fromIndex)) {
            [board[fromIndex], board[toIndex]] = [board[toIndex], board[fromIndex]];
            renderBoard();
            if (isSolved(board)) alert("🎉 Puzzle Completed!");
          }
        }
      });
    }

    boardEl.appendChild(tile);
  });
}

window.onload = initBoard;
