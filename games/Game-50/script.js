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
    GAME_SPEED: 100,  // milliseconds between updates
};

// ============================================
// 2. STATE
// ============================================
// Variables that track the current game state
let gameState = {
    isRunning: false,
    score: 0,
    // Add more state variables as needed
};

// ============================================
// 3. DOM ELEMENTS
// ============================================
// Get references to HTML elements
const gameRoot = document.getElementById('game-root');
const startBtn = document.getElementById('start-btn');
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
    gameState = {
        isRunning: true,
        score: 0,
    };
    showMessage('Game started!');
}

/**
 * Main game loop
 * Called repeatedly while the game is running
 */
function gameLoop() {
    if (!gameState.isRunning) return;

    // UPDATE: Update game state (move elements, check collisions, etc.)
    update();

    // RENDER: Draw the current state to the screen
    render();

    // Schedule the next frame
    setTimeout(gameLoop, CONFIG.GAME_SPEED);
}

/**
 * Update game state
 * Handle movement, collisions, scoring, etc.
 */
function update() {
    // TODO: Add your game update logic here
    // Example:
    // - Move player/enemies
    // - Check for collisions
    // - Update score
}

/**
 * Render the game
 * Draw everything to the canvas or update DOM elements
 */
function render() {
    // TODO: Add your rendering logic here
    // Example for canvas:
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(playerX, playerY, 20, 20);
}

/**
 * End the game
 * Called when player loses or wins
 */
function gameOver() {
    gameState.isRunning = false;
    showMessage(`Game Over! Score: ${gameState.score}`);
    // Optionally show a restart button
}

// ============================================
// 6. EVENT HANDLERS
// ============================================

/**
 * Handle keyboard input
 */
function handleKeyDown(event) {
    // Prevent default browser behavior for game keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        event.preventDefault();
    }

    // TODO: Add your key handling logic
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            // Move up
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            // Move down
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            // Move left
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            // Move right
            break;
        case ' ':
            // Space bar action
            break;
    }
}

/**
 * Handle start button click
 */
function handleStartClick() {
    initGame();
    gameLoop();
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
    document.addEventListener('keydown', handleKeyDown);

    // Optional: Show instructions or ready state
    showMessage('Click Start to begin!');
}

// Run initialization when the page loads
init();
