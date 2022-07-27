import { TodoListModel } from './../models/modelTodoList';
import { Request, Response } from 'express';

export const readTodo = async (req: Request, res: Response) => {
  try {
    const TodoList = await TodoListModel.find();
    res.status(200).json(TodoList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const newTodo = req.body;

    if (!newTodo) {
      return res.status(200).json({
        message: 'missing requires params',
      });
    }

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
    const todo = await TodoListModel.findOneAndDelete({ id: todoID });

    return res.status(200).json({
      message: 'ok',
    });
  } catch (error) {
    res.status(500).json({ Error: error });
  }
};
