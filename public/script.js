document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');

    const API_URL = 'http://localhost:3000/api/tasks';

    // --- Function to fetch and render tasks ---
    const fetchTasks = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            taskList.innerHTML = '<p class="error">Failed to load tasks. Is the server running?</p>';
            console.error('Error fetching tasks:', error);
        }
    };

    // --- Function to render tasks to the DOM ---
    const renderTasks = (tasks) => {
        taskList.innerHTML = ''; 
        if (tasks.length === 0) {
            taskList.innerHTML = '<p>No tasks yet. Add one above!</p>';
            return;
        }

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.dataset.id = task._id;

            taskItem.innerHTML = `
                <div class="task-details">
                    <h3>${escapeHTML(task.title)}</h3>
                    <p>${escapeHTML(task.description || '')}</p>
                </div>
                <div class="task-actions">
                    <button class="delete-btn">🗑️</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // --- Event Listener for form submission (Create Task) ---
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!title) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });

            if (!response.ok) throw new Error('Failed to create task');

            titleInput.value = '';
            descriptionInput.value = '';
            fetchTasks(); 
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task.');
        }
    });

    // --- Event Listener for clicks on the task list (Update and Delete) ---
    taskList.addEventListener('click', async (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;

        const id = taskItem.dataset.id;

        if (target.classList.contains('delete-btn')) {
            if (!confirm('Are you sure you want to delete this task?')) return;
            
            try {
                const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Failed to delete task');
                fetchTasks(); 
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Failed to delete task.');
            }
        }
        
        if (target.closest('.task-details')) {
            const isCompleted = taskItem.classList.contains('completed');
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !isCompleted })
                });
                if (!response.ok) throw new Error('Failed to update task');
                fetchTasks(); 
            } catch (error) {
                console.error('Error updating task:', error);
                alert('Failed to update task.');
            }
        }
    });

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    fetchTasks();
});
