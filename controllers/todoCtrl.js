const data = require('../data/todos');

exports.getTodos = (req, res) => {
    const todos = data.get();
    return res.json({ success: true, todos });
}

exports.getTodo = (req, res) => {
    const { id } = req.params;
    const todos = data.get();
    const todo = todos.find(t => t.id === +id);

    if (!todo) return res.json({ succes: false, message: 'There was no task found with that Id' });

    return res.json({ succes: true, todo });
}

exports.createTodo = (req, res) => {
    const todo = req.body;
    if (!todo) return res.json({ succes: false, message: 'You must supply a task' });

    if (!todo.name || !todo.priority) return res.json({ succes: false, message: 'Tasks must contain a name and priority' });

    const newTodo = data.save(todo);

    return res.json({ succes: true, message: 'Task created!', todo: newTodo });
}

exports.updateTodo = (req, res) => {
    const todo = req.body;
    if (!todo) return res.json({ succes: false, message: 'You must supply a task to be updated' });

    if (!todo.name || !todo.priority) return res.json({ succes: false, message: 'Tasks must contain a name and priority' });

    const didUpdate = data.update(todo);

    if (!didUpdate) return res.json({ succes: false, message: `Unable to update that task with id ${todo.id}` });

    return res.json({ success: true, message: 'Task updated!' });
}

exports.deleteTodo = (req, res) => {
    const { id } = req.params;
    if (!id) return res.json({ succes: false, message: 'You must supply a task Id to delete' });

    const didDelete = data.remove(id);

    if (!didDelete) return res.json({ succes: false, message: `Unable to delete task with id ${id}` });

    return res.json({ succes: true, message: 'Task deleted!' });
}