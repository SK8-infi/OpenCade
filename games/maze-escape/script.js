const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const statusText = document.getElementById('status');

// --- CONFIGURATION ---
const cols = 20; 
const rows = 20; 
const cellSize = canvas.width / cols;

// --- STATE VARIABLES ---
let grid = [];
let current; 
let stack = []; 
let player = { x: 0, y: 0 };
let goal = { x: cols - 1, y: rows - 1 };
let gameActive = true;

// --- CELL CLASS ---
class Cell {
    constructor(c, r) {
        this.c = c;
        this.r = r;
        // Walls
        this.walls = [true, true, true, true]; 
        this.visited = false;
    }

    draw() {
        const x = this.c * cellSize;
        const y = this.r * cellSize;
        
        // Draw Walls
        ctx.strokeStyle = '#004d52'; 
        ctx.lineWidth = 2;
        ctx.shadowBlur = 0; 

        if (this.walls[0]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + cellSize, y); ctx.stroke(); } 
        if (this.walls[1]) { ctx.beginPath(); ctx.moveTo(x + cellSize, y); ctx.lineTo(x + cellSize, y + cellSize); ctx.stroke(); } 
        if (this.walls[2]) { ctx.beginPath(); ctx.moveTo(x + cellSize, y + cellSize); ctx.lineTo(x, y + cellSize); ctx.stroke(); } 
        if (this.walls[3]) { ctx.beginPath(); ctx.moveTo(x, y + cellSize); ctx.lineTo(x, y); ctx.stroke(); } 
    }

    checkNeighbors() {
        let neighbors = [];
        let top = grid[index(this.c, this.r - 1)];
        let right = grid[index(this.c + 1, this.r)];
        let bottom = grid[index(this.c, this.r + 1)];
        let left = grid[index(this.c - 1, this.r)];

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length > 0) {
            let r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }
    }
}

// --- HELPER: Index Calculator ---
function index(c, r) {
    if (c < 0 || r < 0 || c >= cols || r >= rows) return -1;
    return c + r * cols;
}

// --- SETUP & RESTART LOGIC ---
function setup() {
    // Reset Game State
    grid = [];
    stack = [];
    player = { x: 0, y: 0 };
    gameActive = true;
    
    // Reset UI Text
    statusText.innerHTML = "";
    
    // Create Grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            grid.push(new Cell(c, r));
        }
    }
    
    // Generate Maze (Recursive Backtracker)
    current = grid[0];
    while(true) {
        current.visited = true;
        let next = current.checkNeighbors();
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break; // Generation finished
        }
    }
    
    // Initial Draw
    draw();
}

function removeWalls(a, b) {
    let x = a.c - b.c;
    if (x === 1) { a.walls[3] = false; b.walls[1] = false; }
    if (x === -1) { a.walls[1] = false; b.walls[3] = false; }
    let y = a.r - b.r;
    if (y === 1) { a.walls[0] = false; b.walls[2] = false; }
    if (y === -1) { a.walls[2] = false; b.walls[0] = false; }
}

// --- RENDERING ---
function draw() {
    // Clear Screen
    ctx.fillStyle = '#00080a'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Maze
    for (let i = 0; i < grid.length; i++) {
        grid[i].draw();
    }
    
    // Draw Player
    const pInset = 6;
    ctx.fillStyle = '#00f3ff'; 
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00f3ff"; 
    ctx.fillRect(player.x * cellSize + pInset, player.y * cellSize + pInset, cellSize - (pInset*2), cellSize - (pInset*2));
    ctx.shadowBlur = 0; 

    // Draw Goal
    const gInset = 6;
    ctx.fillStyle = '#ff0055'; 
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ff0055"; 
    ctx.fillRect(goal.x * cellSize + gInset, goal.y * cellSize + gInset, cellSize - (gInset*2), cellSize - (gInset*2));
    ctx.shadowBlur = 0; 
}

// --- CONTROLS ---
document.addEventListener('keydown', (e) => {
    // RESTART LOGIC
    if (e.key === 'Enter' && !gameActive) {
        setup();
        return;
    }

    // GAMEPLAY LOGIC
    if (!gameActive) return;

    let currentCell = grid[index(player.x, player.y)];
    let moved = false;
    
    // Check walls
    if (e.key === 'ArrowUp' && !currentCell.walls[0]) { player.y--; moved = true; }
    else if (e.key === 'ArrowRight' && !currentCell.walls[1]) { player.x++; moved = true; }
    else if (e.key === 'ArrowDown' && !currentCell.walls[2]) { player.y++; moved = true; }
    else if (e.key === 'ArrowLeft' && !currentCell.walls[3]) { player.x--; moved = true; }

    if (moved) {
        draw();
        checkWin();
    }
});

// --- WIN CONDITION ---
function checkWin() {
    if (player.x === goal.x && player.y === goal.y) {
        gameActive = false;
        
        // Update HTML Status
        statusText.innerHTML = `> <span style="color:#00f3ff; text-shadow:0 0 5px #00f3ff">LEVEL COMPLETE</span>`;
        
        // Overlay
        ctx.fillStyle = "rgba(0, 8, 15, 0.85)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Main Title
        ctx.font = "40px 'Orbitron', sans-serif"; 
        ctx.fillStyle = "#00f3ff";
        ctx.textAlign = "center";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00f3ff";
        
        ctx.fillText("YOU ESCAPED!", canvas.width/2, canvas.height/2);
        
        // Subtext
        ctx.shadowBlur = 0;
        ctx.font = "20px 'VT323', monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("PRESS [ENTER] TO RESTART", canvas.width/2, canvas.height/2 + 40);
    }
}

// --- INITIALIZE ---
setup();