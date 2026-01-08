/**
 * Memory Match Game
 * 
 * A card matching game with 6 pairs (12 cards total).
 * 
 * HOW IT WORKS:
 * - 12 cards are shuffled and placed face-down
 * - Click two cards to flip them
 * - If they match, they stay face-up
 * - If not, they flip back after a short delay
 * - Match all pairs to win
 * 
 * CONCEPTS DEMONSTRATED:
 * - DOM manipulation
 * - CSS 3D transforms for flip animation
 * - Array shuffling (Fisher-Yates algorithm)
 * - State management
 * - Timer-based logic
 */

// ============================================
// CONFIGURATION
// ============================================

// The emojis used for card pairs
// 6 unique emojis = 6 pairs = 12 cards
const CARD_EMOJIS = ['🎮', '🚀', '⭐', '🎯', '💎', '🔥'];

// Time to show cards before flipping back (milliseconds)
const FLIP_DELAY = 1000;

// ============================================
// STATE
// ============================================

// Array of card objects with their emoji and matched status
let cards = [];

// Currently flipped cards (max 2 at a time)
let flippedCards = [];

// Is the game blocked? (during flip animation)
let isLocked = false;

// Game stats
let moves = 0;
let matchedPairs = 0;

// ============================================
// DOM ELEMENTS
// ============================================

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const pairsDisplay = document.getElementById('pairs');
const restartBtn = document.getElementById('restart-btn');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Shuffle an array using Fisher-Yates algorithm
 * This is a well-known algorithm for random shuffling
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled array (modified in place)
 */
function shuffleArray(array) {
    // Start from the last element and swap with a random element before it
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));

        // Swap elements at i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Update the stats display
 */
function updateStats() {
    movesDisplay.textContent = moves;
    pairsDisplay.textContent = matchedPairs;
}

// ============================================
// GAME LOGIC
// ============================================

/**
 * Initialize or restart the game
 */
function initGame() {
    // Reset state
    cards = [];
    flippedCards = [];
    isLocked = false;
    moves = 0;
    matchedPairs = 0;

    // Create pairs of cards
    // Each emoji appears twice
    const cardValues = [...CARD_EMOJIS, ...CARD_EMOJIS];

    // Shuffle the cards
    shuffleArray(cardValues);

    // Create card objects
    cards = cardValues.map((emoji, index) => ({
        id: index,
        emoji: emoji,
        isFlipped: false,
        isMatched: false
    }));

    // Render the board
    renderBoard();

    // Update display
    updateStats();

    // Remove any win overlay
    const overlay = document.querySelector('.win-overlay');
    if (overlay) overlay.remove();
}

/**
 * Render all cards to the board
 */
function renderBoard() {
    // Clear existing cards
    board.innerHTML = '';

    // Create card elements
    cards.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.dataset.id = card.id;

        // Card has two faces: back (visible initially) and front (emoji)
        cardEl.innerHTML = `
            <div class="card-face card-back"></div>
            <div class="card-face card-front">${card.emoji}</div>
        `;

        // Add click handler
        cardEl.addEventListener('click', () => handleCardClick(card.id));

        board.appendChild(cardEl);
    });
}

/**
 * Handle a card click
 * @param {number} cardId - ID of the clicked card
 */
function handleCardClick(cardId) {
    // Ignore clicks if:
    // - Game is locked (during animation)
    // - Card is already flipped
    // - Card is already matched
    // - Two cards are already flipped
    if (isLocked) return;
    if (flippedCards.length >= 2) return;

    const card = cards[cardId];
    if (card.isFlipped || card.isMatched) return;

    // Flip the card
    flipCard(cardId);

    // Add to flipped cards array
    flippedCards.push(card);

    // If two cards are flipped, check for match
    if (flippedCards.length === 2) {
        moves++;
        updateStats();
        checkForMatch();
    }
}

/**
 * Flip a card face-up
 * @param {number} cardId - ID of the card to flip
 */
function flipCard(cardId) {
    const card = cards[cardId];
    card.isFlipped = true;

    // Update the DOM
    const cardEl = document.querySelector(`.card[data-id="${cardId}"]`);
    cardEl.classList.add('flipped');
}

/**
 * Unflip a card (flip face-down)
 * @param {number} cardId - ID of the card to unflip
 */
function unflipCard(cardId) {
    const card = cards[cardId];
    card.isFlipped = false;

    // Update the DOM
    const cardEl = document.querySelector(`.card[data-id="${cardId}"]`);
    cardEl.classList.remove('flipped');
}

/**
 * Check if the two flipped cards match
 */
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.emoji === card2.emoji) {
        // It's a match!
        handleMatch();
    } else {
        // Not a match - flip them back
        handleMismatch();
    }
}

/**
 * Handle matching cards
 */
function handleMatch() {
    const [card1, card2] = flippedCards;

    // Mark cards as matched
    card1.isMatched = true;
    card2.isMatched = true;

    // Update DOM
    document.querySelector(`.card[data-id="${card1.id}"]`).classList.add('matched');
    document.querySelector(`.card[data-id="${card2.id}"]`).classList.add('matched');

    // Update stats
    matchedPairs++;
    updateStats();

    // Clear flipped cards
    flippedCards = [];

    // Check for win
    if (matchedPairs === CARD_EMOJIS.length) {
        // Small delay before showing win screen
        setTimeout(handleWin, 500);
    }
}

/**
 * Handle non-matching cards
 */
function handleMismatch() {
    // Lock the game during animation
    isLocked = true;

    // Add visual feedback
    const [card1, card2] = flippedCards;

    // Wait, then flip cards back
    setTimeout(() => {
        unflipCard(card1.id);
        unflipCard(card2.id);

        // Clear flipped cards
        flippedCards = [];

        // Unlock the game
        isLocked = false;
    }, FLIP_DELAY);
}

/**
 * Handle win condition
 */
function handleWin() {
    // Create win overlay
    const overlay = document.createElement('div');
    overlay.className = 'win-overlay';
    overlay.innerHTML = `
        <h2>🎉 You Win!</h2>
        <p>Completed in ${moves} moves</p>
        <button onclick="initGame()">Play Again</button>
    `;
    document.body.appendChild(overlay);
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Set up restart button
    restartBtn.addEventListener('click', initGame);

    // Start the game
    initGame();
}

// Start when page loads
init();
