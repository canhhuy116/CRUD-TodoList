import express from 'express';
import {
  dashboard,
  login,
  loginFailed,
  logout,
  register,
} from '../controllers/controlUser';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.post('/login', login);
router.get('/login/failed', loginFailed);
router.post('/register', register);
router.get('/', isAuth, dashboard);
router.post('/logout', logout);

export default router;
