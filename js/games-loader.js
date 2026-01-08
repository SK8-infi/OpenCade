/**
 * Games Loader
 * 
 * This script dynamically generates game cards on the page.
 * Games data is loaded from games-data.js (must be included before this script).
 * 
 * How it works:
 * 1. Read games from GAMES_DATA array (defined in games-data.js)
 * 2. Create a card for each game
 * 3. When a card is clicked, open the game in a new tab
 */

// ============================================
// DOM ELEMENTS
// ============================================

// Container where game cards will be inserted
const gamesGrid = document.getElementById('games-grid');

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get the appropriate badge class based on difficulty
 * @param {string} difficulty - The difficulty level
 * @returns {string} - CSS class name for the badge
 */
function getDifficultyClass(difficulty) {
    const level = difficulty.toLowerCase();
    if (level === 'beginner' || level === 'easy') return 'badge-beginner';
    if (level === 'intermediate' || level === 'medium') return 'badge-intermediate';
    return 'badge-advanced';
}

/**
 * Create HTML for a single game card
 * @param {Object} game - Game data object
 * @returns {string} - HTML string for the card
 */
function createGameCard(game) {
    // Generate tags HTML
    const tagsHtml = game.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');

    // Return the card HTML - opens in same tab
    return `
        <a 
            href="${game.path}"
            class="game-card"
            aria-label="Play ${game.title}"
        >
            <img 
                class="game-card-thumbnail" 
                src="${game.thumbnail}" 
                alt="${game.title} thumbnail"
                loading="lazy"
            >
            <div class="game-card-body">
                <h3 class="game-card-title">${game.title}</h3>
                <p class="game-card-description">${game.description}</p>
                <div class="game-card-meta">
                    <span class="badge ${getDifficultyClass(game.difficulty)}">${game.difficulty}</span>
                    ${tagsHtml}
                </div>
            </div>
        </a>
    `;
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Load games from GAMES_DATA and render cards
 */
function loadGames() {
    try {
        // Check if GAMES_DATA exists (from games-data.js)
        if (typeof GAMES_DATA === 'undefined') {
            throw new Error('GAMES_DATA not found. Make sure games-data.js is loaded before games-loader.js');
        }

        const games = GAMES_DATA;

        // Check if we have games
        if (!games || games.length === 0) {
            gamesGrid.innerHTML = '<p class="text-center">No games available yet. Be the first to contribute!</p>';
            return;
        }

        // Generate HTML for all cards
        const cardsHtml = games.map(createGameCard).join('');

        // Insert cards into the grid
        gamesGrid.innerHTML = cardsHtml;

    } catch (error) {
        console.error('Error loading games:', error);
        gamesGrid.innerHTML = `
            <p class="text-center" style="color: var(--danger);">
                Error loading games. Please check the console for details.
            </p>
        `;
    }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGames);
} else {
    loadGames();
}
