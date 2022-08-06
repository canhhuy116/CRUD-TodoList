import {
  createTodo,
  deleteTodo,
  readTodoByUsername,
  updateTodo,
} from './../controllers/controlTodoList';
import express from 'express';
import protect from '../middlewares/authMiddlware';

const router = express.Router();
//http://localhost:5000/todos

router.route('/').get(protect, readTodoByUsername).post(protect, createTodo);
router.route('/:id').delete(protect, deleteTodo).put(protect, updateTodo);

export default router;
