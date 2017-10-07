const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoCtrl');

router.get('/todos', todoController.getTodos);
router.get('/todo/:id', todoController.getTodo);
router.post('/todo', todoController.createTodo);
router.put('/todo', todoController.updateTodo);
router.delete('/todo/:id', todoController.deleteTodo);

module.exports = router;