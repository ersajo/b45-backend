import express from 'express';
import { UserValidator } from '../validators/index.js'
import { UserController } from '../controllers/index.js'
import { verifyToken } from '../middlewares/index.js'

const router = express.Router();

// Create
router.post('/users',
  UserValidator.create,
  UserController.create);

// Read
router.get('/users/:id',
  UserController.read);

// Update
router.patch('/users/:id',
  verifyToken,
  UserValidator.update,
  UserController.update);

// Delete
router.delete('/users/:id',
  UserController.delete);

export default router;
