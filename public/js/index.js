window.onload = async function() {
    try {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        tasks.forEach(task => addTaskToList(task));
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
};

document.getElementById('addTaskForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('taskTitle').value;

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: taskTitle })
        });

        if (response.ok) {
            const task = await response.json();
            addTaskToList(task);
            document.getElementById('taskTitle').value = '';
        } else {
            console.error('Failed to add task');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function addTaskToList(task) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.textContent = `${task.title} (ID: ${task.id})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = async function() {
        try {
            const response = await fetch(`/task/${task.id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                taskList.removeChild(listItem);
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}
