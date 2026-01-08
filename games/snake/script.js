/**
 * Snake Game
 * 
 * A classic snake game built with HTML5 Canvas.
 * 
 * HOW IT WORKS:
 * - The snake moves in a direction on a grid
 * - When it eats food, it grows longer
 * - The game ends if the snake hits a wall or itself
 * 
 * CONCEPTS DEMONSTRATED:
 * - HTML5 Canvas drawing
 * - Game loop with setInterval
 * - Keyboard input handling
 * - Collision detection
 * - Array manipulation (snake body)
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // Grid settings
    TILE_SIZE: 20,      // Size of each grid cell in pixels
    GRID_WIDTH: 20,     // Number of cells horizontally (400 / 20 = 20)
    GRID_HEIGHT: 20,    // Number of cells vertically (400 / 20 = 20)

    // Game speed (milliseconds between moves)
    // Lower = faster, Higher = slower
    GAME_SPEED: 100,

    // Colors
    SNAKE_COLOR: '#00ff88',
    SNAKE_HEAD_COLOR: '#00cc6a',
    FOOD_COLOR: '#ff4757',
    GRID_COLOR: '#1a1a2e',
};

// ============================================
// STATE
// ============================================

// The snake is stored as an array of {x, y} positions
// The first element (index 0) is the head
let snake = [];

// Current direction of movement
// Can be: 'up', 'down', 'left', 'right'
let direction = 'right';

// The next direction (queued from input)
// This prevents 180-degree turns between frames
let nextDirection = 'right';

// Food position {x, y}
let food = { x: 0, y: 0 };

// Current score
let score = 0;

// Game loop interval ID (used to stop the game)
let gameInterval = null;

// Is the game currently running?
let isRunning = false;

// ============================================
// DOM ELEMENTS
// ============================================

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate a random integer between min and max (inclusive)
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if two positions are the same
 */
function positionsEqual(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

/**
 * Check if a position is occupied by the snake
 */
function isOnSnake(pos) {
    return snake.some(segment => positionsEqual(segment, pos));
}

// ============================================
// GAME LOGIC
// ============================================

/**
 * Initialize the game state
 * Called when starting a new game
 */
function initGame() {
    // Start snake in the middle, 3 segments long
    const startX = Math.floor(CONFIG.GRID_WIDTH / 2);
    const startY = Math.floor(CONFIG.GRID_HEIGHT / 2);

    snake = [
        { x: startX, y: startY },         // Head
        { x: startX - 1, y: startY },     // Body
        { x: startX - 2, y: startY },     // Tail
    ];

    // Reset direction
    direction = 'right';
    nextDirection = 'right';

    // Reset score
    score = 0;
    updateScore();

    // Place initial food
    placeFood();

    // Mark game as running
    isRunning = true;

    // Update button text
    startBtn.textContent = 'Restart';
}

/**
 * Place food at a random position
 * Makes sure food doesn't appear on the snake
 */
function placeFood() {
    let newFood;

    // Keep generating positions until we find one not on the snake
    do {
        newFood = {
            x: randomInt(0, CONFIG.GRID_WIDTH - 1),
            y: randomInt(0, CONFIG.GRID_HEIGHT - 1),
        };
    } while (isOnSnake(newFood));

    food = newFood;
}

/**
 * Update the score display
 */
function updateScore() {
    scoreDisplay.textContent = score;
}

/**
 * Move the snake one step in the current direction
 * This is the core game logic
 */
function moveSnake() {
    // Apply the queued direction
    direction = nextDirection;

    // Calculate new head position based on direction
    const head = snake[0];
    let newHead;

    switch (direction) {
        case 'up':
            newHead = { x: head.x, y: head.y - 1 };
            break;
        case 'down':
            newHead = { x: head.x, y: head.y + 1 };
            break;
        case 'left':
            newHead = { x: head.x - 1, y: head.y };
            break;
        case 'right':
            newHead = { x: head.x + 1, y: head.y };
            break;
    }

    // Check for wall collision
    if (
        newHead.x < 0 ||
        newHead.x >= CONFIG.GRID_WIDTH ||
        newHead.y < 0 ||
        newHead.y >= CONFIG.GRID_HEIGHT
    ) {
        gameOver();
        return;
    }

    // Check for self collision (ignore tail since it will move)
    for (let i = 0; i < snake.length - 1; i++) {
        if (positionsEqual(newHead, snake[i])) {
            gameOver();
            return;
        }
    }

    // Add new head to the front
    snake.unshift(newHead);

    // Check if snake ate food
    if (positionsEqual(newHead, food)) {
        // Increase score
        score += 10;
        updateScore();

        // Place new food
        placeFood();

        // Don't remove tail (snake grows)
    } else {
        // Remove tail (snake moves)
        snake.pop();
    }
}

/**
 * Draw the game state to the canvas
 */
function render() {
    // Clear the canvas
    ctx.fillStyle = CONFIG.GRID_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach((segment, index) => {
        // Head is a different color
        ctx.fillStyle = index === 0 ? CONFIG.SNAKE_HEAD_COLOR : CONFIG.SNAKE_COLOR;

        // Draw rounded rectangle for each segment
        const x = segment.x * CONFIG.TILE_SIZE;
        const y = segment.y * CONFIG.TILE_SIZE;
        const size = CONFIG.TILE_SIZE - 2; // Small gap between segments

        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, size, size, 4);
        ctx.fill();
    });

    // Draw the food
    ctx.fillStyle = CONFIG.FOOD_COLOR;
    const foodX = food.x * CONFIG.TILE_SIZE;
    const foodY = food.y * CONFIG.TILE_SIZE;

    // Draw food as a circle
    ctx.beginPath();
    ctx.arc(
        foodX + CONFIG.TILE_SIZE / 2,
        foodY + CONFIG.TILE_SIZE / 2,
        CONFIG.TILE_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

/**
 * Main game loop - called every frame
 */
function gameLoop() {
    moveSnake();
    render();
}

/**
 * Start the game
 */
function startGame() {
    // Stop any existing game
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Remove any game over overlay
    const overlay = document.querySelector('.game-over-overlay');
    if (overlay) overlay.remove();

    // Initialize game state
    initGame();

    // Start the game loop
    gameInterval = setInterval(gameLoop, CONFIG.GAME_SPEED);

    // Draw initial state
    render();
}

/**
 * End the game
 */
function gameOver() {
    // Stop the game loop
    clearInterval(gameInterval);
    gameInterval = null;
    isRunning = false;

    // Show game over overlay
    const overlay = document.createElement('div');
    overlay.className = 'game-over-overlay';
    overlay.innerHTML = `
        <h2>Game Over!</h2>
        <p class="final-score">Final Score: ${score}</p>
        <button onclick="startGame()" class="btn btn-primary btn-glow">Play Again</button>
    `;
    document.body.appendChild(overlay);
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle keyboard input
 * Changes the direction of the snake
 */
function handleKeyDown(event) {
    // Prevent scrolling with arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
        event.preventDefault();
    }

    // Don't allow 180-degree turns (would cause instant death)
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') nextDirection = 'up';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') nextDirection = 'down';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') nextDirection = 'left';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') nextDirection = 'right';
            break;
        case ' ':
            // Space to start/restart
            if (!isRunning) startGame();
            break;
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Set up the game when the page loads
 */
function init() {
    // Add event listeners
    startBtn.addEventListener('click', startGame);
    document.addEventListener('keydown', handleKeyDown);

    // Draw initial empty canvas
    ctx.fillStyle = CONFIG.GRID_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw "Press Start" message
    ctx.fillStyle = '#888';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Click Start to Play!', canvas.width / 2, canvas.height / 2);
}

// Run initialization
init();
