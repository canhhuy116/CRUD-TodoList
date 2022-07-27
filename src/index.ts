import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import db from '../db/todo.json';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app: Express = express();

app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let readTodo = (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'ok',
    data: db,
  });
};

let createTodo = (req: Request, res: Response) => {
  let { id, name, description } = req.body;

  if (!id || !name || !description) {
    return res.status(200).json({
      message: 'missing requires params',
    });
  }

  const todo = {
    id: id,
    name: name,
    description: description,
  };

  db.push(todo);
  fs.writeFile('./db/todo.json', JSON.stringify(db, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  return res.status(200).json({
    message: 'ok',
  });
};

let updateTodo = (req: Request, res: Response) => {
  let { id, name, description } = req.body;

  if (!id || !name || !description) {
    return res.status(200).json({
      message: 'missing requires params',
    });
  }

  const job = {
    id: id,
    name: name,
    description: description,
  };

  const updateDB = db.map((todo) => (todo.id === id ? (todo = job) : todo));

  fs.writeFile('./db/todo.json', JSON.stringify(updateDB, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  return res.status(200).json({
    message: 'ok',
  });
};

let deleteTodo = (req: Request, res: Response) => {
  let todoID = req.params.id;
  if (!todoID) {
    return res.status(200).json({
      message: 'missing requires params',
    });
  }
  const newDB = db.filter((todo) => todo.id !== todoID);

  fs.writeFile('./db/todo.json', JSON.stringify(newDB, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  return res.status(200).json({
    message: 'ok',
  });
};

app.get('/read-todo', readTodo);
app.post('/create-todo', createTodo);
app.put('/update-todo', updateTodo);
app.delete('/delete-todo/:id', deleteTodo);

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
