import {
  createTodo,
  deleteTodo,
  readTodoByUsername,
  updateTodo,
} from './../controllers/controlTodoList';
import express from 'express';

const router = express.Router();
//http://localhost:5000/todos

router.get('/', readTodoByUsername);
router.post('/', createTodo);
router.put('/', updateTodo);
router.patch('/');
router.delete('/:id', deleteTodo);

export default router;
