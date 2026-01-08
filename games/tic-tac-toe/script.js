/**
 * Tic-Tac-Toe Game
 * 
 * A classic two-player game with optional simple AI.
 * 
 * HOW IT WORKS:
 * - Players take turns placing X or O
 * - First to get 3 in a row wins
 * - If all cells are filled with no winner, it's a draw
 * 
 * CONCEPTS DEMONSTRATED:
 * - DOM manipulation
 * - Event handling (click and keyboard)
 * - Array-based game state
 * - Win condition checking
 * - Simple AI logic
 */

// ============================================
// CONFIGURATION
// ============================================

// All possible winning combinations (indices on the board)
const WINNING_COMBOS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
];

// Player symbols
const PLAYER_X = 'X';
const PLAYER_O = 'O';

// ============================================
// STATE
// ============================================

// The board is stored as an array of 9 cells
// Empty cells are null, otherwise 'X' or 'O'
let board = Array(9).fill(null);

// Current player ('X' or 'O')
let currentPlayer = PLAYER_X;

// Is the game still active?
let gameActive = true;

// Is AI enabled?
let aiEnabled = false;

// ============================================
// DOM ELEMENTS
// ============================================

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const aiToggle = document.getElementById('ai-toggle');

// ============================================
// GAME LOGIC
// ============================================

/**
 * Check if there's a winner
 * @returns {Object|null} - { winner: 'X'|'O', combo: [indices] } or null
 */
function checkWinner() {
    for (const combo of WINNING_COMBOS) {
        const [a, b, c] = combo;

        // Check if all three cells have the same non-null value
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return {
                winner: board[a],
                combo: combo
            };
        }
    }
    return null;
}

/**
 * Check if the board is full (draw condition)
 * @returns {boolean}
 */
function isBoardFull() {
    return board.every(cell => cell !== null);
}

/**
 * Handle a player's move
 * @param {number} index - Cell index (0-8)
 */
function makeMove(index) {
    // Ignore if cell is taken or game is over
    if (board[index] || !gameActive) return;

    // Place the current player's mark
    board[index] = currentPlayer;

    // Update the cell display
    const cell = cells[index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase(), 'taken');

    // Check for winner
    const result = checkWinner();
    if (result) {
        handleWin(result);
        return;
    }

    // Check for draw
    if (isBoardFull()) {
        handleDraw();
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    updateStatus();

    // If AI is enabled and it's O's turn, make AI move
    if (aiEnabled && currentPlayer === PLAYER_O && gameActive) {
        // Small delay so player can see their move first
        setTimeout(makeAIMove, 400);
    }
}

/**
 * Handle a winning condition
 * @param {Object} result - { winner, combo }
 */
function handleWin(result) {
    gameActive = false;
    statusDisplay.textContent = `${result.winner} wins! 🎉`;
    statusDisplay.classList.add('winner');

    // Highlight winning cells
    result.combo.forEach(index => {
        cells[index].classList.add('winner-cell');
    });
}

/**
 * Handle a draw condition
 */
function handleDraw() {
    gameActive = false;
    statusDisplay.textContent = "It's a draw! 🤝";
}

/**
 * Update the status display
 */
function updateStatus() {
    statusDisplay.textContent = `${currentPlayer}'s turn`;
    statusDisplay.classList.remove('winner');
}

/**
 * Reset the game to initial state
 */
function restartGame() {
    // Clear board state
    board = Array(9).fill(null);
    currentPlayer = PLAYER_X;
    gameActive = true;

    // Clear cell displays
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'taken', 'winner-cell');
    });

    // Reset status
    updateStatus();
}

// ============================================
// SIMPLE AI
// ============================================

/**
 * Make an AI move
 * Uses a simple strategy:
 * 1. Win if possible
 * 2. Block opponent's win
 * 3. Take center
 * 4. Take a corner
 * 5. Take any available cell
 */
function makeAIMove() {
    if (!gameActive) return;

    let move;

    // 1. Try to win
    move = findWinningMove(PLAYER_O);
    if (move !== null) {
        makeMove(move);
        return;
    }

    // 2. Block opponent's win
    move = findWinningMove(PLAYER_X);
    if (move !== null) {
        makeMove(move);
        return;
    }

    // 3. Take center if available
    if (board[4] === null) {
        makeMove(4);
        return;
    }

    // 4. Take a corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
        move = availableCorners[Math.floor(Math.random() * availableCorners.length)];
        makeMove(move);
        return;
    }

    // 5. Take any available cell
    const availableCells = board.map((cell, i) => cell === null ? i : null).filter(i => i !== null);
    if (availableCells.length > 0) {
        move = availableCells[Math.floor(Math.random() * availableCells.length)];
        makeMove(move);
    }
}

/**
 * Find a move that would result in a win for the given player
 * @param {string} player - 'X' or 'O'
 * @returns {number|null} - Cell index or null
 */
function findWinningMove(player) {
    for (const combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        const values = [board[a], board[b], board[c]];

        // Check if player has 2 in this combo and one is empty
        const playerCount = values.filter(v => v === player).length;
        const emptyCount = values.filter(v => v === null).length;

        if (playerCount === 2 && emptyCount === 1) {
            // Return the empty cell index
            if (board[a] === null) return a;
            if (board[b] === null) return b;
            if (board[c] === null) return c;
        }
    }
    return null;
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle cell click
 */
function handleCellClick(event) {
    const index = parseInt(event.target.dataset.index);

    // Don't allow moves during AI's turn
    if (aiEnabled && currentPlayer === PLAYER_O) return;

    makeMove(index);
}

/**
 * Handle keyboard on cells (Enter/Space to select)
 */
function handleCellKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCellClick(event);
    }
}

/**
 * Toggle AI mode
 */
function toggleAI() {
    aiEnabled = !aiEnabled;
    aiToggle.textContent = `Play vs AI: ${aiEnabled ? 'ON' : 'OFF'}`;
    aiToggle.classList.toggle('active', aiEnabled);

    // Restart game when toggling AI
    restartGame();
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Add click/keyboard handlers to cells
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.addEventListener('keydown', handleCellKeydown);
    });

    // Button handlers
    restartBtn.addEventListener('click', restartGame);
    aiToggle.addEventListener('click', toggleAI);

    // Set initial status
    updateStatus();
}

// Start the game
init();
