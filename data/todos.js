const fs = require('fs');
const url = __dirname + '/todos.json';

exports.get = () => JSON.parse(fs.readFileSync(url, 'utf-8'));

exports.save = (todo) => {
    const todos = JSON.parse(fs.readFileSync(url, 'utf-8'));
    todo.id = generateNextId(todos);
    todo.status = 'To Do';
    todos.push(todo);
    fs.writeFileSync(url, JSON.stringify(todos));
    return todo;
}

exports.update = (todo) => {
    const todos = JSON.parse(fs.readFileSync(url, 'utf-8'));
    const todoIndex = todos.findIndex(t => t.id === +todo.id);
    if (todoIndex < 0) return false;

    todos.splice(todoIndex, 1, todo);
    fs.writeFileSync(url, JSON.stringify(todos));
    return true;
}

exports.remove = (id) => {
    const todos = JSON.parse(fs.readFileSync(url, 'utf-8'));
    const todoIndex = todos.findIndex(t => t.id === +id);
    if (todoIndex < 0) return false;

    todos.splice(todoIndex, 1);
    fs.writeFileSync(url, JSON.stringify(todos));
    return true;
}

function generateNextId(todosList) {
    const ids = todosList.map(t => t.id).sort();
    return ids[todosList.length - 1] + 1;
}

