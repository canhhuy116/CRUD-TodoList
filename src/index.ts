import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import TodoList from '../routers/TodoList';
import cors from 'cors';
import connectDB from '../config/db';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todos', TodoList);

connectDB().then(() => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
