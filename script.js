const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const drawsDisplay = document.getElementById('draws');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xWins = 0, oWins = 0, draws = 0;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] !== '' || !gameActive) return;

  makeMove(index, currentPlayer);
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  cells[index].classList.add('played');

  if (checkWin(player)) {
    statusText.textContent = `Player ${player} wins!`;
    updateScore(player);
    gameActive = false;
  } else if (!board.includes('')) {
    statusText.textContent = "It's a draw!";
    draws++;
    drawsDisplay.textContent = draws;
    gameActive = false;
  } else {
    currentPlayer = player === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winConditions.some(combo => {
    return combo.every(index => board[index] === player);
  });
}

function updateScore(player) {
  if (player === 'X') {
    xWins++;
    xWinsDisplay.textContent = xWins;
  } else {
    oWins++;
    oWinsDisplay.textContent = oWins;
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('played');
  });
}
