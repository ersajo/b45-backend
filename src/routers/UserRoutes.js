import express from 'express';
import { UserValidator } from '../validators/index.js'
import { UserController } from '../controllers/index.js'

const router = express.Router();

// Create
router.post('/user/create', UserValidator.create, UserController.create);
// Read
router.get('/user/read/:id', UserController.read);
// Update
router.put('/user/update/:id', UserController.update);
// Delete
router.delete('/user/delete/:id', UserController.delete);

export default router;
