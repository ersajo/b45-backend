import express from 'express';
import { UserValidator } from '../validators/index.js'
import { UserController } from '../controllers/index.js'
import { verifyToken } from '../middlewares/index.js'

const router = express.Router();

// Create
router.post('/users',
  verifyToken,
  UserValidator.create,
  UserController.create);

// Read
router.get('/users/:id',
  verifyToken,
  UserValidator.findOne,
  UserController.findOne);

// Update
router.patch('/users',
  verifyToken,
  UserValidator.updateOne,
  UserController.updateOne);

// Delete
router.delete('/users',
  verifyToken,
  UserController.deleteOne);

export default router;
