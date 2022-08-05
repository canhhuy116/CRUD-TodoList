import asyncHandler from 'express-async-handler';
import { TodoListModel } from './../models/todosModel';
import { Request, Response } from 'express';

const readTodoByUsername = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const TodoList = await TodoListModel.find({ user: user.id });
    res.status(200).json(TodoList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

const createTodo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const job = req.body;
    if (!job) {
      res.status(400);
      throw new Error('Missing requires params');
    }

    const newTodo = await TodoListModel.create({
      id: job.id,
      name: job.name,
      description: job.description,
      user: req.user.id,
    });
    await newTodo.save();
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const todo = await TodoListModel.findOne({ id: req.params.id });

    if (!todo) {
      res.status(400);
      throw new Error('Todo not found');
    }

    if (!req.body) {
      res.status(400);
      throw new Error('Missing requires params');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
    // Make sure the logged in user matches the goal user
    if (String(todo.user) !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updateTodo = await TodoListModel.findOneAndUpdate(
      { id: todo.id },
      req.body,
      { new: true }
    );

    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  try {
    const todo = await TodoListModel.findOne({ id: req.params.id });

    if (!todo) {
      res.status(400);
      throw new Error('Todo not found');
    }

    if (!req.body) {
      res.status(400);
      throw new Error('Missing requires params');
    }

    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Make sure the logged in user matches the todo user
    if (String(todo.user) !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }
    await todo.remove();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

export { readTodoByUsername, createTodo, updateTodo, deleteTodo };
