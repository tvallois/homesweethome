import express from "express";
import Config from "./src/config/config";
import connectToMongoDB from "./src/db/connection";
import userRouter from "./src/routes/user";

const config = new Config();
connectToMongoDB(config).catch(err => {
  console.log(err);
  process.exit(1);
});

const app = express();
app.use(express.json());

app.use("/api/v1", userRouter);

app.listen(3000, () => console.log("Starting server on port 3000"));

export default app;
