/**
 * Game Template Script
 * 
 * This is a skeleton for your game logic.
 * Replace the placeholder code with your actual game.
 * 
 * Structure:
 * 1. CONFIGURATION - Game settings and constants
 * 2. STATE - Variables that track game state
 * 3. DOM ELEMENTS - References to HTML elements
 * 4. UTILITY FUNCTIONS - Helper functions
 * 5. GAME LOGIC - Core game mechanics
 * 6. EVENT HANDLERS - User input handling
 * 7. INITIALIZATION - Setup when page loads
 */

// ============================================
// 1. CONFIGURATION
// ============================================
// Define your game settings here
const CONFIG = {
    // Example: canvas size, game speed, etc.
    GAME_SPEED: 800,
    GAME_DURATION: 15000,  // milliseconds between updates
};

// ============================================
// 2. STATE
// ============================================
// Variables that track the current game state
let gameState = {
    isRunning: false,
    score: 0,
    timer: null,
    interval : null,
    // Add more state variables as needed
};

// ============================================
// 3. DOM ELEMENTS
// ============================================
// Get references to HTML elements
const gameRoot = document.getElementById('game-root');
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const moles = document.querySelectorAll('.mole');

// const canvas = document.getElementById('game-canvas');
// const ctx = canvas.getContext('2d');

// ============================================
// 4. UTILITY FUNCTIONS
// ============================================

/**
 * Generate a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Display a message to the player
 * @param {string} message - Message to show
 */
function showMessage(message) {
    console.log(message);
    // You could also update a DOM element here
}

// ============================================
// 5. GAME LOGIC
// ============================================

/**
 * Initialize/reset the game state
 * Called when starting a new game
 */
function initGame() {
    gameState.score = 0;
    gameState.isRunning = true;
    scoreEl.textContent = gameState.score;

    gameState.interval = setInterval(showMole, CONFIG.GAME_SPEED);

    gameState.timer = setTimeout(gameOver, CONFIG.GAME_DURATION);
}
function showMole() {
    moles.forEach(mole => mole.classList.remove('up'));

    const index = randomInt(0, moles.length - 1);
    const mole = moles[index];

    mole.classList.add('up');

    mole.onclick = () => {
        if (!gameState.isRunning) return;

        gameState.score++;
        scoreEl.textContent = gameState.score;
        mole.classList.remove('up');
    };
}


/**
 * Main game loop
 * Called repeatedly while the game is running
 */


/**
 * Update game state
 * Handle movement, collisions, scoring, etc.
 */


/**
 * Render the game
 * Draw everything to the canvas or update DOM elements
 */


/**
 * End the game
 * Called when player loses or wins
 */
function gameOver() {
    gameState.isRunning = false;
    clearInterval(gameState.interval);

    moles.forEach(mole => mole.classList.remove('up'));

    alert(`Game Over! Your score: ${gameState.score}`);
}

// ============================================
// 6. EVENT HANDLERS
// ============================================

/**
 * Handle keyboard input
 */

function handleStartClick() {
    if (gameState.isRunning) return;
    initGame();
}


// ============================================
// 7. INITIALIZATION
// ============================================

/**
 * Set up event listeners and initial state
 */
function init() {
    // Add event listeners
    startBtn.addEventListener('click', handleStartClick);
   

    // Optional: Show instructions or ready state
    showMessage('Click Start to begin!');
}

// Run initialization when the page loads
init();
