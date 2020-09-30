import express from 'express';
import userRouter from './UserRoutes.js';

const router = express.Router();

router.use(userRouter);

export default router;
