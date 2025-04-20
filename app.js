const gridSize = 3;
let tiles = [];
let emptyTile = { x: gridSize - 1, y: gridSize - 1 };

window.onload = () => {
  createTiles();
  shuffleTiles();
  renderTiles();
};

function createTiles() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (x === gridSize - 1 && y === gridSize - 1) continue;
      tiles.push({ x, y, correctX: x, correctY: y });
    }
  }
}

function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }

  // Letakkan di posisi acak dalam grid
  tiles.forEach((tile, index) => {
    tile.x = index % gridSize;
    tile.y = Math.floor(index / gridSize);
  });

  emptyTile = { x: gridSize - 1, y: gridSize - 1 };
}

function renderTiles() {
  const board = document.getElementById('puzzle-board');
  board.innerHTML = '';

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const tile = tiles.find(t => t.x === x && t.y === y);
      const tileElement = document.createElement('div');
      tileElement.classList.add('tile');

      if (tile) {
        tileElement.style.backgroundImage = 'url("puzzle.png")';
        tileElement.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
        tileElement.style.backgroundPosition = `-${tile.correctX * 100}px -${tile.correctY * 100}px`;
        tileElement.addEventListener('click', () => moveTile(tile));
      } else {
        tileElement.classList.add('empty');
      }

      board.appendChild(tileElement);
    }
  }
}

function moveTile(tile) {
  const dx = Math.abs(tile.x - emptyTile.x);
  const dy = Math.abs(tile.y - emptyTile.y);

  if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
    const oldX = tile.x;
    const oldY = tile.y;

    tile.x = emptyTile.x;
    tile.y = emptyTile.y;

    emptyTile.x = oldX;
    emptyTile.y = oldY;

    renderTiles();
    checkWin();
  }
}

function checkWin() {
  const isWin = tiles.every(t => t.x === t.correctX && t.y === t.correctY);

  if (isWin && emptyTile.x === gridSize - 1 && emptyTile.y === gridSize - 1) {
    setTimeout(() => alert('Selamat! Kamu menyelesaikan puzzle!'), 200);
  }
}
