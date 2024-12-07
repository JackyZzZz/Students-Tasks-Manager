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

    let taskContent = `<strong>${task.name}</strong> - ${task.priority} priority`;
    if (task.dueDate) {
        taskContent += ` | Due: ${task.dueDate}`;
    }

    //taskDiv.textContent = task.name;
    taskDiv.innerHTML = taskContent;
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


function ToSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'flex';
}

function ToLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'flex';
}