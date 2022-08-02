import express, { Express } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import TodoList from '../routers/TodoList';
import Users from '../routers/Users';
import cors from 'cors';
import session from 'express-session';
import { connectDB, store } from '../config/db';
import passport from './passport';
import auth from '../routers/auth';

dotenv.config();

const app: Express = express();

const PORT = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/todos', TodoList);
app.use('/users', Users);
app.use('/auth', auth);

connectDB().then(() => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
