import express from 'express';
import { getMe, login, register } from '../controllers/controlUser';
import protect from '../middlewares/authMiddlware';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);

export default router;
