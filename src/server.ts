import express from "express";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";
import { pokemonRouter } from "./routes/pokemon.routes.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
const corsOrigin = process.env.CORS_ORIGIN || "*";

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", corsOrigin);
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use("/api", pokemonRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});
