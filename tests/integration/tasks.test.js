const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const taskRoutes = require('../../routes/tasks');
const Task = require('../../models/Task');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await Task.deleteMany({});
});

describe('Task API Integration Tests', () => {

    // Test Suite for POST /api/tasks
    describe('POST /api/tasks', () => {
        it('should create a new task and return 201', async () => {
            const newTask = { title: 'Integration Test Task', description: 'Test POST endpoint' };
            const response = await request(app)
                .post('/api/tasks')
                .send(newTask);

            expect(response.status).toBe(201);
            expect(response.body.title).toBe(newTask.title);
            expect(response.body.completed).toBe(false);

            const dbTask = await Task.findById(response.body._id);
            expect(dbTask).not.toBeNull();
            expect(dbTask.title).toBe(newTask.title);
        });

        it('should return 400 if title is missing', async () => {
            const response = await request(app)
                .post('/api/tasks')
                .send({ description: 'Missing title' });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Title is required');
        });
    });

    // Test Suite for GET /api/tasks
    describe('GET /api/tasks', () => {
        it('should return all tasks and status 200', async () => {
            await Task.create([
                { title: 'Task 1' },
                { title: 'Task 2', completed: true }
            ]);

            const response = await request(app).get('/api/tasks');

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBe(2);
            expect(response.body[1].title).toBe('Task 1');

            const titles = response.body.map(task => task.title);
            expect(titles).toContain('Task 1');
            expect(titles).toContain('Task 2');
        });
    });

    // Test Suite for PUT /api/tasks/:id
    describe('PUT /api/tasks/:id', () => {
        it('should update a task and return 200', async () => {
            const task = await Task.create({ title: 'Task to be updated' });
            const updatedData = { title: 'Updated Title', completed: true };

            const response = await request(app)
                .put(`/api/tasks/${task._id}`)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(updatedData.title);
            expect(response.body.completed).toBe(updatedData.completed);
        });

        it('should return 404 if task not found', async () => {
            const invalidId = new mongoose.Types.ObjectId();
            const response = await request(app)
                .put(`/api/tasks/${invalidId}`)
                .send({ title: 'Does not matter' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Task not found');
        });
    });

    // Test Suite for DELETE /api/tasks/:id
    describe('DELETE /api/tasks/:id', () => {
        it('should delete a task and return 200', async () => {
            const task = await Task.create({ title: 'Task to be deleted' });

            const response = await request(app).delete(`/api/tasks/${task._id}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Task deleted successfully');

            // Verify the task was removed from the database
            const dbTask = await Task.findById(task._id);
            expect(dbTask).toBeNull();
        });

        it('should return 404 if task to delete is not found', async () => {
            const invalidId = new mongoose.Types.ObjectId();
            const response = await request(app).delete(`/api/tasks/${invalidId}`);

            expect(response.status).toBe(404);
        });
    });
});
