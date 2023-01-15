import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user";
import { bookRouter } from "./routes/book";
import swaggerUi from "swagger-ui-express";
import * as SwaggerDocument from "./swagger.json";
import rateLimit from "express-rate-limit";

export const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
//global middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(limiter);
//routes
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(SwaggerDocument));
app.get("/", (req: Request, res: Response) => {
  res.json("index is running");
});
app.get("/api/", (req: Request, res: Response) => {
  res.json("server is running");
});
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.all("*", async (req, res) => {
  res.json("404 not found");
});
