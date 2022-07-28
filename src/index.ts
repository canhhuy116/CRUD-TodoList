import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import TodoList from '../routers/TodoList';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todos', TodoList);

mongoose
  .connect('mongodb://127.0.0.1:27017/TodoList')
  .then(() => {
    console.log('Connected to DB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('err', err);
  });
