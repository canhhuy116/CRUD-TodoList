import express from 'express';
import { dashboard, login, logout, register } from '../controllers/controlUser';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/', isAuth, dashboard);
router.post('/logout', logout);

export default router;
