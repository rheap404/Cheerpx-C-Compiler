
## WebVM Hackathon Project

This project was developed as part of the WebVM Hackathon, leveraging CheerpX for WebAssembly-powered client-side execution of Python code in the browser. It mimics platforms like NeetCode.io, enabling users to practice coding problems and receive immediate feedback by running their code directly in the browser. The goal of this project is to showcase the potential of WebVM for delivering powerful terminal-based applications without the need for native installations.

# Overview

This platform allows users to practice coding problems in Python, featuring a split-view workspace with problem instructions on one side and a code editor with a built-in console on the other. The platform runs code client-side using CheerpX, which emulates a virtual machine in the browser. This eliminates the need for server-based execution, improving speed, privacy, and scalability.

# Key Features

- Client-Side Code Execution: Run Python code directly in the browser without server dependencies, using CheerpX and WebAssembly.
- Real-Time Feedback: Execute user code and provide immediate feedback in the console.
- Expandable Problem Set: Each problem includes detailed instructions, examples, and test cases.
- Interactive Code Editor: A built-in editor powered by CodeMirror with syntax highlighting for Python.


# Installation & Setup
Access this project:
1. Clone this repo
```bash
git clone https://github.com/your-username/webvm-hackathon.git
```

2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
4. Open http://localhost:3000 in your browser to view the project.

5. Select a coding problem, write your code, and click Run Code to test it.

# How It Works
The project sets up a CheerpX instance and integrates various emulated devices such as Cloud, IDB, Overlay, Web, and Data devices to interact with the virtual environment. These devices allow the project to handle storage, filesystem operations, and communication between the terminal and the backend.

The terminal interface enables users to run commands and interact with a simulated environment in real-time, all within the browser.


# Future Enhancements
This project is currently focused on Python, but there are several avenues for expansion:

- Additional Programming Languages: Support for other popular languages like JavaScript, C++, and Java.
- More Test Cases: Expanding the number of test cases for each problem to cover edge cases and various input scenarios.
- User Accounts: Allowing users to log in, save their progress, and track their performance over time.
- Problem Set Expansion: Adding more coding challenges across different categories, such as data structures, algorithms, and system design.
- Custom Test Cases: Enabling users to input their own test cases to test edge scenarios beyond the provided examples.


# Tech Stack
- React.js: For building the user interface.
- CodeMirror: As the code editor, supporting Python syntax highlighting.
- CheerpX: To handle the execution of Python code in the browser using WebAssembly.
