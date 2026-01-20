// ================== CANVAS SETUP ==================
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");


const pauseBtn = document.getElementById("pause-btn");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const overlayBtn = document.getElementById("overlay-btn");

let isPaused = false;

// ================== UI ELEMENTS ==================
const startBtn = document.getElementById("start-btn");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

// ================== GAME STATE ==================
let score = 0;
let lives = 3;
let gameRunning = false;

const highScoreEl = document.getElementById("high-score");

let highScore = localStorage.getItem("breakoutHighScore") || 0;
highScore = Number(highScore);
highScoreEl.textContent = highScore;


// ================== BALL SETTINGS ==================
let ballRadius = 8;
let x, y, dx, dy;   

let baseSpeed = 2;
let speedIncrement = 0.15;
let maxSpeed = 5.5;

// ================== PADDLE SETTINGS ==================
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX;

// ================== BRICKS ==================
const brickRowCount = 5;
const brickColumnCount = 7;
const brickWidth = 55;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];

// ================== CONTROLS ==================
let rightPressed = false;
let leftPressed = false;

// ================== SOUND EFFECTS ==================
const sounds = {
    brick: new Audio("assets/sounds/brick.wav"),
    paddle: new Audio("assets/sounds/paddle.wav"),
    gameover: new Audio("assets/sounds/gameover.wav"),
    win: new Audio("assets/sounds/win.wav")
};

Object.values(sounds).forEach(sound => sound.volume = 0.6);

// ================== INITIALIZE BRICKS ==================
function initBricks() {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

// ================== INPUT HANDLERS ==================
document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") rightPressed = true;
    if (e.key === "ArrowLeft") leftPressed = true;
});

document.addEventListener("keyup", e => {
    if (e.key === "ArrowRight") rightPressed = false;
    if (e.key === "ArrowLeft") leftPressed = false;
});

// ================== COLLISION DETECTION ==================
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    scoreEl.textContent = score;

                    // Increase speed with cap
                    let currentSpeed = Math.sqrt(dx * dx + dy * dy);
                    let newSpeed = Math.min(currentSpeed + speedIncrement, maxSpeed);
                    let angle = Math.atan2(dy, dx);

                    dx = newSpeed * Math.cos(angle);
                    dy = newSpeed * Math.sin(angle);

                    score++;
                    scoreEl.textContent = score;

                    // Update high score
                    if (score > highScore) {
                        highScore = score;
                        highScoreEl.textContent = highScore;
                        localStorage.setItem("breakoutHighScore", highScore);
                    }


                    sounds.brick.currentTime = 0;
                    sounds.brick.play();

                    if (score === brickRowCount * brickColumnCount) {
                        sounds.win.play();
                        overlayTitle.textContent = "YOU WIN";
                        overlayBtn.textContent = "RESTART";
                        overlay.classList.remove("hidden");
                        startBtn.style.display = "none";

                        gameRunning = false;
                        return;
                    }
                }
            }
        }
    }
}

// ================== DRAW FUNCTIONS ==================
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#00d4ff";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#7b2cbf";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#00d4ff";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// ================== MAIN GAME LOOP ==============
function draw() {
    if (!gameRunning || isPaused) return;


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    // Wall collisions
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
    if (y + dy < ballRadius) dy = -dy;
    else if (y + dy > canvas.height - ballRadius) {
        // Paddle collision
        if (x > paddleX && x < paddleX + paddleWidth) {
            let hitPoint = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
            let maxBounceAngle = Math.PI / 3;
            let bounceAngle = hitPoint * maxBounceAngle;

            let speed = Math.sqrt(dx * dx + dy * dy);
            dx = speed * Math.sin(bounceAngle);
            dy = -speed * Math.cos(bounceAngle);

            // Enforce speed cap
            let cappedSpeed = Math.min(
                Math.sqrt(dx * dx + dy * dy),
                maxSpeed
            );
            let angle = Math.atan2(dy, dx);
            dx = cappedSpeed * Math.cos(angle);
            dy = cappedSpeed * Math.sin(angle);

            sounds.paddle.currentTime = 0;
            sounds.paddle.play();
        } else {
            // LIFE LOST
            lives--;
            livesEl.textContent = lives;
            sounds.gameover.play();

            if (lives === 0) {
                overlayTitle.textContent = "YOU LOSE";
                overlayBtn.textContent = "RESTART";
                overlay.classList.remove("hidden");
                startBtn.style.display = "none";

                gameRunning = false;
                return;
            }

            // Reset ball & paddle
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = baseSpeed;
            dy = -baseSpeed;
            paddleX = (canvas.width - paddleWidth) / 2;

            requestAnimationFrame(draw);
            return;
        }
    }

    // Paddle movement
    if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
    if (leftPressed && paddleX > 0) paddleX -= 7;

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}

// ================== START GAME ==================
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";

    score = 0;
    lives = 3;
    scoreEl.textContent = score;
    livesEl.textContent = lives;

    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = baseSpeed;
    dy = -baseSpeed;

    paddleX = (canvas.width - paddleWidth) / 2;

    initBricks();
    gameRunning = true;
    draw();
});

pauseBtn.addEventListener("click", () => {
    if (!gameRunning) return;

    if (!isPaused) {
        // PAUSE
        isPaused = true;
        pauseBtn.textContent = "CONTINUE";

        startBtn.style.display = "none"; 

        overlayTitle.textContent = "PAUSED";
        overlayBtn.textContent = "RESTART";
        overlay.classList.remove("hidden");
    } else {
        // CONTINUE
        isPaused = false;
        pauseBtn.textContent = "PAUSE";

        startBtn.style.display = "inline-block";

        overlay.classList.add("hidden");
        requestAnimationFrame(draw);
    }
});


overlayBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");

    startBtn.style.display = "inline-block"; 
    pauseBtn.textContent = "PAUSE";
    isPaused = false;

    startBtn.click();
});
