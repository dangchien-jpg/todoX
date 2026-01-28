import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import tasksRouters from './src/routes/tasksRouters.js'
import connectDB from './src/configs/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRouters);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})