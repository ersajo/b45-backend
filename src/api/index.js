import express from 'express';
import cors from 'cors'
import morgan from 'morgan'
import celebrate from 'celebrate'
import router from '../routers/index.js';
import { getDate } from '../middlewares/index.js'

export const app = express();
export const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ extended: true }))
app.use(getDate)

app.get('/', (_, res) => res.send('Hello world'));
// namespace
app.use('/api/v1', router);

app.use(celebrate.errors())
