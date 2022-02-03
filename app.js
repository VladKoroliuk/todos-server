import express from "express";
import cors from "cors";
import { base, db } from "./config/index.js";
import mongoose from "mongoose";
import history from "connect-history-api-fallback";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import labelRouter from "./routes/label.js";
import projectRouter from "./routes/project.js";
import errors from "./middlewares/errors.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/label", labelRouter);
app.use("/api/project", projectRouter);
app.use(history());
app.use(errors);

const start = async () => {
  try {
    await mongoose.connect(db.dbLink, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT || 3000, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`Server has been started on port ${base.PORT}`);
      }
    });
  } catch (error) {
    throw error;
  }
};

start();
