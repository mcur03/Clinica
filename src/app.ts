import express from 'express';
import cors from 'cors';

import userRouter from './routers/userRouter';
import pacienteRouter from './routers/pacienteRouter' 

const app = express()
.use(express.json())
.use(cors());

app.use('/api', userRouter);
app.use('/api', pacienteRouter);

export default app;