import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import postsRouter from './routes/posts.routes';
import authRouter from './routes/auth.routes';
import cors from 'cors';


const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use('/api/posts',postsRouter);
app.use('/api/auth',authRouter);
app.listen(PORT, () => {
  console.log(`App is working on port http://localhost:${PORT}`);
});
