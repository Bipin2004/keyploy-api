# 📝 Task Manager API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

A simple yet powerful RESTful API for a task management application, built with Node.js and Express. This project includes a comprehensive test suite using Jest to ensure code quality and reliability.

## ✨ Features

-   **Full CRUD Functionality**: Create, Read, Update, and Delete tasks.
-   **RESTful API**: Clean, predictable, and well-structured API endpoints.
-   **Comprehensive Test Suite**: Includes unit, integration, and API tests.
-   **High Test Coverage**: Aims for high code coverage to ensure reliability.
-   **Interactive Frontend**: A simple client-side application to interact with the API.

---

## 🚀 Getting Started & Running Tests

### Prerequisites

-   [**Node.js**](https://nodejs.org/) (v14 or newer)
-   [**npm**](https://www.npmjs.com/) (comes with Node.js)
-   [**MongoDB**](https://www.mongodb.com/try/download/community) installed and running (for local development).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Bipin2004/keyploy-api.git](https://github.com/Bipin2004/keyploy-api.git)
    cd keyploy-api
    ```

2.  **Install dependencies:**
    This command installs both production and development dependencies.
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project.
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/taskdb
    ```

4.  **Run the application server:**
    ```sh
    npm run dev
    ```

---

## 🧪 Testing

This project uses **Jest** for testing and **Supertest** for API endpoint verification. An in-memory MongoDB server is used to ensure tests are isolated and fast.

### Running the Tests

Execute the following commands from the project root:

-   **Run all tests once:**
    ```sh
    npm test
    ```

-   **Run tests in watch mode (re-runs on file changes):**
    ```sh
    npm run test:watch
    ```

-   **Run tests and generate a coverage report:**
    ```sh
    npm run test:coverage
    ```
    This will create a `coverage` directory. You can view the detailed HTML report by opening `coverage/lcov-report/index.html` in your browser.

### Test Coverage Report

Here is a screenshot of the test coverage achieved for this project. The goal is to ensure all critical logic in the models and API routes is thoroughly tested.

**(Action Required: After running `npm run test:coverage`, take a screenshot of the terminal output or the HTML report and embed it here.)**

![Test Coverage Screenshot](https://placehold.co/800x200/f0f0f0/333?text=PASTE+YOUR+COVERAGE+SCREENSHOT+HERE)
