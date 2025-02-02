const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'tasks.json');

function loadTasks() {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

function addTask(description) {
    const tasks = loadTasks();
    const newTask = {
        id: tasks.length + 1,
        description,
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

function updateTask(id, newDescription) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return console.log('Task not found');
    }
    task.description = newDescription;
    task.updatedAt = new Date();
    saveTasks(tasks);
    console.log('Task updated successfully');
}

function deleteTask(id) {
    let tasks = loadTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveTasks(tasks);
    console.log('Task deleted successfully');
}

function markInProgress(id) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return console.log('Task not found');
    }
    task.status = 'in-progress';
    task.updatedAt = new Date();
    saveTasks(tasks);
    console.log('Task marked as in progress');
}

function markDone(id) {
    const tasks = loadTasks();
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return console.log('Task not found');
    }
    task.status = 'done';
    task.updatedAt = new Date();
    saveTasks(tasks);
    console.log('Task marked as done');
}

function listTasks(status) {
    const tasks = loadTasks();
    const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
    if (filteredTasks.length === 0) {
        return console.log('No tasks found');
    }
    console.table(filteredTasks);
}

const [,, command, arg1, arg2] = process.argv;
switch (command) {
    case 'add':
        addTask(arg1);
        break;
    case 'update':
        updateTask(Number(arg1), arg2);
        break;
    case 'delete':
        deleteTask(Number(arg1));
        break;
    case 'mark-in-progress':
        markInProgress(Number(arg1));
        break;
    case 'mark-done':
        markDone(Number(arg1));
        break;
    case 'list':
        listTasks(arg1);
        break;
    default:
        console.log('Invalid command');
        break;
}
