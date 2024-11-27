
document.getElementById('add-task-btn').addEventListener('click', addTask);


function addTask() {
    let taskName = document.getElementById('task-name').value.trim();
    let priorityLevel = document.getElementById('priority-level').value;

    if (taskName === '') {
        alert('Please enter a task name.');
        return;
    }

    let task = {
        name: taskName,
        priority: priorityLevel
    };

    saveTask(task);

    displayTask(task);

    document.getElementById('task-name').value = '';
}

function saveTask(task) {
    let tasks = [];
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTask(task) {
    let taskList = document.getElementById('task-list');
    let taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    if (task.priority === 'high') {
        taskDiv.classList.add('high');
    } else if (task.priority === 'medium') {
        taskDiv.classList.add('medium');
    } else if (task.priority === 'low') {
        taskDiv.classList.add('low');
    }

    taskDiv.textContent = task.name;
    taskList.appendChild(taskDiv);
}

window.onload = function() {
    let tasks = [];
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        displayTask(task);
    });
};
