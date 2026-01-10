# Contributing to OpenCade 🚀

Welcome! OpenCade is a community-driven project, and we're thrilled you want to contribute.

To ensure a smooth experience and avoid conflicts, we follow a strict **Slot System** workflow.

## 🤝 The Workflow

Follow these steps exactly to add your game to the arcade:

### 1. 🌟 Star the Repo
Show your support! It helps more developers find us.
<img width="880" height="371" alt="image" src="https://github.com/user-attachments/assets/54b74cd2-78db-4183-83df-63b135b8d8f6" />


### 2. 📝 Raise an Issue
Before writing any code, you need approval.
- Go to the **[Issues Tab](../../issues)**.
- create a **"New Issue"**.
- Select the **"New Game Request"** template.
- Fill in your Game Name and Description.
<img width="1250" height="855" alt="image" src="https://github.com/user-attachments/assets/54713667-1684-4b64-b3b4-00fe054df19c" />
<img width="1053" height="793" alt="image" src="https://github.com/user-attachments/assets/06ab2d7b-bb46-4849-adf0-ead9d64bb59e" />



### 3. 🎟️ Get Assigned
Wait for a maintainer to review your request.
- We will assign you a dedicated **Game Slot** (e.g., `Game-42`).
- **Do not start working until you have been assigned a slot.**
- The following is an example with my name. Your name will be there when I assign you.
<img width="274" height="52" alt="image" src="https://github.com/user-attachments/assets/b5552e09-253f-4dc1-b566-8c6ba3e6c850" />
<img width="395" height="122" alt="image" src="https://github.com/user-attachments/assets/6ede5c95-7d5b-4344-830a-e815de539a2f" />



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

### 7. 🚀 Commit, Push, and Raise a Pull Request (PR)

Once you have completed your game and verified that everything works correctly, follow the steps below:

#### 1️⃣ Check your changes
Review all modified and new files before committing.
```
git status
````

#### 2️⃣ Stage your changes

Add the files you want to include in the commit.

```
git add .
```

#### 3️⃣ Commit your changes

Create a clear and descriptive commit message.

```
git commit -m "Add Flappy Bird game using HTML, CSS, and JavaScript"
```

#### 4️⃣ Push changes to your fork

Push your local branch to your GitHub fork.

```
git push origin your-branch-name
```

> Replace `your-branch-name` with the branch you are working on (e.g., `feat/flappy-bird`).

#### 5️⃣ Open a Pull Request

* Go to your forked repository on GitHub.
* Click on **Compare & pull request**.
* Ensure the base repository and base branch are correct.
* Add a clear title and description for your PR.

#### 6️⃣ Fill out the PR template

* Complete all checklist items in the PR template.
* Briefly explain what your game does.
* Add screenshots or a short GIF if possible.

#### 7️⃣ Submit and wait for review

* Submit the Pull Request.
* Respond to review comments and make changes if requested.

---

## 🧐 Code Guidelines

- **Keep it Clean**: Write readable code. Remember, others will learn from it!
- **No External deps**: If you absolutely need a library, ask in your issue first.
- **Responsive**: Try to make your game playable on different screen sizes.

## 🐛 Found a Bug?
Open an issue! We appreciate bug reports just as much as new features.

---

**Happy Coding!** 🕹️
