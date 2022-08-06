import express from 'express';
import {
  getMe,
  login,
  refreshToken,
  register,
} from '../controllers/controlUser';
import protect from '../middlewares/authMiddlware';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);
router.post('/refreshToken', refreshToken);

export default router;
