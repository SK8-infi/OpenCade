/**
 * Games Data
 * 
 * This file contains all the game entries for the Games page.
 * 
 * HOW TO CONTRIBUTE:
 * 1. Find an unclaimed slot below (look for "Unclaimed" author)
 * 2. Claim it by creating a PR that updates the entry
 * 3. Rename the folder from Game-XX to your-game-name
 * 4. Update this entry with your game's details
 * 
 * Each game object requires:
 * - slot: The slot number (01-30) - DO NOT CHANGE
 * - slug: URL-friendly identifier (e.g., "snake")
 * - title: Display name (e.g., "Snake")
 * - description: Brief description of the game
 * - thumbnail: Path to thumbnail image (relative to /games/)
 * - path: Path to game HTML file (relative to /games/)
 * - author: Game author github ID
 * - difficulty: "Beginner", "Intermediate", or "Advanced"
 * - controls: How to play (e.g., "Arrow keys")
 * - tags: Array of category tags
 */

const GAMES_DATA = [
    // ========================================
    // SLOT 01 - Snake (CLAIMED)
    // ========================================
    {
        slot: "01",
        slug: "snake",
        title: "Snake",
        description: "Classic snake game built with HTML5 Canvas. Eat food to grow longer, but don't hit the walls or yourself!",
        thumbnail: "../assets/thumbnails/snake.png",
        path: "./snake/index.html",
        author: "SK8-infi",
        difficulty: "Beginner",
        controls: "Arrow keys / WASD",
        tags: ["arcade", "classic"]
    },

    // ========================================
    // SLOT 02 - Tic-Tac-Toe (CLAIMED)
    // ========================================
    {
        slot: "02",
        slug: "tic-tac-toe",
        title: "Tic-Tac-Toe",
        description: "The classic X's and O's game. Play against a friend or challenge the simple AI.",
        thumbnail: "../assets/thumbnails/tictactoe.png",
        path: "./tic-tac-toe/index.html",
        author: "SK8-infi",
        difficulty: "Beginner",
        controls: "Mouse click",
        tags: ["puzzle", "two-player"]
    },

    // ========================================
    // SLOT 03 - Memory Match (CLAIMED)
    // ========================================
    {
        slot: "03",
        slug: "memory",
        title: "Memory Match",
        description: "Test your memory by matching pairs of cards. Find all pairs to win!",
        thumbnail: "../assets/thumbnails/memory.png",
        path: "./memory/index.html",
        author: "SK8-infi",
        difficulty: "Beginner",
        controls: "Mouse click",
        tags: ["puzzle", "memory"]
    },

    // ========================================
    // SLOT 04 - Flappy Bird (CLAIMED)
    // ========================================
    {
        slot: "04",
        slug: "flappy bird",
        title: "Flappy Bird",
        description: "Navigate your bird through pipes by tapping or pressing space. Don't hit the pipes or the ground!",
        thumbnail: "../assets/thumbnails/flappy-bird.png",
        path: "./flappy bird/index.html",
        author: "Tarang-Nanwatkar",
        difficulty: "Beginner",
        controls: "Space or Click",
        tags: ["arcade", "endless"]
    },

    // ========================================
    // SLOT 05 - Guess The random Number
    // ========================================
    {
        slot: "05",
        slug: "game-05",
        title: "Guess the Random Number",
        description: "Its a Random Number Guessing Game where the system generates a random number and the user has to guess it. The game provides feedback like too high or too low, tracks attempts, and notifies the user when the correct number is guessed.",
        thumbnail: "../assets/thumbnails/randomNumberGame.png",
        path: "./GuessTheNumber/index.html",
        author: "Om Himthani",
        difficulty: "Beginner",
        controls: "Numpad and mouse",
        tags: ["Arcade","Casual"]
    },

    // ========================================
    // SLOT 06 - Typing Speed Test (CLAIMED)
    // ========================================
    {
    "slot": "06",
    "slug": "typing-speed-test",
    "title": "Typing Speed Test",
    "description": "Race against the clock to type iconic quotes with speed and precision. Track your WPM, improve your accuracy, and challenge yourself to beat your high score.",
    "thumbnail": "../assets/thumbnails/typing-speed-test.png",
    "path": "./typing-speed-test/index.html",
    "author": "Tarang-Nanwatkar",
    "difficulty": "Beginner",
    "controls": "Keyboard",
    "tags": ["typing", "speed", "utility"]
    },

    // ========================================
    // SLOT 07 - UNCLAIMED
    // ========================================
    {
        slot: "07",
        slug: "game-07",
        title: "Game Slot 07",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-07/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 08 - UNCLAIMED
    // ========================================
    {
        slot: "08",
        slug: "game-08",
        title: "Game Slot 08",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-08/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 09 - UNCLAIMED
    // ========================================
    {
        slot: "09",
        slug: "game-09",
        title: "Game Slot 09",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-09/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 10 - Maze Escape (CLAIMED)
    // ========================================
    {
        slot: "10",
        slug: "maze-escape",
        title: "Maze Escape",
        description: "Find the correct path through the maze to reach the exit.",
        thumbnail: "../assets/thumbnails/maze-escape.png",
        path: "./maze-escape/index.html",
        author: "Tarang-Nanwatkar",
        difficulty: "Beginner",
        controls: "Arrow Keys",
        tags: ["arcade", "puzzle"]
    },

    // ========================================
    // SLOT 11 - UNCLAIMED
    // ========================================
    {
        slot: "11",
        slug: "game-11",
        title: "Game Slot 11",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-11/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 12 - UNCLAIMED
    // ========================================
    {
        slot: "12",
        slug: "game-12",
        title: "Game Slot 12",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-12/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 13 - UNCLAIMED
    // ========================================
    {
        slot: "13",
        slug: "game-13",
        title: "Game Slot 13",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-13/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 14 - UNCLAIMED
    // ========================================
    {
        slot: "14",
        slug: "game-14",
        title: "Game Slot 14",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-14/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 15 - UNCLAIMED
    // ========================================
    {
        slot: "15",
        slug: "game-15",
        title: "Game Slot 15",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-15/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 16 - UNCLAIMED
    // ========================================
    {
        slot: "16",
        slug: "game-16",
        title: "Game Slot 16",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-16/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 17 - UNCLAIMED
    // ========================================
    {
        slot: "17",
        slug: "game-17",
        title: "Game Slot 17",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-17/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 18 - UNCLAIMED
    // ========================================
    {
        slot: "18",
        slug: "game-18",
        title: "Game Slot 18",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-18/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 19 - UNCLAIMED
    // ========================================
    {
        slot: "19",
        slug: "game-19",
        title: "Game Slot 19",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-19/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 20 - UNCLAIMED
    // ========================================
    {
        slot: "20",
        slug: "game-20",
        title: "Game Slot 20",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-20/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 21 - UNCLAIMED
    // ========================================
    {
        slot: "21",
        slug: "game-21",
        title: "Game Slot 21",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-21/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 22 - UNCLAIMED
    // ========================================
    {
        slot: "22",
        slug: "game-22",
        title: "Game Slot 22",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-22/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 23 - UNCLAIMED
    // ========================================
    {
        slot: "23",
        slug: "game-23",
        title: "Game Slot 23",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-23/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 24 - UNCLAIMED
    // ========================================
    {
        slot: "24",
        slug: "game-24",
        title: "Game Slot 24",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-24/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 25 - UNCLAIMED
    // ========================================
    {
        slot: "25",
        slug: "game-25",
        title: "Game Slot 25",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-25/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 26 - UNCLAIMED
    // ========================================
    {
        slot: "26",
        slug: "game-26",
        title: "Game Slot 26",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-26/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 27 - UNCLAIMED
    // ========================================
    {
        slot: "27",
        slug: "game-27",
        title: "Game Slot 27",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-27/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 28 - UNCLAIMED
    // ========================================
    {
        slot: "28",
        slug: "game-28",
        title: "Game Slot 28",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-28/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 29 - UNCLAIMED
    // ========================================
    {
        slot: "29",
        slug: "game-29",
        title: "Game Slot 29",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-29/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 30 - UNCLAIMED
    // ========================================
    {
        slot: "30",
        slug: "game-30",
        title: "Game Slot 30",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-30/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 31 - UNCLAIMED
    // ========================================
    {
        slot: "31",
        slug: "game-31",
        title: "Game Slot 31",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-31/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 32 - UNCLAIMED
    // ========================================
    {
        slot: "32",
        slug: "game-32",
        title: "Game Slot 32",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-32/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 33 - UNCLAIMED
    // ========================================
    {
        slot: "33",
        slug: "game-33",
        title: "Game Slot 33",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-33/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 34 - UNCLAIMED
    // ========================================
    {
        slot: "34",
        slug: "game-34",
        title: "Game Slot 34",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-34/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 35 - UNCLAIMED
    // ========================================
    {
        slot: "35",
        slug: "game-35",
        title: "Game Slot 35",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-35/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 36 - UNCLAIMED
    // ========================================
    {
        slot: "36",
        slug: "game-36",
        title: "Game Slot 36",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-36/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 37 - UNCLAIMED
    // ========================================
    {
        slot: "37",
        slug: "game-37",
        title: "Game Slot 37",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-37/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 38 - UNCLAIMED
    // ========================================
    {
        slot: "38",
        slug: "game-38",
        title: "Game Slot 38",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-38/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 39 - UNCLAIMED
    // ========================================
    {
        slot: "39",
        slug: "game-39",
        title: "Game Slot 39",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-39/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 40 - UNCLAIMED
    // ========================================
    {
        slot: "40",
        slug: "game-40",
        title: "Game Slot 40",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-40/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 41 - UNCLAIMED
    // ========================================
    {
        slot: "41",
        slug: "game-41",
        title: "Game Slot 41",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-41/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 42 - UNCLAIMED
    // ========================================
    {
        slot: "42",
        slug: "game-42",
        title: "Game Slot 42",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-42/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 43 - UNCLAIMED
    // ========================================
    {
        slot: "43",
        slug: "game-43",
        title: "Game Slot 43",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-43/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 44 - UNCLAIMED
    // ========================================
    {
        slot: "44",
        slug: "game-44",
        title: "Game Slot 44",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-44/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 45 - UNCLAIMED
    // ========================================
    {
        slot: "45",
        slug: "game-45",
        title: "Game Slot 45",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-45/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 46 - UNCLAIMED
    // ========================================
    {
        slot: "46",
        slug: "game-46",
        title: "Game Slot 46",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-46/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 47 - UNCLAIMED
    // ========================================
    {
        slot: "47",
        slug: "game-47",
        title: "Game Slot 47",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-47/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 48 - UNCLAIMED
    // ========================================
    {
        slot: "48",
        slug: "game-48",
        title: "Game Slot 48",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-48/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 49 - UNCLAIMED
    // ========================================
    {
        slot: "49",
        slug: "game-49",
        title: "Game Slot 49",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-49/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    },

    // ========================================
    // SLOT 50 - UNCLAIMED
    // ========================================
    {
        slot: "50",
        slug: "game-50",
        title: "Game Slot 50",
        description: "This slot is available! Claim it by building your game here.",
        thumbnail: "../assets/thumbnails/placeholder.png",
        path: "./Game-50/index.html",
        author: "Unclaimed",
        difficulty: "Beginner",
        controls: "TBD",
        tags: ["unclaimed"]
    }
];
