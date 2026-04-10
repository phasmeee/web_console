# 🖥️ Web Console Project

A personal educational project designed to explore the interactive capabilities of **JavaScript**. This project transforms a standard web page into a functional, retro-style terminal interface.

---

## 📝 Overview
This project was built as a "fun" milestone to move beyond static HTML and CSS. It focuses on real-time user interaction, command parsing, and dynamic UI updates using vanilla JavaScript.

## ✨ Key Features
* **Immersive Terminal UI**: A sleek "CMD" aesthetic with a customizable green-on-black theme.
* **Restricted Environment**: Disables text selection and hides the mouse cursor to simulate a native terminal experience.
* **Smart Input Handling**: Captures and processes commands via the `Enter` key with an integrated 70-character limit.
* **Live Theming**: Allows users to change text and border colors on the fly using CSS Variables.
* **Seamless Navigation**: Includes automatic vertical scrolling to keep the latest output in view.

## 🛠️ Commands
Use these commands to interact with the console:

| Command | Description |
| :--- | :--- |
| `help` | Lists all available commands. |
| `help[command]` | Shows detailed usage for a specific command. |
| `clear` | Wipes the console screen history. |
| `date` | Displays the current system date and time. |
| `echo [text]` | Repeats the input text back to the user. |
| `whoami` | Provides info about the current session user. |
| `color [type] [val]` | Changes colors for `txt` or `line` using names (rouge, vert, etc.) or Hex codes. |

## 📂 Project Architecture
The project follows a standard web development folder structure:

```text
/
├── console.html           # Structure and entry point
├── css/
│   └── consolestyle.css   # Styling and CSS variables
└── js/
    └── consolecommand.js  # Core logic and command parser
