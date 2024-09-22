import express from "express";
import status from "http-status";

import config from "./config";
import routes from "./routes";

const app = express();
const port = config.PORT || 5555;

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "25mb" }));

app.use("/", routes);

app.use((_req, res) => {
  res.status(status.NOT_FOUND).json("NOT FOUND! 🤷‍♂️");
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export { app, server };
