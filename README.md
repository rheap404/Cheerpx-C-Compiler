
# We Won!!

We are thrilled to announce that our project, WebVM Hackathon Project, won at the WebVM Hackathon! 🎉

This achievement recognizes the innovative use of CheerpX for creating a browser-based platform that allows users to practice coding problems without the need for server-side execution. Our solution stood out for its client-side Python execution, real-time feedback, and cost-efficient approach to delivering an interactive coding experience.

You can view the official hackathon results and more about our submission in the [Hackathon Results](https://github.com/leaningtech/WebVMHackathon/blob/main/results2024.md) section of our repository.

# WebVM Hackathon Project

This project was developed as part of the WebVM Hackathon, leveraging CheerpX for WebAssembly-powered client-side execution of Python code in the browser. It mimics platforms like NeetCode.io, enabling users to practice coding problems and receive immediate feedback by running their code directly in the browser. The goal of this project is to showcase the potential of WebVM for delivering powerful terminal-based applications without the need for native installations.


## Overview

This platform allows users to practice coding problems in Python, featuring a split-view workspace with problem instructions on one side and a code editor with a built-in console on the other. The platform runs code client-side using CheerpX, which emulates a virtual machine in the browser. This eliminates the need for server-based execution, improving speed, privacy, and scalability.

![Home Page](https://github.com/rheap404/cheerpx_hack/blob/main/home.png)

![Code Editor](https://github.com/rheap404/cheerpx_hack/blob/main/code-editor.png)

### Solution: WebVM Hackathon Project
The WebVM Hackathon Project addresses these challenges by leveraging CheerpX for WebAssembly-powered client-side execution of Python code directly within the browser. This innovative platform allows users to practice coding problems while receiving immediate feedback—eliminating the need for costly server-side validation.

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

# User Case: Benefits of running code client side for such a platform
One of the primary advantages of running code on the client side is cost efficiency. Companies like NeetCode and LeetCode often incur significant expenses for cloud hosting services, such as AWS, to validate user solutions on the server side. By shifting this workload to the user's browser:

1) Reduced Cloud Costs: Server-side validation requires maintaining large, scalable infrastructure to support millions of user submissions, leading to high cloud computing costs. Running code directly on the client minimizes or eliminates these expenses.

2) Lower Latency: Since the code is executed locally in the user's browser, the delay caused by network requests to a remote server is removed, resulting in faster feedback for users.

3) Reduced Server Load: By handling computation on the client side, server infrastructure can focus on other tasks, leading to a more efficient and scalable system with less need for expensive resources.


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

# Presentation 
[WebVM_Hackathon_Project_Presentation.pptx](https://github.com/user-attachments/files/17356850/WebVM_Hackathon_Project_Presentation.pptx)




