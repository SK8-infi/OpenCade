# Contributing to OpenCade 🚀

Welcome! OpenCade is a community-driven project, and we're thrilled you want to contribute.

To ensure a smooth experience and avoid conflicts, we follow a strict **Slot System** workflow.

## 🤝 The Workflow

Follow these steps exactly to add your game to the arcade:

### 1. 🌟 Star the Repo
Show your support! It helps more developers find us.

### 2. 📝 Raise an Issue
Before writing any code, you need approval.
- Go to the **[Issues Tab](../../issues)**.
- create a **"New Issue"**.
- Select the **"New Game Request"** template.
- Fill in your Game Name and Description.

### 3. 🎟️ Get Assigned
Wait for a maintainer to review your request.
- We will assign you a dedicated **Game Slot** (e.g., `Game-42`).
- **Do not start working until you have been assigned a slot.**

### 4. 🍴 Fork the Repo
Once assigned:
- Click the **Fork** button in the top-right corner of this page.
- Clone your fork locally:
  ```bash
  git clone https://github.com/YOUR_USERNAME/opencade.git
  cd opencade
  ```

### 5. 🌿 Make a Branch
Create a new branch for your game:
```bash
git checkout -b feature/my-cool-game
```

### 6. 💻 Work on the Project
1. Navigate to `games/` and find your **Assigned Slot** (e.g., `Game-42`).
2. **Rename the folder** to your game's slug (e.g., `games/space-invaders`).
3. Build your game inside this folder!
   - `index.html` (The Stage)
   - `style.css` (The Look)
   - `script.js` (The Logic)
   - `meta.json` (The Details)
4. Update `js/games-data.js` with your game's info.
5. Add a thumbnail to `assets/thumbnails/`.

> **IMPORTANT:** Use ONLY HTML, CSS, and Vanilla JavaScript. No frameworks allowed.

### 7. 🚀 Commit, Push, and Raise a PR
When you're ready:
1. Commit your changes.
2. Push to your fork.
3. Open a **Pull Request** to the main repository.
4. Fill out the PR template checklist.

---

## 🧐 Code Guidelines

- **Keep it Clean**: Write readable code. Remember, others will learn from it!
- **No External deps**: If you absolutely need a library, ask in your issue first.
- **Responsive**: Try to make your game playable on different screen sizes.

## 🐛 Found a Bug?
Open an issue! We appreciate bug reports just as much as new features.

---

**Happy Coding!** 🕹️
