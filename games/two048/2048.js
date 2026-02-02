var board;
var score = 0;
var rows = 4;
var columns = 4;
var gameOver = false;


window.onload = function() {
    setGame();
}

function setGame() {

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    
    setTwo();
    setTwo();

}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; 
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }                
    }
}

document.addEventListener('keyup', (e) => {

    if (gameOver) return;

    let moved = false;

    if (e.code == "ArrowLeft") {
        slideLeft();
        moved = true;
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        moved = true;
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        moved = true;
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        moved = true;
    }

    if (moved) {

        setTwo();

        document.getElementById("score").innerText = score;

        // ⭐ GAME OVER CHECK ⭐
        if (isGameOver()) {
            showGameOver();
        }
    }
});


function filterZero(row){
    return row.filter(num => num != 0); 
}

function slide(row) {
    
    row = filterZero(row); 
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } 
    row = filterZero(row);
    
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         
        row.reverse();              
        row = slide(row)            
        board[r] = row.reverse();   
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
       
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { 
                return true;
            }
        }
    }
    return false;
}
function showGameOver() {

  gameOver = true;

  document.getElementById("finalScore").textContent =
    "Score: " + score;

  document.getElementById("gameOverScreen")
    .classList.remove("hidden");
}

function hideGameOver() {
  document.getElementById("gameOverScreen")
    .classList.add("hidden");
}



function restart() {

    gameOver = false;

    hideGameOver();

    score = 0;

    document.getElementById("score").innerText = score;

    document.getElementById("board").innerHTML = "";

    setGame();
}

function isGameOver() {

    // Check empty space
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            if (board[r][c] === 0) {
                return false;
            }

            // Horizontal check
            if (c < columns - 1 &&
                board[r][c] === board[r][c + 1]) {
                return false;
            }

            // Vertical check
            if (r < rows - 1 &&
                board[r][c] === board[r + 1][c]) {
                return false;
            }
        }
    }

    return true; // No moves left
}

