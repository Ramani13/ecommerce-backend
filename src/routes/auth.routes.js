import express from 'express';
import { registerUser, authUser, getUserProfile } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile/:id', getUserProfile); // get user by id

export default router;
