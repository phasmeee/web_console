# 🖥️ Web Console Project

A personal "fun" and educational project created to bridge the gap between static web design and interactive logic. This project serves as a practical exercise to learn **JavaScript** by building a functional, CMD-style terminal interface.

---

## 📝 Overview
The goal was to create an immersive web-based console that reacts to user input. Having already mastered the basics of HTML and CSS, this project focuses on using JavaScript to manipulate the DOM, handle keyboard events, and dynamically update styles.

## ✨ Key Features
* **CMD Experience**: Features a classic "hacker" aesthetic with a black background and green text.
* **Immersive Design**: Disables text selection and hides the mouse cursor to mimic a real terminal environment.
* **Interactive Input**: Captures user commands through the `Enter` key with a character limit of 70 for stability.
* **Dynamic Styling**: Updates the UI colors (text or borders) in real-time using CSS variables and JavaScript logic.
* **Auto-Scrolling**: The output area automatically scrolls to the bottom whenever a new message is printed.

## 🛠️ Supported Commands
The console includes a custom command parser that supports the following actions:

| Command | Description |
| :--- | :--- |
| `help` | Displays the list of all supported commands. |
| `help[command]` | Shows specific information about how to use a particular command. |
| `clear` | Wipes the console output history clean. |
| `color [txt/line] [val]` | Changes the color of text (`txt`) or borders (`line`) using names (e.g., rouge, bleu) or Hex codes. |

## 📂 Project Structure
The project is organized into a clean directory structure to separate concerns:

```text
/
├── console.html           # The main entry point and UI structure
├── css/
│   └── consolestyle.css   # Visual styling and layout
└── js/
    └── consolecommand.js  # Logic for commands and interaction
