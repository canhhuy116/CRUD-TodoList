import { TodoListModel } from './../models/modelTodoList';
import { Request, Response } from 'express';

export const readTodoByUsername = async (req: Request, res: Response) => {
  try {
    const username = req.session.username;
    const TodoList = await TodoListModel.find({ username: username });
    res.status(200).json(TodoList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { job, username } = req.body;

    if (!job || !username) {
      return res.status(200).json({
        message: 'missing requires params',
      });
    }
    const newTodo = {
      id: job.id,
      name: job.name,
      description: job.description,
      username: username,
    };

    const todo = new TodoListModel(newTodo);
    await todo.save();

    return res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const updateTodo = req.body;
    // const username = req.session.username;

    if (!updateTodo) {
      return res.status(200).json({
        message: 'missing requires params',
      });
    }

    const todo = await TodoListModel.findOneAndUpdate(
      { id: updateTodo.id },
      updateTodo,
      { new: true }
    );

    return res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoID = req.params.id;

    if (!todoID) {
      return res.status(200).json({
        message: 'missing requires params',
      });
    }
    console.log(todoID);
    const todo = await TodoListModel.deleteOne({ id: todoID });

    return res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
