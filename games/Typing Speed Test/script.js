// ============================================
// CONFIGURATION
// ============================================
let highScore = localStorage.getItem('neonTypeHighScore') || 0;

const CONFIG = {
    GAME_DURATION: 60,
    QUOTES: [
        "The quick brown fox jumps over the lazy dog.",
        "To be or not to be, that is the question.",
        "You either die a hero, or you live long enough to see yourself become the villain.",
        "Life is like a box of chocolates. You never know what you're gonna get.",
        "Never gonna give you up, never gonna let you down, never gonna run around and desert you.",
        "According to all known laws of aviation, there is no way a bee should be able to fly.",
        "Why is no one having a good time? I specifically requested it.",
        "The hospital called this morning. Your test results came back positive. You're a stage five dumbass.",
        "I do not know what mansplaining is, but I think I have been the victim of it many times.",
        "Mom, monsters don't eat broccoli, they eat children!",
        "Have you tried turning it off and on again?",
        "Keep your friends close, but your enemies closer.",
        "I'm gonna make him an offer he can't refuse.",
        "Hard work is worthless for those that don't believe in themselves.",
        "Humankind cannot gain anything without first giving something in return.",
        "Don't believe in yourself. Believe in the me that believes in you!",
        "Somebody once told me the world is gonna roll me, I ain't the sharpest tool in the shed.",
        "His palms are sweaty, knees weak, arms are heavy. There's vomit on his sweater already, mom's spaghetti.",
        "I tried so hard and got so far, but in the end, it doesn't even matter.",
        "The healthy human mind doesn't wake up in the morning thinking this is its last day on Earth."
    ]
};

// ============================================
// STATE
// ============================================
let gameState = {
    isReady: false,
    hasStarted: false,
    startTime: null,
    timeLeft: CONFIG.GAME_DURATION,
    timerId: null,
    charIndex: 0,
    mistakes: 0,
    currentQuote: ""
};

// ============================================
// DOM ELEMENTS
// ============================================
const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const startBtn = document.getElementById('start-btn');
const timeEl = document.getElementById('time');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('accuracy');
const msgArea = document.getElementById('message-area');
const overlay = document.getElementById('game-overlay');

// References for the Overlay Text
const overlayTitle = document.querySelector('.overlay-content h2');
const overlayMsg = document.querySelector('.overlay-content p');

// ============================================
// LOGIC
// ============================================

function initGame() {
    // Hide Overlay
    overlay.classList.add('hidden');
    
    // Reset Logic
    gameState.isReady = true;
    gameState.hasStarted = false;
    gameState.charIndex = 0;
    gameState.mistakes = 0;
    gameState.timeLeft = CONFIG.GAME_DURATION;
    clearInterval(gameState.timerId);
    
    // Reset UI
    quoteInput.value = "";
    quoteInput.disabled = false;
    wpmEl.innerText = "0";
    accEl.innerText = "100%";
    timeEl.innerText = CONFIG.GAME_DURATION;
    
    // --- Reset Scroll Position ---
    // Prevents the new game from starting scrolled down if previous quote was long
    document.querySelector('.terminal-window').scrollTop = 0; 
    
    msgArea.innerText = "Type the first letter to start..."; 

    // Load Quote
    const randomIndex = Math.floor(Math.random() * CONFIG.QUOTES.length);
    gameState.currentQuote = CONFIG.QUOTES[randomIndex];

    quoteDisplay.innerHTML = '';
    gameState.currentQuote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplay.appendChild(charSpan);
    });

    if(quoteDisplay.firstChild) quoteDisplay.firstChild.classList.add('current');

    // Focus Input
    quoteInput.focus();
}

function startTimer() {
    gameState.hasStarted = true;
    gameState.startTime = Date.now();
    gameState.timerId = setInterval(updateTimer, 100);
    
    msgArea.innerText = "GO!";
}

function updateTimer() {
    const currentTime = Date.now();
    const timeElapsedSecs = Math.floor((currentTime - gameState.startTime) / 1000);
    const timeRemaining = CONFIG.GAME_DURATION - timeElapsedSecs;

    gameState.timeLeft = timeRemaining;

    if (timeRemaining > 0) {
        timeEl.innerText = timeRemaining;
        calculateStats(); 
    } else {
        timeEl.innerText = 0;
        endGame();
    }
}

function calculateStats() {
    const currentTime = Date.now();
    const timeElapsedSecs = (currentTime - gameState.startTime) / 1000;
    const timeElapsedMins = timeElapsedSecs / 60;

    if (timeElapsedMins < 0.001) return;

    const netChars = gameState.charIndex - gameState.mistakes;
    const wpm = Math.round((netChars / 5) / timeElapsedMins);

    wpmEl.innerText = (wpm > 0 && isFinite(wpm)) ? wpm : 0;

    const accuracy = Math.round(((gameState.charIndex - gameState.mistakes) / gameState.charIndex) * 100);
    accEl.innerText = (gameState.charIndex > 0) ? `${accuracy}%` : "100%";
}

function endGame() {
    clearInterval(gameState.timerId);
    gameState.isReady = false;
    gameState.hasStarted = false;
    
    // Ensure stats are up to date
    calculateStats();

    quoteInput.disabled = true;
    msgArea.innerText = "Run Complete.";
    
    // --- HIGH SCORE LOGIC ---
    const currentWPM = parseInt(wpmEl.innerText);

    if (currentWPM > highScore) {
        highScore = currentWPM;
        localStorage.setItem('neonTypeHighScore', highScore);
        msgArea.innerText = "NEW HIGH SCORE!"; 
    }
    
    // Update Overlay Text
    overlayTitle.innerText = "SESSION COMPLETE";
    overlayMsg.innerText = `Final Velocity: ${currentWPM} WPM | Personal Best: ${highScore} WPM`;
    
    startBtn.innerText = "PLAY AGAIN";
    
    // Show Overlay
    overlay.classList.remove('hidden');
}

function handleInput() {
    if (!gameState.isReady) return;
    if (!gameState.hasStarted) startTimer();

    const quoteChars = quoteDisplay.querySelectorAll('span');
    const inputChars = quoteInput.value.split('');
    gameState.charIndex = inputChars.length;

    // Check Win Condition
    if (gameState.charIndex >= quoteChars.length) {
        endGame();
        return;
    }

    // Color Logic
    quoteChars.forEach((charSpan, index) => {
        const inputChar = inputChars[index];
        charSpan.className = ''; 
        if (inputChar == null) {
            if (index === gameState.charIndex) charSpan.classList.add('current');
        } else if (inputChar === charSpan.innerText) {
            charSpan.classList.add('correct');
        } else {
            charSpan.classList.add('incorrect');
        }
    });

    gameState.mistakes = document.querySelectorAll('.incorrect').length;
    calculateStats();

    // ============================================
    // AUTO-SCROLL LOGIC (Center Lock)
    // ============================================
    const currentChar = quoteChars[gameState.charIndex];
    if (currentChar) {
        const terminal = document.querySelector('.terminal-window');
        
        // Calculate where the cursor is relative to the top of the text block
        const cursorTop = currentChar.offsetTop;
        
        // If cursor is more than 100px down (approx 3rd line), start scrolling
        if (cursorTop > 100) {
            // Scroll to keep the cursor roughly in the middle (subtract 120px padding)
            terminal.scrollTop = cursorTop - 120;
        } else {
            terminal.scrollTop = 0;
        }
    }
}

function handleGameClick() {
    if(gameState.isReady) quoteInput.focus();
}

function init() {
    startBtn.addEventListener('click', initGame);
    quoteInput.addEventListener('input', handleInput);
    document.getElementById('game-root').addEventListener('click', handleGameClick);
    // Block Paste
    quoteInput.addEventListener('paste', (e) => {
        e.preventDefault();
        alert("Pasting is disabled on this page.");
    });
}

init();