import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./routes/user.route.js";
import connectDB from "./db/db.js";
import noteRoutes from "./routes/notes.route.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// coonectDB
connectDB();

// routes
app.use("/api/v1", noteRoutes);
app.use("/api/v1", messageRoutes);
app.use("/api/v1/auth", auth);

app.listen(port, () => {
  console.log(`Server is ruuning on http://localhost:${port}`);
});
