import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import TodoList from '../routers/TodoList';
import Users from '../routers/Users';
import cors from 'cors';
import connectDB from '../config/db';
import errorHandler from '../middlewares/errorMiddleware';

dotenv.config();
connectDB();

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todos', TodoList);
app.use('/users', Users);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
