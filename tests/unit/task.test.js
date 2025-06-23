const Task = require('../../models/Task');
const mongoose = require('mongoose');

describe('Task Model Unit Tests', () => {

    // Test case 1: Should correctly create a valid task
    it('should create a valid task with all fields', () => {
        const taskData = {
            title: 'Test Task',
            description: 'This is a test description.',
            completed: true
        };
        const task = new Task(taskData);
        
        expect(task.title).toBe(taskData.title);
        expect(task.description).toBe(taskData.description);
        expect(task.completed).toBe(taskData.completed);
    });

    // Test case 2: Title is required
    it('should fail if title is not provided', () => {
        const taskData = { description: 'Incomplete task' };
        const task = new Task(taskData);
        
        // Mongoose validation should throw an error
        const error = task.validateSync();
        expect(error.errors.title).toBeDefined();
        expect(error.errors.title.message).toBe('Title is required');
    });

    // Test case 3: 'completed' field should default to false
    it('should have a default value of false for the completed field', () => {
        const taskData = { title: 'New Uncompleted Task' };
        const task = new Task(taskData);

        expect(task.completed).toBe(false);
    });

    // Test case 4: Title should not exceed 100 characters
    it('should fail if title is longer than 100 characters', () => {
        const longTitle = 'a'.repeat(101); // 101 characters
        const task = new Task({ title: longTitle });
        
        const error = task.validateSync();
        expect(error.errors.title).toBeDefined();
        expect(error.errors.title.message).toContain('cannot be more than 100 characters');
    });

    // Test case 5: Description should not exceed 500 characters
    it('should fail if description is longer than 500 characters', () => {
        const longDescription = 'b'.repeat(501); // 501 characters
        const task = new Task({ title: 'Task with long description', description: longDescription });

        const error = task.validateSync();
        expect(error.errors.description).toBeDefined();
        expect(error.errors.description.message).toContain('cannot be more than 500 characters');
    });

});
