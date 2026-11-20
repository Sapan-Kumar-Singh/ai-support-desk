import express from "express";
import router from './routes/index.js';
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorHandler.js';
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(notFound);
app.use(errorHandler);

export default app;