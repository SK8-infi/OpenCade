# Contributing to OpenCade

Thank you for your interest in contributing! We use a "Slot System" to make adding games easy and conflict-free.

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript
- A text editor (VS Code, Sublime Text, etc.)
- Chrome or any modern web browser

## How to Add a Game

We have pre-created 50 game slots (`Game-01` to `Game-50`) to prevent merge conflicts.

### 1. Claim a Slot

1. Open `js/games-data.js` and look for the first **"UNCLAIMED"** slot.
2. Note the slot number (e.g., `Game-04`).
3. This is where you will work.

### 2. Rename the Folder

1. Go to the `games/` directory.
2. Find your claimed folder (e.g., `Game-04`).
3. **Rename** the folder to your game's name (e.g., `pong` or `space-invaders`).
   - Use lowercase and hyphens only.
   - Example: `games/Game-04` → `games/pong`

### 3. Build Your Game

Inside your renamed folder, you'll find template files. Edit them to build your game:

- **`index.html`**: The game page. Update the title and content.
- **`style.css`**: Your game's styles.
- **`script.js`**: Your game's logic.
- **`meta.json`**: Update with your game's details (title, description, etc.).

**Rules:**
- Use vanilla JavaScript only (no frameworks).
- Keep everything inside your folder.
- Do not modify other games.

### 4. Update Game Data

Open `js/games-data.js` and update your slot's entry:

```javascript
// BEFORE
{
    slot: "04",
    slug: "game-04",
    title: "Game Slot 04",
    // ...
    author: "Unclaimed",
    // ...
},

// AFTER
{
    slot: "04",
    slug: "pong", // Match your folder name
    title: "Retro Pong",
    description: "Classic arcade pong game.",
    thumbnail: "../assets/thumbnails/pong.png", // See step 5
    path: "./pong/index.html", // Update this path!
    author: "YourGithubUsername",
    difficulty: "Beginner",
    controls: "Up/Down Arrows",
    tags: ["arcade", "classic"]
},
```

### 5. Add a Thumbnail

1. Create a screenshot of your game (400x200px recommended).
2. Save it as `assets/thumbnails/your-game-slug.png`.
3. Make sure the path in `games-data.js` matches.

### 6. Test & Submit

1. Open `index.html` in your browser.
2. Verify your game card appears correctly.
3. Click to play and ensure everything works.
4. Submit a Pull Request!

## Checklist

- [ ] Renamed `Game-XX` folder to `your-game-slug`
- [ ] Updated `js/games-data.js` correctly
- [ ] Added thumbnail to `assets/thumbnails/`
- [ ] Game runs without errors
- [ ] No external dependencies maintained

## Questions?

Feel free to open an issue or ask in the community!

---
**Happy Coding!**
