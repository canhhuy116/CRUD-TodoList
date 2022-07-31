import express from 'express';
import { Gettodos, login, logout, register } from '../controllers/controlUser';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/todos', isAuth, Gettodos);
router.post('/logout', logout);

export default router;
