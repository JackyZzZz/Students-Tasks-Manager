document.getElementById('add-task-btn').addEventListener('click', addTask);

document.getElementById('enable-due-date').addEventListener('change', function () {
    const dueDateInput = document.getElementById('due-date');
    if (this.checked) {
        dueDateInput.style.display = 'inline';
    } else {
        dueDateInput.style.display = 'none';
        dueDateInput.value = '';
    }
});

function addTask() {
    let taskName = document.getElementById('task-name').value.trim();
    let priorityLevel = document.getElementById('priority-level').value;
    let dueDateCheckbox = document.getElementById('enable-due-date').checked;
    let dueDate = dueDateCheckbox ? document.getElementById('due-date').value : null;

    if (taskName === '') {
        alert('Please enter a task name.');
        return;
    }

    if (dueDateCheckbox && !dueDate) {
        alert('Please enter a valid due date.');
        return;
    }

    let task = {
        name: taskName,
        priority: priorityLevel,
        dueDate: dueDate
    };

    saveTask(task);

    displayTask(task);

    document.getElementById('task-name').value = '';
    document.getElementById('enable-due-date').checked = false;
    document.getElementById('due-date').style.display = 'none';
    document.getElementById('due-date').value = '';
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    task.id = Date.now(); // Add unique ID
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTask(task) {
    let taskList = document.getElementById('task-list');
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.dataset.taskId = task.id || Date.now(); // Add unique ID to each task

    if (task.priority === 'high') {
        taskDiv.classList.add('high');
    } else if (task.priority === 'medium') {
        taskDiv.classList.add('medium');
    } else if (task.priority === 'low') {
        taskDiv.classList.add('low');
    }

    let taskContent = `
        <div class="task-content">
            <strong>${task.name}</strong> - ${task.priority} priority
            ${task.dueDate ? ` | Due: ${task.dueDate}` : ''}
        </div>
        <div class="task-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskDiv.innerHTML = taskContent;

    taskDiv.querySelector('.edit-btn').addEventListener('click', () => editTask(taskDiv, task));
    taskDiv.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskDiv, task));

    taskList.appendChild(taskDiv);
}

function editTask(taskDiv, task) {
    const taskContent = taskDiv.querySelector('.task-content');
    const oldContent = taskContent.innerHTML;
    
    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <input type="text" class="edit-task-name" value="${task.name}">
        <select class="edit-priority">
            <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High Priority</option>
            <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium Priority</option>
            <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low Priority</option>
        </select>
        <input type="date" class="edit-due-date" value="${task.dueDate || ''}">
        <button class="save-edit-btn">Save</button>
        <button class="cancel-edit-btn">Cancel</button>
    `;

    taskContent.replaceWith(editForm);

    // Add event listeners for save and cancel
    editForm.querySelector('.save-edit-btn').addEventListener('click', () => {
        const newName = editForm.querySelector('.edit-task-name').value.trim();
        const newPriority = editForm.querySelector('.edit-priority').value;
        const newDueDate = editForm.querySelector('.edit-due-date').value;

        if (newName === '') {
            alert('Task name cannot be empty');
            return;
        }

        task.name = newName;
        task.priority = newPriority;
        task.dueDate = newDueDate || null;

        updateTaskInStorage(task);


        taskDiv.remove();
        displayTask(task);
    });

    editForm.querySelector('.cancel-edit-btn').addEventListener('click', () => {
        editForm.replaceWith(taskContent);
    });
}

function deleteTask(taskDiv, task) {
    if (confirm('Are you sure you want to delete this task?')) {
        // Remove from DOM
        taskDiv.remove();
        // Remove from localStorage
        deleteTaskFromStorage(task);
    }
}

function updateTaskInStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromStorage(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(task => task.id !== taskToDelete.id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.onload = async function() {
    let tasks = [];
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        displayTask(task);
    });
}


async function fetchMotivationalQuote() {
    try {
        const response = await fetch('https://programming-quotesapi.vercel.app/api/random');
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        const quote = await response.json();
        document.getElementById('quote').innerText = `"${quote.quote}" - ${quote.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        document.getElementById('quote').innerText = "Failed to fetch quote. Please try again later.";
    }
}
fetchMotivationalQuote();

// window.onload = async function() {
//     localStorage.removeItem('tasks');
//     let taskList = document.getElementById('task-list');
//     taskList.innerHTML = '';
//     await fetchMotivationalQuote();
// };

