# Task Manager API Server

This project is a simple but complete full-stack application featuring a RESTful API backend built with Node.js, Express, and MongoDB. It includes a basic frontend to interact with the API, allowing users to perform CRUD (Create, Read, Update, Delete) operations on a list of tasks.

This serves as a practical example for creating a custom API server, integrating it with a database, and consuming it with a client-side application.

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Frontend**: HTML, CSS, vanilla JavaScript

## Features

-   RESTful API with 4 endpoints.
-   Full CRUD functionality for tasks.
-   Simple, responsive frontend to manage tasks.
-   Structured, easy-to-understand codebase.

---

## Getting Started

### Prerequisites

-   Node.js (which includes npm) installed on your machine.
-   MongoDB installed and running locally.

### Installation & Setup

1.  **Clone the repository (or create the files locally):**
    > If this were a real Git repo, you would clone it. For now, create the project folder and all the files as shown in the file structure.

2.  **Navigate to the project directory:**
    ```sh
    cd task-manager-api
    ```

3.  **Install dependencies:**
    > This command reads the package.json file and installs all the necessary libraries (Express, Mongoose, etc.).
    ```sh
    npm install
    ```

4.  **Create your environment file:**
    > Create a file named `.env` in the root of your project and add the following content. This keeps your database credentials private.
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/taskdb
    ```

5.  **Run the server:**
    > This command starts the Node.js server.
    ```sh
    npm start
    ```
    > For development, you can use `nodemon` which automatically restarts the server on file changes:
    ```sh
    npm run dev
    ```
    > You should see the following output in your terminal:
    ```
    Server is running on http://localhost:3000
    Successfully connected to MongoDB!
    ```

### Using the Frontend

Open your web browser and navigate to `http://localhost:3000`. You will see the Task Manager web application, where you can add, view, complete, and delete tasks.

---

## API Documentation

Here are the details for the 4 custom API endpoints you have created. You can test these with tools like Postman or `curl`.

**Base URL:** `http://localhost:3000/api/tasks`

### 1. Get All Tasks

-   **Method**: `GET`
-   **Endpoint**: `/`
-   **Description**: Retrieves a list of all tasks, sorted by creation date (newest first).
-   **Success Response (200 OK)**:
    ```json
    [
        {
            "_id": "6855848aef7b3e23e04dd7a4",
            "title": "Python",
            "description": "Learn python",
            "completed": false,
            "createdAt": "2025-06-20T15:55:54.916Z",
            "updatedAt": "2025-06-20T15:55:54.916Z",
            "__v": 0
        },
        {
            "_id": "6855428d3a32b0e23e84b11a",
            "title": "Node.js",
            "description": "Complete it",
            "completed": false,
            "createdAt": "2025-06-20T11:14:21.141Z",
            "updatedAt": "2025-06-20T11:14:21.141Z",
            "__v": 0
        }
    ]
    ```

### 2. Create a New Task

-   **Method**: `POST`
-   **Endpoint**: `/`
-   **Description**: Adds a new task to the database.
-   **Request Body (JSON)**:
    ```json
    {
        "title": "Write API Documentation",
        "description": "Document all endpoints in the README file."
    }
    ```
-   **Success Response (201 Created)**:
    ```json
    {
        "title": "Write API Documentation",
        "description": "Document all endpoints in the README file.",
        "completed": false,
        "_id": "685584bdef7b3e23e04dd7a8",
        "createdAt": "2025-06-20T15:56:45.399Z",
        "updatedAt": "2025-06-20T15:56:45.399Z",
        "__v": 0
    }
    ```

### 3. Update a Task

-   **Method**: `PUT`
-   **Endpoint**: `/:id` (e.g., `/685584bdef7b3e23e04dd7a8`)
-   **Description**: Updates an existing task by its ID. You can update the `title`, `description`, or `completed` status.
-   **Request Body (JSON)**:
    ```json
    {
        "completed": true
    }
    ```
-   **Success Response (200 OK)**:
    ```json
    {
        "_id": "685584bdef7b3e23e04dd7a8",
        "title": "Write API Documentation",
        "description": "Document all endpoints in the README file.",
        "completed": true,
        "createdAt": "2025-06-20T15:56:45.399Z",
        "updatedAt": "2025-06-20T15:57:30.419Z",
        "__v": 0
    }
    ```

### 4. Delete a Task

-   **Method**: `DELETE`
-   **Endpoint**: `/:id` (e.g., `/685584bdef7b3e23e04dd7a8`)
-   **Description**: Deletes a task from the database by its ID.
-   **Success Response (200 OK)**:
    ```json
    {
        "message": "Task is deleted successfully"
    }