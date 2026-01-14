const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 600;

// Game variables
let gameStarted = false;
let gameOver = false;
let score = 0;
let bestScore = localStorage.getItem('flappyBestScore') || 0;

// Bird properties
const bird = {
    x: 80,
    y: canvas.height / 2,
    width: 34,
    height: 24,
    velocity: 1,
    gravity: 0.1,
    jump: -3
};

// Pipe properties
const pipes = [];
const pipeWidth = 60;
const pipeGap = 150;
const pipeSpeed = 2;
let frameCount = 0;

// UI Elements
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const scoreDisplay = document.getElementById('score');
const bestDisplay = document.getElementById('best');
const finalScore = document.getElementById('finalScore');
const finalBest = document.getElementById('finalBest');
const restartBtn = document.getElementById('restartBtn');

// Initialize
bestDisplay.textContent = bestScore;

// Event listeners
document.addEventListener('keydown', handleInput);
canvas.addEventListener('click', handleInput);
restartBtn.addEventListener('click', restartGame);

function handleInput(e) {
    if (e.type === 'keydown' && e.code !== 'Space') return;
    
    if (!gameStarted) {
        startGame();
    } else if (!gameOver) {
        bird.velocity = bird.jump;
    }
}

function startGame() {
    gameStarted = true;
    startScreen.classList.add('hidden');
    gameLoop();
}

function restartGame() {
    gameOver = false;
    gameStarted = true;
    score = 0;
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes.length = 0;
    frameCount = 0;
    gameOverScreen.classList.add('hidden');
    scoreDisplay.textContent = score;
    gameLoop();
}

function createPipe() {
    const minHeight = 50;
    const maxHeight = canvas.height - pipeGap - minHeight;
    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
    
    pipes.push({
        x: canvas.width,
        topHeight: topHeight,
        bottomY: topHeight + pipeGap,
        scored: false
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    // Check ground and ceiling collision
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        endGame();
    }
}

function updatePipes() {
    frameCount++;
    
    // Create new pipes
    if (frameCount % 90 === 0) {
        createPipe();
    }
    
    // Update pipe positions
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= pipeSpeed;
        
        // Check if bird scored
        if (!pipes[i].scored && pipes[i].x + pipeWidth < bird.x) {
            pipes[i].scored = true;
            score++;
            scoreDisplay.textContent = score;
        }
        
        // Remove off-screen pipes
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
        }
    }
}

function checkCollision() {
    for (let pipe of pipes) {
        // Check if bird is in pipe's x range
        if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeWidth) {
            // Check if bird hit top or bottom pipe
            if (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY) {
                endGame();
            }
        }
    }
}

function drawBird() {
    // Bird body (oval shape)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(bird.x + 17, bird.y + 12, 17, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird head (circle)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(bird.x + 24, bird.y + 8, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird eye (white)
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.arc(bird.x + 27, bird.y + 7, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird pupil
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(bird.x + 28, bird.y + 7, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Bird beak (triangle)
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.moveTo(bird.x + 30, bird.y + 10);
    ctx.lineTo(bird.x + 38, bird.y + 10);
    ctx.lineTo(bird.x + 34, bird.y + 14);
    ctx.closePath();
    ctx.fill();
    
    // Wing
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(bird.x + 15, bird.y + 14, 8, 5, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Tail feathers
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(bird.x + 2, bird.y + 12);
    ctx.lineTo(bird.x - 2, bird.y + 8);
    ctx.lineTo(bird.x + 5, bird.y + 10);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(bird.x + 2, bird.y + 12);
    ctx.lineTo(bird.x - 2, bird.y + 16);
    ctx.lineTo(bird.x + 5, bird.y + 14);
    ctx.closePath();
    ctx.fill();
}

function drawPipes() {
    ctx.fillStyle = '#228B22';
    
    for (let pipe of pipes) {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        
        // Pipe cap (top)
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipeWidth + 10, 20);
        
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);
        
        // Pipe cap (bottom)
        ctx.fillRect(pipe.x - 5, pipe.bottomY, pipeWidth + 10, 20);
        
        // Pipe details
        ctx.strokeStyle = '#1a6b1a';
        ctx.lineWidth = 2;
        ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.strokeRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);
    }
}

function drawBackground() {
    // Sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#4ec0ca');
    gradient.addColorStop(1, '#87ceeb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ground
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    
    // Grass on ground
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, canvas.height - 55, canvas.width, 5);
}

function draw() {
    drawBackground();
    drawPipes();
    drawBird();
}

function endGame() {
    gameOver = true;
    
    // Update best score
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('flappyBestScore', bestScore);
        bestDisplay.textContent = bestScore;
    }
    
    // Show game over screen
    finalScore.textContent = score;
    finalBest.textContent = bestScore;
    gameOverScreen.classList.remove('hidden');
}

function gameLoop() {
    if (gameOver) return;
    
    updateBird();
    updatePipes();
    checkCollision();
    draw();
    
    requestAnimationFrame(gameLoop);
}

// Initial draw
drawBackground();
drawBird();