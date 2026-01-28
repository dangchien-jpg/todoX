import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tasksRouters from "./src/routes/tasksRouters.js";
import connectDB from "./src/configs/db.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production') {
    app.use(cors({origin: "http://localhost:5173"}));
}

app.use(express.json());

app.use("/api/tasks", tasksRouters);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
