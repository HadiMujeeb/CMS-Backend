import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParse from 'cookie-parser';
import { ENV } from './config/env';
import { errorHandler } from './adapters/middleware/errorHandler';
import authRoute from './adapters/routes/auth.routes';
import articleRoute from './adapters/routes/article.route';
const app = express();

app.use(express.json())

app.use(morgan("dev"));
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParse())

app.use("/api/user/auth",authRoute);
app.use("/api/user/article",articleRoute);


app.use(errorHandler);

export default app;