import {
  createTodo,
  deleteTodo,
  readTodo,
  updateTodo,
} from './../controllers/controlTodoList';
import express from 'express';

const router = express.Router();
//http://localhost:5000/TodoList

router.get('/read-todo', readTodo);
router.post('/create-todo', createTodo);
router.put('/update-todo', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);

export default router;
