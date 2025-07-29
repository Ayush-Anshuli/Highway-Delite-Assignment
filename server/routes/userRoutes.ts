import express from 'express';
import { signup, signin, googleAuth, getAllUsers, getUserById } from '../controllers/userController';

const router = express.Router();

// User registration route
router.post('/signup', signup);

// User signin route
router.post('/signin', signin);

// Google authentication route
router.post('/google-auth', googleAuth);

// Get all users route
router.get('/', getAllUsers);

// Get user by ID route
router.get('/:id', getUserById);

export default router; 