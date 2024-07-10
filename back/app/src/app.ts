import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./router";

const app: express.Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

export default app;
