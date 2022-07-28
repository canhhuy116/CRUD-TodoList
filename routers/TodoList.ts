import {
  createTodo,
  deleteTodo,
  readTodo,
  updateTodo,
} from './../controllers/controlTodoList';
import express from 'express';

const router = express.Router();
//http://localhost:5000/TodoList

router.get('/', readTodo);
router.post('/', createTodo);
router.put('/', updateTodo);
router.patch('/');
router.delete('/:id', deleteTodo);

export default router;
