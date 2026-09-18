import express from "express";

import productRouter from "./routes/product.routes";
import categoryRouter from "./routes/category.routes"; 
import {
  loggerMiddleware
} from "./middlewares/logger.middleware";

import {
  requestInfoMiddleware
} from "./middlewares/request-info.middleware";

import {
  notFoundMiddleware
} from "./middlewares/not-found.middleware";

import {
  errorMiddleware
} from "./middlewares/error.middleware";

const app = express();

app.use(
  express.json()
);

app.use(
  requestInfoMiddleware
);

app.use(
  loggerMiddleware
);


app.use(
  "/api/products",
  productRouter
);

app.use(
  "/api/categories",
  categoryRouter
); 
app.use(
  notFoundMiddleware
);

app.use(
  errorMiddleware
);

export default app;